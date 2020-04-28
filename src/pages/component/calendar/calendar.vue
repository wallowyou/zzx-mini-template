<template>
	<view class="content">
		<zzx-calendar @selected-change="datechange" :dot-list="dotList" :showBack="true"></zzx-calendar>
<!-- 		<button type="default" @click="change">修改</button>
 -->	</view>
</template>
<script>
	import zzxCalendar from "@/components/zzx-calendar/zzx-calendar.vue"
	export default {
		components: {
			zzxCalendar
		},
		data() {
			return {
				dotList: [{
					date: '2020-04-29'
				},
				{
					date: '2020-04-27'
				}]
			};
		},
		methods: {
			datechange(e) {
				console.log(e);
			},
			change() {
				this.dotList.push({date: '2020-04-28'});
			}
		}
	}
</script>
<style lang="scss">
</style>
