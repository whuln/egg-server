// app.js
'use strict'

class AppBootHook {
  constructor(app) {
    this.app = app;
  }
  async didReady() {
    // 请将您的 app.beforeStart 中的代码置于此处。
    console.log('didready');  
  }
  async serverDidReady() {
    // http / https server 已启动，开始接受外部请求
    // 此时可以从 app.server 拿到 server 的实例
    console.log('serverDidReady');    
   
  }
}

module.exports = AppBootHook;