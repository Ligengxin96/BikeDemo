import React, { Component } from 'react';
import OrderDetailBtn from './OrderDetailBtn';
import FinishOrderBtn from './FinishOrderBtn';
import styles from '../../../../style/common.less';

class DetailAndFinish extends Component {
  render() {
    const { selectedRowKeys = [], reloadTable } = this.props;
    return (
      <div className={styles.btnList} style={{ marginBottom: '1rem' }}>
        {/* 订单详细按钮 */}
        <OrderDetailBtn selectedRowKeys={selectedRowKeys} />
        {/* 结束订单按钮 */}
        <FinishOrderBtn selectedRowKeys={selectedRowKeys} reloadTable={reloadTable} />
      </div>
    );
  }
}
export default DetailAndFinish;
