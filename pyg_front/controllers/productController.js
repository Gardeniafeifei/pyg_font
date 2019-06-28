const categoryModel = require('../models/categoryModel')
const productModel = require('../models/productModel')
const homeModel = require('../models/homeModel')
const paginationUtil = require('../utils/pagination')
const url = require('url')
// 分类下商品列表
exports.cateList = (req, res, next) => {
  // 获取路径传参   req.params
  // 获取地址？传参  req.query
  // 获取post传参  req.body
  const id = req.params.id
  // 在？后提交数据  page
  const page = req.query.page || 1
  // 通过分类ID去获取商品列表数据且带分页
  // categoryModel.getProductsPager(id, page, 10)
  //   .then(data => {
  //     res.locals.list = data.list
  //     res.render('list.art')
  //   }).catch(err => next(err))

  // 默认排序 commend
  // 销量 quantity
  // 新品 market_time
  // 价格  生效  -price  降序 price
  const sort = req.query.sort || 'commend'

  Promise.all([
    categoryModel.getProductsPager(id, page, 5, sort),
    categoryModel.getCategoryAndParent(id)
  ]).then(results => {
    res.locals.list = results[0].list
    res.locals.bread = results[1]

    // req.url 当前请的地址
    // 解析url地址 得到pathname
    const urlObject = url.parse(req.url)
    res.locals.currUrl = urlObject.pathname
    res.locals.sort = sort

    // 分页HTML代码
    res.locals.pagination = paginationUtil({
      currPage: +page,
      totalPage: results[0].totalPage,
      req
    })
    res.render('list.art')
    //res.send(res.locals)
  }).catch(err => next(err))
}

// 搜索下商品列表
exports.searchList = (req, res, next) => {
  // 1. 搜索关键字
  const q = req.query.q
  // 2. 排序类型
  const sort = req.query.sort || 'commend'
  // 3. 当前页码  每页显示条数
  const page = req.query.page || 1
  const per_page = 5
  // 4. 商品列表  根据（搜索关键字，排序方式，当前页码，每页显示条数）去获取

  // 不能传中文
  // 地址栏编码  URI
  // 中文 转换 URI 编码
  //encodeURIComponent('电脑')
  //"%E7%94%B5%E8%84%91"
  //decodeURIComponent('%E7%94%B5%E8%84%91')
  //"电脑"

  productModel.getProductsPager(encodeURIComponent(q), page, per_page, sort)
    .then(data => {
      // 前端页面需要哪些数据？？？
      res.locals.q = q
      res.locals.sort = sort
      res.locals.list = data.list
      res.locals.pagination = paginationUtil({
        currPage: +page,
        totalPage: data.totalPage,
        req
      })
      res.render('list.art')
    }).catch(err => next(err))
}

exports.detail = (req, res, next) => {
  // - 面包屑
  // - 商品图片
  // - 商品基本信息
  // - 相关商品
  // - 商品介绍
  const id = req.params.id
  Promise.all([
    productModel.getProduct(id),
    homeModel.getLike()
  ]).then(results => {
    //res.send(results)
    res.locals.bread = results[0].category
    res.locals.pictures = results[0].pictures
    res.locals.info = {
      id:results[0].id,
      name: results[0].name,
      price: results[0].price
    }
    res.locals.like = results[1]
    res.locals.introduce = results[0].introduce
    res.render('item.art')
  }).catch(err => next(err))
}
