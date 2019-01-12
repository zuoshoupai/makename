// pages/about/about.js
var app = getApp()
var util = require("../../utils/util.js");


Page({

  /**
   * 页面的初始数据
   */
  data: {
      showType:1,
      list:{'issue':null,'apply':null},
      pagei:0,
      pagea: 0,
      pageimsg:'加载中。。。',
      pageamsg: '加载中。。。',
      nav_active: 'wode'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.getData()
  },
    getData: function () {
      app.gridToast() 
      var that = this
	  var uid=wx.getStorageSync('uid');
	  var showType=this.data.showType;
      var zane = util.zane 
      zane.ajax({
		  url:app.globalData.subDomain+ 'get_my_list',
		  data:{uid:uid,showType:showType},
          method: 'post',
		  success: function (res) {
			  console.log(res)
			  if(showType==1){  
				var p=that.data.pagei 
				var d="list.issue";
				that.setData({
				  pagei:p+1,
				  [d]:res.data
			    })
			  }else{
				var p=that.data.pagea 
				var d="list.apply";
				that.setData({
				  pagea:p+1,
				  [d]:res.data
			    })
			  }
			  wx.hideToast();

		  },
		  fail: function () {

		  }
	  })
      
  }, 
  onPullDownRefresh: function () { 
      wx.stopPullDownRefresh();
      this.getData()
  }, 
  getNextData: function (types) {
      app.gridToast()
      let that = this; 
      var uid=wx.getStorageSync('uid');
	  var showType=this.data.showType;
	  if(showType==1){
		var p=that.data.pagei
	  }else{
		var p=that.data.pagea  
		  
	  } 
      var zane = util.zane 
      zane.ajax({
          url:app.globalData.subDomain+ 'get_my_list',
		  data:{uid:uid,showType:showType,p:p},
          method:'post', 
          success: function (res) {
              console.log('more',res)
            if(showType==1){
                if(res.code==0){
                    var list = that.data.list
                    if(res.data.length>0){
                        for(var i=0;i<res.data.length;i++){
                            list.issue.push(res.data[i])
                        }
                        that.setData({
                            list: list,
                            pagei: pagei + 1
                        })
                    }else{
                        that.setData({ 
                            pagei: pagei + 1,
                            pageimsg:'到底了！'
                        })
                    } 
                    
                }
            }
            if (showType == 2) {
                if (res.code == 0) {
                    var list = that.data.list
                    if (res.data.length > 0) {
                        for (var i = 0; i < res.data.length; i++) {
                            list.accept.push(res.data[i])
                        }
                        that.setData({
                            list: list,
                            pagea: pagea + 1
                        })
                    } else {
                        that.setData({
                            pagea: pagea + 1,
                            pageamsg: '到底了！'
                        })
                    }

                }
            } 
             
              wx.hideToast();
          },
          fail: function () {

          }
      })
  }, 
  showType:function(e){
     var showType = e.target.dataset.type
     this.setData({
         showType:showType
     })
	 if(showType==1 && this.data.pagei==0){
		this.getData() 
	 }
	 if(showType==2 && this.data.pagea==0){
		this.getData() 
	 }
  },
  toRewardFunc:function(e){
     var reward_id = e.target.dataset.id
     var url = '../reward/index?reward_id='+reward_id;
     app.urlTo(url)
  },
  
  /**
     * 用户点击右上角分享
     */
  onShareAppMessage: function () {
      return {
          title: app.globalData.title,
          path: app.globalData.path,
          success: function (res) {
               
          }
      }
  },
  //加载更多
  bottomFresh:function(e){
     var types = e.currentTarget.dataset.type
     
     this.setData({
         load_issue:true
     })
     this.getNextData(types)
  }
 
})