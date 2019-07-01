// 处理用户相关的业务
const svgCaptcha = require('svg-captcha')
const createError = require('http-errors')
const userModel = require('../models/userModel')
const cartModel = require('../models/cartModel')
const {cart, autoLoginConfig} = require('../config')
// 登录页面
exports.login = (req, res, next) => {
  // 生成验证码  {data:'svg',text:'结果'}
  const captcha = svgCaptcha.createMathExpr({width: 80, height: 30, fontSize: 28})
  res.locals.svg = captcha.data
  // captcha.text  验证用户提交的验证码
  req.session.captchaText = captcha.text
  // 给页面表单  当表单提交的时候
  res.locals.returnUrl = req.query.returnUrl || '/member'
  res.render('login.art')
}
// 登录逻辑
exports.loginLogic = (req, res, next) => {
  const {username, password, code, autoLogin} = req.body
  Promise.resolve().then(() => {
    // 1. 登录-数据校验
    if (!(username && password && code)) throw createError(456, '表单信息不完整')
    return Promise.resolve()
  }).then(() => {
    // 2. 登录-验证码校验
    // 2.1 怎么校验  code 依赖渲染页面的时候成功的验证码对象  ｛data:'',text:''｝
    // 2.2 code 去和 验证码对象.text 去比对
    // 2.3 需要存储 之前生成验证码对象 的text字段的值
    // 2.4 app是应用实例  不同的客户端使用的是同一个实例  不行的
    // 2.5 存储的地方 只能当前客户端使用   req.session
    if (code !== req.session.captchaText) throw createError(456, '验证码有误')
    return userModel.login(username, password)
  }).then((data) => {
    // 3. 登录-用户名密码校验
    // 严谨判断 data 该用户信息 认为校验成功
    if (!data) throw createError(456, '用户不存在')
    // 存储登录信息  用户信息
    req.session.user = data
    return Promise.resolve(data)
  }).then((user) => {
    // 4. 登录-自动登录准备
    if (autoLogin == 1) {
      const expires = new Date(Date.now() + autoLoginConfig.expires)
      const autoUser = {id: user.id, pw: user.password}
      res.cookie(autoLoginConfig.key, JSON.stringify(autoUser), {expires})
    }

    // 根据cookie中的购物车生成promise对象
    const cookieString = req.cookies[cart.key] || '[]'
    const cartList = JSON.parse(cookieString)
    const promiseArr = cartList.map(item => cartModel.addCart(user.id, item.id, item.amount))
    return Promise.all(promiseArr)
  }).then(results => {
    // 合并购物车成功
    // 清除购物车的cookie信息
    res.cookie(cart.key, '[]')

    //登录逻辑结束  默认跳转  个人中心首页
    res.redirect(req.body.returnUrl || '/member')
  }).catch(err => {
    // a. 设置错误提示
    // b. 生成验证码
    // c. 渲染登录页面

    // catch 捕获  主动抛  程序抛  都捕获
    // 区分错误  主动抛  err.message 错误原因
    // 区分错误  程序抛  获取中文提示 || 自定义提示
    if (err.status === 456) {
      res.locals.errMsg = err.message
    } else {
      res.locals.errMsg = err.response.data.message || '服务器繁忙'
    }
    const captcha = svgCaptcha.createMathExpr({width: 80, height: 30, fontSize: 28})
    res.locals.svg = captcha.data
    req.session.captchaText = captcha.text
    // 给页面表单  当表单提交的时候
    res.locals.returnUrl = req.body.returnUrl || '/login'
    res.render('register.art')
  })
}

//渲染个人中心
exports.member = (req, res, next) => {
  // res.locals.user = req.session.user
  res.render('member-home.art')
}
// 退出
exports.logout = (req, res, next) => {
  req.session.user = null
  res.redirect('/login')
}

// 订单
exports.order = (req, res, next) => {
  userModel.getOrderList(req.session.user.id)
    .then(data => {
      res.locals.orderList = data
      res.render('member-order.art')
    })
    .catch(err => next(err))
}

// 
exports.register = (req, res, next) => {
  res.locals.returnUrl = req.query.returnUrl || '/member'
  res.render('register.art');
}

// 注册逻辑
exports.registerLogic = (req, res, next) => {
  const {username, email, password, affirm_pwd} = req.body;
  // res.send({d:123})
  Promise.resolve().then(() => {
    // 1. 注册-数据校验
    if (!(username && email && password && affirm_pwd)) throw createError(456, '表单信息不完整')
    return Promise.resolve()
  }).then(() => {
    // 2. 注册-密码确认
    if (affirm_pwd !== password) throw createError(456, '两次密码输入不匹配')
    return Promise.resolve()
  }).catch(err => {
    if (err.status === 456) {
      res.locals.errMsg = err.message
    } else {
      res.locals.errMsg = err.response.data.message || '服务器繁忙'
    }
    res.locals.returnUrl = req.body.returnUrl || '/member'
    res.render('register.art')
  })
}

// 验证重复用户名
exports.exists =async (req, res, next) => {
  const {username, email} = req.body;
  const result = await userModel.exists(username, email);
  res.send(result);
  console.log(username, email);
}
