// 中间件定义
const {site} = require('./config')
const categoryModel = require('./models/categoryModel')
// 全局的处理
exports.global = (req, res, next) => {
  // 1. 设置网站头部
  res.locals.site = site

  // 3. 设置用户信息
  res.locals.user = req.session.user || {}

  // 2. 获取分类数据且设置模版使用
  // 2.1 数据获取时间太长  优化
  // 2.2 在 app 实例存储数据  缓存分类
  // 2.3 req.locals  每次请求都是新的对象
  // 2.4 req.app.locals 挂载数据的对象
  // 2.5  判断是否缓存数据 如果缓存走缓存 如果没有走接口
  if (req.app.locals.category) {
    res.locals.category = req.app.locals.category
    next()
  } else {
    categoryModel.getCategory().then(data => {
      // 缓存
      req.app.locals.category = data
      res.locals.category = data
      next()
    }).catch(err => next(err))
  }
}

// 登录拦截
exports.checkLogin = (req, res, next) => {
  if (!req.session.user) return res.redirect('/login?returnUrl=' + encodeURIComponent(req.url))
  next()
}
