// miniprogram/pages/copeTeaCup/copeTeaCup.js

import Toast from "../../dist/toast/toast";

const id = {
  YHT: 1,
  SYSXC: '书亦烧仙草',
  MXBC: '蜜雪冰城',
  CYYS: '茶颜悦色',
  ALSGC: '阿里山贡茶',
  GMC: '甘茗城'
};

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
  SYSXC: 'http://www.shuyisxc.com/images/logo.png',
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
    imgUpLoadType: '未选择',
    teaCupCode: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      type: options.type,
      name: rules[options.type],
      logoUrl: imageUrl[options.type]
    });
    if (this.data.type == 'YHT') {
      this.setData({
        showBranchPicker: false,
        branchInfo: '未选择'
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

  onSubmit(e) {
    var that = this;
    if (this.data.teaCupCode) {
      if (this.data.imgUpLoadType != '未选择') {
        //提交
        const toast = Toast.loading({
          mask: true,
          duration: 0, // 持续展示 toast
          forbidClick: true, // 禁用背景点击
          message: '正在上传...',
          selector: '#submit-toast'
        });

        var fileid = '';
        wx.cloud.uploadFile({
          cloudPath: 'tea/' + this.data.type + (this.data.branchInfo ? '-' + this.data.branchInfo : '') + '-' + this.data.teaCupCode + '-' + '.png',
          filePath: that.data.fileTempPath,
          success: res => {
            console.log(res);
            fileid = res.fileID;

            toast.setData({
              message: '正在提交...'
            })
            console.log(that.data)
            wx.cloud.callFunction({
              name: 'postdrinkorder',
              data: {
                shop_id: that.getShopId(that.data.type, that.data.branchInfo ? that.data.branchInfo : null),
                user_data: {
                  drink_number: that.data.teaCupCode,
                  drink_pic: {
                    fileID: fileid
                  }
                }
              }
            }).then(res => {
              Toast.clear();
              wx.showModal({
                title: '提交成功！',
                content: '您已完成订单,点击确认将回到主页',
                showCancel: false,
                success: res => {
                  wx.navigateBack({
                    delta: 2, // 回退前 delta(默认为1) 页面
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
          }
        });


      } else {
        Toast.fail({
          duration: 2000,
          message: '未选择图片',
          selector: '#no-img'
        })
      }
    } else {
      Toast.fail({
        duration: 2000,
        message: '未填写编号',
        selector: '#no-code'
      })
    }
  },

  onReset(e) {
    this.setData({
      teaCupCode: '',
      imgUpLoadType: '未选择'
    })
  },


  onClickUploadImage(e) {
    let that = this
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#00CC00",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            that.chooseWxImage('camera')
          }
        }
      }

    })
  },

  chooseWxImage(type) {
    let that = this

    wx.chooseImage({
      count: 1, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: [type], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        // success
        console.log(res)
        that.setData({
          fileTempPath: res.tempFilePaths[0],
          imgUpLoadType: '已选取'
        });



      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },


  onClickQuestionIcon(e) {
    Toast({
      duration: 1000,
      message: '奶茶杯内杯壁上贴有编号',
      selector: '#code-info'
    })
  },

  onClickYHTBranch(e) {
    this.setData({
      showBranchPicker: true
    })
  },

  onClosePicker(e) {
    this.setData({
      showBranchPicker: false
    })
  },

  onConfirmBranch(e) {
    console.log(e);
    this.setData({
      branchInfo: e.detail.value
    });
    this.onClosePicker(e);
  },

  getShopId(type, branchInfo) {
    switch (type) {
      case 'YHT':
        if (branchInfo) {
          if (branchInfo == '中南大学店') {
            return 1
          } else if (branchInfo == '后湖小区店') {
            return 2
          }
        } else {
          return 1
        }
        break;
      case 'SYSXC':
        return 3
        break;
      case 'MXBC':
        return 4
        break;
      case 'CYYS':
        return 5
        break;
      case 'ALSGC':
        return 6
        break;
      case 'GMC':
        return 7
        break;

    }
  },


  //编号反向绑定

  updateTeaCupCode(e) {
    console.log(e.detail)
    this.setData({
      teaCupCode: e.detail
    })
  }
})