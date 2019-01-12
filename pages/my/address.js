// pages/my/address.js
var tcity = require("../../utils/citys.js");
var util = require("../../utils/util.js");
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
	 provinces: [],
    province: "",
    citys: [],
    city: "",
    countys: [],
    county: '',
    value: [0, 0, 0],
    values: [0, 0, 0],
    condition: false,
	aid:null,
	data:null
  },

   bindChange: function (e) {
    //console.log(e);
    var val = e.detail.value
    var t = this.data.values;
    var cityData = this.data.cityData;
    if (val[0] != t[0]) {
      console.log('province no ');
      const citys = [];
      const countys = [];
      for (let i = 0; i < cityData[val[0]].sub.length; i++) {
        citys.push(cityData[val[0]].sub[i].name)
      }
      for (let i = 0; i < cityData[val[0]].sub[0].sub.length; i++) {
        countys.push(cityData[val[0]].sub[0].sub[i].name)
      }
      this.setData({
        province: this.data.provinces[val[0]],
        city: cityData[val[0]].sub[0].name,
        citys: citys,
        county: cityData[val[0]].sub[0].sub[0].name,
        countys: countys,
        values: val,
        value: [val[0], 0, 0]
      })
      return;
    }
    if (val[1] != t[1]) {
      console.log('city no');
      const countys = [];
      for (let i = 0; i < cityData[val[0]].sub[val[1]].sub.length; i++) {
        countys.push(cityData[val[0]].sub[val[1]].sub[i].name)
      }
	this.setData({
        city: this.data.citys[val[1]],
        county: cityData[val[0]].sub[val[1]].sub[0].name,
        countys: countys,
        values: val,
        value: [val[0], val[1], 0]
      })
      return;
    }
    if (val[2] != t[2]) {
      console.log('county no');
      this.setData({
        county: this.data.countys[val[2]],
        values: val
      })
      return;
    } 
  },
  open: function () {
    this.setData({
      condition: !this.data.condition
    })
  },
  onLoad: function (options) {
	if (typeof (options.aid) != "undefined") {
		var aid = options.aid
		this.setData({
			  aid: aid
		}) 
		console.log(aid);
		this.getData(aid)
	}
    console.log("onLoad");
    var that = this;
	tcity.init(that);
	var cityData = that.data.cityData;
	const provinces = [];
    const citys = [];
    const countys = [];
	for (let i = 0; i < cityData.length; i++) {
      provinces.push(cityData[i].name);
    }
    console.log('省份完成');
    for (let i = 0; i < cityData[0].sub.length; i++) {
      citys.push(cityData[0].sub[i].name)
    }
    console.log('city完成');
    for (let i = 0; i < cityData[0].sub[0].sub.length; i++) {
      countys.push(cityData[0].sub[0].sub[i].name)
    }
    that.setData({
      'provinces': provinces,
      'citys': citys,
      'countys': countys,
      'province': cityData[0].name,
      'city': cityData[0].sub[0].name,
      'county': cityData[0].sub[0].sub[0].name
    })
    console.log('初始化完成');
	
   },
	getData: function (aid) {
		app.gridToast()
		let that = this;
		var zane = util.zane 
		var uid=wx.getStorageSync('uid');
		zane.ajax({
			url: app.globalData.subDomain + 'get_address', 
			data:{aid:aid,uid:uid},
			method: 'post',
			  success: function (res) {
				console.log(res);
				if(res.code==0){
					that.setData({
						data:res.data,
						province:res.data.province,
						city:res.data.city,
						county:res.data.county
					}) 
					wx.hideToast(); 
				}else{
					app.gridToast(res.msg,1000,'none');
					wx.hideToast(); 
				} 
			  } 
		  })  
		  
	},
	formSubmit:function(e){
		var info={};
		var that=this; 
		info.name = e.detail.value.name
		info.mobile = e.detail.value.mobile 
		info.content=e.detail.value.content; 
		info.province=that.data.province;
		info.city=that.data.city;
		info.county=that.data.county;
		info.uid=wx.getStorageSync('uid');	
		info.aid=that.data.aid; 
		var zane = util.zane 
		app.gridToast('正在保存')
		zane.ajax({
				url: app.globalData.subDomain + 'push_address', //提交表单信息
				data:info,
				method: 'post',
				success: function (res) { 
				   if (res.code == 0) {
					   var url = '../my/myaddress?aid='+res.data;
					   app.gridToast('保存成功',1000,'none') 
					   wx.redirectTo({
						  url: url
						})
				   }else{
					app.gridToast(res.msg,1000,'none') 
				} 
			  } 
		})
	}

})