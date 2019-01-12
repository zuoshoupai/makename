// pages/issue/add.js
var app = getApp();
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:'',
	name_now:null,
	good_now:null,
	dead_start:'',
    dead_end:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	this.setData({
		date: app.fun_date(1),
		dead_start: app.fun_date(1),
        dead_end: app.fun_date(30),
	})
    if(app.globalData.name_now){
		this.setData({
			name_now:app.globalData.name_now 
		}) 
	}
	if(app.globalData.good_now){
		console.log(app.globalData.good_now);
		this.setData({
			good_now:app.globalData.good_now 
		}) 
	}
  },

 
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  goto_tem:function(){ 
	app.urlTo('../issue/templa');
	return;
  },
  goto_good:function(){ 
	app.urlTo('../issue/good');
	return;
  },
  formSubmit:function(e){
	var info={};
	var that=this;
	console.log(e);
	info.title = e.detail.value.title
    info.require = e.detail.value.require 
	info.deadtime=that.data.date;
	info.good_id=that.data.good_now?that.data.good_now.id:false;
	info.uid=wx.getStorageSync('uid');
	if (!info.title){  
          app.gridToast('请添加标题！', 1000, 'none')
            return;
    }
	if (!info.require){  
          app.gridToast('请添加要求！', 1000, 'none')
            return;
    }
	if (!info.deadtime){  
          app.gridToast('请填写截止时间！', 1000, 'none')
            return;
    }
	if (!info.good_id){  
          app.gridToast('请选择商品！', 1000, 'none')
            return;
    }
	var zane = util.zane 
    zane.ajax({
            url: app.globalData.subDomain + 'push_order', //提交表单信息
            data:info,
            method: 'post',
            success: function (res) { 
               if (res.code == 0) {
				   var url = '../issue/share?item_id='+res.data
				   app.urlTo(url)
			   }
			}
	})
  }
})