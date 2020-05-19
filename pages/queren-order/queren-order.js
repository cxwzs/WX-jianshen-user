// pages/queren-order/queren-order.js
import api from '../../utils/api.js';
const req = require("../../utils/req.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shareIF:false,//分享 弹窗 隐藏/出现
    shareImage: '',//分享购海报 路径
    shareImageIF: false,//分享购海报 隐藏/出现
    curriculum_id:'',//课程id
    class_hour_id:'',//课时id
    details:'',//课程信息
    price: '',// 课时价格 / 实际支付金额
    class_hour_name:'',//选中课时
    contacts:'',//姓名
    mobile:'',//电话
    wx:'',//微信号
    share_discount_price: 0,//分享折扣金额
  },
  // 立即支付
  nowPay:function(){
    let that=this
    that.setData({
      share_discount_price:0
    })
    if (that.data.contacts != '' && that.data.mobile != '' && that.data.wx!=''){
      let data = {
        m_id: wx.getStorageSync('m_id'),
        curriculum_id: that.data.curriculum_id,
        class_hour_id: that.data.class_hour_id,
        share_discount_price: that.data.share_discount_price,
        price: that.data.price,
        contacts: that.data.contacts,
        mobile: that.data.mobile,
        wx: that.data.wx
      }
      req._post(api.submitOrder, data).then(function(res){
        console.log(res)
        let order_id = res.data.data.order_id//订单id
        wx.navigateTo({
          url: '../pay/pay?order_id=' + order_id + '&share_discount_price=' + that.data.share_discount_price + '&price=' + that.data.price ,
        })
      })
    }else{
      if (that.data.contacts==''){
        wx.showToast({
          title: '姓名不能为空',
          icon:'none'
        })
      } else if (that.data.mobile==''){
        wx.showToast({
          title: '手机号不能为空',
          icon: 'none'
        })
      } else if (that.data.wx==''){
        wx.showToast({
          title: '微信号不能为空',
          icon: 'none'
        })
      }
    }
  },
  // 获得电话
  getPhone:function(e){
    let that=this
    that.setData({
      mobile:e.detail.value
    })
  },
  // 获得微信号
  getWechat: function (e) {
    let that = this
    that.setData({
      wx: e.detail.value
    })
  },
  // 获得姓名
  getName: function (e) {
    let that = this
    that.setData({
      contacts: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this
    console.log(options)
    that.setData({
      curriculum_id: options.curriculum_id,//课程id
      class_hour_id: options.class_hour_id,//课时id
      price: options.price,//课时价格
      class_hour_name: options.class_hour_name,//选中课时
    })
    let data = {
      id: options.curriculum_id,
      m_id: wx.getStorageSync('m_id')
    }
    req._post(api.details, data).then(function (res) {
      console.log(res)
      that.setData({
        details:res.data.data
      })
      // 生成海报 分享购
      that.setData({
        data: {
          background: '#fff',
          width: '640rpx',
          height: '608rpx',
          borderRadius: '20rpx',
          views: [
            {
              type: 'image',
              url: res.data.data.image,
              css: {
                top: `0rpx`,
                left: `0rpx`,
                width: `640rpx`,
                height: `360rpx`
              },
            },
            {
              type: 'text',
              text: res.data.data.name,
              css: {
                top: '400rpx',
                left: '30rpx',
                fontSize: '30rpx',
              },
            },
            {
              type: 'text',
              text: res.data.data.class_name,
              css: {
                top: '447rpx',
                left: '30rpx',
                width: '342rpx',
                fontSize: '22rpx',
                color: '#999',
                maxLines: 2,
                lineHeight: '36rpx'
              }
            },
            {
              type: 'text',
              text: that.data.price,
              css: {
                top: '528rpx',
                left: '30rpx',
                fontSize: '40rpx',
                color: '#EE3F33',
              },
            },
            {
              type: 'text',
              text: '',
              css: {
                top: '540rpx',
                left: '155rpx',
                width: '342rpx',
                fontSize: '28rpx',
                color: '#999',
              },
            },
            {
              type: 'image',
              url: res.data.data.code,
              css: {
                top: `400rpx`,
                right: `40rpx`,
                width: `170rpx`,
                height: `170rpx`
              },
            },
          ]
        }
      })
    }).catch(function (res) {
      console.log(res)
    })
  },
  // 生成图片成功 分享购 海报
  onImgOK(e) {
    console.log(e)
    this.setData({
      shareImage: e.detail.path,
    })
  },
  // 生成图片失败 分享购 海报
  onImgErr: function (e) {
    console.log(e)
  },
  // 隐藏 分享购 弹窗
  hideModel: function () {
    let that = this
    that.setData({
      shareImageIF: false,
      shareIF:false
    })
  },
  // 展示 分享弹窗 分享购 购买
  showXCXcode: function () {
    let that = this
    if (that.data.share_discount_price==0){
      // 未点击过分享
      that.setData({
        shareIF: true
      })
    }else{
      if (that.data.contacts != '' && that.data.mobile != '' && that.data.wx != '') {
        let data = {
          m_id: wx.getStorageSync('m_id'),
          curriculum_id: that.data.curriculum_id,
          class_hour_id: that.data.class_hour_id,
          share_discount_price: that.data.share_discount_price,
          price: that.data.price,
          contacts: that.data.contacts,
          mobile: that.data.mobile,
          wx: that.data.wx
        }
        req._post(api.submitOrder, data).then(function (res) {
          console.log(res)
          let order_id = res.data.data.order_id//订单id
          wx.navigateTo({
            url: '../pay/pay?order_id=' + order_id + '&share_discount_price=' + that.data.share_discount_price + '&price=' + that.data.price,
          })
        })
      } else {
        if (that.data.contacts == '') {
          wx.showToast({
            title: '姓名不能为空',
            icon: 'none'
          })
        } else if (that.data.mobile == '') {
          wx.showToast({
            title: '手机号不能为空',
            icon: 'none'
          })
        } else if (that.data.wx == '') {
          wx.showToast({
            title: '微信号不能为空',
            icon: 'none'
          })
        }
      }
    }
  },
  // 展示 分享购 海报
  showShareImg:function(){
    let that = this
    that.setData({
      shareImageIF: !that.data.shareImageIF
    })
  },
  // 长按下载 分享购 海报
  downImg: function () {
    let that = this
    wx.getSetting({
      success(res) {
        //未授权 先授权 然后保存
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success(re) {
              that.saveToBlum();
            }
          })
        } else {
          //已授 直接调用保存到相册方法
          that.saveToBlum();
        }
      }
    })
  },
  //保存到相册方法 分享
  saveToBlum: function () {
    let that = this
    let imgUrl = that.data.shareImage;
    wx.getImageInfo({
      src: imgUrl,
      success: function (ret) {
        var path = ret.path;
        wx.saveImageToPhotosAlbum({
          filePath: path,
          success(result) {
            wx.showToast({
              title: '保存成功',
              icon: 'success'
            })
          },
        })
      }
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
    let that=this
    let data = {
      price: that.data.price
    }
    // 获得 分享折扣金额
    req._post(api.shareDiscount, data).then(function (res) {
      console.log(res)
      that.setData({
        share_discount_price: res.data.data.share_discount_price
      })
      that.hideModel()
    })
    return{
      title: '转发',
      imgUrl: that.data.shareImage,
      path: '/pages/index/index',
      success: function (res) {
        console.log(res,'转发回调')
      }
    }
    
  }
})