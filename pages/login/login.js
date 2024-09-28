// pages/login/login.js
const app = getApp()
import { login } from '../../utils/conf'
import Toast from 'tdesign-miniprogram/toast/index'

Page({
  data: {
    name: 'admin',
    password: '123456',
    overlay: false
  },

  onNameInput(e) {
    const { value } = e.detail
    this.setData({ name: value })
  },
  clearName() {
    this.setData({ name: '' })
  },
  onPasswordInput(e) {
    const { value } = e.detail
    this.setData({ password: value })
  },
  clearPassword() {
    this.setData({ password: '' })
  },

  async onLoginTap() {
    const { password, name } = this.data
    if (name.length < 3) {
      this.showToast('账号最少3个字符');
      return;
    }
    if (password.length < 6) {
      this.showToast('密码最少6个字符');
      return;
    }
    try {
      this.setData({ overlay: true })
      const res = await app.call({
        path: login,
        method: 'POST',
        data: { name: JSON.stringify(name), password: JSON.stringify(password) }
      });
      this.setData({ overlay: false });

      if (res.code === 1) {
        this.showToast('登录成功', 'seccess');
        wx.setStorage({
          key: "user",
          data: res.data
        })
        wx.setStorageSync('Authorization', res.data.session_id)
        wx.switchTab({ url: '/pages/index/index' })
      } else {
        let msg = res.msg || '登录失败'; // 使用res.msg，如果不存在则使用默认消息
        this.showToast(msg, 'warning');
      }
    } catch (err) {
      console.error('登录发生错误:', err);
      this.setData({ overlay: false });
      this.showToast('登录失败', 'error');
    }
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
  }
});