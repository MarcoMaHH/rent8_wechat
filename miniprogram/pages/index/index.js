// pages/index/index.js
const app = getApp()
import { userinfo } from '../../utils/conf'

Page({
  data: {
    username: '',
    expiration_date: '',
    list: [{
      name: '房屋管理',
      icon: 'houses-2',
      childArr: [
        {
          name: '房间管理',
          label: '',
          url: '/pages/number/number'
        },
        {
          name: '未收账单',
          label: '',
          url: '/pages/bill/bill'
        },
      ],
    }]
  },

  // 提前唤醒服务器
  onLoad: function () {
    app.call({
      path: userinfo,
      method: 'GET'
    });
  },

  clickHandle(event) {
    const item = event.detail.item;
    if (item && item.url) {
      wx.navigateTo({
        url: item.url
      }).catch((error) => {
        // 处理异常，例如弹出提示或记录日志
        console.error('页面跳转失败：', error);
      });
    }
  },

  onShow: function () {
    wx.getStorage({
      key: 'user',
      success: (res) => {
        this.setData({
          username: res.data.name,
          expiration_date: res.data.expiration_date,
        });
      }
    })
  },

  onLoginTap() {
    wx.navigateTo({
      url: '/pages/login/login'
    });
  },

})