<template>
	<view class="content">
		<view class="test">
			<view class="test-item" v-for="item in testList" :key="item.id">
				{{item.name}}
			</view>
		</view>
		<view class="plat-item">
			<navigator url="/pages/platform/smart-elevator/smart-elevator">智慧电梯</navigator>
		</view>
	</view>
</template>

<script>
	import api from '@/utils/request/index.js';
	export default {
		data() {
			return {
				testList: []
			}
		},
		onLoad() {
			this.getTests();
		},
		methods: {
			getTests() {
				api.test().then(res => {
					this.testList = res.data.data;
				})
			}
		}
	}
</script>

<style lang="scss">
	.content {
		text-align: center;
		height: 100vh;
	}

	.logo {
		height: 200upx;
		width: 200upx;
		margin-top: 200upx;
	}

	.title {
		font-size: 36upx;
		color: #8f8f94;
	}
</style>
