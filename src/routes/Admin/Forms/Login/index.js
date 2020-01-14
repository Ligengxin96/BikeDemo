import React, { Component } from 'react';
import { connect } from 'dva';
import LoginFormComponent from '../../../../components/Admin/Forms/Login';

class LoginForm extends Component {
  render() {
    const { user, dispatch } = this.props;
    return (
      <LoginFormComponent user={user} dispatch={dispatch} />
    );
  }
}

export default connect(({ userModel }) => ({
  user: userModel.user,
}))(LoginForm);
