import React, { Component } from 'react';
import Moment from 'moment';
import { Row, Col, Divider, message } from 'antd';

const axios = require('axios');

class Header extends Component {
  state={
    timer: null, // 定时器ID
    time: '--', // 当前时间
    weather: {}, // 当前天气
  }

  UNSAFE_componentWillMount() {
    // 获取当前时间
    const timer = setInterval(() => {
      const time = Moment().format('YYYY-MM-DD HH:mm:ss');
      this.setState({ timer, time });
    }, 1000);
    // 获取当前天气
    axios({
      method: 'GET',
      url: 'https://free-api.heweather.net/s6/weather/now?location=成都&key=0aed2b33817345f6b949b560aa26b1f5',
    }).then((response) => {
      const { data: { HeWeather6 = [] } } = response;
      if (HeWeather6.length > 0) {
        const { now = '' } = HeWeather6[0];
        this.setState({ weather: now });
      }
    }).catch((error) => {
      message.error(!error.success ? error.message : error.note);
    });
  }

  componentWillUnmount() {
    const { timer } = this.state;
    clearInterval(timer); // 清理定时器
  }

  render() {
    const { menuTitle = '首页' } = this.props;
    const { time, weather: { cond_txt } } = this.state;
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
            <span style={{ lineHeight: '3rem', fontSize: '1.2rem', marginLeft: '2rem' }}>{menuTitle}</span>
          </Col>
          <Col span={20}>
            <div style={{ lineHeight: '2rem', display: 'flex', fontSize: '1.2rem', float: 'right', marginRight: '1rem' }}>
              <p style={{ marginRight: '1rem' }}>{time}</p>
              <p>{cond_txt}</p>
            </div>
          </Col>
        </Row>
      </>
    );
  }
}

export default Header;
