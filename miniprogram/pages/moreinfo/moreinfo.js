// miniprogram/pages/moreinfo/moreinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 0,
    info: [{
      time: '未知',
      image_url: 'https://616e-anco001-ba193c-1258302103.tcb.qcloud.la/images/info_pic/1.jpg?sign=4a91b21fdc70a97ff80b41d78d64cfca&t=1552361423',
      desc_text: 'quasi dolore dolorem nulla voluptates magnam porro dicta?quasi dolore dolorem nulla voluptates magnam porro dicta?',
      title_text: 'nisi quod eligendi'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      info: [{
        time: '未知',
        image_url: 'https://616e-anco001-ba193c-1258302103.tcb.qcloud.la/images/info_pic/1.jpg?sign=4a91b21fdc70a97ff80b41d78d64cfca&t=1552361423',
        desc_text: 'quasi dolore dolorem nulla voluptates magnam porro dicta?quasi dolore dolorem nulla voluptates magnam porro dicta?',
        title_text: 'nisi quod eligendi'
      }, {
        time: '未知',
        image_url: 'https://616e-anco001-ba193c-1258302103.tcb.qcloud.la/images/info_pic/2.jpg?sign=f80ae2bb1e0f5555148af0a3ecfb1d93&t=1552361460',
        desc_text: 'quasi dolore dolorem nulla voluptates magnam porro dicta?quasi dolore dolorem nulla voluptates magnam porro dicta?',
        title_text: 'nisi quod eligendi'
      }]
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

  onTapDebug(e) {
    console.log(e.detail);
    wx.navigateTo({
      url: `../infoDetail/infoDetail?page=${this.data.current}`,
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
        console.log("fail");
      },
      complete: function () {
        // complete
      }
    })
  },

  onSwiperChange(e) {
    this.setData({
      current: e.detail.current
    });
    console.log(e.detail.current);
    console.log(this.data.current);
  }
})