import React, { Component } from 'react';

class TabPanes extends Component {
  render() {
    const { path } = this.props;
    return (
      <p style={{ fontSize: '1.2rem' }}>我的项目 (当前url: {path})</p>
    );
  }
}

export default TabPanes;
