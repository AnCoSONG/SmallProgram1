import Dialog from "../../dist/dialog/dialog";

// miniprogram/pages/exchange/exchange.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    recycle_records: [],
    activeNames: ['1'],
    tea_tickets: [''],
    doll_tickets: [''],

    tickets_label: '请先登录',
    tickets_desc: '你没有一张卡券',

    battery_point: 0,
    tea_point: 0,
    desc: '请先登录',
    logged: false,
    avatarUrl: "",
    username: "请登录",
    userInfo: {},
    about_us_show: false
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
                  desc: "继续加油哦",
                  tickets_label: '继续加油哦',
                  battery_point: 50,
                  tea_point: 50
                }),
                app.logged = true;
              app.avaterUrl = res.userInfo.avatarUrl;
              app.username = res.userInfo.nickName;
              app.userInfo = res.userInfo;

            }
          })
        }
      }
    })
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

  onGetUserInfo: function (e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo,
        username: e.detail.userInfo.nickName,
        battery_point: 55,
        tea_point: 55,
        tickets_label: '继续加油哦',
        desc: "继续加油哦"
      })
    }
  },

  onChange_user(e) {
    this.setData({
      activeNames: e.detail
    })
  },

  onTapDebug(e) {
    console.log("Tap")
  },

  onClose(e) {
    this.setData({
      show: false
    })
  },

  onClickAboutUs(e) {
    Dialog.alert({
      title: '关于我们',
      message: '这款小程序由中南大学“杂症听诊器”团队设计，四川大学某不愿意透露姓名的宋同学和曹同学研发。在这里，有神器的魔法——用掉的电池可以变成橱窗里的娃娃，喝光的奶茶杯可以变成满满的奶茶。欢迎来到神器的电池杯杯世界。'
    }).then(() => {
      // on close
    });
  }
})