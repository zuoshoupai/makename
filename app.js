//app.js
App({
  onLaunch: function () {
	var that = this; 
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
	// 判断是否登录
    let token = wx.getStorageSync('token');
	console.log(token,222);
    if (!token) {
      that.goLoginPageTimeOut(); 
      return
    }
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
	//subDomain:'https://makename.00iy.com/api/makename/',
	subDomain:'http://makenamectl.org/api/makename/',
	name_now:null,
	good_now:null,
	version:1,
	isConnected:true
  },
    //跳转到页面，可返回
  urlTo:function(url){
      wx.navigateTo({
          url: url,
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
      })
  },
  goLoginPageTimeOut: function () {
	
    setTimeout(function(){ 
	  console.log(33);
      wx.navigateTo({
        url: "/pages/authorize/index"
      })
    }, 1000)    
  },
  //跳转到页面，关闭所有窗口打开新窗口
  clearTo: function (url) {
      wx.reLaunch({
          url: url
      })
  },
   //加载中
    gridToast: function (msg='加载中',length=10000,icon='loading') {
      wx.showToast({
          title: msg,
          icon: icon,
          duration: length
      })
    },
    gridError:function(){
		wx.showToast({
          title: '网络错误',
          icon:'none',
          duration: 1000
        }) 
		return;
    },
	 //日期格式
    fun_date:function(day) {
      var today = new Date();

      var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;

      today.setTime(targetday_milliseconds); //注意，这行是关键代码  

      var tYear = today.getFullYear();
      var tMonth = today.getMonth();
      tMonth++
      if (tMonth.toString().length == 1) {
          tMonth = "0" + tMonth;
      }  
      var tDate = today.getDate(); 
      if (tDate.toString().length == 1) {
          tDate = "0" + tDate;
      }  
      return tYear + "-" + tMonth + "-" + tDate;    
    },
 
})
/*
"pages/issue/add", 创建初始
"pages/issue/adds",  选模板后
"pages/issue/templa",  选模板
"pages/issue/index",    发布人查阅
"pages/issue/share",    分享
"pages/issue/poster",    分享海报

"pages/index/index",    参与人查阅
"pages/name/index",     
"pages/name/apply",    参与提交
"pages/history/history",  
"pages/my/my",
"pages/mall/index",
"pages/logs/logs"
*/