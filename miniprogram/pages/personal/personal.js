// pages/personal/personal.js
const app = getApp()
import { bindWechat, renewal, logout } from '../../utils/conf'
import Toast from 'tdesign-miniprogram/toast/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  onShareAppMessage: function () {
    return {
      title: '账目无界，管理至简。一键洞察，租金尽在掌握。',
      path: '/pages/index/index',//这里是被分享的人点击进来之后的页面
      imageUrl: '/images/rent.png',
    }
  },

  // 跳转“使用说明”页面
  onUseTap() {
    wx.navigateTo({
      url: '/pages/personal/use'
    })
  },

  // 退出到“登录”页面
  async onExitTap() {
    try {
      const res = await app.call({
        path: logout,
        method: 'GET'
      });
      if (res.code === 1) {
        this.showToast(res.msg, 'success');
      } else {
        this.showToast(res.msg, 'warning');
      }
    } catch (error) {
      // 处理可能出现的错误，例如网络错误、API调用失败等
      console.error('退出登录时发生错误', error);
      this.showToast('退出失败', 'error');
    }
    wx.removeStorageSync('Authorization');
    wx.removeStorage({
      key: "user"
    });
    wx.redirectTo({
      url: '/pages/login/login'
    });
  },

  /**
 * 显示Toast提示框
 *
 * @param message 提示框显示的内容
 * @param theme 提示框的主题，默认为'none'
 */
  // 
  showToast(message, theme = 'none') {
    Toast({
      context: this,
      selector: '#t-toast',
      message: message,
      theme: theme
    });
  },
})