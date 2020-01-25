import { myRequest } from '../utils/request';
import getApis from '../utils/api';

const { bike: { getBikePosition, getBikeRoute, getServiceArea } } = getApis();

// (模拟数据) 获取单车位置
export function fetchBikePosition(payload) {
  const option = {
    url: getBikePosition,
    method: 'post',
    params: payload,
  };
  return myRequest(option);
}

// (模拟数据) 获取单车行驶路径
export function fetchBikeRoute(payload) {
  const option = {
    url: getBikeRoute,
    method: 'post',
    params: payload,
  };
  return myRequest(option);
}

// (模拟数据) 获取单车服务区
export function fetchServiceArea(payload) {
  const option = {
    url: getServiceArea,
    method: 'post',
    params: payload,
  };
  return myRequest(option);
}

