import React, { Component } from 'react';
import LeftNavComponent from '../../components/LeftNav';

class LeftNav extends Component {
  render() {
    const { menuTitle, menuTheme, dispatch } = this.props;
    return (
      <LeftNavComponent menuTitle={menuTitle} menuTheme={menuTheme} dispatch={dispatch} />
    );
  }
}

export default LeftNav;
