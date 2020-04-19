var app = getApp();
Page({
  data: {
  },
  onLoad: function () {
    var that = this;
    wx.request({
      url: app.globalData.URL + '/report/reportOfMonth',
      data: {
        userInfo: app.globalData.userInfo
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        if (res.data.status == 200) {
          that.setData({
            reportOfMonthData: res.data.data
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