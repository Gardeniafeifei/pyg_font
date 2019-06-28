const axios = require('./http')
// 封装和分类相关的数据操作
// 获取分类数据
exports.getCategory = () => {
  return axios.get('categories?format=tree')
    .then(res => res.data)
    .catch(err => Promise.reject(err))
}
// 获取分类下的商品
exports.getProductsPager = (id, page, per_page, sort) =>{
  return axios.get(`categories/${id}/products?page=${page}&per_page=${per_page}&sort=${sort}`)
    .then(res => {
      // 还需要分页数据  在响应头中
      // res 响应报文对象  res.headers 获取响应头
      // console.log(res.headers)
      return {
        list: res.data,
        totalPage: + res.headers['x-total-pages']
      }
    })
    .catch(err => Promise.reject(err))
}

// 获取分类详情 包含 父级分类
exports.getCategoryAndParent = (id) =>{
  return axios.get(`categories/${id}?include=parent`)
    .then(res => res.data)
    .catch(err => Promise.reject(err))
}

