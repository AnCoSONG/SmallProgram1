import Dialog from "../../dist/dialog/dialog";
import Toast from "../../dist/toast/toast";
const moment = require("../../utils/moment");
// miniprogram/pages/exchange/exchange.js

const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    activeNames: ["1"],

    recycle_records_label: "请先登录",
    tickets_label: "请先登录",
    point_desc: "请先登录",

    about_us_show: false,

    user: {
      battery_point: 0,
      tea_point: 0,
      tea_point_dict: {},
      tea_point_list: new Array(7).fill(0),
      recycle_records: [],
      tea_tickets: [],
      doll_tickets: [],
      logged: false,
      username: "请点头像登录",
      userInfo: {},
      avatarUrl: ""
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    wx.getSetting({
      success: res => {
        if (res.authSetting["scope.userInfo"]) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // var thatUser = this.data.user;
              // var pList = [];
              // const toast = Toast.loading({
              //   duration: 0,
              //   mask: true,
              //   forbidClick: true,
              //   selector: "#loading",
              //   message: "正在拉取电池积分..."
              // });
              // let _1 = wx.cloud
              //   .callFunction({
              //     name: "getbatterylight",
              //     data: {}
              //   })
              //   .then(function (res) {
              //     // console.log(res);
              //     thatUser.battery_point = res.result.battery_light;
              //     toast.setData({
              //       message: "正在拉取奶茶积分..."
              //     });
              //   })
              //   .catch(function (error) {
              //     Toast.clear();
              //     Toast.fail({
              //       duration: 2000,
              //       message: "获取失败" + error.message,
              //       selector: "#error"
              //     });
              //     console.log(error);
              //   });

              // let _2 = wx.cloud
              //   .callFunction({
              //     name: "getdrinklightandticket",
              //     data: {}
              //   })
              //   .then(res => {
              //     // console.log(res);
              //     // console.log(res.result.drink.tickets);

              //     for (let i of res.result.drink.lights) {

              //       // thatUser.tea_point_dict[i.shop.id] = i.number; //字典不如直接列表方便
              //       thatUser.tea_point_list[i.shop.id - 1] = i.number;
              //       thatUser.tea_point += i.number
              //     }

              //     for (let i of res.result.drink.tickets) {
              //       let _id = "000" + String(i.shop.id);
              //       let item_type = i.item.id;
              //       let end_time = i.valid ? moment(i.create_time, "YYYY-MM-DD HH:mm:SS")
              //         .add(i.effect_time, "h")
              //         .format("YYYY-MM-DD HH:mm:SS") : "过期"
              //       thatUser.tea_tickets.push({
              //         id: i.id,
              //         _id: _id,
              //         item_type: item_type,
              //         end_time: end_time,
              //         done: i.done,
              //         valid: i.valid
              //       });
              //     }
              //     // console.log(thatUser);
              //     toast.setData({
              //       message: "正在拉取娃娃券..."
              //     });
              //   })
              //   .catch(error => {
              //     Toast.clear();
              //     Toast.fail({
              //       duration: 2000,
              //       message: "获取失败" + error.message,
              //       selector: "#error"
              //     });
              //     console.log(error);
              //   });

              // let _3 = wx.cloud
              //   .callFunction({
              //     name: "getdollpaperinfo",
              //     data: {}
              //   })
              //   .then(res => {
              //     console.log(res);
              //     for (let i of res.result.doll_paper) {
              //       thatUser.doll_tickets.push({
              //         name: "娃娃券",
              //         id: i.id,
              //         done: i.done,
              //         valid: i.valid,
              //         end_time: i.valid ?
              //           moment(i.create_time, "YYYY-MM-DD HH:mm:SS")
              //           .add(i.effect_time, "h")
              //           .format("YYYY-MM-DD HH:mm:SS") : "过期"
              //       });
              //     }
              //     console.log(thatUser);
              //     Toast.clear();
              //   })
              //   .catch(error => {
              //     Toast.clear();
              //     Toast.fail({
              //       duration: 2000,
              //       message: "获取失败" + error.message,
              //       selector: "#error"
              //     });
              //     console.log(error);
              //   });

              // let _4 = wx.cloud
              //   .callFunction({
              //     name: "getalldrinkorder",
              //     data: {}
              //   })
              //   .then(res => {
              //     console.log(res);
              //     for (let i of res.result.orders) {
              //       thatUser.recycle_records.push({
              //         type: "teacup",
              //         dataset: {
              //           id: String(i.id),
              //           submitTime: i.createTime,
              //           shopId: i.shop_id,
              //           status: i.done,
              //           cupId: i.cup_id

              //         }
              //       });
              //     }
              //     console.log(thatUser);
              //   })
              //   .catch(error => {
              //     Toast.clear();
              //     Toast.fail({
              //       duration: 2000,
              //       message: "获取失败" + error.message,
              //       selector: "#error"
              //     });
              //     console.log(error);
              //   });
              // let _5 = wx.cloud.callFunction({
              //   name: 'getallbatteryorder',
              //   data: {}
              // }).then(res => {
              //   console.log(res);
              //   for (let i of res.result.orders) {

              //     thatUser.recycle_records.push({
              //       type: 'battery',
              //       dataset: {
              //         id: String(i.id),
              //         batteryNum: i.battery_num,
              //         status: i.done,
              //         submitTime: i.createTime,
              //         contactNumber: i.tel,
              //         pickedPlace: i.userLocation,
              //         pickedTime: i.freeTime,
              //         note: i.note
              //       }
              //     })
              //   }
              //   console.log(thatUser);
              // }).catch(error => {
              //   Toast.clear();
              //   Toast.fail({
              //     duration: 2000,
              //     message: "获取失败" + error.message,
              //     selector: "#error"
              //   });
              //   console.log(error);
              // });

              // pList.push(_1);
              // pList.push(_2);
              // pList.push(_3);
              // pList.push(_4);
              // pList.push(_5);
              // Promise.all(pList).then(rest => {
              //   this.setData({
              //     point_desc: "继续加油哦",
              //     tickets_label: "继续加油哦",
              //     recycle_records_label: "继续加油哦",
              //     user: {
              //       battery_point: thatUser.battery_point,
              //       tea_point: thatUser.tea_point,
              //       recycle_records: thatUser.recycle_records,
              //       logged: true,
              //       tea_point_list: thatUser.tea_point_list,
              //       username: res.userInfo.nickName,
              //       avatarUrl: res.userInfo.avatarUrl,
              //       userInfo: res.userInfo,
              //       tea_tickets: thatUser.tea_tickets,

              //       doll_tickets: thatUser.doll_tickets
              //     }
              //   });
              //   app.logged = true;
              //   app.avaterUrl = res.userInfo.avatarUrl;
              //   app.username = res.userInfo.nickName;
              //   app.userInfo = res.userInfo;
              // });
            }
          });
        }
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
    this.refreshAllData();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading();
    this.refreshAllData();


  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},

  onGetUserInfo: function (e) {
    if (!this.logged && e.detail.userInfo) {
      var thatUser = {
        battery_point: 0,
        tea_point: 0,
        tea_point_dict: {},
        tea_point_list: new Array(7).fill(0),
        recycle_records: [],
        tea_tickets: [],
        doll_tickets: [],
        logged: false,
        username: "请点头像登录",
        userInfo: {},
        avatarUrl: ""
      };
      thatUser.logged = true;
      thatUser.username = e.detail.userInfo.nickName;
      thatUser.avatarUrl = e.detail.userInfo.avatarUrl;
      thatUser.userInfo = e.detail.userInfo;
      var pList = [];
      const toast = Toast.loading({
        duration: 0,
        mask: true,
        forbidClick: true,
        selector: "#loading",
        message: "正在拉取电池积分..."
      });
      let _1 = wx.cloud
        .callFunction({
          name: "getbatterylight",
          data: {}
        })
        .then(function (res) {
          // console.log(res);
          thatUser.battery_point = res.result.battery_light;
          toast.setData({
            message: "正在拉取奶茶积分..."
          });
        })
        .catch(function (error) {
          Toast.clear();
          Toast.fail({
            duration: 2000,
            message: "获取失败" + error.message,
            selector: "#error"
          });
          console.log(error);
        });

      let _2 = wx.cloud
        .callFunction({
          name: "getdrinklightandticket",
          data: {}
        })
        .then(res => {
          // console.log(res);
          // console.log(res.result.drink.tickets);

          for (let i of res.result.drink.lights) {

            thatUser.tea_point_list[i.shop.id - 1] = i.number;
            thatUser.tea_point += i.number
          }

          for (let i of res.result.drink.tickets) {
            let _id = "000" + String(i.shop.id);
            let item_type = i.item.id;
            let end_time = i.valid ? moment(i.create_time, "YYYY-MM-DD HH:mm:SS")
              .add(i.effect_time, "h")
              .format("YYYY-MM-DD HH:mm:SS") : "过期"
            thatUser.tea_tickets.push({
              id: i.id,
              _id: _id,
              item_type: item_type,
              end_time: end_time,
              done: i.done,
              valid: i.valid
            });
          }
          // console.log(thatUser);
          toast.setData({
            message: "正在拉取娃娃券..."
          });
        })
        .catch(error => {
          Toast.clear();
          Toast.fail({
            duration: 2000,
            message: "获取失败" + error.message,
            selector: "#error"
          });
          console.log(error);
        });

      let _3 = wx.cloud
        .callFunction({
          name: "getdollpaperinfo",
          data: {}
        })
        .then(res => {
          console.log(res);
          for (let i of res.result.doll_paper) {
            thatUser.doll_tickets.push({
              name: "娃娃券",
              id: i.id,
              done: i.done,
              valid: i.valid,
              end_time: i.valid ?
                moment(i.create_time, "YYYY-MM-DD HH:mm:SS")
                .add(i.effect_time, "h")
                .format("YYYY-MM-DD HH:mm:SS") : "过期"
            });
          }
          console.log(thatUser);
          Toast.clear();
        })
        .catch(error => {
          Toast.clear();
          Toast.fail({
            duration: 2000,
            message: "获取失败" + error.message,
            selector: "#error"
          });
          console.log(error);
        });

      let _4 = wx.cloud
        .callFunction({
          name: "getalldrinkorder",
          data: {}
        })
        .then(res => {
          console.log(res);
          for (let i of res.result.orders) {
            thatUser.recycle_records.push({
              type: "teacup",
              dataset: {
                id: String(i.id),
                submitTime: i.createTime,
                shopId: i.shop_id,
                status: i.done,
                cupId: i.cup_id

              }
            });
          }
          console.log(thatUser);
        })
        .catch(error => {
          Toast.clear();
          Toast.fail({
            duration: 2000,
            message: "获取失败" + error.message,
            selector: "#error"
          });
          console.log(error);
        });
      let _5 = wx.cloud.callFunction({
        name: 'getallbatteryorder',
        data: {}
      }).then(res => {
        console.log(res);
        for (let i of res.result.orders) {

          thatUser.recycle_records.push({
            type: 'battery',
            dataset: {
              id: String(i.id),
              batteryNum: i.battery_num,
              status: i.done,
              submitTime: i.createTime,
              contactNumber: i.tel,
              pickedPlace: i.userLocation,
              pickedTime: i.freeTime,
              note: i.note
            }
          })
        }
        console.log(thatUser);
      }).catch(error => {
        Toast.clear();
        Toast.fail({
          duration: 2000,
          message: "获取失败" + error.message,
          selector: "#error"
        });
        console.log(error);
      });

      pList.push(_1);
      pList.push(_2);
      pList.push(_3);
      pList.push(_4);
      pList.push(_5);
      Promise.all(pList).then(rest => {
        this.setData({
          point_desc: "继续加油哦",
          tickets_label: "继续加油哦",
          recycle_records_label: "继续加油哦",
          user: {
            battery_point: thatUser.battery_point,
            tea_point: thatUser.tea_point,
            recycle_records: thatUser.recycle_records,
            tea_point_list: thatUser.tea_point_list,
            tea_tickets: thatUser.tea_tickets,

            doll_tickets: thatUser.doll_tickets,
            username: thatUser.username,
            avatarUrl: thatUser.avatarUrl,
            userInfo: thatUser.userInfo,
            logged: thatUser.logged
          }
        });
        app.logged = thatUser.logged;
        app.avaterUrl = thatUser.avatarUrl;
        app.username = thatUser.username;
        app.userInfo = thatUser.userInfo;
      });
      // this.setData({
      //     point_desc: "继续加油哦",
      //     tickets_label: "继续加油哦!",
      //     recycle_records_label: "继续加油哦~",
      //     user: {
      //       battery_point: 50,
      //       tea_point: 50,
      //       tea_point_list: [0, 2, 4, 6, 8, 10, 12],
      //       recycle_records: [{
      //           type: "battery",
      //           dataset: {
      //             id: "2019123123",
      //             batterNum: 3,
      //             status: false,
      //             submitTime: "2019-03-20 15:30:11",
      //             contactNumber: "18512855406",
      //             pickedPlace: "15栋731",
      //             pickedTime: "2019-03-27 18-20时",
      //             note: "Sed non soluta.Eum qui in voluptas. Sed aperiam aut quae ea aliquam veniam. Tempora harum aut eos ducimus cumque corporis alias cupiditate voluptate."
      //           }
      //         },
      //         {
      //           type: "teacup",
      //           dataset: {
      //             id: "201911111",
      //             submitTime: "2019-03-20 15:20",
      //             shopId: 1,
      //             cupId: "212313131",
      //             status: true
      //           }
      //         }
      //       ],
      //       logged: true,
      //       username: e.detail.userInfo.nickName,
      //       avatarUrl: e.detail.userInfo.avatarUrl,
      //       userInfo: e.detail.userInfo,
      //       tea_tickets: [{
      //           _id: "0001",
      //           item_type: 1,
      //           end_time: "2018-12-30 13:30:34"
      //         },
      //         {
      //           _id: "0007",
      //           item_type: 5,
      //           end_time: "2018-12-30 13:30:34"
      //         },
      //         {
      //           _id: "0003",
      //           item_type: 4,
      //           end_time: "2018-12-30 13:30:34"
      //         },
      //         {
      //           _id: "0006",
      //           item_type: 2,
      //           end_time: "2018-12-30 13:30:34"
      //         },
      //         {
      //           _id: "0006",
      //           item_type: 2,
      //           end_time: "2018-12-30 13:30:34"
      //         }
      //       ],
      //       doll_tickets: [{
      //           name: "娃娃券",
      //           end_time: "2018-12-30 13:30:34"
      //         },
      //         {
      //           name: "娃娃券",
      //           end_time: "2018-12-30 13:31:34"
      //         },
      //         {
      //           name: "娃娃券",
      //           end_time: "2018-12-30 13:32:34"
      //         }
      //       ]
      //     }
      //   }),
      //   (app.logged = true);
      // app.avaterUrl = e.detail.userInfo.avatarUrl;
      // app.username = e.detail.userInfo.nickName;
      // app.userInfo = e.detail.userInfo;
    }
  },

  onChangeCollapse(e) {
    this.setData({
      activeNames: e.detail
    });
  },

  onTapDebug(e) {
    console.log("Tap");
  },

  // onClose(e) {
  //   this.setData({
  //     show: false
  //   })
  // },

  onClickAboutUs(e) {
    Dialog.alert({
      title: "关于我们",
      message: "这款小程序由中南大学“杂症听诊器”团队设计，四川大学某不愿意透露姓名的宋同学和曹同学研发。在这里，有神器的魔法——用掉的电池可以变成橱窗里的娃娃，喝光的奶茶杯可以变成满满的奶茶。欢迎来到神器的电池杯杯世界。"
    }).then(() => {
      // on close
      console.log("close");
    });
  },

  onTeaTicket(e) {
    let ticket = this.data.user.tea_tickets;
    wx.navigateTo({
      url: "../tickets/tickets?type=tea&tea_tickets=" + JSON.stringify(ticket),
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    });
  },

  onDollTicket(e) {
    let ticket = this.data.user.doll_tickets;
    wx.navigateTo({
      url: "../tickets/tickets?type=doll&doll_tickets=" + JSON.stringify(ticket),
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    });
  },
  onRecord(e) {
    let records = this.data.user.recycle_records;
    wx.navigateTo({
      url: "../recycleRecords/recycleRecords?records=" + JSON.stringify(records),
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    });
  },

  onTeaCupPoint(e) {
    let tea_point_list = this.data.user.tea_point_list
    let tp = this.data.user.tea_point
    wx.navigateTo({
      url: '../points/points?type=tea&tea_point=' + tp + '&tea_point_list=' + JSON.stringify(tea_point_list),
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

  onBatteryPoint(e) {

  },

  refreshAllData() {
    var thatUser = {
      battery_point: 0,
      tea_point: 0,
      tea_point_dict: {},
      tea_point_list: new Array(7).fill(0),
      recycle_records: [],
      tea_tickets: [],
      doll_tickets: [],
      logged: false,
      username: "请点头像登录",
      userInfo: {},
      avatarUrl: ""
    };
    wx.getUserInfo({
      success: function (res) {
        // success
        thatUser.logged = true;
        thatUser.username = res.userInfo.nickName;
        thatUser.avatarUrl = res.userInfo.avatarUrl;
        thatUser.userInfo = res.userInfo;
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
    var pList = [];
    const toast = Toast.loading({
      duration: 0,
      mask: true,
      forbidClick: true,
      selector: "#loading",
      message: "正在拉取电池积分..."
    });
    let _1 = wx.cloud
      .callFunction({
        name: "getbatterylight",
        data: {}
      })
      .then(function (res) {
        // console.log(res);
        thatUser.battery_point = res.result.battery_light;
        toast.setData({
          message: "正在拉取奶茶积分..."
        });
      })
      .catch(function (error) {
        Toast.clear();
        Toast.fail({
          duration: 2000,
          message: "获取失败" + error.message,
          selector: "#error"
        });
        console.log(error);
      });

    let _2 = wx.cloud
      .callFunction({
        name: "getdrinklightandticket",
        data: {}
      })
      .then(res => {
        console.log(res);
        // console.log(res.result.drink.tickets);

        for (let i of res.result.drink.lights) {
          // console.log(i.shop);
          thatUser.tea_point_list[i.shop.id - 1] = i.number;
          thatUser.tea_point += i.number
        }

        for (let i of res.result.drink.tickets) {
          let _id = "000" + String(i.shop.id);
          let item_type = i.item.id;
          let end_time = i.valid ? moment(i.create_time, "YYYY-MM-DD HH:mm:SS")
            .add(i.effect_time, "h")
            .format("YYYY-MM-DD HH:mm:SS") : "过期"
          thatUser.tea_tickets.push({
            id: i.id,
            _id: _id,
            item_type: item_type,
            end_time: end_time,
            done: i.done,
            valid: i.valid
          });
        }
        // console.log(thatUser);
        toast.setData({
          message: "正在拉取娃娃券..."
        });
      })
      .catch(error => {
        Toast.clear();
        Toast.fail({
          duration: 2000,
          message: "获取失败" + error.message,
          selector: "#error"
        });
        console.log(error);
      });

    let _3 = wx.cloud
      .callFunction({
        name: "getdollpaperinfo",
        data: {}
      })
      .then(res => {
        console.log(res);
        for (let i of res.result.doll_paper) {
          thatUser.doll_tickets.push({
            name: "娃娃券",
            id: i.id,
            done: i.done,
            valid: i.valid,
            end_time: i.valid ?
              moment(i.create_time, "YYYY-MM-DD HH:mm:SS")
              .add(i.effect_time, "h")
              .format("YYYY-MM-DD HH:mm:SS") : "过期"
          });
        }
        console.log(thatUser);
        Toast.clear();
      })
      .catch(error => {
        Toast.clear();
        Toast.fail({
          duration: 2000,
          message: "获取失败" + error.message,
          selector: "#error"
        });
        console.log(error);
      });

    let _4 = wx.cloud
      .callFunction({
        name: "getalldrinkorder",
        data: {}
      })
      .then(res => {
        console.log(res);
        for (let i of res.result.orders) {
          thatUser.recycle_records.push({
            type: "teacup",
            dataset: {
              id: String(i.id),
              submitTime: i.createTime,
              shopId: i.shop_id,
              status: i.done,
              cupId: i.cup_id

            }
          });
        }
        console.log(thatUser);
      })
      .catch(error => {
        Toast.clear();
        Toast.fail({
          duration: 2000,
          message: "获取失败" + error.message,
          selector: "#error"
        });
        console.log(error);
      });
    let _5 = wx.cloud.callFunction({
      name: 'getallbatteryorder',
      data: {}
    }).then(res => {
      console.log(res);
      for (let i of res.result.orders) {

        thatUser.recycle_records.push({
          type: 'battery',
          dataset: {
            id: String(i.id),
            batteryNum: i.battery_num,
            status: i.done,
            submitTime: i.createTime,
            contactNumber: i.tel,
            pickedPlace: i.userLocation,
            pickedTime: i.freeTime,
            note: i.note
          }
        })
      }
      console.log(thatUser);
    }).catch(error => {
      Toast.clear();
      Toast.fail({
        duration: 2000,
        message: "获取失败" + error.message,
        selector: "#error"
      });
      console.log(error);
    });

    pList.push(_1);
    pList.push(_2);
    pList.push(_3);
    pList.push(_4);
    pList.push(_5);
    Promise.all(pList).then(rest => {
      this.setData({
        point_desc: "继续加油哦",
        tickets_label: "继续加油哦",
        recycle_records_label: "继续加油哦",
        user: {
          battery_point: thatUser.battery_point,
          tea_point: thatUser.tea_point,
          recycle_records: thatUser.recycle_records,
          tea_point_list: thatUser.tea_point_list,
          tea_tickets: thatUser.tea_tickets,

          doll_tickets: thatUser.doll_tickets,
          username: thatUser.username,
          avatarUrl: thatUser.avatarUrl,
          userInfo: thatUser.userInfo,
          logged: thatUser.logged
        }
      });
      app.logged = thatUser.logged;
      app.avaterUrl = thatUser.avatarUrl;
      app.username = thatUser.username;
      app.userInfo = thatUser.userInfo;
      wx.stopPullDownRefresh();
      wx.hideNavigationBarLoading();
    });

  }
});