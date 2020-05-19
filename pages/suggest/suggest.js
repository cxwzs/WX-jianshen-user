// pages/suggest/suggest.js
import api from '../../utils/api.js';
const req = require("../../utils/req.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contact:'',//联系方式
    content:'',//内容
  },
  // 获得联系方式
  textInput:function(e){
    let that=this
    that.setData({
      contact:e.detail.value
    })
  },
  // 获得反馈内容
  textareaInput: function (e) {
    let that = this
    that.setData({
      content: e.detail.value
    })
  },
  // 确定
  queding:function(){
    let that=this
    let data={
      m_id: wx.getStorageSync('m_id'),
      contact: that.data.contact,
      content: that.data.content
    }
    // 意见反馈
    req._post(api.opinion,data).then(function(res){
      console.log(res)
      wx.showToast({
        title: res.data.message,
        icon:'none',
        duration:1500,
        success:function(){
          setTimeout(function(){
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