import Toast from "../../dist/toast/toast";

// miniprogram/pages/tickets/tickets.js

var touchStartX = 0;
var touchStartY = 0;
var moveX = 0;
var startX = 0;
var time = 0;
var moveHorizontally = true;
var actionWidth = 0;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 页面数据
    // transLateX: [], //弃用
    show_shadow: [],
    // animate: true,

    type: "",
    shop: {
      "0001": "益禾堂 - 中南大学店",
      "0002": "益禾堂 - 后湖小区店",
      "0003": "书亦烧仙草 - 中南大学店",
      "0004": "蜜雪冰城 - 中南大学店",
      "0005": "茶颜悦色 - 青年路步行街店",
      "0006": "阿里山贡茶 - 中南大学店",
      "0007": "甘茗城 - 后湖小区店"
    },

    item_title: [
      "任意单品",
      "四季奶青",
      "牛奶烧仙草",
      "小芋圆烧仙草",
      "蜂蜜柚子茶",
      "幽兰拿铁",
      "熊猫奶盖茶"
    ],
    item_type: 0,

    tea_tickets: [{
        _id: "0001",
        item_type: 1,
        end_time: "2018-12-30 13:30:34"
      },
      {
        _id: "0007",
        item_type: 5,
        end_time: "2018-12-30 13:30:34"
      },
      {
        _id: "0003",
        item_type: 4,
        end_time: "2018-12-30 13:30:34"
      }
    ],
    doll_tickets: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      type: options.type,
      item_type: 0,
      tea_tickets: options.tea_tickets ? JSON.parse(options.tea_tickets) : [],

      doll_tickets: options.doll_tickets ? JSON.parse(options.doll_tickets) : []
    });
    if (options.type === "tea") {
      let showShadow = new Array(this.data.tea_tickets.length).fill(false);
      this.setData({
        show_shadow: showShadow
      });
    } else if (options.type === 'doll') {
      let showShadow = new Array(this.data.doll_tickets.length).fill(false);
      this.setData({
        show_shadow: showShadow
      });
    }
    // if (options.type === "tea") {
    //   var trans = new Array(this.data.tea_tickets.length).fill(0);
    // } else {
    //   var trans = new Array(this.doll_tickets.length).fill(0);
    // }

    // this.setData({
    //   transLateX: trans
    // });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.createSelectorQuery()
      .select(".use")
      .boundingClientRect(rect => {
        console.log(rect.width);
        actionWidth = rect.width;
      })
      .exec();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

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
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},

  /**
   * 显示删除按钮
   */
  showDeleteButton: function (e) {
    let productIndex = e.currentTarget.dataset.productindex;
    this.setXmove(productIndex, -actionWidth);
    let show = this.data.show_shadow;
    show[productIndex] = true;
    this.setData({
      show_shadow: show
    });
  },

  /**
   * 隐藏删除按钮
   */
  hideDeleteButton: function (e) {
    let productIndex = e.currentTarget.dataset.productindex;

    this.setXmove(productIndex, 0);

    let show = this.data.show_shadow;
    show[productIndex] = false;
    this.setData({
      show_shadow: show
    });
  },

  /**
   * 设置movable-view位移
   */
  setXmove: function (productIndex, x) {
    console.log(this.data.type == "tea");
    if (this.data.type === "tea") {
      let tickets = this.data.tea_tickets;
      tickets[productIndex].x = x;
      console.log(tickets);
      this.setData({
        tea_tickets: tickets
      });
      console.log("updated ", this.data.tea_tickets);
    } else if (this.data.type === "doll") {
      let tickets = this.data.doll_tickets;
      tickets[productIndex].x = x;
      this.setData({
        doll_tickets: tickets
      });
      console.log("updated ", this.data.doll_tickets);
    }
  },

  //处理 movable-view 滑动
  handleTouchStart(e) {
    console.log("STart");
    startX = e.touches[0].pageX;
  },

  handleTouchEnd(e) {
    if (
      e.changedTouches[0].pageX < startX &&
      e.changedTouches[0].pageX - startX <= -actionWidth / 2
    ) {
      console.log("End Show");
      this.showDeleteButton(e);
    } else if (
      e.changedTouches[0].pageX > startX &&
      e.changedTouches[0].pageX - startX < actionWidth / 2
    ) {
      console.log("End Show");

      this.showDeleteButton(e);
    } else {
      console.log("End Hide");

      this.hideDeleteButton(e);
    }
  },

  handleMovableChange(e) {
    if (e.detail.source === "friction") {
      if (e.detail.x < -actionWidth / 2) {
        console.log("Change Show");
        this.showDeleteButton(e);
      } else {
        console.log("Change Hide");

        this.hideDeleteButton(e);
      }
    } else if (e.detail.source === "out-of-bounds" && e.detail.x === 0) {
      console.log("Change Hide");

      this.hideDeleteButton(e);
    }
  },

  onTapUseDollTicket({
    currentTarget: {
      dataset: {
        index
      }
    }
  }) {
    let productList = this.data.doll_tickets;

    // 使用这张娃娃券的逻辑

    //从用户列表里删掉这张娃娃券的逻辑
    productList.splice(index, 1);

    this.setData({
      doll_tickets: productList
    });
    if (productList[index]) {
      this.setXmove(index, 0);
    }
  },

  onTapUseTeaTicket({
    currentTarget: {
      dataset: {
        id,
        index
      }
    }
  }) {
    var productList = this.data.tea_tickets;

    // 使用这张奶茶券的逻辑

    wx.showModal({
      title: '券ID:' + id,
      content: '请向商家出示本界面，确认无误后再点击确认！',
      showCancel: true,
      success: res => {
        if (res.cancel) {
          Toast.fail({
            duration: 3000,
            message: '您已取消使用',
            selector: '#toast'
          })
        } else if (res.confirm) {
          const toast = Toast.loading({
            duration: 0,
            mask: true,
            forbidClick: true,
            message: '正在为您处理...',
            selector: '#toast'
          })
          wx.cloud.callFunction({
            name: 'completeticket',
            data: {
              ticket_id: id
            }
          }).then(res => {
            Toast.clear();
            Toast.success({
              duration: 2000,
              message: '祝您用饮愉快',
              selector: '#toast'
            })
            //从用户列表里删掉这张奶茶券的逻辑
            productList.splice(index, 1);

            this.setData({
              tea_tickets: productList
            });
            if (productList[index]) {
              this.setXmove(index, 0);
            }
          }).catch(error => {
            Toast.clear();
            console.log(error);
            Toast.fail({
              duration: 3000,
              message: '错误' + error,
              select: '#toast'
            })
          })
        }
      }
    })

  }

  // 弃用API
  // touchStart(e) {
  //   this.setData({
  //     animate: false
  //   });
  //   touchStartX = e.touches[0].pageX;
  //   touchStartY = e.touches[0].pageY;
  //   startX = this.data.transLateX; //组件初始位置
  // },

  // touchMove(e) {
  //   var touchMoveX = e.touches[0].pageX;
  //   var touchMoveY = e.touches[0].pageY;
  //   var temp = this.data.transLateX;
  //   var id = e.currentTarget.dataset.index;
  //   moveX = touchMoveX - touchStartX;
  //   console.log(moveX);

  //   if (Math.abs(touchMoveY - touchStartY) > Math.abs(moveX)) {
  //     // Move Up
  //     moveHorizontally = false;
  //     return;
  //   }
  //   moveHorizontally = true;
  //   if ((startX === 0 && moveX > 0) || (startX === -actionWidth && moveX < 0)) {
  //     return;
  //   } else if (Math.abs(moveX) >= actionWidth) {
  //     moveX = moveX < 0 ? -actionWidth : actionWidth;
  //     temp[id] = moveX;
  //     console.log(temp);
  //     this.setData({
  //       transLateX: temp
  //     });
  //   } else {
  //     temp[id] = moveX + startX;
  //     for (var i = 0; i < temp.length; i++) {
  //       console.log(temp[i] + "   ");
  //     }

  //     this.setData({
  //       transLateX: temp
  //     });
  //   }
  // },

  // touchEnd(e) {
  //   var id = e.currentTarget.dataset.index;
  //   if (!moveHorizontally) {
  //     return;
  //   }

  //   let transLateX = this.data.transLateX;
  //   transLateX[id] = 0;
  //   if (moveX + startX >= 0) {
  //     transLateX[id] = 0;
  //   } else if (
  //     (startX === 0 && Math.abs(moveX) < actionWidth / 2) ||
  //     (startX === -actionWidth && Math.abs(moveX) > actionWidth / 2)
  //   ) {
  //     transLateX[id] = 0;
  //   } else {
  //     transLateX[id] = -actionWidth;
  //   }
  //   this.setData(
  //     {
  //       animate: true
  //     },
  //     () => {
  //       this.setData({
  //         transLateX: transLateX
  //       });
  //     }
  //   );
  // }
});