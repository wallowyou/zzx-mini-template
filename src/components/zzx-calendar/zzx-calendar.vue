<template>
	<view class="zzx-calendar">
		<view class="calendar-weeks">
			<view class="calendar-week" v-for="(week, index) in weeks" :key="index">
				{{week}}
			</view>
		</view>
		<view class="calendar-content">
		   <swiper class="calendar-swiper" :indicator-dots="false" :autoplay="false" :duration="duration" :current="current" @change="changeSwp" :circular="true">
				<swiper-item class="calendar-item">
					<view class="calendar-days">
					<view class="calendar-day" v-for="(item,index) in preWeek" :key="index">
						{{item.time.getDate()}}
					</view>
					</view>
					<view class="calendar-mode">
						折叠
					</view>
				</swiper-item>
				<swiper-item class="calendar-item">
					<view class="calendar-days">
						<view class="calendar-day" v-for="(item,index) in days" :key="index">
							{{item.time.getDate()}}
						</view>
					</view>
					<view class="calendar-mode">
						折叠
					</view>
				</swiper-item>
				<swiper-item class="calendar-item">
					<view class="calendar-days">
						<view class="calendar-day" v-for="(item,index) in nextWeek" :key="index">
							{{item.time.getDate()}}
						</view>
					</view>
					<view class="calendar-mode" @click="changeMode">
						折叠
					</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			duration: { // 滑动动画时长
				type: Number, 
				default: 500
			}
		},
		computed: {
			preWeek() {
				const d = this.days[0].time;
				const y = d.getFullYear();
				const m = d.getMonth();
				const day = d.getDate();
				const preWeek = [];
				if (this.weekMode) {
					for(let i = 7; i > 0; i--) {
					const dtemp = new Date(y,m,day);
					dtemp.setDate(dtemp.getDate() - i);
						preWeek.push({
							time: dtemp
						});
					}
				}
				return preWeek;
			},
			nextWeek() {
				const d = this.days[6].time;
				const y = d.getFullYear();
				const m = d.getMonth();
				const day = d.getDate();
				const nextWeek = [];
				if (this.weekMode) {
					for(let i = 1; i <= 7 ; i++) {
					const dtemp = new Date(y,m,day);
					dtemp.setDate(dtemp.getDate() + i);
						nextWeek.push({
							time: dtemp
						});
					}
				}
				return nextWeek;
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
				console.log(e);
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
				// 当前日期前的日期
				for (let i = this.currentWeek - 1; i >= 0;i--) {
					const d = new Date(this.currentYear,this.currentMonth - 1,this.currentDay);
					d.setDate(d.getDate() - i);
					this.days.push({
						time: d
					});
				}
				// 当前日期后的日期
				if (this.weekMode) {
					for (let i = 1;i <= (7-this.currentWeek);i++) {
						const d = new Date(this.currentYear,this.currentMonth - 1,this.currentDay);
						d.setDate(d.getDate() + i);
						this.days.push({
							time: d,
						})
					}
				} else {
					for (let i = 1;i <= (35-this.currentWeek);i++) {
						const d = new Date(this.currentYear,this.currentMonth - 1,this.currentDay);
						d.setDate(d.getDate() + i);
						this.days.push({
							time: d,
						})
					}
				}
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
	.calendar-content {
		min-height: 60upx;
	}
	.calendar-swiper {       
		min-height: 60upx;
	}
	.calendar-item {
		margin: 0;
		padding: 0;
	}
	.calendar-days {
		display: flex;
		felx-flow: row wrap;
		.calendar-day {
			width: calc(100% / 7);
			height: 60upx;
			text-align: center;
		}
	}
}
</style>
