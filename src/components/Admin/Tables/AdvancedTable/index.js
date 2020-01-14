import React, { Component } from 'react';
import { Card, Table } from 'antd';
import styles from '../../../../style/common.less';

class AdvancedTable extends Component {
  getColumns = () => {
    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: '住址',
        dataIndex: 'address',
        key: 'address',
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
    return (
      <Card title="高级表格" className={styles.myCard}>
        <Table columns={this.getColumns()} dataSource={this.getDataSource()} />
      </Card>
    );
  }
}

export default AdvancedTable;
