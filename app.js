// app.js
App({
  onLaunch() {
    wx.removeStorageSync('Authorization');
    wx.removeStorage({
      key: "user"
    });
  },

  onUnload: function () {
    wx.removeStorageSync('Authorization');
    wx.removeStorage({
      key: "user"
    });
  },

  onResize: function () {
    wx.removeStorageSync('Authorization');
    wx.removeStorage({
      key: "user"
    });
  },

  async call(obj) {
    return new Promise((resolve, reject) => {
      const apiUrl = "http://rent8.test/"; // 推荐将URL配置化或参数化
      wx.request({
        url: apiUrl + obj.path,
        method: obj.method || 'GET',
        header: {
          "content-type": "application/x-www-form-urlencoded",
          "Authorization": wx.getStorageSync('Authorization')
        },
        data: obj.data,
        success: function (res) {
          resolve(res.data); // 正确处理异步结果
        },
        fail: function (err) {
          reject(err); // 将错误传递到外层
        },
      });
    });
  }
})
