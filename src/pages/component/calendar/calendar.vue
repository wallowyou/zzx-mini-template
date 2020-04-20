<template>
	<view class="content">
		<view class="calendar-box">
			<zzx-calendar></zzx-calendar>
		</view>
		
	</view>
</template>

<script>
	import zzxCalendar from '@/components/zzx-calendar/zzx-calendar.vue'
	export default {
		components:{
			zzxCalendar
		},
		data() {
			return {
				
			};
		},
		methods: {
		}
	}
</script>

<style lang="scss">
.calendar-box {
	height: 400upx;
}
</style>
