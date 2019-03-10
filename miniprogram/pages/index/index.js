// miniprogram/pages/home/home.js

// 全局app引用
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    page_loading: true,
    btnsize: "large",
    hover: true,
    list: [{
        title: '奶茶杯',
        desc: '将购买的奶茶杯扔到指定的垃圾桶以兑换积分'
      },
      {
        title: '废电池',
        desc: '将废旧电池正确回收以兑换积分'
      }
    ],
    imgUrls: [
      '../../images/banner/1.jpg',
      '../../images/banner/2.jpg',
      '../../images/banner/3.jpg'
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // 登录获取openid
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        // 登录成功获取openid
        // 存入app.golbalData.openid保存
        app.globalData.openid = res.result.openid;
      },
      fail: err => {
        console.log(err);
      }

    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  onTeaCup() {
    wx.navigateTo({
      url: '../teacup/teacup',
      success: function (res) {
        // success
        console.log("success");
      },
      fail: function () {
        // fail
        console.log("fail");
      },
      complete: function () {
        // complete
        console.log("complete");
      }
    })
  },

  onBattery() {
    wx.navigateTo({
      url: '../battery/battery',
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },

  onMoreInfo() {
    wx.navigateTo({
      url: '../moreinfo/moreinfo',
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  onLoadingTap() {
    this.setData({
      page_loading: false
    })
  },















  /// ////////////// 测试接口用
  onTestInterface() {
    wx.cloud.callFunction({
      name: "completedrinkpay",
      data: {
        ticket_id: "ticket_0001"
      },
      success: res => {
        console.log(res.result);
      },
      fail: err => {
        console.log(err);
        console.error;
      }


    });
  }
})