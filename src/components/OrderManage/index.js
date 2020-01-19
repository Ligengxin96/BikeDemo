import React, { Component } from 'react';
import SearchForm from './SearchForm';
import Datalist from './Datalist';

class OrderManage extends Component {
  render() {
    const { searchFormValue, openCityFormValue, dispatch } = this.props;
    return (
      <React.Fragment>
        {/* 头部搜索栏 */}
        <SearchForm dispatch={dispatch} />
        {/* 开通城市按钮和数据列表 */}
        <Datalist searchFormValue={searchFormValue} openCityFormValue={openCityFormValue} />
      </React.Fragment>
    );
  }
}

export default OrderManage;
