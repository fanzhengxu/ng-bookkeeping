var util = require('../../utils/util.js');
var app = getApp();
Page({
  data: {
    date:'',
    time:''
  },
  formSubmit: function(e) {
    if (e.detail.value.payType == "") {
      wx.showToast({
        title: "未输入支付方式",
        icon: 'none',
        duration: 2000
      })
    } else if (e.detail.value.purpose == "") {
      wx.showToast({
        title: "未输入用途",
        icon: 'none',
        duration: 2000
      })
    } else if (e.detail.value.amount == "") {
      wx.showToast({
        title: "未输入金额",
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.request({
        url: app.globalData.URL + '/bookKeep/create', //仅为示例，并非真实的接口地址
        data: {
          data: e.detail.value,
          date: this.data.date,
          time: this.data.time,
          userInfo: app.globalData.userInfo
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          if (res.data.status == 200) {
            wx.showToast({
              title: res.data.msg,
              icon: 'success',
              duration: 2000
            })
            wx.switchTab({
              url: '/pages/posts/posts'
            })
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 2000
            })
          }
        },
        fail(res) {
          wx.showToast({
            title: '正在加载...',
            icon: 'loading',
            duration: 4000
          })
        }
      })
    }
  },
  formReset: function() {
    console.log('form发生了reset事件')
  },
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  onLoad: function() {
    var DATE = util.formatTime(new Date());
    this.setData({
      date: DATE,
      time: DATE
    });
    var _this = this;
    wx.request({
      url: app.globalData.URL + '/bookKeep/queryMyConfigure',
      data: {
        userInfo: app.globalData.userInfo
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.status == 200) {
          _this.setData({
            payTypeMaps: res.data.data.payTypeMaps,
            purposeMaps: res.data.data.purposeMaps
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail(res) {
        wx.showToast({
          title: '正在加载...',
          icon: 'loading',
          duration: 4000
        })
      }
    })
  }
})