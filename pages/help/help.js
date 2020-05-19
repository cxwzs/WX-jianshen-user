// pages/help/help.js
import api from '../../utils/api.js';
const req = require("../../utils/req.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],//帮助列表
  },
  // 跳转到 帮助详情
  toHelpDetail:function(e){
    console.log(e)
    wx.navigateTo({
      url: '../help-detail/help-detail?art_id=' + e.currentTarget.dataset.art_id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this
    req._post(api.articleList).then(function(res){
      console.log(res)
      that.setData({
        list:res.data.data.list
      })
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