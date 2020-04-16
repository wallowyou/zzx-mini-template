/*
* 此文件用来写全局通用的方法
*/

/*
*判断数据类型函数
*/
export const judgeType = (s) => {
	// 函数返回数据的具体类型
	return Object.prototype.toString.call(s).slice(8,-1);
}

/* 
* 针对微信小程序post不能传递formdata数据封装一个方法，实在不行才使用该方法
*/
export const formdata = (obj = {}) => {
	let result = ''
	for (let name of Object.keys(obj)) {
	  let value = obj[name];
	  result += 
	  '\r\n--XXX' +
	  '\r\nContent-Disposition: form-data; name=\"'+ name +'\"'+ 
	  '\r\n' +
	  '\r\n' + value
	}
	return result + '\r\n--XXX--'
}

/* 
* 时间格式化函数
* 重要提示，微信小程序new Date('2020-04-16')在ios中无法获取时间对象
* 解决方式: 建议将时间都格式化成'2020/04/16 00:00:00'的格式
* 函数示例: formatDate(new Date(), 'YYYY/MM/dd hh:mm:ss')
*/
export const formatDate = (date, fmt) => {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}
const padLeftZero = (str) => {
  return ('00' + str).substr(str.length)
}

/*
*将一个对象装换成形如?key1=value1&key2=value2的形似，用于某些情况下post请求在查询参数上拼接
*/
const formateObjStr = (obj = {}) => {
	let result = '';
	if (obj) {
		for (let key of Object.keys(obj)) {
			result += `${key}=${obj[key]}&`
		}
		result = '?' + result.slice(0,-1);
	}
	return result;
}


