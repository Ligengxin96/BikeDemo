import React, { Component } from 'react';
import OrderDetailBtn from './OrderDetailBtn';
import FinishOrderBtn from './FinishOrderBtn';
import styles from '../../../../../style/common.less';

class DetailAndFinish extends Component {
  render() {
    const { selectedRows = [], reloadTable } = this.props;
    return (
      <div className={styles.btnList} style={{ marginBottom: '1rem' }}>
        {/* 订单详细按钮 */}
        <OrderDetailBtn selectedRows={selectedRows} />
        {/* 结束订单按钮 */}
        <FinishOrderBtn selectedRows={selectedRows} reloadTable={reloadTable} />
      </div>
    );
  }
}
export default DetailAndFinish;
