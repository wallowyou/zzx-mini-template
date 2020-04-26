<template>
	<view class="zzx-calendar">
		<view class="calendar-heander">
			{{timeStr}}
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
				<swiper-item class="calendar-item">
					<view class="calendar-days">
					<view class="calendar-day" v-for="(item,index) in preWeek" :key="index" :class="!item.show ? 'day-hidden' : ''">
						{{item.time.getDate()}}
					</view>
					</view>
					
				</swiper-item>
				<swiper-item class="calendar-item">
					<view class="calendar-days">
						<view class="calendar-day" v-for="(item,index) in days" :key="index" :class="!item.show ? 'day-hidden' : ''" @click="clickItem(item.time)">
							{{item.time.getDate()}}
						</view>
					</view>
					
				</swiper-item>
				<swiper-item class="calendar-item">
					<view class="calendar-days">
						<view class="calendar-day" v-for="(item,index) in nextWeek" :key="index" :class="!item.show ? 'day-hidden' : ''">
							{{item.time.getDate()}}
						</view>
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
	import {gegerateDates} from './generateDates.js';
	export default {
		props: {
			duration: { // 滑动动画时长
				type: Number, 
				default: 500
			}
		},
		computed: {
			sheight() {
				// 根据年月判断有多少行
				// 判断该月有多少天
				let h = '60rpx';
				if (!this.weekMode) {
					const d = new Date(this.currentYear, this.currentMonth, 0);
					const days = d.getDate();
					let day = new Date(d.setDate(1)).getDay();
					if (day === 0) {
						day = 7;
					}
					const pre = 8 - day;
					const rows = Math.ceil((35-pre) / 7);
					h = 60 * rows + 'rpx'
				}
				return h
			},
			preWeek() {
				let result = [];
				if (this.weekMode) {
					const d = new Date(this.currentYear, this.currentMonth - 1, this.currentDay);
					d.setDate(d.getDate() - 7);
					result = gegerateDates(d, 'week');
				} else {
					// 上一个月
					const d = new Date(this.currentYear, this.currentMonth - 2, 1);
					console.log(d)
					result = gegerateDates(d, 'month');
				}
				return result;
			},
			nextWeek() {
				let result = [];
				if (this.weekMode) {
					const d = new Date(this.currentYear, this.currentMonth - 1, this.currentDay);
					d.setDate(d.getDate() + 7);
					result = gegerateDates(d, 'week');
				} else {
					// 上一个月
					const d = new Date(this.currentYear, this.currentMonth, 1);
					result = gegerateDates(d, 'month');
				}
				return result;
			},
			timeStr() {
				let str = '';
			    const d = new Date(this.currentYear, this.currentMonth - 1, this.currentdDay);
				const y = d.getFullYear();
				const m = (d.getMonth()+1) <=9 ? `0${d.getMonth()+1}` : d.getMonth()+1;
				str = `${y}年${m}月`;
				return str;
			}
		},
		data() {
			return {
				weeks: ['一', '二', '三', '四', '五', '六', '日'],
				current: 1,
				currentYear: 2020,
				currentMonth: 1,
				currentdDay: 1,
				currentWeek: 1,
				days: [],
				weekMode: true
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
					// 如果是周
					// 如果是月
				} else {
					// 如果是周
					// 如果是月
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
				this.currentDay = date.getDate()          // 今日日期 几号
				this.currentYear = date.getFullYear()       // 当前年份
				this.currentMonth = date.getMonth() + 1    // 当前月份
				this.currentWeek = date.getDay() === 0 ? 7 : date.getDay() // 1...6,0   // 星期几
				this.days = [];
				let days = [];
				if (this.weekMode) {
					days = gegerateDates(date, 'week');
				} else {
					days = gegerateDates(date, 'month');
				}
				this.days = days;
			},
			//  上个星期
			weekPre () {
			  const d = this.days[0].time;    // 如果当期日期是7号或者小于7号
			  d.setDate(d.getDate() - 1);
			  this.initData(d);
			},
			//  下个星期
			weekNext () {
			  const d = this.days[6].time;    // 如果当期日期是7号或者小于7号
			  d.setDate(d.getDate() + 7);
			  this.initData(d);
			},
			changeMode() {
				this.weekMode = !this.weekMode;
				this.initDate()
			},
			// 点击日期
			clickItem(e) {
				console.log(e);
			}
		},
		created() {
			this.initDate();
		},
		mounted() {
			console.log(this.preWeek)
		}
	}
</script>

<style lang="scss" scoped>
.zzx-calendar {
	width: 100%;
	height: auto;
	.calendar-heander {
		text-align: center;
	}
	.calendar-weeks {
		width: 100%;
		display: flex;
		flex-flow:row nowrap;
		height: 60upx;
		line-height: 60upx;
		justify-content: center;
		align-items: center;
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
		min-height: 60upx;
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
		.calendar-day {
			width: calc(100% / 7);
			height: 60upx;
			text-align: center;
		}
	}
	.day-hidden {
		visibility: hidden;
	}
	.mode-change {
		display: flex;
		justify-content: center;
		.mode-arrow-top {
			width: 0;
			height:0;
			border-left: 10upx solid transparent;
		    border-right: 10upx solid transparent;
		    border-bottom: 20upx solid red;
		}
		.mode-arrow-bottom {
			width: 0;
			height:0;
			border-left: 10upx solid transparent;
			border-right: 10upx solid transparent;
			border-top: 20upx solid red;
		}
	}
}
</style>
