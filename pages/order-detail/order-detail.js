// pages/order-detail/order-detail.js
import api from '../../utils/api.js';
const req = require("../../utils/req.js");
const back = require("../../utils/back.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jdt:70,
    order_id:'',//订单id
    details:'',//订单详情
    cancelIF: false,//取消订单 弹窗
    cancel_order_reason_list: [
      { text: '拍错了，重新拍', id: 1 },
      { text: '信息写错了，重新拍', id: 2 },
      { text: '我不想买了', id: 3 },
    ],//取消订单理由
    cancel_order_reason_id: 1,//选中的 取消订单理由id
    cancel_order_reason: '拍错了，重新拍',//选中的取消订单理由
  },
  // 删除订单
  delOrder: function (e) {
    console.log(e)
    let that = this
    wx.showModal({
      title: '提示',
      content: '确定删除当前订单吗',
      success: function (res) {
        console.log(res)
        if (res.confirm) {
          // 点击了确定
          let data = {
            order_id: that.data.order_id
          }
          req._post(api.delOrder, data).then(function (res) {
            console.log(res)
            wx.showToast({
              title: res.data.message,
              icon: 'none',
            })
            that.onShow()
          })
        }
      }
    })
  },
  // 跳转到发表评价
  toPingJia: function () {
    let that=this
    wx.navigateTo({
      url: '../fabiaopingjia/fabiaopingjia?order_id=' + that.data.order_id,
    })
  },
  // 去支付
  goPay: function (e) {
    let that=this
    let share_discount_price = 0
    wx.navigateTo({
      url: '../pay/pay?order_id=' + that.data.order_id + '&share_discount_price=' + share_discount_price + '&price=' + e.currentTarget.dataset.price,
    })
  },
  // 约课
  yueke: function () {
    let that=this
    wx.navigateTo({
      url: '../calendar/calendar?order_id=' + that.data.order_id,
    })
  },
  // 取消订单 弹窗
  cancelOrder: function (e) {
    let that = this
    console.log(e)
    wx.showModal({
      title: '提示',
      content: '确定取消当前订单吗',
      success: function (res) {
        console.log(res)
        if (res.confirm) {
          // 点击了确定
          that.setData({
            cancelIF: true,
          })
        }
      }
    })
  },
  // 隐藏取消订单理由 弹窗
  hideCancel: function () {
    let that = this
    that.setData({
      cancelIF: false
    })
  },
  // 取消订单 确定
  qxOrder: function () {
    let that = this
    let data = {
      order_id: that.data.order_id,
      cancel_order_reason: that.data.cancel_order_reason
    }
    req._post(api.cancelOrder, data).then(function (res) {
      console.log(res)
      wx.showToast({
        title: res.data.message,
        icon: 'none'
      })
      that.setData({
        cancelIF: false
      })
      that.onShow()
    })
  },
  // 选择取消订单理由
  xzQXorderLiYou: function (e) {
    console.log(e)
    let that = this
    that.setData({
      cancel_order_reason_id: e.currentTarget.dataset.id,//选中的 取消订单理由id
      cancel_order_reason: e.currentTarget.dataset.text,//选中的取消订单理由
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let that=this
    that.setData({
      order_id: options.order_id
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
    let that=this
    let data = {
      order_id: that.data.order_id
    }
    req._post(api.orderDetail, data).then(function (res) {
      console.log(res)
      that.setData({
        details: res.data.data
      })
    })
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