// pages/mall/index.js
const app = getApp()
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
	good_arr:{},
	page:1,
	pagemsg: '加载中。。。', 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	this.getData();
	this.getMember();
  },
	getMember:function(){
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
	getData: function (p=1) {
		app.gridToast()
		let that = this;
		var zane = util.zane 
		zane.ajax({
			url: app.globalData.subDomain + 'get_good',  
			success: function (res) {
				  console.log(res);
				  if(res.code==0){
					that.setData({
					  good_arr:res.data,
					  page:p
					})
				  }else{
					app.gridToast('网络错误',100);  
					  
				  }
				  wx.hideToast(); 
				  
			} 
		})
	},
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
	wx.stopPullDownRefresh();
	this.getData() 
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
	this.setData({
		load_issue: true
	})
	this.getNextData() 
  },
  getNextData:function(){
	  app.gridToast()
		let that = this;
		var zane = util.zane 
		var p=that.data.page
		var good_arr=that.data.good_arr;
		zane.ajax({
			url: app.globalData.subDomain + 'get_good', 
			data:{p:p+1},
            method: 'post',
			success: function (res) {
				  console.log(res);
				  if(res.code==0){
					if (res.data.length > 0) {
						for(var i=0;i<res.data.length;i++){
						   good_arr.push(res.data[i])
						}
						that.setData({
							good_arr: good_arr,
							p:p+1
						})
					}else{
						that.setData({
							p:p+1,
							pagemsg: '到底了！'
						})
					}
				  } 
				  wx.hideToast(); 
				  
			} 
		})
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})