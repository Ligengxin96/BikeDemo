import React, { Component } from 'react';
import { connect } from 'dva';
import RegisterFormComponent from '../../../../components/Admin/Forms/Register';

class RegisterForm extends Component {
  render() {
    const { user, dispatch, dictionary } = this.props;
    return (
      <RegisterFormComponent user={user} dispatch={dispatch} dictionary={dictionary} />
    );
  }
}

export default connect(({ userModel, globalModel }) => ({
  user: userModel.user,
  dictionary: globalModel.dictionary,
}))(RegisterForm);
