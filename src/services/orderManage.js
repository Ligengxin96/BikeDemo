import { myRequest } from '../utils/request';
import getApis from '../utils/api';

const { orderManage: { getOrderList } } = getApis();

// (模拟数据) 获取订单列表
export function fetchOrderList(payload) {
  const option = {
    url: getOrderList,
    method: 'post',
    params: payload,
  };
  return myRequest(option);
}
