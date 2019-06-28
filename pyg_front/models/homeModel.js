// 提供数据操作的API
const axios = require('./http')
// 获取轮播图数据
exports.getBanner = () => {
  // const abc = axios.get('settings/home_slides').then(res => {
  //   // res.data 后端响应的数据
  //   // console.log(res.data)
  //   // 直接返回 数据  也会包装一个promise对象
  //   return res.data
  // }).catch(err => {
  //   return Promise.reject(err)
  // })
  // return abc

  return axios.get('settings/home_slides')
    .then(res => res.data)
    .catch(err => Promise.reject(err))
}

// 获取猜你喜欢的数据  商品列表
exports.getLike = () => {
  return axios.get(`products?type=like&limit=6`,)
    .then(res => res.data)
    .catch(err => Promise.reject(err))
}

// 获取今日推荐数据 商品列表
exports.getShow = () => {
  return axios.get(`products?type=show&limit=6`,)
    .then(res => res.data)
    .catch(err => Promise.reject(err))
}

// 获取有趣区数据 商品列表
exports.getFun = () => {
  return axios.get(`products?type=fun&limit=3`,)
    .then(res => res.data)
    .catch(err => Promise.reject(err))
}