<template>
	<view class="content">
		<view>
			<view class="">
				按钮样式
			</view>
			<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="button" active-color="#4cd964"></uni-segmented-control>
		</view>
		<view>
			<view class="">
				文字样式
			</view>
			<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="text" active-color="#4cd964"></uni-segmented-control>
		</view>
		<view>
			<view class="">
				自定义tab
			</view>
			<zzx-segmented-control :current="current" :values="items" @clickItem="onClickItem"></zzx-segmented-control>
		</view>
		<view>
			<view v-show="current === 0">
				选项卡1的内容
			</view>
			<view v-show="current === 1">
				选项卡2的内容
			</view>
			<view v-show="current === 2">
				选项卡3的内容
			</view>
		</view>
		<view class="">
			 
		</view>
	</view>
</template>

<script>
	import uniSegmentedControl from "@/components/uni-segmented-control/uni-segmented-control.vue"
	import zzxSegmentedControl from "@/components/zzx-segment/zzx-segment.vue"
	
	export default {
		components: {
			uniSegmentedControl,
			zzxSegmentedControl	
		},
		data() {
			return {
				items: ['选项卡1','选项卡2','选项卡3'],
				current: 0
			};
		},
		methods: {
		  onClickItem(e) {
			if (this.current !== e.currentIndex) {
				this.current = e.currentIndex;
			}
		  }
		}
	}
</script>

<style lang="scss">

</style>
