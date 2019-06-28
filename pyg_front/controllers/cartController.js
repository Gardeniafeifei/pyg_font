// 维护购物相关的业务
const {cart} = require('../config')
const productModel = require('../models/productModel')
const cartModel = require('../models/cartModel')

exports.addCart = (req, res, next) => {
  const id = req.params.id
  const amount = +req.query.count || 1
  if (!req.session.user) {
    // 1. 获取购物车信息
    const cookieString = req.cookies[cart.key] || '[]'
    const cartList = JSON.parse(cookieString)
    // 2. 把这次请求的  商品和数量  修改购物车信息
    // const id = req.params.id
    // const amount = +req.query.count || 1
    // 2.1 可能之前就存储过该商品的信息
    // Array.find()  返回符合条件的值
    const product = cartList.find(item => item.id === id)
    if (product) {
      product.amount = +product.amount + amount
    }
    // 2.2 之前没有存储过
    else {
      cartList.push({id, amount})
    }
    // 3. 再次存储在客户端  更新购物车
    const expires = new Date(Date.now() + cart.expires)
    res.cookie(cart.key, JSON.stringify(cartList), {expires})

    res.redirect(`/cart/add.html?id=${id}&count=${amount}`)
  } else {
    // 登录状态下  添加购物车
    cartModel.addCart(req.session.user.id, id, amount)
      .then(data => {
        res.redirect(`/cart/add.html?id=${id}&count=${amount}`)
      }).catch(err => next(err))
  }
}

// 成功页面
exports.addCartHtml = (req, res, next) => {
  // 获取参数
  const id = req.query.id
  const amount = +req.query.count || 1
  // 根据ID查商品信息
  productModel.getProductBase(id)
    .then(data => {
      res.locals.product = data
      res.locals.product.count = amount
      res.render('cartAdd.art')
    }).catch(err => next(err))
}
//渲染页面
exports.cart = (req, res, next) => {
  res.render('cart.art')
}

//返回json  查询购物车
exports.listCart = (req, res, next) => {
  if (!req.session.user) {
    // 提供数据  （id,名称，图片，单价，购物车数量，小计） 组成数组
    // 1. 获取购物车信息   cookie
    const cookieString = req.cookies[cart.key] || '[]'
    const cartList = JSON.parse(cookieString)
    // 2. 购物车的信息无法提供页面渲染
    // 2.1 根据购物车存储的商品ID去获取数据
    // 2.2 获取到了数据  不包含 购物车数量和小计
    // 2.3 把这些信息和查询的信息合并
    // Array.map()  把一个数组映射成一个新数组
    // 根据 cartList 数组 中的每一项的ID 去生成新的数组  是promise对象组成的数组
    const promiseArr = cartList.map(item => productModel.getProductBase(item.id))
    Promise.all(promiseArr)
      .then(results => {
        // results 商品列表
        // 3. 已json字符串形式给客户端
        res.send({
          status: 200,
          result: results.map((item, i) => {
            return {
              id: item.id,
              name: item.name,
              thumbnail: item.thumbnail,
              // toFixed() 只能数字调用
              price: parseFloat(item.price).toFixed(2),
              count: cartList[i].amount,
              // 浮点数运算   显示小数点后两位
              xj: parseFloat(item.price * cartList[i].amount).toFixed(2)
            }
          })
        })
      }).catch(err => {
      res.send({
        status: 500,
        msg: '获取购物车信息失败'
      })
    })
  } else {
    // 登录状态下  购物车列表信息查询返回的json
    cartModel.getCart(req.session.user.id)
      .then(data => {
        // 返回列表
        res.send({
          status: 200,
          result: data.map(item => {
            return {
              id: item.id,
              name: item.name,
              thumbnail: item.thumbnail,
              // toFixed() 只能数字调用
              price: parseFloat(item.price).toFixed(2),
              count: item.amount,
              // 浮点数运算   显示小数点后两位
              xj: parseFloat(item.price * item.amount).toFixed(2)
            }
          })
        })
      }).catch(err => {
      res.send({
        status: 500,
        msg: '获取购物车信息失败'
      })
    })
  }
}

//返回json  修改数量
exports.editCart = (req, res, next) => {
  // 接收   id   count
  const id = req.query.id
  const count = +req.query.count
  if (!req.session.user) {
    // 1. 获取cookie
    const cookieString = req.cookies[cart.key] || '[]'
    const cartList = JSON.parse(cookieString)
    // 2. 根据现在ID去找到对应的数据 然后去修改该数据的amount字段
    const product = cartList.find(item => item.id === id)
    product.amount = count
    // 3. 把修改好的数据存储在cookie中
    const expires = new Date(Date.now() + cart.expires)
    res.cookie(cart.key, JSON.stringify(cartList), {expires})
    res.send({
      status: 200,
      result: null
    })
  } else {
    // 登录状态下  购物车数量修改
    cartModel.editCart(req.session.user.id, id, count)
      .then(data => {
        res.send({
          status: 200,
          result: null
        })
      }).catch(err => {
      res.send({
        status: 500,
        result: '修改数量失败'
      })
    })
  }
}

//返回json  删除
exports.removeCart = (req, res, next) => {
  const id = req.query.id
  if (!req.session.user) {
    // 1. 获取cookie
    const cookieString = req.cookies[cart.key] || '[]'
    const cartList = JSON.parse(cookieString)
    // 2. 根据现在ID去找到对应的数据且删除
    const index = cartList.findIndex(item => item.id === id)
    cartList.splice(index, 1)
    // 3. 把修改好的数据存储在cookie中
    const expires = new Date(Date.now() + cart.expires)
    res.cookie(cart.key, JSON.stringify(cartList), {expires})
    res.send({
      status: 200,
      result: null
    })
  } else {
    cartModel.removeCart(req.session.user.id, id)
      .then(data => {
        res.send({
          status: 200,
          result: null
        })
      }).catch(err => {
      res.send({
        status: 500,
        result: '删除失败'
      })
    })
  }
}
