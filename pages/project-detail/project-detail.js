// pages/project-detail/project-detail.js
import api from '../../utils/api.js';
const req = require("../../utils/req.js");
const WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modelIF:false,//奖状弹窗
    details:'',//项目详情
    prizeIndex:0,//需要展示的奖项的下标
    id:'',//项目id
  },
  // 跳转到更多评价
  toJXmore:function(){
    let that=this
    wx.navigateTo({
      url: '../project-more-evaluate/project-more-evaluate?id=' + that.data.id,
    })
  },
  // 收藏/取消收藏
  collectionIF:function(){
    let that=this
    let data={
      curriculum_id: that.data.id,
      m_id: wx.getStorageSync('m_id')
    }
    req._post(api.collection,data).then(function(res){
      console.log(res)
      if (that.data.details.is_collection==0){
        that.setData({
          'details.is_collection':1
        })
      }else{
        that.setData({
          'details.is_collection': 0
        })
      }
    })
  },
  // 购买 课时
  buy:function(e){
    console.log(e)
    let that=this
    let curriculum_id = that.data.details.id//课程id
    let class_hour_id = e.currentTarget.dataset.id//课时id
    let class_hour_name = e.currentTarget.dataset.class_hour_name//选中课时
    let price = e.currentTarget.dataset.price//课时价格
    wx.navigateTo({
      url: '../queren-order/queren-order?curriculum_id=' + curriculum_id + '&class_hour_id=' + class_hour_id + '&class_hour_name=' + class_hour_name + '&price=' + price,
    })
  },
  // 展示奖状 弹窗
  showModel:function(e){
    let that=this
    that.setData({
      modelIF:true,
      prizeIndex:e.currentTarget.dataset.index
    })
  },
  // 隐藏奖状 弹窗
  hideModel:function(){
    let that = this
    that.setData({
      modelIF: false
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this
    that.data.id = options.id
    let data={
      id: options.id,
      m_id:wx.getStorageSync('m_id') 
    }
    req._post(api.details,data).then(function(res){
      console.log(res)
      that.setData({
        details:res.data.data
      })
      WxParse.wxParse('article', 'html', res.data.data.describe, that, 5)
    }).catch(function(res){
      console.log(res)
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