import React, { Component } from 'react';
import Moment from 'moment';
import { Card, Table, message } from 'antd';
import { fetchCustomer } from '../../../../services/customer';
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
      pageSize: 5,
      total: 0,
    },
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
    const { pagination } = this.props;
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
    const { dictionary } = this.props;
    const { status: statusAry } = dictionary;
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

  // (单)多选框勾选框回调
  handleSelectChange = (selectedRowKeys, selectedRows, selectedAll) => {
    this.setState({
      selectedDatas: {
        selectedRowKeys,
        selectedRows,
        selectedAll,
      },
    });
  }

  // 点击单选表格每一行触发
  onRowClick = (record) => {
    message.info(`点击的用户名是${record.username}`);
  }

  render() {
    const { basicLoading, mutilLoading } = this.state;
    const { basicDataSource, mutilDataSource } = this.state;
    const { selectedDatas: { selectAll, selectedRowKeys }, pagination: { total, current, pageSize } } = this.state;

    const tableProps = {
      rowKey: 'id', // 列表数据的唯一标识
      loading: mutilLoading,
      columns: this.getColumns(),
      dataSource: mutilDataSource,
      rowSelection: {
        type: 'checkbox', // checkbox: 多选 | radio 单选
        crossPageSelect: true, // (checkbox)跨页全选
        selectAll, // 全选
        selectedRowKeys, // 选中(未全选时) || (全选后)取消选中的rowkey值
        onChange: this.handleSelectChange,
      },
      pagination: {
        showTotal: () => `共${total}条`,
        showLessItems: true, // (具体效果好像忘记了... 好像是不够一页就不展示分页选项)
        showSizeChanger: true, // 是否可以改变 pageSize
        showQuickJumper: true, // 是否展示快速翻页
        total,
        current,
        pageSize,
        onChange: this.onPageChange,
      },

    };

    return (
      <React.Fragment>
        <Card title="基础表格" className={styles.myCard}>
          <Table
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

        <Card title="多选表格" className={styles.myCard}>
          <Table {...tableProps} />
        </Card>
      </React.Fragment>
    );
  }
}

export default BasicTable;
