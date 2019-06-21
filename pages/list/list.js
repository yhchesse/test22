// pages/list/list.js
const https = require('../../utils/https.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    _page:0,
    _limit: 10,
    list:[],
    hasMore:true,
    inputShowed: false,
    inputVal: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.name,
    })
    this.data.id = options.id
    this.getData()
  },
  getData(){
    if (!this.data.hasMore) return
    this.data._page++
    let url = `categories/${this.data.id}/shops?_page=${this.data._page}&_limit=${this.data._limit}&q=${this.data.inputVal}`
    https.get(url).then(res=>{
      // 获取数据成功之后关闭下拉
      wx.stopPullDownRefresh()
      var total = parseInt(res.header["X-Total-Count"])
      var newList =[]
      newList=[...this.data.list,...res.data]
      this.setData({
        list: newList,
        hasMore: newList.length < total
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
    this.getNewData()
  },
  //获取最新数据
  getNewData(){
    this.data._page = 0
    this.setData({
      hasMore: true,
      list: []
    },()=>{
      this.getData()
    })
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    //发送请求获取数据
    this.getData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  //searchbar相关的逻辑
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    },()=>{
      this.getNewData()
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    },()=>{
      this.getNewData()
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  // 获取最终要进行搜索的值
  getLastValue() {
    this.getNewData()
  }
})