// miniprogram/pages/copeTeaCup/copeTeaCup.js

const rules = {
  YHT: '益禾堂',
  SYSXC: '书亦烧仙草',
  MXBC: '蜜雪冰城',
  CYYS: '茶颜悦色',
  ALSGC: '阿里山贡茶',
  GMC: '甘茗城'
};

const imageUrl = {
  YHT: 'https://10225702.s21i.faiusr.com/4/ABUIABAEGAAg2fXt0QUo_PmhvAQwlgE4Sw.png',
  SYSXC: 'http://www.85tea.com/Template/Site1/images/foot_logo2.gif',
  MXBC: 'http://seese-websites.oss-cn-beijing.aliyuncs.com/mxbc/public/pc/static/images/logo.png',
  CYYS: 'http://www.chayanys.com/images/logo.jpg  ',
  ALSGC: 'http://www.alsgongcha.com/image/logo.png',
  GMC: 'http://www.csganmingcheng.com/Upload/153544998998.jpg'
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUpLoadType:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      type: options.type,
      name: rules[options.type],
      logoUrl: imageUrl[options.type]
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

  }
})