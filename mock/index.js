const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')()
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors');
const testList = [
	{
		id: 1,
		name: 'React'
	},
	{
		id: 2,
		name: 'Vue'
	},
	{
		id: 3,
		name: 'Angular'
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