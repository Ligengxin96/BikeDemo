import React, { Component } from 'react';
import Moment from 'moment';
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
