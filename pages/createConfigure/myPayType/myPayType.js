var app = getApp();
Page({
  data: {

  },
  switchChange: function (e) {
    wx.request({
      url: app.globalData.URL + '/payType/enable',
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
      url: app.globalData.URL + '/payType/selectAll',
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
      content: '确认要删除该支付方式？',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: 'http://localhost:8080/payType/del',
            data: {
              id: event.currentTarget.dataset.id
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success(res) {
              if (res.data.status == 200) {
                wx.showToast({
                  title: '删除成功',
                  icon: 'loading',
                  duration: 300
                });
                setTimeout(function (){
                  wx.reLaunch({
                    url: '/pages/createConfigure/myPayType/myPayType',
                  })
                }, 300)
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
      }
    })
  }
})
