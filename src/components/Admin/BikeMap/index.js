import React, { Component } from 'react';
import { Map, Polygon, Markers } from 'react-amap';
import { Card, message } from 'antd';
import SearchForm from '../OrderManage/SearchForm';
import { fetchBikePosition, fetchServiceArea } from '../../../services/bike';
import styles from '../../../style/common.less';


class BikeMap extends Component {
  constructor(props) {
    super(props);
    this.mapCenter = { longitude: 116.397428, latitude: 39.90923 }; // 中心点坐标 (如果有需要可以获取登录用户的地址,然后转换为经纬度坐标)
    this.state = {
      total: 0, // 单车数量
      serviceArea: [], // 服务区坐标数据
      bikePosition: [], // 单车坐标数据
    };
  }

  componentDidMount() {
    this.fetchBikeServiceArea();
    this.fetchBikePositionData();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { searchFormValue } = this.props;
    const { searchFormValue: nextValue } = nextProps;
    if (JSON.stringify(searchFormValue) !== JSON.stringify(nextValue)) {
      const { orderStatus, startTime, endTime } = nextValue;
      if (startTime || endTime) {
        this.fetchBikePositionData(3);
      } else {
        this.fetchBikePositionData(orderStatus);
      }
    }
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
  fetchBikePositionData = (type = 0) => {
    fetchBikePosition({
      type,
    }).then((response) => {
      const { code, result, total } = response;
      if (code > 0) {
        this.setState({
          total,
          bikePosition: result,
        });
      }
    }).catch((error) => {
      message.error(error);
    });
  }

  render() {
    const { dispatch } = this.props;
    const { serviceArea, bikePosition, total } = this.state;
    return (
      <React.Fragment>
        {/* 头部搜索栏 */}
        <SearchForm dispatch={dispatch} />
        {/* 地图部分 */}
        <Card title="服务区车辆分布" className={styles.myCard}>
          <h2 style={{ marginButtom: '1rem' }}>共{total}辆车</h2>
          <div style={{ width: '100%', height: '35rem' }} >
            <Map center={this.mapCenter} zoom={13}>
              <Polygon
                path={serviceArea}
                style={{ strokeColor: '#FF33FF', strokeWeight: 6, strokeOpacity: 0.2, fillOpacity: 0.4, fillColor: '#1791fc', zIndex: 50 }}
              />
              <Markers markers={bikePosition} />
            </Map>
          </div>
        </Card>
      </React.Fragment>
    );
  }
}

export default BikeMap;
