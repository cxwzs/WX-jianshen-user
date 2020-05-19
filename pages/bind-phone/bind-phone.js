// pages/bind-phone/bind-phone.js
import api from '../../utils/api.js';
const req = require("../../utils/req.js")
const back = require("../../utils/back.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    timeIF: false,//是否启动了倒计时
    timer: '',//定时器
    timeNum: 60,//倒计时 时间
    account: '',//手机号
    code:'',//用户输入的验证码
  },
  // 获得手机号
  getPhone: function (e) {
    let that = this
    that.setData({
      account: e.detail.value
    })
  },
  // 获得验证码
  getVerify: function () {
    let that = this
    let data = {
      unique_code: 'register',
      account: that.data.account
    }
    req._post(api.verify, data).then(function (res) {
      console.log(res)
      wx.showToast({
        title: '发送成功',
        icon: 'none'
      })
      that.timer()
    }).catch(function (res) {
      console.log(res)
      wx.showToast({
        title: res.data.data,
        icon: 'none'
      })
    })
  },
  // 获得验证码 倒计时 定时器
  timer: function () {
    let that = this
    that.setData({
      timer: setInterval(function () {
        if (that.data.timeNum > 0) {
          that.setData({
            timeNum: that.data.timeNum - 1,
            timeIF: true
          })
        } else {
          that.setData({
            timeNum: 60,
            timeIF: false
          })
          clearInterval(that.data.timer)
        }
      }, 1000)
    })
  },
  // 获得用户输入的验证码
  getCode:function(e){
    let that=this
    that.setData({
      code:e.detail.value
    })
  },
  // 确定 按钮
  queding:function(){
    let that=this
    let data={
      account: that.data.account,
      code: that.data.code
    }
    req._post(api.checkVerify,data).then(function(res){
      console.log(res)
      wx.showToast({
        title: res.data.message,
        icon:'none',
        duration:1500,
        success:function(){
          setTimeout(function(){
            let pages = getCurrentPages(); // 获取页面栈
            let prevPage = pages[pages.length - 2]; // 上一个页面
            prevPage.setData({
              phone: that.data.account
            })
            wx.navigateBack({
              delta:1
            })
          },1500)
        }
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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