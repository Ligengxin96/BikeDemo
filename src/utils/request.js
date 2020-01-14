import fetch from 'dva/fetch';
import lodash from 'lodash';
import axios from 'axios';
import qs from 'querystring';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function handleHeaders(options) {
  const headers = options.headers = options.headers ? options.headers : {}; // eslint-disable-line
  const defaultHeaders = {
    'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
  };
  options.headers = Object.assign({}, defaultHeaders, headers); // eslint-disable-line

  if (options.method === 'post') {
    let body = options.body ? options.body : {};
    body = qs.stringify(body);
    options.body = body; // eslint-disable-line
  }
}


/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options = {}) {
  // get
  if (!options.method) {
    url += `?${qs.stringify(options.params)}`; // eslint-disable-line
  }
  // 处理头部
  handleHeaders(options);

  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({ data }))
    .catch(err => ({ err }));
}

/**
 * 自己简单封装的请求,考虑的情况很少,只为请求模拟数据
 */
export function myRequest(options) {
  const { url = '', params = {}, method = 'post' } = options;
  const baseURL = 'https://mock.yonyoucloud.com/mock/3501/myBike/api';
  return new Promise((resolve, reject) => {
    axios({
      url,
      baseURL,
      method,
      params,
      timeout: 10000,
    }).then((response) => {
      const { code = 0, note = '', result = [] } = lodash.get(response, 'data', {});
      if (lodash.get(response, 'status', '') === 200) {
        if (code > 0) {
          resolve({ code, note, result });
        } else {
          reject(note);
        }
      } else {
        reject(note);
      }
    }).catch((error) => {
      const note = '网络异常';
      console.info('error', error); // eslint-disable-line
      // reject(error);
      reject(note);
    });
  });
}
