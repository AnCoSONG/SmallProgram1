// miniprogram/pages/battery.js
import Toast from '../../dist/toast/toast';
const moment = require('../../utils/moment');

const app = getApp();
const daytime = {
  周一: ["18-20时", "20-22时"],
  周二: ["18-20时", "20-22时"],
  周三: ["18-20时", "20-22时"],
  周四: ["18-20时", "20-22时"],
  周五: ["18-20时", "20-22时"],
  周六: ["18-20时", "20-22时"],
  周日: ["18-20时", "20-22时"]
};
Page({
  /**
   * 页面的初始数据
   */
  data: {
    b_activeNames: ["has_battery"],

    timepicker_show: false,
    minDate: new Date().getTime(),
    maxDate: new Date(2019, 11, 30).getTime(),
    currentDate: new Date().getTime(),
    minHour: 10,
    maxHour: 23,
    today: moment().month() + "月" + moment().date() + "日",

    picker_columns: [{
        values: [{
            text: (moment().month() + 1) + "月" + moment().date() + "日",
            disabled: false
          },
          {
            text: (moment().add(1, 'd').month() + 1) + "月" + moment().add(1, 'd').date() + "日",
            disabled: false
          },
          {
            text: (moment().add(2, 'd').month() + 1) + "月" + moment().add(2, 'd').date() + "日",
            disabled: false
          },
          {
            text: (moment().add(3, 'd').month() + 1) + "月" + moment().add(3, 'd').date() + "日",
            disabled: false
          },
          {
            text: (moment().add(4, 'd').month() + 1) + "月" + moment().add(4, 'd').date() + "日",
            disabled: false
          },
          {
            text: (moment().add(5, 'd').month() + 1) + "月" + moment().add(5, 'd').date() + "日",
            disabled: false
          },
          {
            text: (moment().add(6, 'd').month() + 1) + "月" + moment().add(6, 'd').date() + "日",
            disabled: false
          }
        ],
        className: "day"
      },
      {
        values: ["18-20时", "20-22时"],
        className: "time"
      }
    ],

    // 回收信息
    numOfBattery: 1,
    phone_number: "",
    recycle_place: "",
    pickedTime: "",
    recycle_message: "",

    field_error_phone: false,
    field_error_place: false,
    field_error_time: false,

    //用户身份属性
    logged: app.logged
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      logged: app.logged
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
    this.setData({
      logged: app.logged
    });
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
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},

  onBatteryStatusChange(e) {
    this.setData({
      b_activeNames: e.detail
    });
  },

  onTimePicker(e) {
    // console.log(e.detail);
    // var nowDay = new Date().getDay();
    // var columns = this.data.picker_columns;
    // console.log(columns);
    // for (var i = 0; i < nowDay; i++) {
    //   columns[0].values[i].disabled = true;
    // }
    this.setData({
      timepicker_show: true
    });
    console.log(this.data.timepicker_show);
  },

  onCloseTimePicker(e) {
    console.log(e.detail);
    if (this.data.pickedTime) {
      this.setData({
        field_error_time: false
      });
    }
    this.setData({
      timepicker_show: false
    });
  },

  onClickPickerQuestionIcon(e) {
    Toast({
      message: '时间只能选在每天的晚上6-10点哦',
      selector: "#question-time"
    });
  },

  //弃用
  onTimePickerChange(e) {
    console.log(e.detail);
  },

  onPickerChange(e) {
    console.log(e);
    // const {
    //   picker,
    //   value,
    //   index
    // } = e.detail;
    // picker.setColumnValues(1, daytime[value[0].text]);
  },

  onPickerConfirm(e) {
    console.log(e.detail);
    this.setData({
      pickedTime: e.detail.value[0]["text"] + " " + e.detail.value[1]
    });
    this.onCloseTimePicker(e);
  },

  //弃用
  onTimePickerConfirm(e) {
    console.log(e.detail);
    let nowTime = new Date(e.detail);
    this.setData({
      currentDate: e.detail,
      pickedTime: (nowTime.getMonth() + 1).toString() +
        "月" +
        nowTime.getDate().toString() +
        "日" +
        nowTime.getHours().toString() +
        "时" +
        nowTime.getMinutes().toString() +
        "分左右"
    });
    if (e.detail) {
      this.setData({
        field_error_time: false
      });
    }
    this.onCloseTimePicker(e);
  },

  onBatteryStepper(e) {
    this.setData({
      numOfBattery: e.detail
    });
  },

  onLogin(e) {
    wx.switchTab({
      url: "../user/user",
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

  onSubmitButton(e) {
    if (this.data.phone_number) {
      console.log(this.data.phone_number);
    } else {
      console.log("未输入电话");
      this.setData({
        field_error_phone: true
      });
    }
    if (this.data.recycle_place) {
      console.log(this.data.recycle_place);
    } else {
      console.log("未输入地点");
      this.setData({
        field_error_place: true
      });
    }
    if (this.data.pickedTime) {
      console.log(this.data.pickedTime);
    } else {
      console.log("未输入时间");
      this.setData({
        field_error_time: true
      });
    }
    if (this.data.numOfBattery) {
      console.log(this.data.numOfBattery);
    } else {
      console.log("未输入数量");
    }

    if (this.data.recycle_message) {
      console.log(this.data.recycle_message);
    } else {
      console.log("未输入留言");
    }
  },

  onResetButton() {
    console.log("onResetButton");
    this.setData({
      phone_number: "",
      recycle_place: "",
      numOfBattery: 1,
      pickedTime: "",
      recycle_message: ""
    });
  },

  //数据反向绑定
  onPhoneNumberChange(e) {
    if (e.detail) {
      this.setData({
        field_error_phone: false
      });
    }
    this.setData({
      phone_number: e.detail
    });
  },

  onRecyclePlaceChange(e) {
    if (e.detail) {
      this.setData({
        field_error_place: false
      });
    }
    this.setData({
      recycle_place: e.detail
    });
  },

  onBatteryStepperChange(e) {
    this.setData({
      numOfBattery: e.detail
    });
  },

  onRecycleTimeChange(e) {
    if (e.detail) {
      this.setData({
        field_error_time: false
      });
    }
    this.setData({
      pickedTime: e.detail
    });
  },

  onRecycleMessageChange(e) {
    this.setData({
      recycle_message: e.detail
    });
  }
});