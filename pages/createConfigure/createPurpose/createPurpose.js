var app = getApp();
Page({
  data: {

  },
  formSubmit: function (e) {
    if (e.detail.value.name == "") {
      wx.showToast({
        title: "请输入要新增的用途",
        icon: 'none',
        duration: 2000
      })
    } else if (e.detail.value.enable == "") {
      wx.showToast({
        title: "请选择用途是否启用",
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.request({
        url: app.globalData.URL + '/purpose/create', //仅为示例，并非真实的接口地址
        data: {
          data: e.detail.value,
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
            wx.reLaunch({
              url: '/pages/createConfigure/myPurpose/myPurpose',
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
  formReset: function () {
    console.log('form发生了reset事件')
  },
  switchChange: function (e) {
    console.log(e.detail)
    console.log(e.currentTarget.id)
  },
  onLoad: function () {
    var _this = this;
    wx.request({
      url: 'http://localhost:8080/payType/selectAll', //仅为示例，并非真实的接口地址
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
          /**
           * wx.reLaunch({
            url: '/pages/createPayType/createPayType',
          })
           */
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
  }
})
