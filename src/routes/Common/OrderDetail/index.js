import React, { Component } from 'react';
import lodash from 'lodash';
import { Base64 } from 'js-base64';
import OrderDetailComponent from '../../../components/Common/OrderDetail';

class OrderDetail extends Component {
  render() {
    const params = lodash.get(this.props, 'match.params.orderId', '');
    const orderId = params ? JSON.parse(Base64.decode(params)) : '';
    return (
      <OrderDetailComponent orderId={orderId} />
    );
  }
}

export default OrderDetail;

