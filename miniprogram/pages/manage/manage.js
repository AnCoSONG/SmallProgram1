// miniprogram/pages/manage/manage.js
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
    completeRecord: [],
    uncompleteRecord: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.refreshData();
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
    //加载所有的记录

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
    wx.showNavigationBarLoading();
    this.refreshData();

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

  onPass({
    currentTarget: {
      dataset: {
        id,
        type
      }
    }
  }) {
    console.log(id);
    console.log(type);
    var uncompleteRecord = this.data.uncompleteRecord;
    console.log(uncompleteRecord);
    for (var i = 0; i < uncompleteRecord.length; i++) {
      if (uncompleteRecord[i].type == type) {
        if (uncompleteRecord[i].dataset.id == id) {
          console.log("matched");
          console.log(i);
          this.makeComplete(i);
          break
        }
      }
    };
  },

  onDelete({
    currentTarget: {
      dataset: {
        id,
        type
      }
    }
  }) {
    console.log(id);
    console.log(type);
    var uncompleteRecord = this.data.uncompleteRecord;
    console.log(uncompleteRecord);
    for (var i = 0; i < uncompleteRecord.length; i++) {
      if (uncompleteRecord[i].type == type) {
        if (uncompleteRecord[i].dataset.id == id) {
          console.log("matched");
          console.log(i);
          this.makeDelete(i);
          break
        }
      }
    };
  },

  makeDelete(uncompleteIndex) {
    let uncomp = this.data.uncompleteRecord;
    let comp = this.data.completeRecord;
    let el = uncomp.splice(uncompleteIndex, 1);
    console.log(el[0]);
    //删除数据库里的数据

    //删除完成
    this.refreshData(uncomp, comp);
  },

  makeComplete(uncompleteIndex) {
    let uncomp = this.data.uncompleteRecord;
    let comp = this.data.completeRecord;
    let el = uncomp.splice(uncompleteIndex, 1);
    //设置数据库里为完成情况

    //设置完成
    el[0].dataset.status = true;
    console.log(el[0]);
    comp.push(el[0]);
    this.refreshData(uncomp, comp);
  },

  refreshData(uncomp, comp) {

    if (uncomp && comp) {
      this.setData({
        uncompleteRecord: uncomp,
        completeRecord: comp
      });
    } else {

      //拿数据
      this.setData({
        uncompleteRecord: [{
            type: 'battery',
            dataset: {
              id: 1,
              contactNumber: '18512855406',
              submitTime: '2019-03-31 12:22:33',
              pickedPlace: '四川大学江安校区',
              batteryNum: 10,
              pickedTime: '2019-04-02 18-20',
              status: false,
              note: '搞快点'
            }
          },
          {
            type: 'battery',
            dataset: {
              id: 2,
              contactNumber: '18512855406',
              submitTime: '2019-03-31 12:22:33',
              pickedPlace: '四川大学江安校区',
              batteryNum: 10,
              pickedTime: '2019-04-02 18-20',
              status: false,
              note: '搞快点'
            }
          },
          {
            type: 'teacup',
            dataset: {
              id: 3,
              contactNumber: '18512855406',
              submitTime: '2019-03-31 12:22:33',
              shopId: 2,
              cupId: 10,
              status: false
            }
          }
        ],
        completeRecord: []
      });

    }
    this.setData({
      pending: this.data.uncompleteRecord.length,
      compolish: this.data.completeRecord.length
    });
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  }
})