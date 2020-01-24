import React, { Component } from 'react';
import CreateRoleBtn from './CreateRoleBtn';
import SetAuthorBtn from './SetAuthorBtn';
import SetRoleAuthorBtn from './SetRoleAuthorBtn';
import styles from '../../../../style/common.less';

class Buttons extends Component {
  render() {
    const { selectDatas: { selectedRows = [] }, reloadTable } = this.props;
    return (
      <div className={styles.btnList} style={{ marginBottom: '1rem' }}>
        {/* 创建角色按钮 */}
        <CreateRoleBtn reloadTable={reloadTable} />
        {/* 设置权限按钮 */}
        <SetAuthorBtn selectedRows={selectedRows} />
        {/* 用户授权按钮 */}
        <SetRoleAuthorBtn selectedRows={selectedRows} />
      </div>
    );
  }
}
export default Buttons;
