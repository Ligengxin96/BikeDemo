import React, { Component } from 'react';
import CreateStaffBtn from './CreateStaffBtn';
import StaffDetailBtn from './StaffDetailBtn';
import styles from '../../../../style/common.less';

class CreateAndDetailBtn extends Component {
  render() {
    const { selectDatas: { selectedRows = [] }, reloadTable } = this.props;
    return (
      <div className={styles.btnList} style={{ marginBottom: '1rem' }}>
        {/* 创建员工按钮 */}
        <CreateStaffBtn selectedRows={selectedRows} reloadTable={reloadTable} />
        {/* 员工详细按钮 */}
        <StaffDetailBtn selectedRows={selectedRows} />
      </div>
    );
  }
}
export default CreateAndDetailBtn;
