import React, { Component } from 'react';
import { connect } from 'dva';
import HeaderComponent from '../../components/Header';

class Header extends Component {
  render() {
    const { dispatch, userModel } = this.props;
    return (
      <HeaderComponent dispatch={dispatch} userModel={userModel} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userModel: state.userModel,
  };
};

export default connect(mapStateToProps)(Header);
