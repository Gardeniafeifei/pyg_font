// 定义路由规则   不去实现具体的业务 controller
const express = require('express')
const router = express.Router()

const {checkLogin} = require('./middleware')

const homeController = require('./controllers/homeController')
const userController = require('./controllers/userController')
const productController = require('./controllers/productController')
const cartController = require('./controllers/cartController')
// 首页渲染
router.get('/', homeController.home)
// 猜你喜欢接口
router.get('/like', homeController.like)
// 商品列表
router.get('/list/:id', productController.cateList)
router.get('/list', productController.searchList)
// 商品详情
router.get('/item/:id', productController.detail)
// 购物添加
router.get('/cart/add/:id', cartController.addCart)  //添加购物车逻辑
router.get('/cart/add.html', cartController.addCartHtml)  //添加购物车成功页面
router.get('/cart', cartController.cart) //购物车页面
router.get('/cart/list', cartController.listCart)  //接口  返回购物车列表数据
router.get('/cart/edit', cartController.editCart)  //接口  修改商品的数量
router.get('/cart/remove', cartController.removeCart)  //接口  删除商品
// 登录页
router.get('/login',userController.login)
// 登录逻辑
router.post('/login',userController.loginLogic)
// 退出
router.get('/logout',userController.logout)
// 个人中心 首页
router.get('/member',checkLogin, userController.member)
// 个人中心 订单列表
router.get('/order',checkLogin, userController.order)
// 注册页
router.post('/register',userController.register)
// 注册逻辑
router.get('/exists',userController.exists)
// 验证用户名

module.exports = router
