<template>
	<view>
		<web-view v-if="url" :src="url" @message="getMessage"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: ''
			}
		},
		onLoad(options) {
			if (options && options.url) {
				this.url = options.url;
			} else if(options && options.code) {
				this.url = 'http://localhost:8080/?jscode=' + options.code
			}
		},
		methods: {
			getMessage(event) {
				uni.showModal({
					content: JSON.stringify(event.detail),
					showCancel: false
				});
			}
		}
	}
</script>

<style>

</style>
