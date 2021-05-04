import axios from 'axios'
import qs from 'qs'

export const Axios = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 10000,
  // headers: {'X-Custom-Header': 'foobar'}
});
function resolveGetMethod (inst) {
  const origGetMethod = inst.get

  inst.get = function (url, params, config = {}) {
    config = {
      params,
      ...config
    }
    return origGetMethod(url, config)
  }
}
resolveGetMethod(Axios)
Axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  config.transformRequest = [
    function (data, headers) {
      return qs.stringify(data)
    }
  ]
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});
export default axios