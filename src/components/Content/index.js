import React, { Component } from 'react';
import styles from './index.less';

class Content extends Component {
  render() {
    return (
      <div className={styles.home}>
        <p style={{ fontSize: '1.333rem' }}>欢迎使用MyBike后台管理系统</p>
      </div>
    );
  }
}

export default Content;
