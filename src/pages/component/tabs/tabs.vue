<template>
	<view class="content">
		<view style="margin-top: 20upx;">
			 <zzx-tabs :items="items" :current="current" @clickItem="onClickItem" ref="mytabs">
			 </zzx-tabs>
		</view>	
		<view style="margin-top: 20upx;color:#999999;font-size: 24upx;height: 260upx;">
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
			<button type="primary" @click="setMydot">设置dot</button>
			 <button type="default" @click="removeMydot">移除dot</button>
		</view>	
	</view>
</template>

<script>
	import zzxTabs from "@/components/zzx-tabs/zzx-tabs.vue"
	export default {
		components: {
			zzxTabs
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
		  },
		  setMydot() {
			  this.$refs.mytabs.setDot(0)
		  }, 
		  removeMydot() {
			  this.$refs.mytabs.removeDot(0);
		  }
		}
	}
</script>

<style lang="scss">

</style>
