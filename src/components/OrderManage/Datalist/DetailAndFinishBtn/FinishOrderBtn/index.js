import React, { Component } from 'react';
import { Button } from 'antd';

class FinishOrderBtn extends Component {
  render() {
    const { selectedRowKeys = [], reloadTable } = this.props;
    return (
      <Button type="primary" onClick={this.showFinishOrderConfirm}>结束订单</Button>
    );
  }
}

export default FinishOrderBtn;
