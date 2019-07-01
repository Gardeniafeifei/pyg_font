const axios = require('./http')
// 登录操作
exports.login = (username, password) => {
  return axios.post('users/login', {username, password})
    .then(res => res.data)
    .catch(err => Promise.reject(err))
}

// 获取用户下的所有订单
exports.getOrderList = (userId) => {
  return axios.get(`orders?user_id=${userId}`)
    .then(res => res.data)
    .catch(err => Promise.reject(err))
}

// 注册操作
exports.register = (username, email, password) => {
  return axios.post('users/register', {username, email, password})
    .then(res => res.data)
    .catch(err => Promise.reject(err))
}

// 获取用户名或邮箱的存在情况操作
exports.exists = (username, email) => {
  return axios.get(`users/exists?username=${username}&email=${email}`)
    .then(res => res.data)
    .catch(err => Promise.reject(err))
}
