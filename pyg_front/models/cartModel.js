const axios = require('./http')
exports.addCart = (userId, productId, amount) => {
  return axios.post(`users/${userId}/cart`, {
    id: productId, amount
  }).then(res => res.data)
    .catch(err => Promise.reject(err))
}

exports.getCart = (userId) => {
  return axios.get(`users/${userId}/cart`)
    .then(res => res.data)
    .catch(err => Promise.reject(err))
}

exports.editCart = (userId,productId,amount) => {
  return axios.patch(`users/${userId}/cart/${productId}`,{amount})
    .then(res => res.data)
    .catch(err => Promise.reject(err))
}

exports.removeCart = (userId,productId) => {
  return axios.delete(`users/${userId}/cart/${productId}`)
    .then(res => res.data)
    .catch(err => Promise.reject(err))
}
