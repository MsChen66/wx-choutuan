// pages/router/food/food.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categories:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //发起网络请求
    var _this = this;
    wx.request({
      url: 'http://106.12.79.128:3000/index.json',
      method: "GET",
      data: {
        name: "刘猛旁边的杨帆"
      },
      success(res) {
        console.log(res)
        _this.setData({
          categories: res.data.data.categories
        })
        console.log(_this.data.categories)
      },
      fail(err){
        console.log(err)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})