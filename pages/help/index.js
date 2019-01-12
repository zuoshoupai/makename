// pages/article/article.js
var app = getApp()
var util = require("../../utils/util.js"); 

Page({

  /**
   * 页面的初始数据
   */
  data: {
      list:null,
      nav_active: 'bangzhu'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     
      this.getData()
  },
  getData: function () {
      app.gridToast()
      let that = this;
      var zane = util.zane 
      zane.ajax({
          url: app.globalData.subDomain + 'get_reward_help',  
          success: function (res) {
              console.log(res)
              that.setData({
                  list: res.data
              }, function () {
                  wx.hideToast();
                 
              })

          },
          fail: function () {

          }
      })
  }, 
  onPullDownRefresh: function () {
      wx.stopPullDownRefresh();
      this.getData()
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
      return {
          title: app.globalData.title,
          path: app.globalData.path,
          success: function (res) {
              //app.gridToast(app.globalData.sharemsg, 1000, 'success')
          }
      }
  },
  toogleshow:function(e){
     var index= e.target.dataset.id 
     var up = "list["+index+"].show"
     var will = this.data.list[index].show
     this.setData({
         [up]:!will
     })
  }
})