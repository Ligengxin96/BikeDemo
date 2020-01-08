import React, { Component } from 'react';
import { Row, Col } from 'antd';
import LeftNav from './components/LeftNav';
import Header from './components/Header';
import Footer from './components/Footer';
import styles from './style/common.less';

class Admin extends Component {
  state={
    menuTitle: <a href="#/home">首页</a>, // 菜单标题
  }

  // 获取当前菜单标题
  getMenuTitle = (menuTitle) => {
    this.setState({ menuTitle });
  }

  render() {
    const { children } = this.props;
    const { menuTitle } = this.state;
    return (
      <Row className={styles.container}>
        <Col span={4} className={styles.leftNva}>
          <LeftNav getMenuTitle={this.getMenuTitle} />
        </Col>
        <Col span={20} className={styles.main}>
          <Header menuTitle={menuTitle} />
          <Row className={styles.content}>
            {children}
          </Row>
          <Footer />
        </Col>
      </Row>
    );
  }
}

export default Admin;
