// miniprogram/pages/manage/manage.js

import Toast from "../../dist/toast/toast";

const app = getApp()
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

  checkAuth() {
    const root = [
      "oKLU95T0UapFjTfY9Snb21cNxGl4",
      "oKLU95eh0nwl-B4XgvRLygIxY23c",
      "oKLU95UjYNQKeZJQi_8FnS6qEW70",
      "oKLU95aFCbjEKOc0OGtZuKYMl5RU"
    ];
    for (let i of root) {
      if (i === app.globalData.openid) {
        console.log("管理员权限验证");
        return true;
      }
    }
    return false;
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
          if (this.checkAuth()) {
            this.makeComplete(i);
          } else {
            console.log("You dont have auth");
            Toast.fail({
              duration: 2000,
              message: '权限不足',
              selector: '#toast'
            });
          }

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
          if (this.checkAuth()) {
            this.makeDelete(i);
          } else {
            console.log("You dont have auth");
            Toast.fail({
              duration: 2000,
              message: '权限不足',
              selector: '#toast'
            });
          }

          break
        }
      }
    };
  },

  makeDelete(uncompleteIndex) {
    let uncomp = this.data.uncompleteRecord;
    let comp = this.data.completeRecord;
    Toast.loading({
      duration: 0,
      message: '请稍后',
      selector: '#toast',
      forbidClick: true
    })
    let el = uncomp.splice(uncompleteIndex, 1);
    console.log(el[0]);
    wx.cloud.callFunction({
      name: 'deleteuncompleterecord',
      data: {
        openid: app.globalData.openid,
        type: el[0].type,
        id: el[0].dataset.id
      }
    }).then(res => {
      Toast.clear()
      console.log(res);
      Toast.success({
        duration: 1000,
        message: '成功',
        selector: '#toast'
      });
      this.refreshData(uncomp, comp);
    }).catch(error => {
      Toast.clear()
      Toast.fail({
        duration: 3000,
        message: '失败' + error.errCode,
        selector: '#toast'
      })
    })

    //删除数据库里的数据

    //删除完成

  },

  makeComplete(uncompleteIndex) {
    let uncomp = this.data.uncompleteRecord;
    let comp = this.data.completeRecord;
    let el = uncomp.splice(uncompleteIndex, 1);
    console.log(el[0])
    Toast.loading({
      duration: 0,
      message: '请稍后',
      selector: '#toast',
      forbidClick: true
    })
    wx.cloud.callFunction({
      name: 'passuncompleterecord',
      data: {
        openid: app.globalData.openid,
        type: el[0].type,
        id: el[0].dataset.id
      }
    }).then(res => {
      Toast.clear();
      console.log(res);
      el[0].dataset.status = true;
      console.log(el[0]);
      comp.push(el[0]);
      this.refreshData(uncomp, comp);
      Toast.success({
        duration: 1000,
        message: '成功',
        selector: '#toast'
      })
    }).catch(error => {
      Toast.clear();
      console.log(error);
      Toast.fail({
        duration: 3000,
        message: '失败' + error.errCode,
        selector: '#toast'
      })
    })

  },

  getUnAlreadyBattery() {
    var num = 0;
    for (let i of this.data.uncompleteRecord) {
      if (i.type === 'battery') {
        num++
      }
    }
    return num;
  },

  getComAlreadyBattery() {
    var num = 0;
    for (let i of this.data.completeRecord) {
      if (i.type === 'battery') {
        num++
      }
    }
    return num;
  },

  getUnAlreadyDrink() {
    var num = 0;
    for (let i of this.data.uncompleteRecord) {
      if (i.type === 'teacup') {
        num++;
      }
    }
    return num;
  },

  getComAlreadyDrink() {
    var num = 0;
    for (let i of this.data.completeRecord) {
      if (i.type === 'teacup') {
        num++;
      }
    }
    return num;
  },

  refreshData(uncomp, comp) {
    var uncompRecord = [];
    var compRecord = [];
    // uncompRecord.concat(this.data.uncompleteRecord);
    // compRecord.concat(this.data.completeRecord);
    console.log()
    var that = this;
    if (uncomp && comp) {
      this.setData({
        uncompleteRecord: uncomp,
        completeRecord: comp,
        pending: this.data.uncompleteRecord.length,
        compolish: this.data.completeRecord.length
      });
    } else {

      //拿数据
      const toast = Toast.loading({
        duration: 0,
        mask: true,
        forbidClick: true,
        selector: '#toast',
        message: '正在加载待处理记录'
      })
      let _1 = wx.cloud.callFunction({
        name: 'getuncompleterecord',
        data: {
          openid: app.globalData.openid,
          battery_already_show: this.getUnAlreadyBattery(),
          drink_already_show: this.getUnAlreadyDrink()
        }
      }).then(res => {
        console.log(res.result.uncompleteRecord);
        for (let t of res.result.uncompleteRecord) {
          uncompRecord.push(t);
        };
        console.log(uncompRecord);
        toast.setData({
          message: '正在加载已完成的记录'
        })
      }).catch(error => {
        console.log(error);
        Toast.clear();
        Toast.fail({
          duration: 2000,
          message: "获取失败" + error.errCode,
          selector: "#toast"
        });
      });
      let _2 = wx.cloud.callFunction({
        name: 'getcompleterecord',
        data: {
          openid: app.globalData.openid,
          battery_already_show: this.getComAlreadyBattery(),
          drink_already_show: this.getComAlreadyDrink()
        }
      }).then(res => {
        console.log(res.result);
        for (let t of res.result.completeRecord) {
          compRecord.push(t);
        }
        console.log(compRecord);
        Toast.clear();
      }).catch(error => {
        console.log(error);
        Toast.clear();
        Toast.fail({
          duration: 2000,
          message: "获取失败" + error.errCode,
          selector: "#toast"
        });
      });

      var plist = [];
      plist.push(_1);
      plist.push(_2);
      Promise.all(plist).then(rest => {

        console.log("PK")
        that.setData({
          uncompleteRecord: uncompRecord,
          completeRecord: compRecord,
          pending: uncompRecord.length,
          compolish: compRecord.length
        });

      });

      // uncompleteRecord: [{
      //     type: 'battery',
      //     dataset: {
      //       id: 1,
      //       contactNumber: '18512855406',
      //       submitTime: '2019-03-31 12:22:33',
      //       pickedPlace: '四川大学江安校区',
      //       batteryNum: 10,
      //       pickedTime: '2019-04-02 18-20',
      //       status: false,
      //       note: '搞快点'
      //     }
      //   },
      //   {
      //     type: 'battery',
      //     dataset: {
      //       id: 2,
      //       contactNumber: '18512855406',
      //       submitTime: '2019-03-31 12:22:33',
      //       pickedPlace: '四川大学江安校区',
      //       batteryNum: 10,
      //       pickedTime: '2019-04-02 18-20',
      //       status: false,
      //       note: '搞快点'
      //     }
      //   },
      //   {
      //     type: 'teacup',
      //     dataset: {
      //       id: 3,
      //       contactNumber: '18512855406',
      //       submitTime: '2019-03-31 12:22:33',
      //       shopId: 2,
      //       cupId: 10,
      //       status: false
      //     }
      //   }
      // ],


    }
    // this.setData({
    //   pending: this.data.uncompleteRecord.length,
    //   compolish: this.data.completeRecord.length
    // });
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  }
})