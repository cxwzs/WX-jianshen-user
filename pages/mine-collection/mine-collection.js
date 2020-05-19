// pages/mine-collection/mine-collection.js
import api from '../../utils/api.js';
const req = require("../../utils/req.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],//收藏列表
    page:1,//分页
  },
  // 跳转到项目详情
  toProjectDetail: function (e) {
    console.log(e)
    wx.navigateTo({
      url: '../project-detail/project-detail?id=' + e.currentTarget.dataset.id,
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
    let that=this
    let data={
      m_id: wx.getStorageSync('m_id'),
      p:1
    }
    req._post(api.collectionList,data).then(function(res){
      console.log(res)
      that.setData({
        list:res.data.data.list
      })
    }).catch(function(res){
      console.log(res)
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
    let that = this
    let data = {
      m_id: wx.getStorageSync('m_id'),
      p: that.data.page+1
    }
    req._post(api.collectionList, data).then(function (res) {
      console.log(res)
      if(res.data.data.list.length!=0){
        let content=that.data.list.concat(res.data.data.list)
        that.setData({
          list:content,
          page:that.data.page+1
        })
      }
    }).catch(function (res) {
      console.log(res)
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})