import React, { Component } from 'react';
import { connect } from 'dva';
import CityManageComponent from '../../../components/Admin/CityManage';

class CityManage extends Component {
  render() {
    const { dispatch, searchFormValue } = this.props;
    return (
      <CityManageComponent dispatch={dispatch} searchFormValue={searchFormValue} />
    );
  }
}

export default connect(({ cityManageModel }) => ({
  searchFormValue: cityManageModel.searchFormValue,
}))(CityManage);
