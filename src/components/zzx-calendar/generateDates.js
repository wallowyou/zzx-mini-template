/*
*此函数的作用是根据传入的一个日期，返回这一周的日期或者这一个月的日期，
* 如果是月的话注意还包含上个月和下个月的日期，月的话总共数据有 6 * 7 = 42个
*
*/
export const judgeType = (s) => {
	// 函数返回数据的具体类型
	return Object.prototype.toString.call(s).slice(8,-1);
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
		if (type === 'week') {
			for(let i = weekIndex - 1; i >0; i--) {
				const dtemp = new Date(y,m,d);
				dtemp.setDate(dtemp.getDate() - i);
				result.push({
					time: dtemp,
					show: true
				})
			}
			for(let i = 0; i <= 7 - weekIndex; i++) {
				const dtemp = new Date(y,m,d);
				dtemp.setDate(dtemp.getDate() + i);
				result.push({
					time: dtemp,
					show: true
				})
			}
		} else if (type === 'month') {
			// 上个月
			for(let i = weekIndex - 1; i > 0; i--) {
				const dtemp = new Date(y,m,1);
				dtemp.setDate(dtemp.getDate() - i);
				result.push({
					time: dtemp,
					show: false
				});
			}
			// 这个月的日期
			for (let i = 0; i < days; i++) {
				const dtemp = new Date(y,m,1);
				dtemp.setDate(dtemp.getDate() + i);
				result.push({
					time: dtemp,
					show: true
				});
			}
			const len = 42 - result.length;
			// 下个月的日期
			for (let i = 1; i <= len;i++) {
				const dtemp = new Date(y,m+1,0);
				dtemp.setDate(dtemp.getDate() + i);
				result.push({
					time: dtemp,
					show: false
				})
			}
		}
	}
	return result;	
}
