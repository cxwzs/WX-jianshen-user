//获取应用实例
const app = getApp()

let api={
  // 首页数据
  index: app.dizhitou +'Index/index',
  // 首页数据 精选项目 更多
  selected: app.dizhitou + 'Index/selected',
  // 首页数据 最新项目 更多
  newsProject: app.dizhitou + 'Index/news',
  // 登录
  login: app.dizhitou + 'User/login',
  // 个人中心
  userinfo: app.dizhitou + 'User/detaile',
  // 个人中心 更新个人资料
  upUser: app.dizhitou + 'User/upUser',
  // 获取验证码
  verify: app.dizhitou + 'Verify/getVerify',
  // 个人中心 我的收藏
  collectionList: app.dizhitou + 'User/collectionList',
  // 个人中心 站内消息
  news: app.dizhitou + 'User/news',
  // 个人中心 站内消息 消息详情
  news_details: app.dizhitou + 'User/news_details',
  // 个人中心 设置 帮助文档
  articleList: app.dizhitou + 'Article/articleList',
  // 个人中心 设置 帮助文档 详情
  articleDetail: app.dizhitou + 'Article/articleDetail',
  // 个人中心 设置 意见反馈
  opinion: app.dizhitou + 'User/Opinion',
  // 个人中心 设置 关于我们
  about: app.dizhitou + 'User/about',
  //项目详情
  details: app.dizhitou + 'Index/details',
  //分类课程
  classCurriculum: app.dizhitou + 'Index/classCurriculum',
  // 确认订单 分享折扣金额
  shareDiscount: app.dizhitou + 'Flow/shareDiscount',
  // 确认订单
  submitOrder: app.dizhitou + 'Flow/submitOrder',
  // 支付
  orderPay: app.dizhitou + 'Flow/OrderPay',
  // 订单列表
  orderList: app.dizhitou + 'OrderInfo/orderList',
  // 订单列表 订单详情
  orderDetail: app.dizhitou + 'OrderInfo/CoachOrderDetail',
  // 订单列表 删除订单
  delOrder: app.dizhitou + 'OrderInfo/UserOrderDel',
  // 订单列表 取消订单
  cancelOrder: app.dizhitou + 'OrderInfo/cancelOrder',
  // 预约
  appointment: app.dizhitou + 'Flow/appointment',
  // 评价订单 
  comment: app.dizhitou + 'OrderInfo/comment',
  // 验证 验证码
  checkVerify: app.dizhitou + 'Verify/checkVerify',
  // 项目详情 收藏/取消收藏
  collection: app.dizhitou + 'Index/Collection',
  // 首页 搜索结果
  search: app.dizhitou + 'Index/search',
  // 分享的优惠券
  coupon: app.dizhitou + 'Flow/coupon',
  // 项目详情 更多评价
  commentList: app.dizhitou + 'Index/commentList',
}

export default api