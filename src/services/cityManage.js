import { myRequest } from '../utils/request';
import getApis from '../utils/api';

const { cityManage: { getOpenCity } } = getApis();

// (模拟数据) 获取开通城市
export function fetchOpenCity(payload) {
  const option = {
    url: getOpenCity,
    method: 'post',
    params: payload,
  };
  return myRequest(option);
}
