// pages/issue/templa.js
var app = getApp();
var util = require("../../utils/util.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
	good_arr:[],
	good_now:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      app.gridToast()
      let that = this;
      var zane = util.zane 
        zane.ajax({
          url: app.globalData.subDomain + 'get_good', 
          success: function (res) {
			  console.log(res);
              if(res.code==0){
				that.setData({
                  good_arr:res.data
				})
              }else{
				app.gridToast('网络错误',100);  
				  
			  }
			  wx.hideToast(); 
              
          } 
      })
  },
 
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  func_sub:function(e){
	var requirment=e.target.dataset.name;
	var tem_arr=this.data.tem_arr;
	var tem_now=this.data.tem_now;
	var name=tem_arr[tem_now].name;
	app.globalData.name_now={name:name,requirment:requirment};
	app.clearTo('../issue/add');
	return;
  },
  select_good:function(e){  
	var id=e.currentTarget.dataset.id;
    var name=e.currentTarget.dataset.name;  
	app.globalData.good_now={name:name,id:id};
	app.clearTo('../issue/add');
	return; 
  }
})