const api = {
  webSk_md_url: '/webSk/md', //实时行情接口
  webSk_service_url: '/webSk/service', //Websocket服务
  banner_list_url:'/advertisement/query',//首页轮播图
  user_login :'/user/login',//登陆
  user_refresh_url: '/user/refresh',//个人信息
  product_search_url: '/v1.2/product/search', //获取商品(现货/求购大厅)
  product_userSelection_url: '/v1.2/product/queryUserSelection', //获取商品(自选)
  getHotCategory_url: '/category/getHotCategory', //获取热门品种
}

export default api;