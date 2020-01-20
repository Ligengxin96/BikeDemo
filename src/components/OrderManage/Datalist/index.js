import React, { Component } from 'react';
import Moment from 'moment';
import { Card, Table, message } from 'antd';
import DetailAndFinishBtn from './DetailAndFinishBtn';
import { fetchOrderList } from '../../../services/example'; // mock.yonyoucloud.com这个网站同样的返回值写法,不支持正则(加了转义字符直接报错)
import { getDictionary } from '../../../utils/common';
import styles from '../../../style/common.less';

class Datalist extends Component {
  state={
    loading: false,
    dataSource: [], // 表格数据源
    pagination: {
      current: 1,
      pageSize: 7,
      total: 0,
    },
    selectedRowKeys: [],
  }

  componentDidMount() {
    this.fetchTableData();
  }

  // 获取按钮编辑表格数据
  fetchTableData = () => {
    const { pagination } = this.state;
    this.setState({ loading: true });
    fetchOrderList({
      type: 1,
    }).then((response) => {
      const { data: { code = 0, result = [], total = 0 } } = response;
      if (code > 0) {
        this.setState({
          loading: false,
          dataSource: result,
          pagination: {
            ...pagination,
            total,
          },
        });
      }
    }).catch((error) => {
      message.error(error);
      this.setState({ loading: false });
    });
  }

  getColumns = () => {
    const orderStatusAry = getDictionary('orderStatus');
    const columns = [{
      title: '订单编号',
      dataIndex: 'orderId',
    }, {
      title: '车辆编号',
      dataIndex: 'bikeId',
    }, {
      title: '用户名',
      dataIndex: 'username',
    }, {
      title: '手机号',
      dataIndex: 'phone',
    }, {
      title: '里程(km)',
      dataIndex: 'distance',
    }, {
      title: '行驶时长',
      dataIndex: 'totalTime',
      render: (text) => {
        const hour = parseInt(text / 60, 10);
        const min = text % 60;
        return hour ? `${hour}小时${min}分钟` : `${min}分钟`;
      },
    }, {
      title: '状态',
      dataIndex: 'orderStatus',
      render: (text) => {
        let orderStatus = text;
        orderStatusAry.forEach((item) => {
          if (item.ibm === text) {
            orderStatus = item.note;
          }
        });
        return orderStatus;
      },
    }, {
      title: '开始时间',
      dataIndex: 'startTime',
    }, {
      title: '结束时间',
      dataIndex: 'endTime',
    }, {
      title: '订单金额(元)',
      dataIndex: 'shouldPay',
    }, {
      title: '实付金额(元)',
      dataIndex: 'userPay',
    }];
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

  // 添加完毕后刷新列表(假装自己有数据库)
  reloadTable = (type) => {
    this.fetchTableData(type);
  }

  // (单)多选框勾选框回调
  handleSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }

  render() {
    const { loading, dataSource, pagination, selectedRowKeys } = this.state;
    const { searchFormValue } = this.props;
    const filterKeys = Object.keys(searchFormValue);
    let tempAry = dataSource;
    filterKeys.forEach((item) => {
      if (searchFormValue[item]) {
        if (item === 'startTime') {
          // 过滤掉订单开始时间小于所选开始时间数据
          tempAry = tempAry.filter((inner) => {
            return Moment(inner[item]).valueOf() > searchFormValue[item].valueOf();
          });
        }
        if (item === 'endTime') {
          // 过滤掉订单结束时间晚于所选结束时间数据
          tempAry = tempAry.filter((inner) => {
            return Moment(inner[item]).valueOf() < searchFormValue[item].valueOf();
          });
        }
        if (item !== 'startTime' && item !== 'endTime') {
          tempAry = tempAry.filter((inner) => {
            return inner[item] === searchFormValue[item];
          });
        }
      }
    });
    const tableProps = {
      rowKey: 'id',
      loading,
      dataSource: tempAry,
      columns: this.getColumns(),
      rowSelection: {
        type: 'radio',
        selectedRowKeys,
        onChange: this.handleSelectChange,
      },
      pagination: {
        ...pagination,
        total: tempAry.length,
        onChange: this.onPageChange,
        showTotal: () => `共${tempAry.length}条`,
      },
    };
    return (
      <Card className={styles.myCard}>
        {/* 订单详情和结束订单按钮 */}
        <DetailAndFinishBtn selectedRowKeys={selectedRowKeys} reloadTable={this.reloadTable} />
        {/* 表格部分 */}
        <Table {...tableProps} />
      </Card>
    );
  }
}

export default Datalist;
