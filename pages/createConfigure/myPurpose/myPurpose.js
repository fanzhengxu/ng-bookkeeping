var app = getApp();
Page({
  data: {

  },
  switchChange: function (e) {
    wx.request({
      url: app.globalData.URL + '/purpose/enable',
      data: {
        data: {
          id: e.currentTarget.id,
          enable: e.detail.value
        }
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        getCurrentPages()[getCurrentPages().length - 1].onLoad();
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
  onLoad: function () {
    var _this = this;
    wx.request({
      url: app.globalData.URL + '/purpose/selectAll', //仅为示例，并非真实的接口地址
      data: {
        userInfo: app.globalData.userInfo
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.status == 200) {
          _this.setData({
            payTypeList: res.data.data
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
      content: '确认要删除该用途？',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: app.globalData.URL + '/purpose/del',
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
                      url: '/pages/createConfigure/myPurpose/myPurpose',
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
            }
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
