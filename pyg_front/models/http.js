// 返回  已经配置好的 axios 实例
const axios = require('axios')
const instance = axios.create({
  baseURL: 'http://localhost:8000/v1/',
  auth: {
    username: 'newshop-frontend',
    password: 'd8667837fce5a0270a35f4a8fa14be479fadc774'
  }
})

module.exports = instance
