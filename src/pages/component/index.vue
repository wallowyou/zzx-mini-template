<template>
	<view class="content">
		<view class="conponent-list">
			<view class="plat-item">
				<navigator url="/pages/platform/smart-elevator/smart-elevator">智慧电梯</navigator>
			</view>
			<view class="plat-item">
				<navigator url="/pages/component/form/form">表单</navigator>
			</view>
			<view class="plat-item">
				<navigator url="/pages/component/tabs/tabs">选项卡</navigator>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.conponent-list {
		display: flex;
		flex-flow: column nowrap;
	}
	.plat-item {
		height: 80upx;
		line-height: 80upx;
		text-align: center;
		margin-bottom: 20upx;
		border-bottom: 1upx solid #dddddd;
	}
</style>
