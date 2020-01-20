import React, { Component } from 'react';
import { connect } from 'dva';
import HeaderComponent from '../../components/Header';

class Header extends Component {
  render() {
    const { dispatch, userModel, menuTitle } = this.props;
    return (
      <HeaderComponent dispatch={dispatch} userModel={userModel} menuTitle={menuTitle} />
    );
  }
}

// state里面保存着所有Model的state数据
// 所以可以通过解构的方式来提取单独的一个Model的state
// 或者也可以使用export default下面这个方法
const mapStateToProps = (state) => {
  return {
    userModel: state.userModel,
  };
};

export default connect(mapStateToProps)(Header);

// 这种方法是通过解构的方式来获取单独的userModel
// 然后直接获取userModel里面state里面的user属性
// export default connect(({ userModel }) => ({
//   user: userModel.user,
// }))(Header);
