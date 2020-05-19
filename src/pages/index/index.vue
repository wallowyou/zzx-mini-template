<template>
	<view class="content">
		<view class="system-list">
			<view class="system-item" @click="systemNav(0)">
				<view class="system-item_icon">
					<image src="../../static/img/elevator.png" mode="" style="width: 128upx;height:128upx;vertical-align: middle;"></image>
				</view>
				<view class="system-item_text">
					<view class="system-text-title">
						智慧电梯
					</view>
					<view class="system-text-desc">
						智慧电梯产品包含了电梯状态的监控,电梯的实时数据,视频监控,电梯故障自动上报,电梯的巡检、维修。
					</view>
				</view>
			</view>
			<view class="system-item" @click="systemNav(1)">
				<view class="system-item_icon">
					<image src="../../static/img/property.png" mode="" style="width: 128upx;height:128upx;vertical-align: middle;"></image>
				</view>
				<view class="system-item_text">
					<view class="system-text-title">
						瓦力物业
					</view>
					<view class="system-text-desc">
						瓦力物业产品包含了物业人员巡检,排班,物业维修,维修上报,日程安排。
					</view>
				</view>
			</view>
			<view class="system-item" @click="systemNav(2)">
				<view class="system-item_icon">
					<image src="../../static/img/fk.png" mode="" style="width: 128upx;height:128upx;vertical-align: middle;"></image>
				</view>
				<view class="system-item_text">
					<view class="system-text-title">
						访客预约
					</view>
					<view class="system-text-desc">
						访客预约产品主要是为公司提供线上的预约审核平台
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const urlList = ['/pages/platform/smart-elevator/smart-elevator', '/pages/platform/walle-property/walle-property'];
	export default {
		data() {
			return {
			}
		},
		onLoad() {
		},
		methods: {
			systemNav(e) {
				if (e === 2) {
					// 首先需要登录
					uni.login({
						success: (res) => {
							if (res.code) {
								const code = encodeURIComponent(res.code);
								uni.navigateTo({
									url: '/pages/platform/fk-reserve/fk-reserve?code='+ code
								})
							}					
						},
						fail: () => {
							uni.showToast({
								title: '微信登录失败'
							})
						}
					});
				} else {
					uni.navigateTo({
						url: urlList[e]
					});
				}
			}
		}
	}
</script>

<style lang="scss">
.content {
	background: #F5F6FA;
	overflow: hidden;
}
.system-list {
	display: flex;
	flex-flow: column wrap;
	font-size: 22upx;
	// margin-top: 20upx;
	margin-top: 40upx;
	width: 100%;
	.system-item {
		width: 100%;
		display: flex;
		flex-flow: row nowrap;
		height: 150upx;
		margin-bottom: 30upx;
		border-bottom: 1upx soluid #dddddd;
		box-shadow:0px 2upx 0upx rgba(0,0,0,0.08);
		background: #ffffff;
	}
	.system-item_icon {
		width: 150upx;
		height: 150upx;
		text-align: center;
		line-height: 150upx;
	}
	.system-item_text{
		flex: 1;
		.system-text-title {
			font-size: 30upx;
			margin-bottom: 10upx;
			height: 40upx;
			line-height: 40upx;
		}
		.system-text-desc {
			margin-bottom: 10upx;
			min-height: 40upx;
		}
	}
}
</style>
