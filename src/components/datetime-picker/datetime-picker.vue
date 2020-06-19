<template>
	<view class="datetime-picker">
		2020-06-19
		<slot></slot>
		<view class="datetime-picker-wrap">
			<picker-view style="height: 600upx;" class="datetime-picker_pop" v-if="visible" :indicator-style="indicatorStyle"  @change="bindChange">
			    <picker-view-column>
			        <view class="item" v-for="(item,index) in years" :key="index">{{item}}年</view>
			    </picker-view-column>
			    <picker-view-column>
			        <view class="item" v-for="(item,index) in months" :key="index">{{item}}月</view>
			    </picker-view-column>
			    <picker-view-column>
			        <view class="item" v-for="(item,index) in days" :key="index">{{item}}日</view>
			    </picker-view-column>
			</picker-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				  visible: true,
				  years: [2018,2019,2020],
				  months: [1,2,3,4,5],
				  days: [1,2,3],
				  indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth/(750/100))}px;`
			};
		},
		methods: {
			bindChange (e) {
			 console.log(e);
		   }
		}
	}
</script>

<style lang="scss">
.datetime-picker {
	width: 100%;
	height: 100upx;
	line-height: 100upx;
}
.datetime-picker-wrap {
	position: fixed;
	width: 750upx;
	height: 600upx;
	background: #FFFFFF;
	bottom: 0;
	.datetime-picker_pop {
	
	}
}
</style>
