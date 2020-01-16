import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';
import LeftNav from './routes/LeftNav';
import Header from './routes/Header';
import Footer from './routes/Footer';
import styles from './style/common.less';

class Admin extends Component {
  render() {
    const { children, dispatch, menuTitle, menuTheme } = this.props;
    return (
      <Row className={styles.container}>
        <Col span={4} className={styles.leftNva} style={{ backgroundColor: menuTheme === 'dark' ? '#001529' : '#FFFFFF' }} >
          {/* 左侧菜单栏部分 */}
          <LeftNav menuTitle={menuTitle} menuTheme={menuTheme} dispatch={dispatch} />
        </Col>
        <Col span={20} className={styles.main}>
          {/* 头部组件部分 */}
          <Header menuTitle={menuTitle} />
          <Row className={styles.content}>
            {/* 中间内容部分 */}
            {children}
          </Row>
          {/* 页脚组件部分 */}
          <Footer />
        </Col>
      </Row>
    );
  }
}

export default connect(({ leftNavModel }) => ({
  menuTitle: leftNavModel.menuTitle,
  menuTheme: leftNavModel.menuTheme,
}))(Admin);
