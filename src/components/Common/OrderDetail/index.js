import React, { Component } from 'react';
import lodash from 'lodash';
import { Map, Polygon, Marker, Polyline } from 'react-amap';
import { Card, Col, message } from 'antd';
import { fetchOrderDetail } from '../../../services/example';
import { fetchServiceArea, fetchBikeRoute } from '../../../services/bike';
import { getDictionary } from '../../../utils/common';
import styles from '../../../style/common.less';


class OrderDetail extends Component {
  constructor(props) {
    super(props);
    this.mapCenter = { longitude: 116.397428, latitude: 39.90923 }; // 中心点坐标 (如果有需要可以获取登录用户的地址,然后转换为经纬度坐标)
    this.state = {
      serviceArea: [], // 服务区坐标数据
      bikeRoute: [], // 单车坐标数据
      orderDetailInfo: {}, // 订单详情信息
    };
  }

  componentDidMount() {
    this.fetchBikeServiceArea();
    this.fetchBikeRouteData();
    this.fetchOrderDetailData();
  }

  // 获取服务区坐标数据
  fetchBikeServiceArea = () => {
    fetchServiceArea({}).then((response) => {
      const { code, result } = response;
      if (code > 0) {
        this.setState({
          serviceArea: result,
        });
      }
    }).catch((error) => {
      message.error(error);
    });
  }

  // 获取单车坐标数据
  fetchBikeRouteData = (type = 0) => {
    fetchBikeRoute({
      type,
    }).then((response) => {
      const { code, result } = response;
      if (code > 0) {
        this.setState({
          bikeRoute: result,
        });
      }
    }).catch((error) => {
      message.error(error);
    });
  }

  // 获取订单详情数据
  fetchOrderDetailData = () => {
    const { orderId } = this.props;
    if (orderId) {
      fetchOrderDetail({
        orderId,
      }).then((response) => {
        const { data: { code = 0, result = [] } } = response;
        if (code > 0) {
          this.setState({
            orderDetailInfo: result[0],
          });
        }
      }).catch((error) => {
        message.error(error);
      });
    }
  }

  // 查找字典翻译用车模式
  getUserBikeModel = (model) => {
    const userBikeModelAry = getDictionary('userBikeModel');
    let userBikeModel = '--';
    userBikeModelAry.forEach((element) => {
      if (element.ibm === model) {
        userBikeModel = element.note;
      }
    });
    return userBikeModel;
  }

  // 查找字典翻译订单状态
  getOrderStatus = (status) => {
    const orderStatusAry = getDictionary('orderStatus');
    let orderStatus = '--';
    orderStatusAry.forEach((element) => {
      if (element.ibm === status) {
        orderStatus = element.note;
      }
    });
    return orderStatus;
  }

  render() {
    const { serviceArea, bikeRoute, orderDetailInfo } = this.state;
    // react-amap 在github上的如何自定义图标的问题被关闭了一直没有解决,所以这里我也不知道如何自定义图标,如果使用高德官网的原生js 还是可以实现的
    // 问题地址https://github.com/ElemeFE/react-amap/issues/74
    const endPointStyle = {
      background: 'url(\'http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/map-marker-icon.png\')',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      width: '30px',
      height: '40px',
      color: '#000',
      textAlign: 'center',
      lineHeight: '40px',
      marginLeft: '-0.3rem',
      marginTop: '-0.15rem',
    };
    return (
      <React.Fragment>
        {/* 地图部分 */}
        <Card title="骑行路径" className={styles.myCard}>
          <div style={{ width: '100%', height: '35rem' }} >
            <Map center={this.mapCenter} zoom={13}>
              {/* 服务区 */}
              <Polygon path={serviceArea} style={{ strokeColor: '#FF33FF', strokeWeight: 6, strokeOpacity: 0.2, fillOpacity: 0.4, fillColor: '#1791fc', zIndex: 50 }} />

              {/* 行驶路径 */}
              <Polyline path={bikeRoute} style={{ borderWeight: 2, strokeColor: 'red', lineJoin: 'round' }} />

              <Marker position={bikeRoute[0]} title="起点" />
              <Marker position={bikeRoute[bikeRoute.length - 1]} title="终点" >
                <div style={endPointStyle}>{this.state.value}</div>
              </Marker>

            </Map>
          </div>
        </Card>
        <Card title="详细信息" className={styles.myCard}>
          <Col span={12}>
            <div style={{ marginLeft: '5rem', fontSize: '1rem' }}>
              <p><span>用车模式:</span> <span> {this.getUserBikeModel(lodash.get(orderDetailInfo, 'userBikeModel', '0'))}</span></p>
              <p><span>用户姓名:</span> <span> {lodash.get(orderDetailInfo, 'username', '--')}</span></p>
              <p><span>手机号码:</span> <span> {lodash.get(orderDetailInfo, 'phone', '--')}</span></p>
              <p><span>行程起点:</span> <span> {lodash.get(orderDetailInfo, 'startPoint', '--')}</span></p>
              <p><span>行程终点:</span> <span> {lodash.get(orderDetailInfo, 'endPoint', '--')}</span></p>
              <p><span>行驶里程:</span> <span> {lodash.get(orderDetailInfo, 'distance', '--')}KM</span></p>
            </div>
          </Col>
          <Col span={12}>
            <div style={{ marginLeft: '5rem', fontSize: '1rem' }}>
              <p><span>订单编号:</span> <span> {lodash.get(orderDetailInfo, 'orderId', '--')}</span></p>
              <p><span>订单状态:</span> <span> {this.getOrderStatus(lodash.get(orderDetailInfo, 'orderStatus', '0'))}</span></p>
              <p><span>订单金额:</span> <span> {lodash.get(orderDetailInfo, 'shouldPay', '--')}元</span></p>
              <p><span>实付金额:</span> <span> {lodash.get(orderDetailInfo, 'userPay', '--')}元</span></p>
              <p><span>车辆编号:</span> <span> {lodash.get(orderDetailInfo, 'bikeId', '--')}</span></p>
              <p><span>车辆电量:</span> <span> {lodash.get(orderDetailInfo, 'battery', '--')}%</span></p>
            </div>
          </Col>
        </Card>
      </React.Fragment>
    );
  }
}

export default OrderDetail;
