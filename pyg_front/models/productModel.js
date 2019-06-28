const axios = require('./http')
// 获取搜索下的商品
exports.getProductsPager = (q, page, per_page, sort) =>{
  return axios.get(`/products?page=${page}&per_page=${per_page}&sort=${sort}&q=${q}`)
    .then(res => {
      return {
        list: res.data,
        totalPage: + res.headers['x-total-pages']
      }
    })
    .catch(err => Promise.reject(err))
}
// 获取商品详情
exports.getProduct = (id) =>{
  return axios.get(`products/${id}?include=introduce,category,pictures`)
    .then(res => res.data)
    .catch(err => Promise.reject(err))
}

// 获取商品基本信息
exports.getProductBase = (id) =>{
  return axios.get(`products/${id}`)
    .then(res => res.data)
    .catch(err => Promise.reject(err))
}
