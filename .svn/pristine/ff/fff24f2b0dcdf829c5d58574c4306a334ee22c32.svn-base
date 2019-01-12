// pages/name/apply.js
const app = getApp();
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
	item_now:1,
	count_item:[1],
	item_id:null
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
    }else{
		app.gridError();   
    }   
  },

   add_item:function(){
		var count=this.data.count_item;
		var now=this.data.item_now;
		count.push(now+1)
		this.setData({
			count_item:count,
			item_now:now+1
		})
   },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  goto_index:function(){
	 app.urlTo('../index/index'); 
  },
  formSubmit:function(e){ 
	var info=e.detail.value;
	var that=this; 
	console.log(info.data_field);
	info.item_id=that.data.item_id;
	info.uid=wx.getStorageSync('uid');
	var zane = util.zane 
    zane.ajax({
            url: app.globalData.subDomain + 'push_apply', //提交表单信息
            data:info,
            method: 'post',
            success: function (res) { 
               if (res.code == 0) {
				   var url = '../index/index?item_id='+info.item_id;
				   app.urlTo(url)
			   }else{
				   app.gridToast(res.msg, 1000, 'none')
            return;  
			   }
			}
	})
  }
})