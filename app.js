const Koa = require('koa');
const KoaRouter = require('koa-router');
const KoaBodyParser = require('koa-bodyparser')

let datas = {
    items: require('./data/items.json'),
    users: require('./data/users.json')
}
// console.log(datas);

const app = new Koa();

let currentId = 20;

app.use(async (ctx, next) => {
    // let origin = ctx.headers.origin;
    // ctx.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    // ctx.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    // ctx.set('Access-Control-Allow-Headers', 'Content-Type');
    // ctx.set('Access-Control-Allow-Credentials', true);

    await next();
});

app.use(KoaBodyParser());

const router = new KoaRouter();

router.get('/', async ctx => {
    ctx.body = 'api';
});

router.get('/items', async ctx => {
    let sort = ctx.request.query.sort || 'desc';
    let items = datas.items.sort((a, b) => sort === 'asc' ? a.price - b.price : b.price - a.price);

    ctx.body = items;
});

router.get('/item/:id', async ctx => {
    let id = Number(ctx.params.id);
    let item = datas.items.find(item => item.id === id);

    await new Promise(resolve => {
        setTimeout(_ => resolve(), 2000);
    });

    if (!item) {
        // return ctx.body = {
        //     code: 1,
        //     message: '没有该商品的信息'
        // }
        ctx.throw(404, '没有该商品信息');
        return;
    }

    ctx.body = item;

});
const DecryptByDES = require('./util/decrypt')
const decr = new DecryptByDES.DecryptByDESModeCBC()
// 登录验证
router.post('/login', async ctx => {
    let { data } = ctx.request.body;
    const result = decr.decryptByDESModeCBC(data)
    const userName = result.split(":")[0]
    const passWord = result.split(":")[1]
    if (datas.users.findIndex(v => v.username === userName && v.password === passWord) > -1) {
        ctx.body = {
            code: 0,
            message: '登录成功!',
            data: {
                userName,
                passWord: data
            }
        }
    } else {
        ctx.body = {
            code: 1,
            message: '登录名或者密码不正确!',
            data: null
        }
    }

})

router.post('/add', async ctx => {
    // console.log(ctx.request.body);
    let { name } = ctx.request.body;

    if (name === '') {
        ctx.body = {
            code: 1,
            message: '商品名称不能为空'
        }
        return;
    }

    let newData = {
        id: currentId++,
        name
    };

    datas.items.unshift(newData);

    ctx.body = {
        code: 0,
        message: '提交成功',
        data: newData
    }
})

app.use(router.routes());

app.listen(7777, function () {
    console.log("服务器已开启");
});