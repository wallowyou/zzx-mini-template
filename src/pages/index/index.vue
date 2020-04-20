<template>
	<view class="content">
		<view class="test">
			<view class="test-item" v-for="item in testList" :key="item.id">
				{{item.name}}
			</view>
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

</style>
