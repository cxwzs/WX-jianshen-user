// pages/calendar/calendar.js
import api from '../../utils/api.js';
const req = require("../../utils/req.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '',
    show: true,
    order_id:'',//订单id
  },
  // 日期解析
  formatDate(date) {
    date = new Date(date);
    
    return `${date.getFullYear() }-${date.getMonth() + 1}-${date.getDate()}`;
  },
  // 确定
  onConfirm(event) {
    console.log(event)
    let that=this
    that.setData({
      date: that.formatDate(event.detail),
    });
    console.log(that.data.date)
    let data={
      order_id: that.data.order_id,
      appointment_time: that.data.date
    }
    req._post(api.appointment,data).then(function(res){
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