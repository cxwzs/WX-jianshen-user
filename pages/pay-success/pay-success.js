// pages/pay-success/pay-success.js
import api from '../../utils/api.js';
const req = require("../../utils/req.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shareIF:true,//分享弹窗
    order_id:'',//订单id
    price:'',//订单价格
  },
  // 下次再约
  next:function(){
    wx.reLaunch({
      url: '../index/index',
    })
  },
  // 立即约课
  now:function(){
    let that = this
    wx.navigateTo({
      url: '../calendar/calendar?order_id=' + that.data.order_id,
    })
  },
  // 隐藏分享弹窗
  hideShare:function(){
    let that = this
    that.setData({
      shareIF: false
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let that=this
    that.setData({
      order_id: options.order_id,
      price: options.price
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let that=this
    // 分享 获得优惠券
    let data={
      order_id: that.data.order_id||'',
      m_id: wx.getStorageSync('m_id')      
    }
    req._post(api.coupon,data).then(function(res){
      console.log(res)
      wx.showToast({
        title: res.data.message,
        icon:'none'
      })
    })
    // 分享
    return{
      title: '健身',
      path: '/pages/index/index'
    }
  }
})