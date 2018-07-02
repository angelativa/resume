var Koa = require('koa');
var router = require('koa-router')();
var app = new Koa();
var bodyParser = require('koa-bodyparser');

// x-response-time

app.use(async (ctx, next) => {
    const start = Date.now();
    console.log('1')
    await next();
     console.log('5')
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
    console.log(`X-Response-Time ${ms}ms`);
});

// logger
app.use(async (ctx, next) => {
    const start = Date.now();
    console.log('2')
    await next();
    console.log('4')
    const ms = Date.now() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});
app.use(bodyParser());

// app.use(async ctx=> {
//     // 应该可以用中间件处理
//     let path = ctx.url;
//     const routes = {
//         '/index': 'Index',
//         '/main': 'Hello World'
//     };
//     ctx.body = routes[path];
// });

router.get('/hello/:name', async (ctx, next) => {
    var name = ctx.params.name;
    ctx.response.body = `<h1>Hello, ${name}!</h1>`;
});

router.get('/', async (ctx, next) => {
    ctx.response.body = '<h1>Index</h1>';
});

app.use(router.routes());

app.on('error', err => {
    log.error('server error', err)
});


app.listen(9090);