// 处理首页相关的业务
const homeModel = require('../models/homeModel')
exports.home = (req, res, next) => {
  //throw createError(500,'Server Error')
  // const env = req.app.get('env')
  // res.send(env)
  //res.send('ok!!!')
  // 一个异步操作
  // homeModel.getLike().then(data=>{
  //   res.send(data)
  // })
  // 一个异步操作
  // homeModel.getBanner().then(data=>{
  //   res.locals.banner = data
  //   res.render('home.art')
  // }).catch(err=> next(err))
  //  两个异步操作一起执行  等耗时长的结束  获取数据  渲染页面
  // 异步操作数组  promise数组
  Promise.all([homeModel.getBanner(), homeModel.getLike(), homeModel.getShow(), homeModel.getFun()])
    .then(results => {
      // results 所有的异步操作的返回结果  且顺序和你传入promise对象的顺序一致
      res.locals.banner = results[0]
      res.locals.like = results[1]
      res.locals.show = results[2]
      res.locals.fun = results[3]
      //res.send(res.locals)
      res.render('home.art')
    }).catch(err => next(err))
}

exports.like = (req, res, next) => {
  homeModel.getLike()
    .then(data => {
      res.send({
        status: 200,
        result: data
      })
    })
    .catch(err => {
      res.send({
        status: 500,
        msg: '获取猜你喜欢数据失败'
      })
    })
}

exports.show = (req, res, next) => {
  homeModel.getShow()
    .then(data => {
      res.send({
        status: 200,
        result: data
      })
    })
    .catch(err => {
      res.send({
        status: 500,
        msg: '获取今日推荐数据失败'
      })
    })
}

exports.fun = (req, res, next) => {
  homeModel.getShow()
    .then(data => {
      res.send({
        status: 200,
        result: data
      })
    })
    .catch(err => {
      res.send({
        status: 500,
        msg: '获取有趣区数据失败'
      })
    })
}