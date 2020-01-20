import React, { Component } from 'react';
import Moment from 'moment';
import { Card, message } from 'antd';
import { fetchCustomer } from '../../../../services/customer';
import EdiTable from '../../../myComponents/myTable/EdiTable';
import { getDictionary } from '../../../../utils/common';
import OnClickEdiTable from '../../../myComponents/myTable/OnClickEdiTable';
import styles from '../../../../style/common.less';

class AdvancedTable extends Component {
  state={
    ediTableLoading: false, // 按钮编辑表格loading
    onClickEdiTableLoading: false, // 点击编辑表格loading
    ediTableDataSource: [], // 按钮编辑表格数据源
    onClickEdiTableDataSource: [], // 点击编辑表格数据源
  }

  componentDidMount() {
    this.fetchEdiTableData();
    this.fetchOnClickEdiTableData();
  }

  // 获取按钮编辑表格数据
  fetchEdiTableData = () => {
    this.setState({ ediTableLoading: true });
    fetchCustomer({
      limit: 1, // limit: 返回数量限制, 1.5条 | 2.105条
    }).then((response) => {
      const { code, result } = response;
      if (code > 0) {
        this.setState({
          ediTableLoading: false,
          ediTableDataSource: result,
        });
      }
    }).catch((error) => {
      message.error(error);
      this.setState({ ediTableLoading: false });
    });
  }

  // 获取点击编辑数据
  fetchOnClickEdiTableData = () => {
    this.setState({ onClickEdiTableLoading: true });
    fetchCustomer({
      limit: 1, // limit: 返回数量限制, 1.5条 | 2.105条
    }).then((response) => {
      const { code, result } = response;
      if (code > 0) {
        this.setState({
          onClickEdiTableLoading: false,
          onClickEdiTableDataSource: result,
        });
      }
    }).catch((error) => {
      message.error(error);
      this.setState({ onClickEdiTableLoading: false });
    });
  }

  /**
   * 编辑数据源
   * @param {number} operationType 操作类型 1.删除 | 2.修改
   * @param {object} record 需要编辑的那条数据 删除时候是id, 修改是是对象
   */
  handleEdiTableUpdate = (record, operationType) => {
    const { ediTableDataSource } = this.state;
    if (operationType === 1) {
      const dataSource = ediTableDataSource.filter(item => item.id !== record);
      this.setState({
        ediTableDataSource: dataSource,
      });
    }
    if (operationType === 2) {
      const index = ediTableDataSource.findIndex(item => item.id === record.id);
      ediTableDataSource.splice(index, 1, record); // 替换修改后的值
      this.setState({ ediTableDataSource });
    }
  }

  /**
   * 编辑数据源
   * @param {number} operationType 操作类型 1.删除 | 2.修改
   * @param {object} record 需要编辑的那条数据 删除时候是id, 修改是是对象
   */
  handleOnClickEdiTableUpdate = (record, operationType) => {
    const { onClickEdiTableDataSource } = this.state;
    if (operationType === 1) {
      const dataSource = onClickEdiTableDataSource.filter(item => item.id !== record);
      this.setState({
        onClickEdiTableDataSource: dataSource,
      });
    }
    if (operationType === 2) {
      const index = onClickEdiTableDataSource.findIndex(item => item.id === record.id);
      onClickEdiTableDataSource.splice(index, 1, record); // 替换修改后的值
      this.setState({ onClickEdiTableDataSource });
    }
  }

  getColumns = () => {
    const statusAry = getDictionary('status');
    const columns = [
      {
        title: '姓名',
        dataIndex: 'username',
        editable: true,
      },
      {
        title: '年龄',
        dataIndex: 'age',
        editable: true,
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
    const { ediTableLoading, ediTableDataSource, onClickEdiTableLoading, onClickEdiTableDataSource } = this.state;
    return (
      <React.Fragment>

        <Card title="可编辑表格(按钮触发)" className={styles.myCard}>
          <EdiTable
            rowKey="id"
            pagination={false}
            loading={ediTableLoading}
            columns={this.getColumns()}
            dataSource={ediTableDataSource}
            handleUpdate={this.handleEdiTableUpdate}
          />
        </Card>

        <Card title="可编辑表格(点击触发)" className={styles.myCard}>
          <OnClickEdiTable
            rowKey="id"
            pagination={false}
            columns={this.getColumns()}
            loading={onClickEdiTableLoading}
            dataSource={onClickEdiTableDataSource}
            handleUpdate={this.handleOnClickEdiTableUpdate}
          />
        </Card>

      </React.Fragment>
    );
  }
}

export default AdvancedTable;
