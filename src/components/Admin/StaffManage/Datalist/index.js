import React, { Component } from 'react';
import Moment from 'moment';
import { message } from 'antd';
import EdiTable from '../../../myComponents/myTable/EdiTable';
import { fetchStaff } from '../../../../services/staff';
import { fetchOperationStatus } from '../../../../services/common';
import { getDictionary } from '../../../../utils/common';

class Datalist extends Component {
  state={
    loading: false,
    dataSource: [], // 表格数据源
    pagination: {
      current: 1,
      pageSize: 7,
      total: 0,
    },
    selectDatas: {
      selectedRowKeys: [],
      selectedRows: [],
    },
  }

  componentDidMount() {
    this.fetchTableData();
  }

  // 获取表格数据
  fetchTableData = (num) => {
    const { pagination } = this.state;
    this.setState({ loading: true });
    fetchStaff({
      type: num + 1,
    }).then((response) => {
      const { code = 0, result = [], total = 0 } = response;
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
    const statusAry = getDictionary('status');
    const columns = [{
      title: 'id',
      dataIndex: 'id',
    }, {
      title: '姓名',
      dataIndex: 'username',
      editable: true,
    }, {
      title: '年龄',
      dataIndex: 'age',
      editable: true,
    }, {
      title: '性别',
      dataIndex: 'sex',
      editable: true,
      render: (text) => { return text.toString() === '1' ? '男' : '女'; },
    }, {
      title: '是否单身',
      dataIndex: 'isSingle',
      editable: true,
      render: (text) => { return text.toString() === '1' ? '是' : '否'; },
    }, {
      title: '状态',
      dataIndex: 'status',
      editable: true,
      render: (text) => {
        let status = text;
        statusAry.forEach((item) => {
          if (item.ibm.toString() === text.toString()) {
            status = item.note;
          }
        });
        return status;
      },
    }, {
      title: '生日',
      dataIndex: 'birthday',
      editable: true,
      render: (text) => { return Moment(text).format('YYYY-MM-DD'); },
    }, {
      title: '联系地址',
      dataIndex: 'address',
      editable: true,
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
  handleSelectChange = (selectedRowKeys, selectedRows) => {
    const { getSelectDatas } = this.props;
    this.setState({
      selectDatas: {
        selectedRowKeys,
        selectedRows,
      },
    }, () => { getSelectDatas({ selectedRowKeys, selectedRows }); });
  }

  /**
   * 编辑数据源
   * @param {number} operationType 操作类型 1.删除 | 2.修改
   * @param {object} record 需要编辑的那条数据 删除时候是id, 修改是是对象
   */
  handleEdiTableUpdate = (record, operationType) => {
    const { dataSource } = this.state;
    if (operationType === 1) {
      const filtedDataSource = dataSource.filter(item => item.id !== record);
      this.setState({
        dataSource: filtedDataSource,
      }, this.handleUpdataSuccess);
    }
    if (operationType === 2) {
      const index = dataSource.findIndex(item => item.id === record.id);
      dataSource.splice(index, 1, record); // 替换修改后的值
      this.setState({ dataSource }, this.handleUpdataSuccess);
    }
  }

  // 修改删除后回调函数
  handleUpdataSuccess = () => {
    fetchOperationStatus({}).then((response) => {
      const { code = 0, note = '' } = response;
      if (code > 0) {
        message.success(note);
      }
    }).catch((error) => {
      message.error(error);
    });
  }

  // 添加完毕后刷新列表(假装自己有数据库)
  reloadTable = (type) => {
    this.fetchTableData(type);
  }

  render() {
    const { loading, dataSource, pagination, selectDatas } = this.state;
    const tableProps = {
      rowKey: 'id',
      loading,
      dataSource,
      columns: this.getColumns(),
      rowSelection: {
        type: 'radio',
        ...selectDatas,
        onChange: this.handleSelectChange,
      },
      pagination: {
        ...pagination,
        total: dataSource.length,
        onChange: this.onPageChange,
        showTotal: () => `共${dataSource.length}条`,
      },
      handleUpdate: this.handleEdiTableUpdate,
    };
    return (
      <EdiTable {...tableProps} />
    );
  }
}

export default Datalist;
