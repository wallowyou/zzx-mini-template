# zzx-mini-template

## 项目设置
```
npm install
```

### 开发环境运行和热加载
```
npm run serve
```

### 生产环境构建打包
```
npm run build
```
### 开发环境mock数据运行
```
npm run mock
```
### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## 项目介绍
这是一个自定义的uni-app微信小程序自定模板。根据之前的项目总结，把项目中会用到的一些通用的方法，模块和组件都先引入，避免每次都需要0开始搭建一个uniapp项目。
### 1. 数据请求 luch-request
数据请求的公共方法在`utils/request/request.js`中业务请求写在index.js下面,具体文档可以看readme
### 2. 表单校验gracechecker
具体描述参考插件文档
### 3. 常用的js方法
暂时只写了部分通用函数有需要可以自行添加
### 4. 常用的组件
关于项目中所需要用到的组件，只是引入了一些经常会用到的组件,以下组件只是推荐,不是必须使用。
为了风格统一,同一项目同一类型的组件尽可能的使用同一个,项目所需要的其他组件自行添加。如果uni-app官方组件可以满足需要尽量使用官方组件,无法满足的可以自行修改源代码。
#### 4.1 图表组件 u-charts
图表组件引入了u-charts,修改了u-charts中`component.vue`的代码,使其可以直接通过组件引入的方法绘制一些常用的图表类型,暂时增加了**饼图**, **环形图**,**雷达图**, **柱状图**,其他图形可以自行添加。
使用方法参考官方文档。[ucharts官方文档](http://doc.ucharts.cn/1073940)
#### 4.2 上拉加载更多，下拉刷新组件 mescroll-uni
项目中经常用到列表和tab搭配使用会用到上拉加载更多下拉刷新数据的功能。具体使用方法见官方文档: [mescroll-uni](http://www.mescroll.com/uni.html?v=20200315)
### 5. 样式
通用样式文件可以放在`scss`文件夹下面, 全局样式变量放在uni.scss可以自行在文件后面添加自己需要的全局样式,暂时有表单的通用样式，在组件中可以看到示例。
### 6. 项目mock数据
本模板项目的mock数据单独开node服务,使用koa，在`/mock/index.js`中已经有示范代码，可以很方便简单的添加其他的get,post请求
eg: 
```
router.get('/', async (ctx, next) => {
	ctx.response.status = 200;
	ctx.response.body = 'hello world'
})
router.get('/api/test', async (ctx, next) => {
  ctx.response.status = 200;
  ctx.response.body = {
    data: testList
  }
})
```
如果本地需要用到mock数据的话可以使用,默认服务的端口号为8090可以自行修改
```
npm run mock
```
关于mock服务代码修改自动重启服务的问题，默认是没有自动重启mock服务,如果需要的话，首先在全局安装nodemon

```
npm install -g nodemon
```
自动重启mock服务,我们启动服务的时候可以换成
```
npm run mock:dev
```
保存mock中index.js代码之后就会自动重启mock服务。
