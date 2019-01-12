// pages/withdraw/withdraw.js
var app = getApp()
var util = require("../../utils/util.js");


Page({

    /**
     * 页面的初始数据
     */
    data: {
        info: { 'total': 0 },
        truecash: '',
        nav_active: 'tixian'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        
       // this.getData()
    },
    getData: function () {
        app.gridToast()
        var obj = this
        app.checkLogin(obj, function (data) {
            var pigai = util.pigai
            var that = obj
            pigai.ajax({
                url: util.config.url_new + 'get_withdraw_info.php',
                data: {
                    uid: data.uid
                },
                method: 'get',
                success: function (res) {
                    console.log('withdraw', res)
                    that.setData({
                        info: res.data
                    },function(){
                        wx.hideToast();
                        
                    })
                      
                },
                fail: function () {

                }
            })
        })
    },
    allcashFunc: function () {
        this.setData({
            truecash: this.data.info.total
        })
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        return {
            title: app.globalData.title,
            path: app.globalData.path,
            success: function (res) {
                //app.gridToast(app.globalData.sharemsg, 1000, 'success')
            }
        }
    },
    onPullDownRefresh: function () {
        wx.stopPullDownRefresh(); 
        this.getData()
    },
    formSubmit: function (e) {
        var truecash = e.detail.value.cash
        var regPos = /^\d+(\.\d+)?$/;

        if (!regPos.test(truecash)) {
            app.gridToast('请输入正确金额！', 1000, 'none')
            return
        }
        if (truecash<=0) {
            app.gridToast('请输入正确金额！', 1000, 'none')
            return
        }
        if (truecash * 1 <1) {
            app.gridToast('金额不得小于1元！', 1000, 'none')
            return
        } 
        if (truecash * 1 > this.data.info.total * 1) {
            app.gridToast('超出余额', 1000, 'none')
            return
        } else {
            //app.gridToast('系统繁忙', 1000, 'none')
            app.gridToast()
            var pigai = util.pigai
            var that = this
            var time = Date.parse(new Date())
            time = time / 1000
            var usign = util.sha1(time + app.globalData.uid + util.config.token_l)
            pigai.ajax({
                url: util.config.url_new + 'push_withdraw.php', 
                data: {
                    uid: app.globalData.uid,
                    usign:usign,
                    time:time,
                    cash:truecash
                },
                method: 'post',
                success: function (res) {
                    console.log('withdraw', res)
                    if(res.code==0){
                        app.gridToast('提现成功！', 1000, 'none')
                        that.getData()
                    }else{
                        app.gridToast(res.msg, 1000, 'none')
                    }
                },
                fail: function () {

                }
            })
        }
    }

})