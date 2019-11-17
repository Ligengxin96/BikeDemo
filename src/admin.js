import React, { Component } from 'react';
import { Row, Col } from 'antd';
import LeftNav from './components/LeftNav';
import Header from './components/Header';
import Content from './components/Content';
import Footer from './components/Footer';
import './style/common.less';

export class Admin extends Component {
    render() {
        return (
            <Row className="container">
                <Col span={3} className="leftNva">
                    <LeftNav />
                </Col>
                <Col span={21} className="main">
                    <Row>  
                        <Col className="header">
                            <Header />
                        </Col>
                        <Col className="context">
                            <Content />
                        </Col>
                        <Col className="footer">
                            <Footer />
                        </Col>
                    </Row>
                </Col>
            </Row>
        )
    }
}

export default Admin;
