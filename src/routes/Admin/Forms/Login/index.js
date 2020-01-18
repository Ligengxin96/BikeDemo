import React, { Component } from 'react';
import { connect } from 'dva';
import LoginFormComponent from '../../../../components/Admin/Forms/Login';

class LoginForm extends Component {
  render() {
    const { user, registerInfo, dispatch } = this.props;
    return (
      <LoginFormComponent user={user} registerInfo={registerInfo} dispatch={dispatch} />
    );
  }
}

export default connect(({ userModel }) => ({
  user: userModel.user,
  registerInfo: userModel.registerInfo,
}))(LoginForm);
