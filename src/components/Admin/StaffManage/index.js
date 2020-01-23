import React, { Component } from 'react';
import { Card } from 'antd';
import CreateAndDetailBtn from './CreateAndDetailBtn';
import Datalist from './Datalist';
import styles from '../../../style/common.less';

class StaffManage extends Component {
  state={
    selectDatas: {
      selectedRowKeys: [],
      selectedRows: [],
    },
  }

  // 勾选框选择后回调
  getSelectDatas = (selectDatas) => {
    this.setState({ selectDatas });
  }

  render() {
    const { selectDatas } = this.state;
    return (
      <Card className={styles.myCard}>
        {/* 创建员工和员工详情按钮 */}
        <CreateAndDetailBtn selectDatas={selectDatas} />
        {/* 开通城市按钮和数据列表 */}
        <Datalist getSelectDatas={this.getSelectDatas} />
      </Card>
    );
  }
}

export default StaffManage;
