// miniprogram/pages/points.js
import Toast from "../../dist/toast/toast";

const itemList = ['任意单品', '四季奶青', '牛奶烧仙草', '小芋圆烧仙草', '蜂蜜柚子茶', '幽兰拿铁', '熊猫奶盖茶']

Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: '',
    tea_point_list: new Array(7).fill(0),
    shop_list: [{
      name: '益禾堂 — 中南大学店',
      tick: [{
        name: '任意单品',
        point: 8
      }, {
        name: '四季奶青',
        point: 6
      }]
    }, {
      name: '益禾堂 — 后湖小区店',
      tick: [{
        name: '任意单品',
        point: 8
      }, {
        name: '牛奶烧仙草',
        point: 6
      }]
    }, {
      name: '书亦烧仙草 — 中南大学店',
      tick: [{
        name: '任意单品',
        point: 8
      }, {
        name: '小芋圆烧仙草',
        point: 6
      }]

    }, {
      name: '蜜雪冰城 — 中南大学店',
      tick: [{
        name: '任意单品',
        point: 8
      }, {
        name: '蜂蜜柚子茶',
        point: 6
      }]

    }, {
      name: '茶颜悦色 — 青年路步行街店',
      tick: [{
        name: '任意单品',
        point: 8
      }, {
        name: '幽兰拿铁',
        point: 6
      }]

    }, {
      name: '阿里山贡茶 — 中南大学店',
      tick: [{
        name: '任意单品',
        point: 8
      }, {
        name: '熊猫奶盖茶',
        point: 6
      }]

    }, {
      name: '甘茗城 — 后湖小区店',
      tick: [{
        name: '任意单品',
        point: 8
      }]

    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.type == 'tea') {
      this.setData({
        type: options.type,
        tea_point: options.tea_point,
        tea_point_list: JSON.parse(options.tea_point_list)
      })

    } else if (options.type == 'battery') {
      this.setData({
        type: options.type,
        battery_point: options.battery_point
      })
    }
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

  onExchangeTeacup({
    currentTarget: {
      dataset: {
        shopid,
        ticketid,
        ticketpoint

      }
    }
  }) {
    var that = this;
    const toast = Toast.loading({
      duration: 0,
      mask: true,
      forbidClick: true,
      message: '正在兑换...',
      selector: '#toast'
    })
    //调函数
    wx.showModal({
      title: '请确认',
      content: '确定兑换' + that.data.shop_list[shopid].tick[ticketid].name + '券(适用于:' + that.data.shop_list[shopid].name + '么?',
      showCancel: true,
      success: res => {
        if (res.cancel) {
          Toast.clear();
          Toast.fail({
            duration: 2000,
            message: '您已取消兑换',
            selector: '#toast'
          })
        } else if (res.confirm) {

          wx.cloud.callFunction({
            name: 'drinktoticket',

            data: {
              cost: ticketpoint,
              shop_id: shopid,
              item_type: ticketid
            }
          }).then(res => {
            console.log(res);
            Toast.clear();
            wx.showModal({
              title: '兑换成功',
              content: '奶茶券码: ' + res.result.ticket.id + ',券型: ' + itemList[res.result.ticket.item_id] + ',适用于商店: ' + that.data.shop_list[res.result.ticket.shop_id].name,
              showCancel: false,
              success: res => {
                wx.navigateBack({
                  delta: 1, // 回退前 delta(默认为1) 页面
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
              }
            })
          }).catch(error => {
            console.log(error);
          })
        }
      },
      fail: error => {
        console.log(error)
      }
    })
  },

  onExchangeBattery(e) {
    console.log(e)
    const toast = Toast.loading({
      duration: 0,
      mask: true,
      forbidClick: true,
      message: '正在兑换...',
      selector: '#toast'
    })
    wx.cloud.callFunction({
      name: 'batterytodollpaper',
      data: {
        cost_light: 1
      }
    }).then(res => {
      Toast.clear();
      wx.showModal({
        title: '兑换成功！',
        content: '剩余积分:' + res.result.result.left_light_num,
        showCancel: false,
        success: res => {
          wx.navigateBack({
            delta: 1, // 回退前 delta(默认为1) 页面
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
        }
      })

    })
  },

  onQuestionExchangeBattery(e) {
    Toast({
      duration: 3000,
      message: '1个积分兑换2个娃娃券',
      selector: '#toast'
    })
  }

})