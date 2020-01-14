import React, { Component } from 'react';
import { connect } from 'dva';
import RegisterFormComponent from '../../../../components/Admin/Forms/Register';

class RegisterForm extends Component {
  render() {
    const { user, dispatch } = this.props;
    return (
      <RegisterFormComponent user={user} dispatch={dispatch} />
    );
  }
}

export default connect(({ userModel }) => ({
  user: userModel.user,
}))(RegisterForm);
