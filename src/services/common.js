import { myRequest } from '../utils/request';
import getApis from '../utils/api';

const { common: { operation } } = getApis();

// 单纯提示操作成功
export function fetchOperationStatus(payload) {
  const option = {
    url: operation,
    method: 'post',
    params: payload,
  };
  return myRequest(option);
}
