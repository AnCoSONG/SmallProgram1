// miniprogram/pages/exchange/exchange.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    desc_of_team: 'lorem lorem',
    show: false,
    recycle_records: [],
    activeNames: ['1'],
    tickets: [],
    tickets_label: "blablabla",
    tickets_desc: '你没有一张卡券',
    point: "请先登录",
    desc: 'blahblahblah',
    avatarUrl: "",
    username: "请登录",
    userInfo: {},
    logged: false,
    button_name: [{
        name: '回收记录'
      },
      {
        name: '我的卡券'
      },
      {
        name: '使用帮助'
      },
      {
        name: '关于我们'
      }


    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo,
                username: res.userInfo.nickName,
                logged: true,
                point: '100'
              })
            }
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

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

  onGetUserInfo: function (e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo,
        username: e.detail.userInfo.nickName,
        point: '100'
      })
    }
  },

  onChange(e) {
    this.setData({
      activeNames: e.detail
    })
  },

  onTapDebug(e) {
    console.log("Tap")
  },

  onClose(e) {
    this.setData({
      show: true
    })
  }
})