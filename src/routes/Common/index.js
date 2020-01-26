import React, { Component } from 'react';
import { Row, Col } from 'antd';
import Header from '../Header';
import styles from '../../style/common.less';

class Common extends Component {
  render() {
    const { children, dispatch, userModel, menuTitle = { title: '订单详情' } } = this.props;
    return (
      <Row className={styles.container}>
        <Col span={24} className={styles.main}>
          {/* 头部组件部分 */}
          <Header dispatch={dispatch} userModel={userModel} menuTitle={menuTitle} />
          <Row className={styles.content}>
            {/* 中间内容部分 */}
            {children}
          </Row>
        </Col>
      </Row>
    );
  }
}

export default Common;
