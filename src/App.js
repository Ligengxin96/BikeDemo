import React, { Component } from 'react';

class App extends Component {
  render() {
    const { children } = this.props;
    return (
      <>
        { children }
      </>
    );
  }
}

export default App;
