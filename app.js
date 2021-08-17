const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const index = require('./routes/index')
const users = require('./routes/users')

const db = require('./config/db')
db.StudentModel.findAll({
  attributes: ['prdName', 'price'],
    include: [{
        model: db.ClassModel,
        as: 'user',
        attributes: ['userName']
    }],
    // raw:true
}).then((result)=> {
    console.log(JSON.stringify(result))
  }).catch(err => {
    console.log(err)
});
// [{"prdName":"Ipad","price":"2.2200","user":{"userName":"Jvan"}}]
db.StudentModel.findAll({
  attributes: ['prdName', 'price'],
    include: [{
        model: db.ClassModel,
        as: 'user',
        attributes: ['userName']
    }],
    raw:true
}).then((result)=> {
      console.log(result)
  }).catch(err => {
    console.log(err)
});
// [ { prdName: 'Ipad', price: '2.2200', 'user.userName': 'Jvan' } ]
db.StudentModel.findAll({
  attributes: [db.sequelize.col('user.userName'),'prdName', 'price'],
    include: [{
        model: db.ClassModel,
        as: 'user',
        attributes: []
    }],
    raw:true
}).then((result)=> {
      console.log(result)
  }).catch(err => {
    console.log(err)
});
// [ { userName: 'Jvan', prdName: 'Ipad', price: '2.2200' } ]

db.StudentModel.findAll({
  attributes: [db.sequelize.col('user.userName'),'prdName', 'price'],
    include: [{
        model: db.ClassModel,
        as: 'user',
        attributes: []
    }],
    where: {
      prdName: 'ipad',
      '$user.userId$': 1
  },
    raw:true
}).then((result)=> {
      console.log(result)
  }).catch(err => {
    console.log(err)
});
// [ { userName: 'Jvan', prdName: 'Ipad', price: '2.2200' } ]

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
