import React, { Component } from 'react';
import CreateRoleBtn from './CreateRoleBtn';
import SetAuthorBtn from './SetAuthorBtn';
import SetRoleAuthorBtn from './SetRoleAuthorBtn';
// import SetRoleAuthorBtn2 from './SetRoleAuthorBtn2';
import styles from '../../../../style/common.less';

class Buttons extends Component {
  render() {
    const { selectDatas: { selectedRows = [] }, reloadTable } = this.props;
    return (
      <div className={styles.btnList} style={{ marginBottom: '1rem' }}>
        {/* 创建角色按钮 */}
        <CreateRoleBtn reloadTable={reloadTable} />
        {/* 设置权限按钮 */}
        <SetAuthorBtn selectedRows={selectedRows} reloadTable={reloadTable} />
        {/* 用户授权按钮 */}
        <SetRoleAuthorBtn selectedRows={selectedRows} reloadTable={reloadTable} />
        {/* 测试分页穿梭框组件 */}
        {/* <SetRoleAuthorBtn2 selectedRows={selectedRows} reloadTable={reloadTable} /> */}
      </div>
    );
  }
}
export default Buttons;
