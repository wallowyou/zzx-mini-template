const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')()
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors');
const testList = [
	{
		id: 1,
		content: '任务1:完成框架的搭建',
		createTime: 1586649600000,
		state: 0 // 0：表示待办， 1：表示已完成
	},
	{
		id: 2,
		content: '任务2:通用方法的封装',
		createTime: 1586736000000,
		state: 1
	},
	{
		id: 3,
		content: '任务3:mock服务的搭建',
		createTime: 1586822400000,
		state: 0
	},
	{
		id: 4,
		content: '任务4:通用样式编写',
		createTime: 1586822400000,
		state: 1
	},
	{
		id: 5,
		content: '任务5:布局搭建',
		createTime: 1586822400000,
		state: 0
	},
	{
		id: 6,
		content: '任务6:错误处理',
		createTime: 1586822400000,
		state: 0
	},
	{
		id: 7,
		content: '任务7:数据对接',
		createTime: 1586822400000,
		state: 0
	}
];
app.use(bodyParser());
// 允许跨域
app.use(cors());
router.get('/', async (ctx, next) => {
	ctx.response.status = 200;
	ctx.response.body = 'hello world!'
})
router.get('/api/test', async (ctx, next) => {
  ctx.response.status = 200;
  ctx.response.body = {
    data: testList
  }
})
app.use(router.routes());
app.listen(8090, () => {
  console.log('Server is running at http://localhost:8090');
  console.log('Press CTRL-C to stop \n');
});