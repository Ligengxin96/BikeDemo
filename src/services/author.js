import { myRequest } from '../utils/request';
import getApis from '../utils/api';

const { author: { getRole } } = getApis();

// (模拟数据) 获取角色信息
export function fetchRole(payload) {
  const option = {
    url: getRole,
    method: 'post',
    params: payload,
  };
  return myRequest(option);
}

