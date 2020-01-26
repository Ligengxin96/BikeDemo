import request from '../utils/request';

export function fetchUser() {
  return request('/api/user');
}

export function fetchOrderList() {
  return request('/api/order');
}

export function fetchOrderDetail() {
  return request('/api/orderDetail');
}
