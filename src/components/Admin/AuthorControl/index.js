import React, { Component } from 'react';
import { Card } from 'antd';
import Buttons from './Buttons';
import Datalist from './Datalist';
import styles from '../../../style/common.less';

class AuthorControl extends Component {
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

  // 刷新列表
  reloadTable = (type) => {
    if (this.datalist) {
      this.datalist.reloadTable(type);
    }
  }

  render() {
    const { selectDatas } = this.state;
    return (
      <Card className={styles.myCard}>
        {/* 创建角色,设置权限,角色授权按钮 */}
        <Buttons selectDatas={selectDatas} reloadTable={this.reloadTable} />
        {/* 开通城市按钮和数据列表 */}
        <Datalist getSelectDatas={this.getSelectDatas} ref={(instance) => { this.datalist = instance; }} />
      </Card>
    );
  }
}

export default AuthorControl;
