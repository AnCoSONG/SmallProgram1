//app.js

import Dialog from './dist/dialog/dialog';
import Base64 from './utils/utils';
App({
  onLaunch: function () {

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

    this.globalData = {
      logged: false,
      avatarUrl: "",
      username: "请登录",
      userInfo: {}
    }
  }
})