// pages/issue/share.js
var app = getApp();
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
				that.setData({
				  item_info:res.data
				})
				wx.hideToast();
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
  goto_poster:function(){
	app.urlTo('../issue/poster?item_id='+this.data.item_id);
	return;  
  }
})