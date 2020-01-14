import React, { Component } from 'react';
import { Card, Table, message } from 'antd';
import { fetchCustomer } from '../../../../services/customer';
import styles from '../../../../style/common.less';

class BasicTable extends Component {
  state={
    loading: false,
    dataSource: [],
  }

  componentDidMount() {
    this.fetchTableData();
  }

  // 获取表格数据
  fetchTableData = () => {
    this.setState({ loading: true });
    fetchCustomer({}).then((response) => {
      const { code, result } = response;
      if (code > 0) {
        this.setState({
          loading: false,
          dataSource: result,
        });
      }
    }).catch((error) => {
      message.error(error);
      this.setState({ loading: false });
    });
  }

  getColumns = () => {
    const columns = [{
      title: '姓名',
      dataIndex: 'username',
    }, {
      title: '年龄',
      dataIndex: 'age',
    }, {
      title: '联系地址',
      dataIndex: 'address',
    }, {
      title: '联系地址',
      dataIndex: 'address',
    },
    ];
    return columns;
  }

  getDataSource = () => {
    const dataSource = [
      {
        key: '1',
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号',
      },
      {
        key: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号',
      },
    ];
    return dataSource;
  }

  render() {
    const { dataSource, loading } = this.state;
    return (
      <Card title="基础表格" className={styles.myCard}>
        <Table columns={this.getColumns()} dataSource={dataSource} loading={loading} />
      </Card>
    );
  }
}

export default BasicTable;
