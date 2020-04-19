var app = getApp();
Page({
  data: {
  },
  onLoad: function () {
    var that = this;
    wx.request({
      url: app.globalData.URL + '/report/reportOfDay',
      data: {
        userInfo: app.globalData.userInfo
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        if (res.data.status == 200) {
          that.setData({
           reportOfDayData: res.data.data
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
  },
  del: function (event) {
    wx.showModal({
      title: '提示',
      content: '确认要删除该账单？',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: app.globalData.URL + '/bookKeep/del',
            data: {
              id: event.currentTarget.dataset.id
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success(res) {
              if (res.data.status == 200) {
                if (res.data.status == 200) {
                  wx.showToast({
                    title: '删除成功',
                    icon: 'loading',
                    duration: 300
                  });
                  setTimeout(function () {
                    wx.reLaunch({
                      url: '/pages/report/reportOfDay/reportOfDay',
                    })
                  }, 300)
                }
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
      }
    })
  }
})