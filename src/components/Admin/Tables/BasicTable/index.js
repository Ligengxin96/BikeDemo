import React, { Component } from 'react';
import Moment from 'moment';
import { Card, Table, message } from 'antd';
import CrossPageSelectTable from '../../../myComponents/myTable/CrossPageSelectTable';
import { fetchCustomer } from '../../../../services/customer';
import { calcSelectCount, getDictionary } from '../../../../utils/common';
import styles from '../../../../style/common.less';

class BasicTable extends Component {
  state={
    basicLoading: false, // 基础表格loading
    mutilLoading: false, // 多(单)选表格loading
    basicDataSource: [], // 基础表格数据源
    mutilDataSource: [], // 多(单)选表格数据源
    selectedDatas: { // 多(单)表格selectDatas
      selectedRowKeys: [],
      selectedRows: [],
      selectedAll: false,
    },
    pagination: {
      current: 1,
      pageSize: 10,
      total: 0,
    },
    sortedInfo: null, // 排序信息
  }

  componentDidMount() {
    this.fetchBasicTableData();
    this.fetchSingleTableData();
  }

  // 获取表格数据
  fetchBasicTableData = () => {
    this.setState({ basicLoading: true });
    fetchCustomer({
      limit: 1, // limit: 返回数量限制, 1.5条 | 2.105条
    }).then((response) => {
      const { code, result } = response;
      if (code > 0) {
        this.setState({
          basicLoading: false,
          basicDataSource: result,
        });
      }
    }).catch((error) => {
      message.error(error);
      this.setState({ basicLoading: false });
    });
  }

  // 获取表格数据
  fetchSingleTableData = () => {
    this.setState({ mutilLoading: true });
    const { pagination } = this.state;
    fetchCustomer({
      limit: 2, // limit: 返回数量限制, 1.5条 | 2.105条
    }).then((response) => {
      const { code, result, total } = response;
      if (code > 0) {
        this.setState({
          mutilLoading: false,
          mutilDataSource: result,
          pagination: {
            ...pagination,
            total,
          },
        });
      }
    }).catch((error) => {
      message.error(error);
      this.setState({ mutilLoading: false });
    });
  }

  getColumns = () => {
    const statusAry = getDictionary('status');
    const columns = [
      {
        title: '姓名',
        dataIndex: 'username',
      },
      {
        title: '年龄',
        dataIndex: 'age',
      },
      {
        title: '性别',
        dataIndex: 'sex',
        render: (text) => { return text === 1 ? '男' : '女'; },
      },
      {
        title: '是否单身',
        dataIndex: 'isSingle',
        render: (text) => { return text === 1 ? '是' : '否'; },
      },
      {
        title: '状态',
        dataIndex: 'status',
        render: (text) => {
          let status = text;
          statusAry.forEach((item) => {
            if (item.ibm === text) {
              status = item.note;
            }
          });
          return status;
        },
      },
      {
        title: '生日',
        dataIndex: 'birthday',
        render: (text) => { return Moment(text).format('YYYY-MM-DD'); },
      },
      {
        title: '联系地址',
        dataIndex: 'address',
      },
    ];
    return columns;
  }

  getSortColumns = () => {
    const statusAry = getDictionary('status');
    let { sortedInfo } = this.state;
    sortedInfo = sortedInfo || {};
    const columns = [
      {
        fixed: 'left',
        title: '姓名',
        dataIndex: 'username',
        width: 100,
      },
      {
        fixed: 'left',
        title: '年龄',
        dataIndex: 'age',
        sorter: (a, b) => a.age - b.age,
        sortOrder: sortedInfo.columnKey === 'age' && sortedInfo.order,
        width: 100,
      },
      {
        title: '性别',
        dataIndex: 'sex',
        render: (text) => { return text === 1 ? '男' : '女'; },
      },
      {
        title: '是否单身',
        dataIndex: 'isSingle',
        render: (text) => { return text === 1 ? '是' : '否'; },
      },
      {
        title: '状态',
        dataIndex: 'status',
        render: (text) => {
          let status = text;
          statusAry.forEach((item) => {
            if (item.ibm === text) {
              status = item.note;
            }
          });
          return status;
        },
      },
      {
        title: '生日',
        dataIndex: 'birthday',
        render: (text) => { return Moment(text).format('YYYY-MM-DD'); },
      },
      {
        title: '联系地址',
        dataIndex: 'address',
      },
      {
        fixed: 'right',
        title: '电子邮箱',
        dataIndex: 'email',
        width: 300,
      },
    ];
    return columns;
  }

  // 表格翻页
  onPageChange = (current) => {
    const { pagination } = this.state;
    this.setState({
      pagination: {
        ...pagination,
        current,
      },
    });
  }

  /**
   * 表格的onchange回调
   * @param pagination 表格的分页对象
   * @param filter 表格的过滤对象
   * @param sort 表格的排序对象
   */
  onTableChange = (pagination, filters, sorter) => {
    console.info('pagination', pagination); // eslint-disable-line
    console.info('filters', filters); // eslint-disable-line
    console.info('sorter', sorter); // eslint-disable-line
    this.setState({
      sortedInfo: sorter,
    });
  }

  // (单)多选框勾选框回调
  handleSelectChange = (selectedRowKeys, selectedRows, selectedAll) => {
    this.setState({
      selectedDatas: {
        selectedRowKeys,
        selectedRows,
        selectedAll,
      },
    }, this.showSelectCount);
  }

  showSelectCount = () => {
    const { selectedDatas, pagination } = this.state;
    message.info(`选中了${calcSelectCount(selectedDatas, pagination)}个客户`);
  }

  // 点击单选表格每一行触发
  onRowClick = (record) => {
    message.info(`点击的用户名是${record.username}`);
  }

  render() {
    const { basicLoading, mutilLoading } = this.state;
    const { basicDataSource, mutilDataSource } = this.state;
    const { selectedDatas: { selectedAll, selectedRowKeys }, pagination: { total, current, pageSize } } = this.state;

    const tableProps = {
      rowKey: 'id', // 列表数据的唯一标识
      loading: mutilLoading,
      columns: this.getColumns(),
      dataSource: mutilDataSource,
      rowSelection: {
        type: 'checkbox', // checkbox: 多选 | radio 单选
        crossPageSelect: true, // (checkbox)跨页全选
        selectedAll, // 全选
        selectedRowKeys, // 选中(未全选时) || (全选后)取消选中的rowkey值
        // 可跨页选择表格默认 type = 'checkbox' , crossPageSelect = true 所有rowSelection只需要 下面两行
        // {...selectedDatas}
        onChange: this.handleSelectChange,
      },
      pagination: {
        showTotal: () => `共${total}条`,
        showLessItems: true, // (具体效果好像忘记了... 好像是不够一页就不展示分页选项)
        // showSizeChanger: true, // 是否可以改变 pageSize 记得设置onChange函数
        showQuickJumper: true, // 是否展示快速翻页
        total,
        current,
        pageSize,
        onChange: this.onPageChange,
      },
      scroll: { y: 240 }, // 固定头部, 表格内部滚动
      // onChange: this.onPageSizeChange,  这里需要注意排序,筛选,分页表格的任务变化都会触发Table的onChange,所有排序和分页共存的时候需要注意下
    };

    return (
      <React.Fragment>

        <Card title="基础表格" className={styles.myCard}>
          <Table
            rowKey="id"
            loading={basicLoading}
            columns={this.getColumns()}
            dataSource={basicDataSource}
            pagination={false}
            onRow={(record) => {
              return {
                onClick: () => {
                  this.onRowClick(record);
                },
              };
            }}
          />
        </Card>

        <Card title="可跨页多选表格" className={styles.myCard}>
          <CrossPageSelectTable {...tableProps} />
        </Card>

        {/* 只需要给columns加个 fixed 属性(取值'left' || 'right') 就能固定列(在表格左边或者右边)了 */}
        <Card title="固定列的可排序表格" className={styles.myCard}>
          <Table
            rowKey="id"
            pagination={false}
            scroll={{ x: 2400 }}
            loading={basicLoading}
            dataSource={basicDataSource}
            onChange={this.onTableChange}
            columns={this.getSortColumns()}
          />
        </Card>

      </React.Fragment>
    );
  }
}

export default BasicTable;
