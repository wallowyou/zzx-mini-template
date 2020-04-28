## zzx-calendar
这是一款支持滑动功能的日历组件,可以设置打卡信息,自定义样式。组件样式使用了sass所有需要项目中先安装node-sass和sass-loader。
## 使用实例
在你需要使用的页面或者组件引入zzx-calendar
eg：
```
<template>
	<view class="content">
		<zzx-calendar @selected-change="datechange"></zzx-calendar>
	</view>
</template>
<script>
	import zzxCalendar from "@/components/zzx-calendar/zzx-calendar.vue"
	export default {
		components: {
			zzxCalendar
		},
		data() {
			return {
			};
		},
		methods: {
			datechange(e) {
				console.log(e);
			}
		}
	}
</script>
<style lang="scss">
</style>
```