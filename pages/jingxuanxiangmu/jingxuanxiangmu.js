// pages/jingxuanxiangmu/jingxuanxiangmu.js
import api from '../../utils/api.js';
const req = require("../../utils/req.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    paixu: 1,//排序方式 1综合排序 2价格 3评价
    page:1,//分页
    price: 'asc',//价格排序 asc升序 desc倒序
    evaluate: 'desc',//评价排序 asc升序 desc倒序
    list:[],//课程列表
    status:1,//状态值 请求不同的列表数据接口
    class_id:'',//首页banner下导航 icon图标导航
    name:'',//首页 搜索关键词
  },
  // 跳转到项目详情
  toProjectDetail: function (e) {
    console.log(e)
    wx.navigateTo({
      url: '../project-detail/project-detail?id=' + e.currentTarget.dataset.id,
    })
  },
  // 选择排序方式
  xzPaiXu:function(e){
    console.log(e)
    let that=this
    that.data.page=1
    // 设置排序方式
    if (e.currentTarget.dataset.paixu==1){
      // 综合排序
      that.setData({
        paixu: e.currentTarget.dataset.paixu,
        price: 'asc',
        evaluate:'desc'
      })
    } else if (e.currentTarget.dataset.paixu==2){
      // 价格排序
      that.setData({
        paixu: e.currentTarget.dataset.paixu,
        evaluate: 'desc',
        price: that.data.price == 'asc' ? 'desc' :'asc'
      })
    } else if (e.currentTarget.dataset.paixu == 3){
      // 评价排序
      that.setData({
        paixu: e.currentTarget.dataset.paixu,
        price: 'asc',
        evaluate: that.data.evaluate == 'asc' ? 'desc' : 'asc'
      })
    }
    // 获取项目列表
    if (that.data.status==1){
      // 精选项目
      let data = {
        p: 1,
        price: that.data.price,
        evaluate: that.data.evaluate
      }
      req._post(api.selected, data).then(function (res) {
        console.log(res)
        that.setData({
          list: res.data.data.list
        })
      })
    } else if (that.data.status==2){
      // 最新项目
      let data = {
        p: 1,
        price: that.data.price,
        evaluate: that.data.evaluate
      }
      req._post(api.newsProject, data).then(function (res) {
        console.log(res)
        that.setData({
          list: res.data.data.list
        })
      })
    } else if (that.data.status == 3){
      // 首页banner下导航 icon图标导航
      let data = {
        class_id: that.data.class_id,
        p: 1,
        price: that.data.price,
        evaluate: that.data.evaluate
      }
      req._post(api.classCurriculum, data).then(function (res) {
        console.log(res)
        that.setData({
          list: res.data.data.list
        })
      })
    } else if (that.data.status == 4) {
      // 搜索内容
      let data = {
        name: that.data.name,
        p: 1,
        price: that.data.price,
        evaluate: that.data.evaluate
      }
      req._post(api.search, data).then(function (res) {
        console.log(res)
        that.setData({
          list: res.data.data.list
        })
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let that=this
    that.data.status = options.status
    if (options.status == 1){
      // 精选项目
      wx.setNavigationBarTitle({
        title: '精选项目',
      })
      let data={
        p:1,
        price: that.data.price,
        evaluate: that.data.evaluate
      }
      req._post(api.selected,data).then(function(res){
        console.log(res)
        that.setData({
          list: res.data.data.list
        })
      })
    } else if (options.status == 2){
      // 最新项目
      wx.setNavigationBarTitle({
        title: '最新项目',
      })
      let data = {
        p: 1,
        price: that.data.price,
        evaluate: that.data.evaluate
      }
      req._post(api.newsProject, data).then(function (res) {
        console.log(res)
        that.setData({
          list: res.data.data.list
        })
      })
    } else if (options.status == 3){
      // 首页banner下导航 icon图标导航
      wx.setNavigationBarTitle({
        title: options.title,
      })
      that.data.class_id=options.id
      let data = {
        class_id: that.data.class_id,
        p: 1,
        price: that.data.price,
        evaluate: that.data.evaluate
      }
      req._post(api.classCurriculum, data).then(function (res) {
        console.log(res)
        that.setData({
          list: res.data.data.list
        })
      })
    } else if (options.status == 4){
      // 搜索内容
      wx.setNavigationBarTitle({
        title: '搜索结果',
      })
      that.data.name = options.name
      let data = {
        name: that.data.name,
        p: 1,
        price: that.data.price,
        evaluate: that.data.evaluate
      }
      req._post(api.search,data).then(function(res){
        console.log(res)
        that.setData({
          list: res.data.data.list
        })
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
    let that=this
    // 获取项目列表
    if (that.data.status == 1) {
      // 精选项目
      let data = {
        p: that.data.page+1,
        price: that.data.price,
        evaluate: that.data.evaluate
      }
      req._post(api.selected, data).then(function (res) {
        console.log(res)
        if(res.data.data.list.length!=0){
          let content = that.data.list.concat(res.data.data.list)
          that.setData({
            list: content,
            page: that.data.page+1
          })
        }
      })
    } else if (that.data.status == 2) {
      // 最新项目
      let data = {
        p: that.data.page + 1,
        price: that.data.price,
        evaluate: that.data.evaluate
      }
      req._post(api.newsProject, data).then(function (res) {
        console.log(res)
        if (res.data.data.list.length != 0) {
          let content = that.data.list.concat(res.data.data.list)
          that.setData({
            list: content,
            page: that.data.page + 1
          })
        }
      })
    } else if (that.data.status == 4) {
      // 搜索内容
      let data = {
        name: that.data.name,
        p: that.data.page+1,
        price: that.data.price,
        evaluate: that.data.evaluate
      }
      req._post(api.search, data).then(function (res) {
        console.log(res)
        if(res.data.data.list.length!=0){
          let content = that.data.list.concat(res.data.data.list)
          that.setData({
            list: content,
            page: that.data.page+1
          })
        }
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})