// pages/mine/mine.js
import api from '../../utils/api.js';
const req = require("../../utils/req.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:'',//个人资料
    m_id:'',//用户id
  },
  // 跳转到 个人中心
  toUser:function(){
    if (wx.getStorageSync('m_id') != ''){
      wx.navigateTo({
        url: '../user/user',
      })
    }else{
      // 未登录 跳转到登录页
      wx.showModal({
        title: '提示',
        content: '请先去登录或者注册',
        success: function (res) {
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
  // 跳转到 设置
  toSet:function(){
    wx.navigateTo({
      url: '../set/set',
    })
  }, 
  // 跳转到 站内消息
  toMessage:function(){
    if (wx.getStorageSync('m_id') != '') {
      wx.navigateTo({
        url: '../mine-message/mine-message',
      })
    } else {
      // 未登录 跳转到登录页
      wx.showModal({
        title: '提示',
        content: '请先去登录或者注册',
        success: function (res) {
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
  // 跳转到 我的收藏
  toCollection:function(){
    if (wx.getStorageSync('m_id') != '') {
      wx.navigateTo({
        url: '../mine-collection/mine-collection',
      })
    } else {
      // 未登录 跳转到登录页
      wx.showModal({
        title: '提示',
        content: '请先去登录或者注册',
        success: function (res) {
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
  // 跳转到 登录 注册
  login:function(){
    wx.navigateTo({
      url: '../login/login',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    if (wx.getStorageSync('m_id')!=''){
      // 已登录
      let data = {
        m_id: wx.getStorageSync('m_id')
      }
      // 获取个人资料
      req._post(api.userinfo, data).then(function (res) {
        console.log(res)
        that.setData({
          userinfo: res.data.data,
          m_id: res.data.data.id
        })
      }).catch(function (res) {
        console.log(res)
      })
    }else{
      // 未登录 跳转到登录页
      wx.showModal({
        title: '提示',
        content: '请先去登录或者注册',
        success: function (res) {
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