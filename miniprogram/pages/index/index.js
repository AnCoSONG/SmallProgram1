// miniprogram/pages/home/home.js
import Toast from '../../dist/toast/toast';
// 全局app引用
const app = getApp()

var touchDotX = 0; //触摸时的原点
var touchDotY = 0; //触摸原点
var time = 0; // 时间记录，用于滑动时且时间小于1s则执行左右滑动
var interval = ""; // 记录/清理时间记录

Page({

  /**
   * 页面的初始数据
   */
  data: {
    page_show: false,
    page_loading: false,
    btnsize: "large",
    hover: true,
    list: [{
        title: '奶茶杯',
        desc: '将购买的奶茶杯扔到指定的垃圾桶以兑换积分'
      },
      {
        title: '废电池',
        desc: '将废旧电池正确回收以兑换积分'
      }
    ],
    imgUrls: [
      '../../images/banner/1.jpg',
      '../../images/banner/2.jpg',
      '../../images/banner/3.jpg'
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // 登录获取openid
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        // 登录成功获取openid
        // 存入app.golbalData.openid保存
        app.globalData.openid = res.result.openid;
      },
      fail: err => {
        console.log(err);
      }

    });



    // const toast = Toast.loading({
    //   mask: true,
    //   duration: 0, // 持续展示 toast
    //   forbidClick: true, // 禁用背景点击
    //   message: '倒计时 3 秒',
    //   loadingType: 'spinner',
    //   selector: '#van-toast'
    // });

    // let second = 3;
    // const timer = setInterval(() => {
    //   second--;
    //   if (second) {
    //     toast.setData({
    //       message: `倒计时 ${second} 秒`
    //     });
    //   } else {
    //     clearInterval(timer);
    //     Toast.clear();
    //   }
    // }, 1000);

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

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

  onTeaCup() {
    wx.navigateTo({
      url: '../teacup/teacup',
      success: function (res) {
        // success
        console.log("success");
      },
      fail: function () {
        // fail
        console.log("fail");
      },
      complete: function () {
        // complete
        console.log("complete");
      }
    })
  },

  onBattery() {
    wx.navigateTo({
      url: '../battery/battery',
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

  onMoreInfo() {
    wx.navigateTo({
      url: '../moreinfo/moreinfo',
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
  onLoadingTap() {
    this.setData({
      page_loading: false
    })
  },

  touchstart(e) {
    // console.log("Start touch");
    console.log(e);

    touchDotX = e.touches[0].pageX;
    touchDotY = e.touches[0].pageY;
    // console.log(touchDot)
    interval = setInterval(function () {
      time++;
    }, 100);
  },

  touchmove(e) {
    // console.log("Touch Move");
    console.log(e);
    var touchMovedX = e.touches[0].pageX;
    var touchMovedY = e.touches[0].pageY;
    // console.log("touchMove: " + touchMoved + " touchDot:" + touchDot);
    if (Math.abs(touchMovedY - touchDotY) > Math.abs(touchMovedX - touchDotX)) {
      return
    } else {
      if (touchMovedX - touchDotX <= -80 && time < 10) {
        wx.switchTab({
          url: '../user/user',
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
    }

  },

  touchend(e) {
    // console.log(e);

    // console.log("Touch End");
    clearInterval(interval);
    time = 0;
  },

















  /// ////////////// 测试接口用
  onTestInterface() {
    wx.cloud.callFunction({
      name: "getallbatteryorder",
      data: {
        ticket_id: "1"
      },
      success: res => {
        console.log(res.result);
      },
      fail: err => {
        console.log(err);
      }
    });
  }
})