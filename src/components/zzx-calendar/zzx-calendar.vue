<template>
	<view class="zzx-calendar">
		<view class="calendar-heander">
				{{timeStr}}
			<view class="back-today" @click="goback" v-if="showBack">
				返回今日
			</view>
		</view>
		<view class="calendar-weeks">
			<view class="calendar-week" v-for="(week, index) in weeks" :key="index">
				{{week}}
			</view>
		</view>
		<view class="calendar-content">
		   <swiper class="calendar-swiper" :style="{
			   width: '100%',
			   height: sheight
		   }" :indicator-dots="false" :autoplay="false" :duration="duration" :current="current" @change="changeSwp" :circular="true">
				<swiper-item class="calendar-item" v-for="sitem in swiper" :key="sitem">
					<view class="calendar-days">
						<template v-if="sitem === current">
							<view class="calendar-day" v-for="(item,index) in days" :key="index"
							:class="{
								'day-hidden': !item.show
							}" @click="clickItem(item)">
							<view
								class="date"
								:class="[
									item.isToday ? todayClass : '',
									item.fullDate === selectedDate ? checkedClass : ''
									]"
							>
							{{item.time.getDate()}}
							</view>
							<view class="dot-show" v-if="item.info" :style="dotStyle">		
							</view>
							</view>
						</template>
						<template v-else>
							<template v-if="current - sitem === 1 || current-sitem ===-2">
								<view class="calendar-day" v-for="(item,index) in predays" :key="index"
									:class="{
										'day-hidden': !item.show
									}">
									<view
										class="date"
										:class="[
											item.isToday ? todayClass : ''
											]"
									>
									{{item.time.getDate()}}
									</view>
								</view>
							</template>
							<template v-else>
								<view class="calendar-day" v-for="(item,index) in nextdays" :key="index"
									:class="{
										'day-hidden': !item.show
									}">
									<view
										class="date"
										:class="[
											item.isToday ? todayClass : ''
											]"
									>
									{{item.time.getDate()}}
									</view>
								</view>
							</template>
							
						</template>
					</view>				
				</swiper-item>			
			</swiper>
			<view class="mode-change" @click="changeMode">
				<view :class="weekMode ? 'mode-arrow-bottom' : 'mode-arrow-top'">	
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {gegerateDates, dateEqual,formatDate} from './generateDates.js';
	export default {
		props: {
			duration: {
				type: Number,
				default: 500
			},
			dotList: {
				type: Array, /// 打点日期列表
				default() {
					return [
					]
				}
			},
			showBack: {
				type: Boolean, // 是否返回今日
				default: false
			},
			todayClass: {
				type: String, // 今日的自定义样式class
				default: 'is-today'
			},
			checkedClass: {
				type: String, // 选中日期的样式class
				default: 'is-checked'
			},
			dotStyle: {
				type: Object, // 打点日期的自定义样式
				default() {
					return {
						background: '#c6c6c6'
					}
				}
			}
		},
		watch:{
			dotList: function(newvalue){
				this.initDate(new Date(this.currentYear, this.currentMonth-1, this.currentDate));
			}
		},
		computed: {
			sheight() {
				// 根据年月判断有多少行
				// 判断该月有多少天
				let h = '70rpx';
				if (!this.weekMode) {
					const d = new Date(this.currentYear, this.currentMonth, 0);
					const days = d.getDate(); // 判断本月有多少天
					let day = new Date(d.setDate(1)).getDay();
					if (day === 0) {
						day = 7;
					}
					const pre = 8 - day;
					const rows = Math.ceil((days-pre) / 7) + 1;
					h = 70 * rows + 'rpx'
				}
				return h
			},
			timeStr() {
				let str = '';
			    const d = new Date(this.currentYear, this.currentMonth - 1, this.currentDate);
				const y = d.getFullYear();
				const m = (d.getMonth()+1) <=9 ? `0${d.getMonth()+1}` : d.getMonth()+1;
				str = `${y}年${m}月`;
				return str;
			},
			predays() {
				let pres = [];
				if (this.weekMode) {
					const d = new Date(this.currentYear, this.currentMonth - 1,this.currentDate)
					d.setDate(d.getDate() - 7);
					pres = gegerateDates(d, 'week')
				} else {
					const d = new Date(this.currentYear, this.currentMonth - 2,1)
					pres = gegerateDates(d, 'month')
				}
				return pres;
			},
			nextdays() {
				let nexts = [];
				if (this.weekMode) {
					const d = new Date(this.currentYear, this.currentMonth - 1,this.currentDate)
					d.setDate(d.getDate() + 7);
					nexts = gegerateDates(d, 'week')
				} else {
					const d = new Date(this.currentYear, this.currentMonth,1)
					nexts = gegerateDates(d, 'month')
				}
				return nexts;
			}
		},
		data() {
			return {
				weeks: ['一', '二', '三', '四', '五', '六', '日'],
				current: 1,
				currentYear: '',
				currentMonth: '',
				currentDate: '',
				days: [],
				weekMode: true,
				swiper: [0,1,2],
				// dotList: [], // 打点的日期列表
				selectedDate: formatDate(new Date(), 'yyyy-MM-dd')
			};
		},
		methods: {
			changeSwp(e) {
				// console.log(e);
				const pre = this.current;
				const current = e.target.current;
				/* 根据前一个减去目前的值我们可以判断是下一个月/周还是上一个月/周 
				*current - pre === 1, -2时是下一个月/周
				*current -pre === -1, 2时是上一个月或者上一周
				*/
				this.current = current;
				if (current - pre === 1 || current - pre === -2) {
					this.daysNext();
				} else {
					this.daysPre();
				}
			},
			// 初始化日历的方法
			initDate(cur) {
				let date = ''
				if (cur) {
				  date = new Date(cur)
				} else {
					date = new Date()
				}
				this.currentDate = date.getDate()          // 今日日期 几号
				this.currentYear = date.getFullYear()       // 当前年份
				this.currentMonth = date.getMonth() + 1    // 当前月份
				this.currentWeek = date.getDay() === 0 ? 7 : date.getDay() // 1...6,0   // 星期几
				const nowY = new Date().getFullYear()       // 当前年份
				const nowM = new Date().getMonth() + 1
				const nowD = new Date().getDate()          // 今日日期 几号
				const nowW = new Date().getDay();
				// this.selectedDate = formatDate(new Date(), 'yyyy-MM-dd')
				this.days = [];
				let days = [];
				if (this.weekMode) {
					days = gegerateDates(date, 'week');
					// this.selectedDate = days[0].fullDate;
				} else {
					days = gegerateDates(date, 'month');
					// const sel = new Date(this.selectedDate.replace('-', '/').replace('-', '/'));
					// const isMonth = sel.getFullYear() === this.currentYear && (sel.getMonth() + 1) === this.currentMonth;
					// if(!isMonth) {
					// 	this.selectedDate = formatDate(new Date(this.currentYear, this.currentMonth-1,1), 'yyyy-MM-dd')
					// }
				}
				days.forEach(day => {
					const dot = this.dotList.find(item => {
						return dateEqual(item.date, day.fullDate);
					})
					if (dot) {
						day.info = dot;
					}
				})
				this.days = days;
			},
			//  上一个
			daysPre () {
			  if (this.weekMode) {
				const d = new Date(this.currentYear, this.currentMonth - 1,this.currentDate);
				d.setDate(d.getDate() - 7);
				this.initDate(d);  
			  } else {
				  const d = new Date(this.currentYear, this.currentMonth -2, 1);
				  this.initDate(d);
			  }
			},
			//  下一个
			daysNext () {
				 if (this.weekMode) {
					const d = new Date(this.currentYear, this.currentMonth - 1,this.currentDate);
					d.setDate(d.getDate() + 7);
					this.initDate(d);  
				 } else {
					const d = new Date(this.currentYear, this.currentMonth, 1);
					this.initDate(d);
				 }
			},
			changeMode() {
				const premode = this.weekMode;
				let isweek = false;
				if (premode) {
					isweek = !!this.days.find(item => item.fullDate === this.selectedDate)
				}	
				this.weekMode = !this.weekMode;
				let d = new Date(this.currentYear, this.currentMonth - 1, this.currentDate)
				const sel = new Date(this.selectedDate.replace('-', '/').replace('-', '/'));
				const isMonth = sel.getFullYear() === this.currentYear && (sel.getMonth() + 1) === this.currentMonth;
				if ((this.selectedDate && isMonth) || premode) {
					d = new Date(this.selectedDate.replace('-', '/').replace('-', '/'))
				}
				this.initDate(d)
			},
			// 点击日期
			clickItem(e) {
				this.selectedDate = e.fullDate;
				this.$emit('selected-change', e);
			},
			goback() {
				const d = new Date();
				this.initDate(d);
			}
		},
		created() {
			this.initDate();
		},
		mounted() {
		}
	}
</script>

<style lang="scss" scoped>
.zzx-calendar {
	width: 100%;
	height: auto;
	.calendar-heander {
		text-align: center;
		height: 60upx;
		line-height: 60upx;
		position: relative;
		font-size: 30upx;
		.back-today {
			position: absolute;
			right: 0;
			width: 100upx;
			height: 30upx;
			line-height: 30upx;
			font-size: 20upx;
			top: 15upx;
			border-radius: 15upx 0 0 15upx;
			color: #ffffff;
			background-color: #FF6633;
		}
	}
	.calendar-weeks {
		width: 100%;
		display: flex;
		flex-flow:row nowrap;
		height: 60upx;
		line-height: 60upx;
		justify-content: center;
		align-items: center;
		font-size: 30upx;
		.calendar-week {
			width: calc(100% / 7);
			height: 100%;
			text-align: center;
		}
	}
	swiper {
		width: 100%;
		height: 60upx;
	}
	.calendar-content {
		min-height: 60upx;
	}
	.calendar-swiper {       
		min-height: 70upx;
		transition: height ease-out 0.3s;
	}
	.calendar-item {
		margin: 0;
		padding: 0;
		height: 100%;
	}
	.calendar-days {
		display: flex;
		flex-flow: row wrap;
		width: 100%;
		height: 100%;
		overflow: hidden;
		font-size: 28upx;
		.calendar-day {
			width: calc(100% / 7);
			height: 70upx;
			text-align: center;
			display: flex;
			flex-flow: column nowrap;
			justify-content: flex-start;
			align-items: center;
		}
	}
	.day-hidden {
		visibility: hidden;
	}
	.mode-change {
		display: flex;
		justify-content: center;
		margin-top:10upx;
		.mode-arrow-top {
			width: 0;
			height:0;
			border-left: 12upx solid transparent;
		    border-right: 12upx solid transparent;
		    border-bottom: 10upx solid #FF6633;
		}
		.mode-arrow-bottom {
			width: 0;
			height:0;
			border-left: 12upx solid transparent;
			border-right: 12upx solid transparent;
			border-top: 10upx solid #FF6633;
		}
	}
	.is-today {
		background: #ffffff;
		// border: 1upx solid #FF6633;
		border-radius: 50%;
		color: #FF6633;
	}
	.is-checked {
		background: #FF6633;
		color: #ffffff;
	}
	.date {
		width: 50upx;
		height: 50upx;
		line-height: 50upx;
		margin: 0 auto;
		border-radius: 50upx;
	}
	.dot-show {
		margin-top:4upx;
		width: 10upx;
		height: 10upx;
		background: #c6c6c6;
		border-radius: 10upx;
	}
}
</style>
