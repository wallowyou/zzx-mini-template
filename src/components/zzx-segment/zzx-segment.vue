<template>
	<view class="zzx-segmented-control">
		<view v-for="(item, index) in values" class="segmented-control__item"
				 :key="index" @click="_onClick(index)">
			<text :style="{color:index === currentIndex ? activeTextColor : '#999999'}"
			 class="segmented-control__text" :class="index === currentIndex ? activeTextClass : ''">{{ item }}</text>
		</view>
	</view>
</template>

<script>
	/* 自定义的分段器 
	* 	TODO: 增加滑动功能，增加tag显示
	*/
	export default {
		name: 'ZzxSegmentedControl',
		props: {
			current: {
				type: Number,
				default: 0
			},
			values: {
				type: Array,
				default () {
					return []
				}
			},
			activeTextColor: {
				type: String,
				default: '#2AB4FB'
			},
			activeTextClass: {
				type: String,
				default: 'text-active'
			}
		},
		data() {
			return {
				currentIndex: 0
			}
		},
		watch: {
			current(val) {
				if (val !== this.currentIndex) {
					this.currentIndex = val
				}
			}
		},
		created() {
			this.currentIndex = this.current
		},
		methods: {
			_onClick(index) {
				if (this.currentIndex !== index) {
					this.currentIndex = index
					this.$emit('clickItem', {currentIndex:index})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.zzx-segmented-control {
		/* #ifndef APP-NVUE */
		background:rgba(255,255,255,1);
		display: flex;
		box-sizing: border-box;
		/* #endif */
		flex-direction: row;
		height: 84upx;
		// line-height: 56upx;
		overflow: hidden;
		font-size: 30upx;
		text-align: center;
		// border-bottom-style: solid;
		// border-bottom-width: 4upx;
		.segmented-control__item {
			/* #ifndef APP-NVUE */
			display: inline-flex;
			box-sizing: border-box;
			/* #endif */
			position: relative;
			flex: 1;
			justify-content: center;
			align-items: center;
		}
		.segmented-control__text {
			font-size: 26upx;
			position: relative;
			padding-bottom: 4upx;
		}
		.text-active {
			font-size: 28upx;
			position: relative;
			text-align: center;
			display: flex;
			justify-content: center;
		}
		.segmented-line {
			width: 100upx;
			height: 4upx;
			background: red;
		}
		.text-active:after {
			display: block;
			width: 60upx;
			height: 4upx;
			content: '';
			position: absolute;
			bottom: 0;
			margin: 0 auto;
			// left: calc(100% - 60upx);
			background: #2AB4FB;
		}
	}
</style>
