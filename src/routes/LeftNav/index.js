import React, { Component } from 'react';
import LeftNavComponent from '../../components/LeftNav';

class LeftNav extends Component {
  render() {
    const { dispatch } = this.props;
    return (
      <LeftNavComponent dispatch={dispatch} />
    );
  }
}

export default LeftNav;
