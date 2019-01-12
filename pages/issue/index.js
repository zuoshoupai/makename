// pages/issue/index.js
const app = getApp()
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: { 
    item_id:null,
	item_info:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		if (typeof (options.item_id) != "undefined") {
			  var item_id = options.item_id
			  console.log('item_id', item_id)
			  this.setData({
				  item_id: item_id
			  }) 
			  this.getData(item_id)
		}else{
			app.gridError();   
		}  
  },
	getData: function (id) {
		  app.gridToast()
		  let that = this;
		  var zane = util.zane 
		  zane.ajax({
			  url: app.globalData.subDomain + 'get_item_info', 
			  data:{item_id:id},
			  method: 'post',
			  success: function (res) {
				console.log(res);
				if(res.code==0){
					if(res.data.pay==0){
						console.log(9999999);
						wx.showToast({
						  title: '该订单尚未完成支付',
						  icon:'none',
						  duration:1000 
						}) 
						setTimeout(function(){ 
						  app.clearTo('../issue/add'); 
						},2000) 
						return;  
					}else{
						that.setData({
						  item_info:res.data
						})
						
						zane.ajax({
							  url: app.globalData.subDomain + 'get_item_apply', 
							  data:{item_id:id},
							  method: 'post',
							  success: function (res) {
								console.log(res);
								if(res.code==0){
									that.setData({
									  item_apply:res.data
									})
									wx.hideToast(); 
								}
							  }
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
   onShareAppMessage: function () {
	  var item_info=this.data.item_info;
      return {
          title: item_info.title,
          path: 'pages/index/index?item_id='+item_info.item_id,
          success: function (res) {
              app.gridToast('分享成功', 1000, 'success')
          }
      }
    },
	push_score:function(e){
		var info={};
		var that=this;
		info.score=e.currentTarget.dataset.score;
		info.log_id=e.currentTarget.dataset.item;
		info.uid=wx.getStorageSync('uid');
		info.item_id=this.data.item_id;
		var currentIds=e.currentTarget.dataset.ids;
		var editPhraseCon='tem';
		if(info.score==1){
			editPhraseCon = "item_apply.list["+currentIds+"].is_win";
		}else if((info.score==2)){
			editPhraseCon = "item_apply.list["+currentIds+"].is_luck";
		} 
		var zane = util.zane 
		app.gridToast()
		zane.ajax({
				url: app.globalData.subDomain + 'push_score', //提交表单信息
				data:info,
				method: 'post',
				success: function (res) { 
				   if (res.code == 0) { 
					   that.setData({
						   [editPhraseCon]:1 
						}) 
						app.gridToast('操作成功', 1000, 'success')
				    }else{
						app.gridToast(res.msg,1000,'none') 
					}
				}
		})
		
	},
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  } 
   
})