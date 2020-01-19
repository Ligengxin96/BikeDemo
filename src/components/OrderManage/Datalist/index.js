import React, { Component } from 'react';
import { Card, message } from 'antd';
import CrossPageSelectTable from '../../myComponents/myTable/CrossPageSelectTable';
import OpenCityBtn from './OpenCityBtn';
import { fetchOrderList } from '../../../services/example'; // mock.yonyoucloud.com这个网站同样的返回值写法,不支持正则(加了转义字符直接报错)
// import { getDictionary } from '../../../utils/common';
import styles from '../../../style/common.less';

class Datalist extends Component {
  state={
    loading: false,
    dataSource: [], // 表格数据源
    pagination: {
      current: 1,
      pageSize: 5,
      total: 0,
    },
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
      title: '里程',
      dataIndex: 'distance',
      render(distance) {
        return `${distance / 1000}Km`;
      },
    }, {
      title: '行驶时长',
      dataIndex: 'totalTime',
    }, {
      title: '状态',
      dataIndex: 'status',
    }, {
      title: '开始时间',
      dataIndex: 'startTime',
    }, {
      title: '结束时间',
      dataIndex: 'endTime',
    }, {
      title: '订单金额',
      dataIndex: 'shouldPay',
    }, {
      title: '实付金额',
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

  render() {
    const { loading, dataSource, pagination } = this.state;
    const { searchFormValue } = this.props;
    const filterKeys = Object.keys(searchFormValue);
    let tempAry = dataSource;
    filterKeys.forEach((item) => {
      if (searchFormValue[item]) {
        tempAry = tempAry.filter((inner) => {
          return inner[item] === searchFormValue[item];
        });
      }
    });
    const tableProps = {
      loading,
      dataSource: tempAry,
      columns: this.getColumns(),
      rowSelection: {
        crossPageSelect: false,
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
        {/* 开通城市按钮 */}
        <OpenCityBtn reloadTable={this.reloadTable} />
        {/* 表格部分 */}
        <CrossPageSelectTable {...tableProps} />
      </Card>
    );
  }
}
export default Datalist;
