// pages/issue/share.js
var app = getApp();
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
	item_id: null,
    info: null,
    sharimg: '',
    showSharimg: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	if (typeof (options.item_id) != "undefined") {
          var item_id = options.item_id
          this.setData({
              item_id: item_id
          })
          app.gridToast()
          this.creatImgFunc()
   }else{
	  app.gridError(); 
   }
  },

    creatImgFunc: function () {
      var zane = util.zane
      var id = this.data.item_id
      let that = this
      app.gridToast()
      zane.ajax({
          url: app.globalData.subDomain + 'get_poster', 
		  data:{item_id:id},
          method: 'post',
          success: function (res) {
              console.log(res)
              if (res.code == 0) {
                 var sharimg = res.data
                  console.log(sharimg)
                  that.setData({
                      sharimg: sharimg,
                      showSharimg: true
                  })
              }
              wx.hideToast();
          },
          fail: function () {

          }
      })
    },
    saveImg: function () {
      var img = this.data.sharimg
      let that = this
      var imgSrc = img
      wx.downloadFile({
          url: imgSrc,
          success: function (res) {
              console.log(res);
              //图片保存到本地
              wx.saveImageToPhotosAlbum({
                  filePath: res.tempFilePath,
                  success: function (data) {
                      app.gridToast('保存成功', 1000, 'success')
                  },
                  fail: function (err) {
                      console.log(err);
                      if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
                          console.log("用户一开始拒绝了，我们想再次发起授权")
                          console.log('打开设置窗口')
                          wx.openSetting({
                              success(settingdata) {
                                  console.log(settingdata)
                                  if (settingdata.authSetting['scope.writePhotosAlbum']) {
                                      console.log('获取权限成功，给出再次点击图片保存到相册的提示。')
                                  } else {
                                      console.log('获取权限失败，给出不给权限就无法正常使用的提示')
                                  }
                              }
                          })
                      }
                  }
              })
          }
      })
      
	},
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
   goto_index:function(){
	app.clearTo('../issue/add');
	return;  
  }
})