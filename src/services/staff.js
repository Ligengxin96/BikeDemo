import { myRequest } from '../utils/request';
import getApis from '../utils/api';

const { staff: { getStaff, getStaffCode } } = getApis();

// (模拟数据) 获取员工信息
export function fetchStaff(payload) {
  const option = {
    url: getStaff,
    method: 'post',
    params: payload,
  };
  return myRequest(option);
}

// (模拟数据) 获取员工编号
export function fetchStaffCode(payload) {
  const option = {
    url: getStaffCode,
    method: 'post',
    params: payload,
  };
  return myRequest(option);
}
