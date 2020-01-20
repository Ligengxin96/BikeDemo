import React, { Component } from 'react';
import { Row, Col } from 'antd';
import LeftNav from './components/LeftNav';
import Header from './components/Header';
import Footer from './components/Footer';
import './style/common.less';

class Admin extends Component {
  state={
    menuTitle: '首页', // 菜单标题
  }

  // 获取当前菜单标题
  getMenuTitle = (menuTitle) => {
    this.setState({ menuTitle });
  }

  render() {
    const { children } = this.props;
    const { menuTitle } = this.state;
    return (
      <Row className="container">
        <Col span={3} className="leftNva">
          <LeftNav getMenuTitle={this.getMenuTitle} />
        </Col>
        <Col span={21} className="main">
          <Row>
            <Col className="header">
              <Header menuTitle={menuTitle} />
            </Col>
            <Col className="border">
              { children }
            </Col>
            <Col className="footer">
              <Footer />
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default Admin;
