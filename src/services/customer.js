import { myRequest } from '../utils/request';
import getApis from '../utils/api';

const { customer: { getCustomer } } = getApis();

// (模拟数据) 获取客户信息
export function fetchCustomer(payload) {
  const option = {
    url: getCustomer,
    method: 'post',
    params: payload,
  };
  return myRequest(option);
}
