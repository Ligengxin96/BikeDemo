import React, { Component } from 'react';
import Moment from 'moment';
import { connect } from 'dva';
import { Row, Col, Divider, message } from 'antd';

const axios = require('axios');

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: null, // 定时器ID
      time: '--', // 当前时间
    };
  }

  UNSAFE_componentWillMount() {
    this.fetchUser();
    const timer = setInterval(() => {
      const time = Moment().format('YYYY-MM-DD HH:mm:ss'); // 获取当前时间
      this.setState({ timer, time });
    }, 1000);
  }

  componentDidMount() {
    setTimeout(() => {
      const { user: { users: { city = '北京' } } } = this.props;
      this.fetchWeather(city);
    }, 300);
  }


  componentWillUnmount() {
    const { timer } = this.state;
    clearInterval(timer); // 清理定时器
  }

  // 获取模拟的用户数据
  fetchUser = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/fetchUser',
    });
  }

  // 获取用户所在城市天气
  fetchWeather = (city) => {
    axios({
      method: 'GET',
      url: `https://free-api.heweather.net/s6/weather/now?location=${city}&key=0aed2b33817345f6b949b560aa26b1f5`,
    }).then((response) => {
      const { data: { HeWeather6 = [] } } = response;
      if (HeWeather6.length > 0) {
        const { now = {} } = HeWeather6[0];
        const { cond_txt = '--' } = now;
        this.setState({ weather: cond_txt });
      }
    }).catch((error) => {
      message.error(error);
    });
  }

  render() {
    const { time, weather } = this.state;
    const { menuTitle = '首页', user: { users: { city = '北京', name } } } = this.props;
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
            <p style={{ fontSize: '1.2rem', marginLeft: '-8rem', position: 'relative', textAlign: 'center' }} >{menuTitle}
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

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Header);
