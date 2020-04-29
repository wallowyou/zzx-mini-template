# zzx-tabs
这是一个tab选项卡组件,可以自定义样式,并且可以在 tab项设置小圆点。组件名：zzx-tabs，代码块： zzxTbas。  
**注意：**
组件样式使用了sass所有需要项目中先安装node-sass和sass-loader。
## 组件调用方式
在你需要使用的页面或者组件引入zzx-tabs，以下是完整功能的示例代码
eg：
```
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

```
## 组件属性说明 props
组件提供很多自定义属性，默认颜色， 选中颜色，底部线的高度，线与文字的距离等具体属性看下表：

属性名|数据类型|默认值|说明
-|-|-|-
items|Array|[]|选项数组,比如['选项1', '选项2']
current|Number|0|当前选中项下标
defaultColor|String|'#999999'|选项默认字体颜色
activeColor|String|'#FF6633'|选项被选中字体颜色
tabHeight|String|'60upx'|文字部分的选项高度
lineHeight|String|'3px'|底部滑动线条的height
lineWidth|String|'40%'|底部滑动线条的宽度
lineTop|String|'0px'|底部滑动线条与文字的距离

## 事件说明
事件名|说明
-|-
@clickItem ｜ 选项变化时触发

@clickItem 事件返回属性说明
```
 {currentIndex:1// 选中项下标}
```
## 实例方法
该组件内置了两个方法，分别用来设置tab项小圆点和移除小圆点
在使用组件的地方通过ref获取组件实例后，调用这两个方法
### 1. setDot() 设置圆点
```
  this.$refs.mytabs.setDot(0)
```
### 2. removeDot() 移除小圆点
```
  this.$refs.mytabs.removeDot(0)
```
以上两个方法需要传入一个参数，参数index为你需要设置或移除圆点选项的下标
## TODO
- [ ] 根据需要是否增加按钮类型的tab

## 联系
有问题可以在以下评论区评论，或者邮件wallowyou@outlook.com