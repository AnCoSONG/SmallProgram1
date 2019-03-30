import Dialog from "../../dist/dialog/dialog";

// miniprogram/pages/recycleRecords/recycleRecords.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shop: [
      " ",
      "益禾堂 - 中南大学店",
      "益禾堂 - 后湖小区店",
      "书亦烧仙草 - 中南大学店",
      "蜜雪冰城 - 中南大学店",
      "茶颜悦色 - 青年路步行街店",
      "阿里山贡茶 - 中南大学店",
      "甘茗城 - 后湖小区店"
    ],
    pending: 0,
    compolish: 0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let records = JSON.parse(options.records)
    this.setData({
      records: records
    });
    this.setPendingCompolish(this.data.records)
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

  setPendingCompolish(list) {
    var compolish = this.data.compolish
    var pending = this.data.pending
    for (var i = 0; i < list.length; i++) {
      if (list[i].dataset.status) {
        compolish++
      } else {
        pending++
      }
    }
    this.setData({
      compolish: compolish,
      pending: pending
    })
  },

  onFeedBack(e) {

    Dialog({
      title: '订单编号' + e.currentTarget.dataset.id,
      message: '请点击确认进入客服页面并将您的订单编号: ' + e.currentTarget.dataset.id + ' 发送给客服',
      selector: '#feedback',
      showCancelButton: true,
      confirmButtonOpenType: 'contact'
    }).then(res => {
      Dialog.close()
    }).catch(function (error) {
      console.log(error)
    })

    // wx.showModal({
    //   title: '反馈',
    //   content: '请联系负责人微信: xxxxxxxxxx',
    //   showCancel: false
    // })
  },

  onQuestion(e) {
    wx.showModal({
      title: '提示',
      content: '请联系负责人微信: 1197252996',
      showCancel: false
    })
  }
})