import React, { Component } from 'react';
import { connect } from 'dva';
import OrderManageComponent from '../../components/OrderManage';

class OrderManage extends Component {
  render() {
    const { dispatch, searchFormValue } = this.props;
    return (
      <OrderManageComponent dispatch={dispatch} searchFormValue={searchFormValue} />
    );
  }
}

export default connect(({ orderManageModel }) => ({
  searchFormValue: orderManageModel.searchFormValue,
}))(OrderManage);
