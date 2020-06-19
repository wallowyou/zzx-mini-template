<template>
	<view class="content">
		  <!-- <view class="uni-padding-wrap">
		            <view class="uni-title">日期：{{year}}年{{month}}月{{day}}日</view>
		        </view>
		        <picker-view style="height: 600upx;" v-if="visible" :indicator-style="indicatorStyle" :value="value" @change="bindChange">
		            <picker-view-column>
		                <view class="item" v-for="(item,index) in years" :key="index">{{item}}年</view>
		            </picker-view-column>
		            <picker-view-column>
		                <view class="item" v-for="(item,index) in months" :key="index">{{item}}月</view>
		            </picker-view-column>
		            <picker-view-column>
		                <view class="item" v-for="(item,index) in days" :key="index">{{item}}日</view>
		            </picker-view-column>
		        </picker-view> -->
				<datetime-picker></datetime-picker>
	</view>
</template>

<script>
	import datetimePicker from '@/components/datetime-picker/datetime-picker.vue'
	export default {
		components: {
			datetimePicker
		},
		 // data: function () {
		 //        const date = new Date()
		 //        const years = []
		 //        const year = date.getFullYear()
		 //        const months = []
		 //        const month = date.getMonth() + 1
		 //        const days = []
		 //        const day = date.getDate()
		 //        for (let i = 1990; i <= date.getFullYear(); i++) {
		 //            years.push(i)
		 //        }
		 //        for (let i = 1; i <= 12; i++) {
		 //            months.push(i)
		 //        }
		 //        for (let i = 1; i <= 31; i++) {
		 //            days.push(i)
		 //        }
		 //        return {
		 //            title: 'picker-view',
		 //            years,
		 //            year,
		 //            months,
		 //            month,
		 //            days,
		 //            day,
		 //            value: [9999, month - 1, day - 1],
		 //            visible: true,
		 //            indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth/(750/100))}px;`
		 //        }
		 //    },
		 //    methods: {
		 //        bindChange: function (e) {
		 //            const val = e.detail.value
		 //            this.year = this.years[val[0]]
		 //            this.month = this.months[val[1]]
		 //            this.day = this.days[val[2]]
		 //        }
		 //    }
	}
</script>

<style lang="scss">
.item {
	height: 100upx;
}
</style>
