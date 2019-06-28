// 实现分页逻辑  返回依赖数据生成HTML代码  依赖模版
const template = require('art-template')
const path = require('path')
const url = require('url')
module.exports = (params) => {
  // 分页逻辑
  if (!params.totalPage || params.totalPage === 1) return ''
  // 1. 准备依赖数据  传参｛currPage,totalPage,btnCount｝
  const currPage = params.currPage || 1
  const btnCount = params.btnCount || 5
  const totalPage = params.totalPage

  // 2. 分析渲染时候  需要什么
  // 2.1  需要得到  按钮组 具体的页码   起始页码和结束页码
  // 理想情况 起始页码
  let begin = currPage - (Math.ceil(btnCount / 2) - 1)
  // 特殊情况  可能起始页码小于1
  begin = begin < 1 ? 1 : begin
  // 理想情况 结束页码
  let end = begin + btnCount - 1
  // 特殊情况  结束页码大于总页数
  end = end > totalPage ? totalPage : end

  // 特殊情况
  begin = end - btnCount + 1
  begin = begin < 1 ? 1 : begin
  console.log(begin, end)
  // 2.2 根据 起始页码和结束页码 渲染页面
  // 2.3 使用模版引擎生成HTML格式字符串
  // 2.4 前端 template('id',数据)  后端 template('路径'，数据)

  // 2.5 渲染按钮的地址  能够根据页码生成URL地址函数
  // 页码 page  当前url params.req.url
  // a. 转换成对象
  const urlObject = url.parse(params.req.url, true) // query 就是对象
  const getUrl = (page) => {
    // b. 修改page的值
    urlObject.query.page = page
    // c. 转换成url字符串  url.format(urlObject)
    // d. 转换的时候如果想要query对象的值拼接？后面  需要把 urlObject.search property is undefined
    urlObject.search = undefined
    const urlString = url.format(urlObject)
    return urlString
  }
  console.log(getUrl(100))

  const templatePath = path.join(__dirname, '../views/components/pagination.art')
  return template(templatePath, {begin, end, totalPage, currPage, getUrl,urlObject})
}
