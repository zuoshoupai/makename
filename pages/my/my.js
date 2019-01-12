// pages/my/my.js
const app = getApp()
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
	member_info:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	this.getData();
  },
   getData: function () {
		  app.gridToast()
		  let that = this;
		  var zane = util.zane 
		  var uid=wx.getStorageSync('uid');
		  zane.ajax({
			  url: app.globalData.subDomain + 'get_member_info', 
			  data:{uid:uid},
			  method: 'post',
			  success: function (res) {
				console.log(res);
				if(res.code==0){
					{
						that.setData({
						  member_info:res.data
						},function(){
							wx.hideToast(); 
						})
					}
				}else{
					app.gridToast(res.msg,1000,'none') 
				}  
			  } 
		  })  
		  
	},
	goto_address:function(){
	app.urlTo('../my/myaddress');
	return;   
   },
	onPullDownRefresh: function () {
      wx.stopPullDownRefresh();
		  this.getData()
	}
  
})