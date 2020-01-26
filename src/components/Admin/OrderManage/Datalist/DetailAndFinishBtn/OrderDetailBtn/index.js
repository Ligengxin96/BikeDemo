import React, { Component } from 'react';
import { Button, message } from 'antd';
import lodash from 'lodash';
import { Base64 } from 'js-base64';

class OrderDetailBtn extends Component {
 // 订单详情按钮点击事件
 handleOpenModal = (selectedRows) => {
   if (selectedRows.length > 0) {
     window.open(`/#/common/orderDetail/${Base64.encode(lodash.get(selectedRows, '[0].id', ''))}`, '_blank');
   } else {
     message.info('请选择一个订单');
   }
 }

 render() {
   const { selectedRows = [] } = this.props;
   return (
     <Button type="primary" onClick={() => this.handleOpenModal(selectedRows)}>订单详情</Button>
   );
 }
}

export default OrderDetailBtn;
