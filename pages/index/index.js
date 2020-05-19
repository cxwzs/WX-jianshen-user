//index.js
//获取应用实例
const app = getApp()
import api from '../../utils/api.js';
const req = require("../../utils/req.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperIndex:0,//轮播 当前出现可视区的轮播图下标 给指示点加选中效果
    arr: [],//icon导航 处理前的icon导航内容
    outAll: [],//icon导航 处理后的icon导航内容
    iconIndex:0,//icon导航 当前滚动到可视区的分页下标
    class_id:0,//火热列表 选中的导航
    page:1,//分页
    banners:[],//轮播
    selected:[],//精选项目
    news:[],//最新项目
    fire_class:[],//火热类别
    class_course: [],//火热类别下的课程
    price:'asc',//价格 默认 升序
    evaluate:'desc',//评价 默认 倒序
    searchName:'',//搜索关键词
  },
  // 搜索 获得搜索关键词
  getSearch:function(e){
    let that=this
    that.data.searchName = e.detail.value
  },
  // 搜索 input回车搜索
  search:function(e){
    console.log(e)
    let name = e.detail.value
    let status=4
    wx.navigateTo({
      url: '../jingxuanxiangmu/jingxuanxiangmu?status=' + status + '&name=' + name,
    })
  },
  // 搜索 搜索图标搜索
  searchIcon:function(){
    let that=this
    let name = that.data.searchName
    let status = 4
    wx.navigateTo({
      url: '../jingxuanxiangmu/jingxuanxiangmu?status=' + status + '&name=' + name,
    })
  },
  // 点击banner
  xzBanner:function(e){
    console.log(e)
    // 跳转规则 1网址 2商品详情
    let target_rule = e.currentTarget.dataset.target_rule
    // 规则参数
    let param = e.currentTarget.dataset.param
    if (target_rule==1){
      wx.navigateTo({
        url: '../web-view/web-view?url=' + param,
      })
    } else if (target_rule==2){
      wx.navigateTo({
        url: '../project-detail/project-detail?id=' + param,
      })
    }
  },
  // 跳转到项目详情
  toProjectDetail:function(e){
    console.log(e)
    wx.navigateTo({
      url: '../project-detail/project-detail?id='+e.currentTarget.dataset.id,
    })
  },
  // 跳转到 项目更多
  toProjectMore:function(e){
    console.log(e)
    let status=e.currentTarget.dataset.status
    wx.navigateTo({
      url: '../jingxuanxiangmu/jingxuanxiangmu?status=' + status,
    })
  },
  // 选择火热类别 导航
  xzHotNsv:function(e){
    console.log(e)
    let that=this
    that.setData({
      class_id: e.currentTarget.dataset.id,
      page:1
    })
    let data = {
      class_id: e.currentTarget.dataset.id,
      p: 1,
      price: that.data.price,
      evaluate: that.data.evaluate
    }
    req._post(api.classCurriculum, data).then(function (res) {
      console.log(res)
      that.setData({
        class_course: res.data.data.list
      })
    })
  },
  // swiper banner轮播
  swiperChange:function(e){
    // console.log(e)
    let that=this
    that.setData({
      swiperIndex: e.detail.current
    })
  },
  // icon导航 切换分页
  iconChange:function(e){
    let that = this
    that.setData({
      iconIndex: e.detail.current
    })
  },
  // 点击 icon 导航
  xzClassNav:function(e){
    console.log(e)
    let id = e.currentTarget.dataset.id
    let status = e.currentTarget.dataset.status
    let title=e.currentTarget.dataset.title
    wx.navigateTo({
      url: '../jingxuanxiangmu/jingxuanxiangmu?status=' + status + '&id=' + id + '&title=' + title,
    })
  },
  // 递归 处理icon导航 十个图标一页
  resetArr: function () {
    let that = this
    let outAlls = that.data.outAll
    if (that.data.arr.length < 11) {
      outAlls.push(that.data.arr)
    } else {
      outAlls.push(that.data.arr.splice(0, 10))//splice 截取数组前十个 会改变原数组
      that.resetArr()
    }
    that.setData({
      outAll: outAlls
    })
    // console.log(that.data.outAll)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this
    // 获取首页数据
    let data={
      p: 1
    }
    req._post(api.index,data).then(function(res){
      console.log(res)
      that.setData({
        arr: res.data.data.class.list,
        banners: res.data.data.banners,
        selected: res.data.data.selected,
        news: res.data.data.news,
        fire_class: res.data.data.fire_class,
        class_id: res.data.data.fire_class[0].id
      })
      that.resetArr()//调用处理icon导航的递归方法
      let data={
        class_id: res.data.data.fire_class[0].id,
        p:1,
        price: that.data.price,
        evaluate: that.data.evaluate
      }
      req._post(api.classCurriculum,data).then(function(res){
        console.log(res)
        that.setData({
          class_course:res.data.data.list
        })
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
    let that = this
    that.setData({
      page:1,
      arr: [],//icon导航 处理前的icon导航内容
      outAll: [],//icon导航 处理后的icon导航内容
    })
    // 获取首页数据
    let data = {
      p: 1
    }
    req._post(api.index, data).then(function (res) {
      console.log(res)
      that.setData({
        arr: res.data.data.class.list,
        banners: res.data.data.banners,
        selected: res.data.data.selected,
        news: res.data.data.news,
        fire_class: res.data.data.fire_class,
        class_id: res.data.data.fire_class[0].id
      })
      that.resetArr()//调用处理icon导航的递归方法
      let data = {
        class_id: res.data.data.fire_class[0].id,
        p: 1,
        price: that.data.price,
        evaluate: that.data.evaluate
      }
      req._post(api.classCurriculum, data).then(function (res) {
        console.log(res)
        that.setData({
          class_course: res.data.data.list
        })
        //页面加载完毕事件
        wx.hideLoading()
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
      })
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let that=this
    let data = {
      class_id: that.data.class_id,
      p: that.data.page+1,
      price: that.data.price,
      evaluate: that.data.evaluate
    }
    req._post(api.classCurriculum, data).then(function (res) {
      console.log(res)
      if(res.data.data.list.length!=0){
        let content = that.data.class_course.concat(res.data.data.list)
        that.setData({
          class_course: content,
          page:that.data.page+1
        })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
