// 配置信息

// 1. 网站头部信息
const site = {
  title: '熊贝儿',
  description: '熊贝儿(xiongbeier)-专业的综合网上购物商城，为您提供正品低价的购物选择、优质便捷的服务体验。商品来自全球数十万品牌商家，囊括家电、手机、电脑、服装、居家、母婴、美妆、个护、食品、生鲜等丰富品类，满足各种购物需求。',
  Keywords:'网上购物,网上商城,家电,手机,电脑,服装,居家,母婴,美妆,个护,食品,生鲜'
}

// 2. 购物车信息
const cart = {
  key: 'hm69_cart_info_list',
  expires: 30 * 24 * 60 * 60 * 1000
}

// 3. mysql的链接配置

const mysqlOption =  {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'newshop'
}

// 4. 自动登录
const autoLoginConfig = {
  key: 'hm69_auto_login',
  expires: 7 * 24 * 60 * 60 * 1000
}

module.exports = { site, cart, mysqlOption,autoLoginConfig }
