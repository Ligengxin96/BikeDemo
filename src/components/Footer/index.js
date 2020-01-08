import React, { Component } from 'react';
import styles from './index.less';


class Footer extends Component {
  render() {
    return (
      <div className={styles.footer}>
        <p style={{ fontSize: '1.2rem' }}>©Ligengxin96@gmail.com 版权所有</p>
      </div>
    );
  }
}

export default Footer;
