/*
*此函数的作用是根据传入的一个日期，返回这一周的日期或者这一个月的日期，
* 如果是月的话注意还包含上个月和下个月的日期，月的话总共数据有 6 * 7 = 42个
*
*/
/* 
* 时间格式化函数
* 重要提示，微信小程序new Date('2020-04-16')在ios中无法获取时间对象
* 解决方式: 建议将时间都格式化成'2020/04/16 00:00:00'的格式
* 函数示例: formatDate(new Date(), 'YYYY/MM/dd hh:mm:ss')
*/

import calendar from './solar2lunar';

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
export const judgeType = (s) => {
	// 函数返回数据的具体类型
	return Object.prototype.toString.call(s).slice(8,-1);
}
export const equalDate = (d1, d2) => {
	let result = false;
	if (d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate()) {
		result = true;
	}
	return result;
}
/* 比较时间,时间格式为2020-04-04
*/
export const dateEqual = (before, after) => {
	return (new Date(before.replace(/-/g, '/')).getTime() - new Date(after.replace(/-/g, '/')).getTime()) === 0
}

export const gegerateDates = (date = new Date(), type='week') => {
	const result = [];
	if (judgeType(date) === 'Date') {
		// 年，月，日
		const y = date.getFullYear();
		const m = date.getMonth();
		const d = date.getDate();
		const days = new Date(y, m+1, 0).getDate();
		// 获取日期是星期几
		let weekIndex = date.getDay() === 0 ? 7 : date.getDay();
		if (type === 'month') {
			const dobj = new Date(y,m,1);
			weekIndex = dobj.getDay() === 0 ? 7 : dobj.getDay();
		}
		// 视图未展开时一周的天数
		if (type === 'week') {
			for(let i = weekIndex; i >0; i--) {
				const dtemp = new Date(y,m,d);
				dtemp.setDate(dtemp.getDate() - i);
				// 农历的处理
				result.push({
					time: dtemp,
					show: true,
					fullDate: formatDate(dtemp, 'yyyy-MM-dd'),
					// 农历
					lunarDate: calendar.solar2lunar(dtemp.getFullYear(), dtemp.getMonth() + 1, dtemp.getDate()).IDayCn,
					isToday: equalDate(new Date(), dtemp),
					isCurrentMonth: true
				})
			}
			for(let i = 0; i <= 6 - weekIndex; i++) {
				const dtemp = new Date(y,m,d);
				dtemp.setDate(dtemp.getDate() + i);
				result.push({
					time: dtemp,
					show: true,
					fullDate: formatDate(dtemp, 'yyyy-MM-dd'),
					lunarDate: calendar.solar2lunar(dtemp.getFullYear(), dtemp.getMonth() + 1, dtemp.getDate()).IDayCn,
					isToday: equalDate(new Date(), dtemp),
					isCurrentMonth: true
				})
			}
		} else if (type === 'month') { // 视图展开时的天数
			// 上个月(补7天)
			for(let i = weekIndex; i > 0; i--) {
				const dtemp = new Date(y,m,1);
				dtemp.setDate(dtemp.getDate() - i);
				result.push({
					time: dtemp,
					show: true,
					fullDate: formatDate(dtemp, 'yyyy-MM-dd'),
					lunarDate: calendar.solar2lunar(dtemp.getFullYear(), dtemp.getMonth() + 1, dtemp.getDate()).IDayCn,
					isToday: equalDate(new Date(), dtemp),
					isCurrentMonth: false
				});
			}
			// 这个月的日期(有大月31小月30)
			for (let i = 0; i < days; i++) {
				const dtemp = new Date(y,m,1);
				dtemp.setDate(dtemp.getDate() + i);
				result.push({
					time: dtemp,
					show: true,
					fullDate: formatDate(dtemp, 'yyyy-MM-dd'),
					lunarDate: calendar.solar2lunar(dtemp.getFullYear(), dtemp.getMonth() + 1, dtemp.getDate()).IDayCn,
					isToday: equalDate(new Date(), dtemp),
					isCurrentMonth: true
				});
			}
			const len = 42 - result.length;
			// 下个月的日期(补7天)
			for (let i = 1; i <= len;i++) {
				const dtemp = new Date(y,m+1,0);
				dtemp.setDate(dtemp.getDate() + i);
				result.push({
					time: dtemp,
					show: true,
					fullDate: formatDate(dtemp, 'yyyy-MM-dd'),
					lunarDate: calendar.solar2lunar(dtemp.getFullYear(), dtemp.getMonth() + 1, dtemp.getDate()).IDayCn,
					isToday: equalDate(new Date(), dtemp),
					isCurrentMonth: false
				})
			}
		}
	}
	return result;	
}
