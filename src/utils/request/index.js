/*
* 此文件也可以当作是一个请求实例的全局配置，然后将实例化之后的http导出，就可以在其他文件导入http,将请求模块化，单例模式
* 也可以同时存在多个实例
*/
import Request from './request';
// 创建一个实例，实例配置
const baseUrl = process.env.NODE_ENV === 'development' ?  'http://localhost:8090' : 'https://property.wallowyou.cn:5449/'
const http = new Request()
http.setConfig((config) => { /* 设置全局配置 */
  config.baseUrl = baseUrl /* 根域名不同 */
  config.header = {
    ...config.header
  }
  return config
})

/**
 * 自定义验证器，如果返回true 则进入响应拦截器的响应成功函数(resolve)，否则进入响应拦截器的响应错误函数(reject)
 * @param { Number } statusCode - 请求响应体statusCode（只读）
 * @return { Boolean } 如果为true,则 resolve, 否则 reject
 */
http.validateStatus = (statusCode) => {
  return statusCode === 200
}

http.interceptor.request((config, cancel) => { /* 请求之前拦截器 */
  /*  请求需要添加token，但是登录请求不需要，
  *   为了不需要单独为登录请求单独增加一个实例
  *   可以在此处判断是否是登录请求，如果不是登录请求那么就在请求头部增加Authorization
  */
 // 此处根据业务实际需要编写请求拦截器
 // if (config.url !== '/api/authenticate') {
	//  let token = uni.getStorageSync('token');
	//  if (!token) {
	// 	 // token不存在此时
	//    cancel('token 不存在')
	//  }
	//  config.header = {
	//   ...config.header,
	//   Authorization: 'Bearer ' + token
	// }
 // } else {
	//  config.header = {
	// 	 ...config.header
	//  };
 // }
  return config
})

http.interceptor.response((response) => { /* 请求之后拦截器 */
  return response
}, (response) => { // 请求错误做点什么
  return response
})
/*
	以下为请求各个api请求方法,之后专门导出
*/
// 测试
const test = () => {
	return http.get('/api/test')
}

export default { 
  baseUrl,
  test
}

