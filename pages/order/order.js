// pages/order/order.js
import api from '../../utils/api.js';
const req = require("../../utils/req.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav: '', //选中的导航 1--待支付 2--进行中 4--已完成 全部 空
    cancelIF: false, //取消订单 弹窗
    list: [], //订单列表
    stay_pay: 0, //待支付 订单数量
    page: 1, //分页
    cancel_order_reason_list: [{
        text: '拍错了，重新拍',
        id: 1
      },
      {
        text: '信息写错了，重新拍',
        id: 2
      },
      {
        text: '我不想买了',
        id: 3
      },
    ], //取消订单理由
    cancel_order_reason_id: 1, //选中的 取消订单理由id
    cancel_order_reason: '', //选中的取消订单理由
    order_id: '', //订单id
  },
  // 取消订单 确定
  qxOrder: function() {
    let that = this
    let data = {
      order_id: that.data.order_id,
      cancel_order_reason: that.data.cancel_order_reason
    }
    req._post(api.cancelOrder, data).then(function(res) {
      console.log(res)
      wx.showToast({
        title: res.data.message,
        icon: 'none'
      })
      that.setData({
        cancelIF: false
      })
      that.onLoad()
    })
  },
  // 选择取消订单理由
  xzQXorderLiYou: function(e) {
    console.log(e)
    let that = this
    that.setData({
      cancel_order_reason_id: e.currentTarget.dataset.id, //选中的 取消订单理由id
      cancel_order_reason: e.currentTarget.dataset.text, //选中的取消订单理由
    })
  },
  // 约课
  yueke: function(e) {
    console.log(e)
    wx.navigateTo({
      url: '../calendar/calendar?order_id=' + e.currentTarget.dataset.order_id,
    })
  },
  // 去支付
  goPay: function(e) {
    console.log(e)
    let share_discount_price = 0
    wx.navigateTo({
      url: '../pay/pay?order_id=' + e.currentTarget.dataset.order_id + '&share_discount_price=' + share_discount_price + '&price=' + e.currentTarget.dataset.price,
    })
  },
  // 跳转到发表评价
  toPingJia: function(e) {
    console.log(e)
    wx.navigateTo({
      url: '../fabiaopingjia/fabiaopingjia?order_id=' + e.currentTarget.dataset.order_id,
    })
  },
  // 跳转到订单详情
  toOrderDetail: function(e) {
    console.log(e)
    wx.navigateTo({
      url: '../order-detail/order-detail?order_id=' + e.currentTarget.dataset.order_id,
    })
  },
  // 取消订单
  cancelOrder: function(e) {
    let that = this
    console.log(e)
    wx.showModal({
      title: '提示',
      content: '确定取消当前订单吗',
      success: function(res) {
        console.log(res)
        if (res.confirm) {
          // 点击了确定
          that.setData({
            cancelIF: true,
            order_id: e.currentTarget.dataset.order_id
          })
        }
      }
    })
  },
  // 隐藏取消订单理由 弹窗
  hideCancel: function() {
    let that = this
    that.setData({
      cancelIF: false
    })
  },
  // 删除订单
  delOrder: function(e) {
    console.log(e)
    let that = this
    wx.showModal({
      title: '提示',
      content: '确定删除当前订单吗',
      success: function(res) {
        console.log(res)
        if (res.confirm) {
          // 点击了确定
          let data = {
            order_id: e.currentTarget.dataset.order_id
          }
          req._post(api.delOrder, data).then(function(res) {
            console.log(res)
            wx.showToast({
              title: res.data.message,
              icon: 'none',
            })
            that.onLoad()
          })
        }
      }
    })
  },
  // 选择导航
  xzNav: function(e) {
    let that = this
    console.log(e)
    if (wx.getStorageSync('m_id') != '') {
      that.setData({
        nav: e.currentTarget.dataset.nav || ''
      })
      let data = {
        m_id: wx.getStorageSync('m_id'),
        status: that.data.nav || '',
        p: 1
      }
      req._post(api.orderList, data).then(function(res) {
        console.log(res)
        that.setData({
          list: res.data.data.list,
          stay_pay: res.data.data.stay_pay
        })
      })
    } else {
      // 未登录 跳转到登录页
      wx.showModal({
        title: '提示',
        content: '请先去登录或者注册',
        success: function(res) {
          console.log(res)
          if (res.confirm) {
            // 点击了确定
            wx.navigateTo({
              url: '../login/login',
            })
          }
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    if (wx.getStorageSync('m_id') != '') {
      let data = {
        m_id: wx.getStorageSync('m_id'),
        status: that.data.nav || '',
        p: 1
      }
      req._post(api.orderList, data).then(function(res) {
        console.log(res)
        that.setData({
          list: res.data.data.list,
          stay_pay: res.data.data.stay_pay
        })
      })
    } else {
      // 未登录 跳转到登录页
      wx.showModal({
        title: '提示',
        content: '请先去登录或者注册',
        success: function(res) {
          console.log(res)
          if (res.confirm) {
            // 点击了确定
            wx.navigateTo({
              url: '../login/login',
            })
          }
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    let that = this
    let data = {
      m_id: wx.getStorageSync('m_id'),
      status: that.data.nav || '',
      p: 1
    }
    req._post(api.orderList, data).then(function(res) {
      console.log(res)
      that.setData({
        list: res.data.data.list,
        stay_pay: res.data.data.stay_pay
      })
      //页面加载完毕事件
      wx.hideLoading()
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    let that = this
    let data = {
      m_id: wx.getStorageSync('m_id'),
      status: that.data.nav || '',
      p: that.data.page + 1
    }
    req._post(api.orderList, data).then(function(res) {
      console.log(res)
      if (res.data.data.list.length != 0) {
        let content = that.data.list.concat(res.data.data.list)
        that.setData({
          list: content,
          page: that.data.page + 1
        })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})