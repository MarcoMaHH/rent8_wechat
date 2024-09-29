// pages/number/rental.js
const app = getApp()
import { numberRental, numberCheckin } from '../../utils/conf'
import Toast from 'tdesign-miniprogram/toast/index';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 日期选择框
    dateVisible: false,
    date: new Date().toLocaleDateString(), // 支持时间戳传入
    overlay: false,
    list: {
      'name': '',
      'checkin_time': '',
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    let { id, house_property_id } = options;
    this.getData(id, house_property_id)
  },

  async getData(id, house_property_id) {
    try {
      const res = await app.call({
        path: numberRental,
        method: 'POST',
        data: { id: id, house_property_id: house_property_id }
      });
      // 使用解构赋值来直接获取需要的数据
      const { data } = res;
      this.setData({
        list: data
      });
    } catch (error) {
      // 可以在这里添加错误处理逻辑
      console.error('getData error:', error);
      this.showToast('获取数据失败', 'error');
    }
  },

  bindDataChange(e) {
    let { key } = e.currentTarget.dataset
    let { value } = e.detail
    let newData = { ...this.data.list };
    newData[key] = value
    this.setData({
      list: newData
    })
  },

  async bindCheckin() {
    const { checkin_time, name } = this.data.list
    if (name === '' || name === null || name === undefined) {
      this.showToast('租客姓名不能为空');
      return;
    }
    if (checkin_time === '' || checkin_time === null || checkin_time === undefined) {
      this.showToast('入住日期不能为空');
      return;
    }
    try {
      this.setData({ overlay: true });
      const res = await app.call({
        path: numberCheckin,
        method: 'POST',
        data: this.data.list
      });
      this.setData({ overlay: false });
      const icon = res.code === 1 ? 'success' : 'warning';
      this.showToast(res.msg, icon);
      await new Promise(resolve => setTimeout(resolve, 1000)); // 使用Promise封装setTimeout
      wx.navigateBack({ delta: 1 });
    } catch (error) {
      // 错误处理逻辑，例如显示一个错误Toast
      this.setData({ overlay: false });
      this.showToast('入住失败', 'error');
    }
  },

  // 日期选择框
  showDate() {
    this.setData({
      dateVisible: true,
    });
  },

  hideDate() {
    this.setData({
      dateVisible: false,
    });
  },

  onConfirm(e) {
    const { value } = e.detail;
    // 使用扩展运算符创建list的浅拷贝，避免直接修改this.data.list
    let newData = { ...this.data.list };
    newData.checkin_time = value; // 使用点语法直接访问属性
    this.setData({
      dateVisible: false,
      list: newData // 使用浅拷贝后的对象更新数据
    });
  },

  showToast(message, theme = 'none') {
    Toast({
      context: this,
      selector: '#t-toast',
      message: message,
      theme: theme
    });
  }
})