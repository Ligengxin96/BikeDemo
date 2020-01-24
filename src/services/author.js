import { myRequest } from '../utils/request';
import getApis from '../utils/api';

const { author: { getRole, getAuthorTree } } = getApis();

// (模拟数据) 获取角色信息
export function fetchRole(payload) {
  const option = {
    url: getRole,
    method: 'post',
    params: payload,
  };
  return myRequest(option);
}

// (模拟数据) 获取角色权限树信息
export function fetchRoleAuthorTree(payload) {
  const option = {
    url: getAuthorTree,
    method: 'post',
    params: payload,
  };
  return myRequest(option);
}

