// pages/pay/pay.js
import api from '../../utils/api.js';
const req = require("../../utils/req.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    price: '',// 课时价格 / 实际支付金额
    share_discount_price: 0,//分享折扣金额
    order_id:'',//订单id
  },
  // 支付
  pay:function(){
    let that=this
    let data={
      m_id: wx.getStorageSync('m_id'),
      order_id: that.data.order_id
    }
    // 支付 微信支付
    req._post(api.orderPay,data).then(function(res){
      console.log(res)
      wx.requestPayment({
        timeStamp: res.data.data.timeStamp.toString(),
        nonceStr: res.data.data.nonceStr,
        package: res.data.data.package,
        signType: 'MD5',
        paySign: res.data.data.paySign,
        success:function(res){
          console.log(res,'支付成功')
          wx.showToast({
            title: '支付成功',
            icon:'none',
            duration:1500,
            success:function(){
              setTimeout(function(){
                wx.reLaunch({
                  url: '../pay-success/pay-success?order_id=' + that.data.order_id + '&price=' + that.data.price,
                })
              },1500)
            }
          })
        },
        fail:function(err){
          console.log(err,'支付失败')
        }
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let that=this
    that.setData({
      price: options.price,// 课时价格 / 实际支付金额
      share_discount_price: options.share_discount_price||0,//分享折扣金额
      order_id: options.order_id,//订单id
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

  }
})