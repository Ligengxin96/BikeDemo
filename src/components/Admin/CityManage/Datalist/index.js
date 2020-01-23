import React, { Component } from 'react';
import { Card, message } from 'antd';
import CrossPageSelectTable from '../../../myComponents/myTable/CrossPageSelectTable';
import OpenCityBtn from './OpenCityBtn';
import { fetchOpenCity } from '../../../../services/cityManage';
import { getDictionary } from '../../../../utils/common';
import styles from '../../../../style/common.less';

class Datalist extends Component {
  state={
    loading: false,
    dataSource: [], // 表格数据源
    pagination: {
      current: 1,
      pageSize: 7,
      total: 0,
    },
  }

  componentDidMount() {
    this.fetchTableData();
  }

  // 获取按钮编辑表格数据
  fetchTableData = (num = 0) => {
    const { pagination } = this.state;
    this.setState({ loading: true });
    fetchOpenCity({
      type: num + 1, // 如果num存在说明是添加后调用的 则展示57条数据,否则展示 56条
    }).then((response) => {
      const { code, result, total } = response;
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
    const userBikeModelAry = getDictionary('userBikeModel');
    const operatingModelAry = getDictionary('operatingModel');
    const authorStatusAry = getDictionary('authorStatus');
    const columns = [{
      title: '城市名称',
      dataIndex: 'cityName',
    }, {
      title: '用车模式',
      dataIndex: 'userBikeModel',
      render: (text) => {
        let userBikeModel = text;
        userBikeModelAry.forEach((item) => {
          if (item.ibm === text) {
            userBikeModel = item.note;
          }
        });
        return userBikeModel;
      },
    }, {
      title: '营运模式',
      dataIndex: 'operatingModel',
      render: (text) => {
        let operatingModel = text;
        operatingModelAry.forEach((item) => {
          if (item.ibm === text) {
            operatingModel = item.note;
          }
        });
        return operatingModel;
      },
    }, {
      title: '授权加盟商',
      dataIndex: 'authorName',
    }, {
      title: '授权加盟状态',
      dataIndex: 'authorStatus',
      render: (text) => {
        let authorStatus = text;
        authorStatusAry.forEach((item) => {
          if (item.ibm === text) {
            authorStatus = item.note;
          }
        });
        return authorStatus;
      },
    }, {
      title: '城市管理员',
      dataIndex: 'cityManage',
      render: (text) => {
        return text.map((item) => { return item.manageName; }).join(',');
      },
    }, {
      title: '城市开通时间',
      dataIndex: 'cityOpenTime',
    }, {
      title: '操作时间',
      dataIndex: 'updateTime',
    }, {
      title: '操作人',
      dataIndex: 'operater',
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
        // 过滤不满足所选条件的数据
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
