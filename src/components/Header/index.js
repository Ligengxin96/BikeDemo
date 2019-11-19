import React, { Component } from 'react';
import Moment from 'moment';
import { Row, Col, Divider } from 'antd';

const axios = require('axios');

class Header extends Component {
  state={
    timer: null, // 定时器ID
    time: '--', // 当前时间
  }

  componentWillMount() {
    // 获取当前时间
    const timer = setInterval(() => {
      const time = Moment().format('YYYY-MM-DD HH:mm:ss');
      this.setState({ timer, time });
    }, 1000);
    // 获取当前天气
    axios({
      method: 'GET',
      url: 'https://weatherbit-v1-mashape.p.rapidapi.com/current',
      headers: {
        'content-type': 'application/octet-stream',
        'x-rapidapi-host': 'weatherbit-v1-mashape.p.rapidapi.com',
        'x-rapidapi-key': '9518a4c3d8msh4f36a632edcc6e5p133bfbjsn8ef4f2d91ece',
      },
      params: {
        lang: 'cn',
        lon: '104.07',
        lat: '30.67',
      },
    }).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    });
  }

  componentWillUnmount() {
    const { timer } = this.state;
    clearInterval(timer); // 清理定时器
  }

  render() {
    const { time } = this.state;
    return (
      <>
        <Row>
          <Col>
            <div style={{ lineHeight: '3rem', display: 'flex', fontSize: '1.2rem', float: 'right' }}>
              <p>欢迎你,快乐风男</p>
              <a style={{ padding: '0 1rem' }}>退出</a>
            </div>
          </Col>
        </Row>
        <Divider style={{ margin: '0' }} />
        <Row>
          <Col span={4}>
            <p style={{ lineHeight: '3rem', fontSize: '1.2rem', marginLeft: '2rem' }}>首页</p>
          </Col>
          <Col span={20}>
            <div style={{ lineHeight: '3rem', display: 'flex', fontSize: '1.2rem', float: 'right', marginRight: '1rem' }}>
              <p style={{ marginRight: '1rem' }}>{time}</p>
              <p>晴转多云</p>
            </div>
          </Col>
        </Row>
      </>
    );
  }
}

export default Header;
