import React, { Component } from 'react';
import NoFound from '../../../public/assets/404.png';

class Footer extends Component {
  render() {
    return (
      <p style={{ textAlign: 'center' }}><img src={NoFound} alt="" /></p>
    );
  }
}

export default Footer;
