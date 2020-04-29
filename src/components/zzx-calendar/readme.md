# zzx-calendar
这是一款支持滑动切换以及周模式和月模式切换功能的日历组件,可以设置打卡信息,自定义样式。组件样式使用了sass所有需要项目中先安装node-sass和sass-loader。
日历组件，组件名：zzx-calendar，代码块： zzxCalendar。
## 组件调用方式
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
## 组件属性说明 props
组件提供很多自定义属性，比如是否显示返回今日的功能，今天日期,打点日期，选中日期的样式自定义，具体属性看下表：

属性名|数据类型|默认值|说明
-|-|-|-
duration|Number|500|滑动动画时间
dotList|Array|[]|打点日期数据,格式为[{date: '2020-04-28',xxx: xxx}]
showBack|Boolean|false|是否显示返回今日按钮
todayClass|String|is-today|当天日期的自定义class
checkedClass|String|is-checked|点击选中日期的自定义class
dotStyle|Object|{background: '#c6c6c6'}|打点日期的样式style

## 事件说明
事件名|说明
-|-
@selected-change ｜ 选中日期改变时触发

更多事件可以在源代码添加，后续更新再添加
@selected-change 事件返回属性说明
```
{
	time: 选中日期Date对象,
	show: true,// 是否显示
	fullDate: "2020-04-30",// 选中日期格式化事件
	isToday: false // 是否是今天
}
```
## TODO
- [ ] 滑动的时候上一个月/周以及下一个月/周空白问题解决  

## 联系
有问题可以在以下评论区评论，或者邮件wallowyou@outlook.com