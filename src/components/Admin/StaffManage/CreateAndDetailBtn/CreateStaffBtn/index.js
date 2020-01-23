import React, { Component } from 'react';
import { Button } from 'antd';

class OrderDetailBtn extends Component {
  render() {
    return (
      <Button type="primary" onClick={this.handleOpenModal}>创建员工</Button>
    );
  }
}

export default OrderDetailBtn;
