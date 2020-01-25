import React, { Component } from 'react';
import { connect } from 'dva';
import BikeMapComponent from '../../../components/Admin/BikeMap';

class BikeMap extends Component {
  render() {
    const { dispatch, searchFormValue } = this.props;
    return (
      <BikeMapComponent dispatch={dispatch} searchFormValue={searchFormValue} />
    );
  }
}

export default connect(({ orderManageModel }) => ({
  searchFormValue: orderManageModel.searchFormValue,
}))(BikeMap);

