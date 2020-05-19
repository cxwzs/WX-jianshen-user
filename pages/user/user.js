// pages/user/user.js
import api from '../../utils/api.js';
const req = require("../../utils/req.js")
const back = require("../../utils/back.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickname: '',//昵称
    phone:'',//手机号
    avatarUrl:'',//头像url
  },
  // 保存 个人信息
  baocun:function(){
    let that=this
    wx.showModal({
      title: '提示',
      content: '你确定修改当前个人资料吗',
      success:function(res){
        console.log(res)
        if(res.confirm){
          // 点击了确定
          let data={
            m_id: wx.getStorageSync('m_id'),
            nickname: that.data.nickname,
            phone: that.data.phone,
            avatarUrl: that.data.avatarUrl
          }
          req._post(api.upUser,data).then(function(res){
            console.log(res)
            wx.showToast({
              title: res.data.message,
              icon:'none',
              duration:1500,
              success:function(){
                setTimeout(function(){
                  back.refresh()
                },1500)
              }
            })
          })
        }
      }
    })
  },
  // 跳转到绑定手机号
  toBind:function(){
    wx.navigateTo({
      url: '../bind-phone/bind-phone',
    })
  },
  // 获得用户输入的昵称
  getName:function(e){
    let that=this
    that.setData({
      nickname:e.detail.value
    })
  },
  //上传头像
  scImgTwo: function () {
    let that = this
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#00000",
      success: function (res) {
        console.log(res)
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImageTwo('album')
          } else if (res.tapIndex == 1) {
            that.chooseWxImageTwo('camera')
          }
        }
      }
    })
  },
  // 图片本地路径
  chooseWxImageTwo: function (type) {
    var that = this;
    var imgsPaths = that.data.imgTwoUrl;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      count: 1,
      sourceType: [type],
      success: function (res) {
        console.log(res)
        console.log(res.tempFilePaths[0]);
        that.upImgsTwo(res.tempFilePaths[0], 0) //调用上传方法
      }
    })
  },
  //上传服务器
  upImgsTwo: function (imgurl, index) {
    var that = this;
    wx.showLoading({
      title: '上传中',
    })
    wx.uploadFile({
      url: getApp().dizhitou + 'System/upload',
      filePath: imgurl,
      name: 'file',
      header: {
        'content-type': 'multipart/form-data'
      },
      formData: {
        folder: '1'
      },
      success: function (res) {
        console.log(res) //接口返回网络路径
        var data = JSON.parse(res.data)
        console.log(data)
        that.setData({
          avatarUrl: data.data.list[0].abs_url,
        })
        wx.hideLoading()
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    // 已登录
    if (wx.getStorageSync('m_id') != '') {
      let data = {
        m_id: wx.getStorageSync('m_id')
      }
      // 获取个人资料
      req._post(api.userinfo, data).then(function (res) {
        console.log(res)
        that.setData({
          nickname: res.data.data.nickname,//昵称
          phone: res.data.data.phone,//手机号
          avatarUrl: res.data.data.avatarurl,//头像url
        })
      }).catch(function (res) {
        console.log(res)
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