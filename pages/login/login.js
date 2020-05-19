// pages/login/login.js
import api from '../../utils/api.js';
const req = require("../../utils/req.js")
const back = require("../../utils/back.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  // 微信授权登录
  bindGetUserInfo:function(e){
    console.log(e)
    let rawData = e.detail.rawData
    wx.login({
      success:function(res){
        console.log(res,'code')
        let data={
          rawData: rawData,
          code: res.code
        }
        req._post(api.login,data).then(function(res){
          console.log(res)
          wx.setStorageSync('m_id', res.data.data.id)
          wx.showToast({
            title: res.data.message,
            icon:'none',
            duration:1500,
            success:function(res){
              // 返回上一页刷新
              back.refresh()
            }
          })
        }).catch(function(res){
          console.log(res)
        })
      },
      fail:function(err){
        console.log(err,'获取code失败')
      }
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