// pages/my/my.js
const app = getApp()
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
	data:null,
	id_now:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	if (typeof (options.aid) != "undefined") {
		var aid = options.aid
		this.setData({
			id_now: aid
		})  
	}
	this.getData();
  },
   getData: function (id) {
		  app.gridToast()
		  let that = this;
		  var zane = util.zane 
		  var uid=wx.getStorageSync('uid');
		  zane.ajax({
			  url: app.globalData.subDomain + 'get_address', 
			  data:{uid:uid},
			  method: 'post',
			  success: function (res) {
				console.log(res);
				if(res.code==0){
					{
						that.setData({
						  data:res.data
						},function(){
							wx.hideToast(); 
						})
					}
				}else{
					app.gridToast(res.msg,1000,'none') 
				}  
			  },
			  fail: function () {

			  }
		  })  
		  
	},
	onPullDownRefresh: function () {
      wx.stopPullDownRefresh();
		  this.getData()
	 }
  
})