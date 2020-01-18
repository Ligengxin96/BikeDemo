import React, { Component } from 'react';
import { Link } from 'dva/router';
import lodash from 'lodash';
import Moment from 'moment';
import { Row, Col, Divider, message } from 'antd';

const axios = require('axios');

class Header extends Component {
  state = {
    timer: null, // 定时器ID
    time: '--', // 当前时间
  };

  UNSAFE_componentWillMount() {
    this.fetchUserInformation();
    const timer = setInterval(() => {
      const time = Moment().format('YYYY-MM-DD HH:mm:ss'); // 获取当前时间
      this.setState({ timer, time });
    }, 1000);
  }

  componentDidMount() {
    setTimeout(() => {
      const city = lodash.get(this.props, 'userModel.user.city', '北京');
      this.fetchWeather(city);
    }, 300);
  }


  componentWillUnmount() {
    const { timer } = this.state;
    clearInterval(timer); // 清理定时器
  }

  // 获取模拟的用户数据
  fetchUserInformation = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'userModel/fetchUserInformation',
    });
  }

  // 获取用户所在城市天气
  fetchWeather = (city) => {
    axios({
      method: 'GET',
      url: `https://restapi.amap.com/v3/weather/weatherInfo?city=${city}&key=6bfd6741f71e7f3d12bdbd56ca4019ed`,
    }).then((response) => {
      const weather = lodash.get(response, 'data.lives[0].weather', '--');
      this.setState({ weather });
    }).catch((error) => {
      message.error(error.message);
    });
  }

  render() {
    const { time, weather } = this.state;
    const { url = '/home', title = '首页' } = lodash.get(this.props, 'menuTitle', {});
    const { city = '北京', name } = lodash.get(this.props, 'userModel.user', {});
    return (
      <div style={{ backgroundColor: '#fff' }}>
        <Row>
          <Col>
            <div style={{ display: 'flex', fontSize: '1.2rem', float: 'right' }}>
              <p>欢迎你,{name}</p>
              <a style={{ padding: '0 1rem' }}>退出</a>
            </div>
          </Col>
        </Row>
        <Divider style={{ margin: '0' }} />
        <Row>
          <Col span={4}>
            <p style={{ fontSize: '1.2rem', marginLeft: '-8rem', position: 'relative', textAlign: 'center' }} ><Link to={url}>{title}</Link>
              <div style={{ borderTop: '9px solid #fff', borderLeft: '12px solid transparent', borderRight: '12px solid transparent', top: '3.2rem', left: '47%', position: 'absolute', zIndex: 99 }} />
            </p>
          </Col>
          <Col span={20}>
            <div style={{ lineHeight: '2rem', display: 'flex', fontSize: '1.2rem', float: 'right', marginRight: '1rem' }}>
              <p style={{ marginRight: '1rem' }}>{time}</p>
              <p>当前所在: {city}&nbsp;{weather}</p>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Header;
