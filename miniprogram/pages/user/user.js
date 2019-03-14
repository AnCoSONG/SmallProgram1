import Dialog from "../../dist/dialog/dialog";

// miniprogram/pages/exchange/exchange.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeNames: ['1'],

    recycle_records_label: '请先登录',
    tickets_label: '请先登录',
    point_desc: '请先登录',

    about_us_show: false,

    user: {
      battery_point: 0,
      tea_point: 0,
      recycle_records: [],
      tea_tickets: [],
      doll_tickets: [],
      logged: false,
      username: "请点头像登录",
      userInfo: {},
      avatarUrl: "",
      isRoot: false
    }
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
                  point_desc: "继续加油哦",
                  tickets_label: '继续加油哦',
                  recycle_records_label: '继续加油哦',
                  user: {
                    battery_point: 50,
                    tea_point: 50,
                    recycle_records: ['one'],
                    logged: true,
                    username: res.userInfo.nickName,
                    avatarUrl: res.userInfo.avatarUrl,
                    userInfo: res.userInfo,
                    tea_tickets: ['1', '2'],
                    doll_tickets: ['1', '2'],
                    isRoot: false
                  }
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
          point_desc: "继续加油哦",
          tickets_label: '继续加油哦!',
          recycle_records_label: '继续加油哦~',
          user: {
            battery_point: 50,
            tea_point: 50,
            recycle_records: ['one'],
            logged: true,
            username: e.detail.userInfo.nickName,
            avatarUrl: e.detail.userInfo.avatarUrl,
            userInfo: e.detail.userInfo,
            tea_tickets: ['1', '2'],
            doll_tickets: ['1', '2'],
          }
        }),
        app.logged = true;
      app.avaterUrl = e.detail.userInfo.avatarUrl;
      app.username = e.detail.userInfo.nickName;
      app.userInfo = e.detail.userInfo;
    }
  },

  onChangeCollapse(e) {
    this.setData({
      activeNames: e.detail
    })
  },

  onTapDebug(e) {
    console.log("Tap")
  },

  // onClose(e) {
  //   this.setData({
  //     show: false
  //   })
  // },

  onClickAboutUs(e) {
    Dialog.alert({
      title: '关于我们',
      message: '这款小程序由中南大学“杂症听诊器”团队设计，四川大学某不愿意透露姓名的宋同学和曹同学研发。在这里，有神器的魔法——用掉的电池可以变成橱窗里的娃娃，喝光的奶茶杯可以变成满满的奶茶。欢迎来到神器的电池杯杯世界。'
    }).then(() => {
      // on close
      console.log("close")
    });
  }
})