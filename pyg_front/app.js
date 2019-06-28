// 项目入口文件
const path = require('path')
const Youch = require('youch')
const favicon = require('express-favicon')
const cookieParser = require('cookie-parser')
const createError = require('http-errors')
const session = require('express-session')
const getStore = require('express-mysql-session')
const {mysqlOption} = require('./config')
// 1. 搭建基础的web服务
const express = require('express')
const app = express()
app.listen(4000, () => {console.log('pyg_front server started !!!')})

// 2. 配置  中间件
// 解析提交数据 json格式
app.use(express.json())
// 解析提交数据 post 表单提交
app.use(express.urlencoded({extended: false}))
// 静态资源目录暴露   资源的虚拟路径  中间件函数('暴露的目录路径')
app.use('/public', express.static(path.join(__dirname, './public')))
// 处理图标
app.use(favicon(path.join(__dirname, './favicon.ico')))
// 配置模板引擎
app.engine('art', require('express-art-template'))
app.set('view options', {
  debug: process.env.NODE_ENV !== 'production'
})
// cookie中间件
app.use(cookieParser())

// session持久化配置步骤
// 1. npm i express-session express-mysql-session
// 2. const session = require('express-session');
// 3. const getStore = require('express-mysql-session');
// 4. 得到本地持久化的构造函数
const MySQLStore = getStore(session)
// 5. 准备链接sql配置信息  config.js ===>  mysqlOption
// 6. 初始化  持久化对象
const sessionStore = new MySQLStore(mysqlOption)
// 7. 使用session中间件 且配置上存储对象
app.use(session({
  key: 'PYGSID',  //COOKIE的存储sessionid的值的名称
  secret: 'pyg_secret',  // 加密字符
  store: sessionStore,  // 持久化对象
  resave: false,  // 不重新更新session
  saveUninitialized: false  // 使用的时候初始化session对象
}))

// 6. 使用自定义中间件
const middleware = require('./middleware')
app.use(middleware.global)

// 3. 处理请求
const router = require('./router')
app.use(router)

// 4. 监听到404
// 当你能走到这段代码 证明：没有任何逻辑对应用户的请求
app.use((req, res, next) => {
  // 创建一个404错误对象   把这个错误对象抛给错误处理中间件
  // 不去响应客户端页面   统一处理错误  返回对应的页面
  // 没有标识是404错误对象  加标识status
  // const error = new Error('Not Found')
  // error.status = 404
  // 以异常的方式抛出   将来错误处理中间件会捕获
  // throw error
  // next(error)
  // throw createError(404,'Not Found')
  next(createError(404, 'Not Found'))
})

// 5. 错误处理中间件
app.use((err, req, res, next) => {
  // 任何报错  捕获
  // 捕获后处理错误
  // 1. 如果是生产环境   响应两种类型的页面  404  500
  // 2. 如果是开发环境   输出详细的错误  在页面输出（包含 错误的位置  错误的原因  请求的报文信息）
  // res.send(err.status === 404 ? '404page' : '500page')

  // 思路：给当前的运行环境加上标识   系统环境变量 （内存）
  // 怎么设置环境变量在内存
  // windows SET NODE_ENV=production
  // windows SET NODE_ENV=development
  // 能够去跨平台设置环境变量   cross-env  第三方命令行工具
  // npm i -g cross-env
  // cross-env NODE_ENV=production  或者  cross-env NODE_ENV=development
  // 在设置完成环境变量的同时 启动项目
  // 那么可以在项目代码 获取当前设置的环境变量  去区分运行环境
  //  开发 cross-env NODE_ENV=development nodemon app.js
  //  生产 cross-env NODE_ENV=production node app.js
  // package.json scripts  进行配置
  // 获取 环境变量 判断环境  req.app.get('env')

  // 实现功能
  const env = req.app.get('env')
  if (env === 'development') {
    // 使用 youch 插件  生成一个美化的页面  包含具体错误信息
    // 1. npm i youch
    // 2. 初始化  const youch = new Youch(err, req)
    // 3. 调用 toHTML()函数  异步函数
    // 4. then() 接收结果  就是HTML格式字符串
    // 5. 响应浏览器
    new Youch(err, req).toHTML().then(html => res.send(html))
  } else {
    // 响应两种页面  404  500  在一个模版实现两种类型的页面  动态渲染
    // 依赖 模版引擎   art-template  express-art-template
    // res.render('模版路径','数据') 函数 渲染模版
    // $data 变量  指向你传入的数据
    res.render('error.art', {status: err.status === 404 ? '404' : '500'})
  }
})
