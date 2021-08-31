let webSocket = []
let pushTimer = null
let chatTimer = null
/**
 * @description 初始化websocket
 * @param {Object} param url {String} WS地址
 * @param {Object} param type {String} Push 推送 ｜ Chat 聊天室
 * @param {Object} param callback {Function} 接收数据回调函数
 * @returns {String}
 */

function initWebSocket(url, type, mid, callback) {
  try {
    webSocket[type] = new WebSocket(url)

    webSocket[type].onopen = e => {
      webSocketOpen(e, type, callback)
    }
    // 收信
    webSocket[type].onmessage = e => {
      webSocketOnMessage(e, callback)
    }
    // 关闭
    webSocket[type].onclose = e => {
      webSocketClose(url, type, e, callback)
    }
    // 连接发生错误的回调方法
    webSocket[type].onerror = e => {
      webSocketOnError(e, url, type, mid, callback)
    }
  } catch (e) {
    callback(e)
  }
}
// 连接socket建立时触发
function webSocketOpen(e, type, callback) {
  if (callback) {
    if (pushTimer) {
      clearInterval(pushTimer)
      pushTimer = null
    }
    if (chatTimer) {
      clearInterval(chatTimer)
      chatTimer = null
    }
    heartCheck.start(type)
    callback(e)
  }
}

var heartCheck = {
  reset: function(type) {
    if (type === 'Push') {
      clearInterval(this.pushIntelVal)
      this.start(type)
    }
    if (type === 'Chat') {
      clearInterval(this.chatIntelVal)
      this.start(type)
    }
  },
  start: function(type) {
    if (type === 'Push') {
      this.pushIntelVal = setInterval(() => {
        const data = { cmdType: 'ping', data: '' }
        webSocketSend(type, data)
      }, 20000)
    }
    if (type === 'Chat') {
      this.chatIntelVal = setInterval(() => {
        webSocketSend(type, 'ping')
      }, 30000)
    }
  },
  stop: function(type) {
    if (type === 'Push') {
      clearInterval(this.pushIntelVal)
      this.pushIntelVal = null
    }
    if (type === 'Chat') {
      clearInterval(this.chatIntelVal)
      this.chatIntelVal = null
    }
  }
}
function webSocketOnError(e, url, type, mid, callback) {
  if (type === 'Chat') {
    url = url + '&mid=' + mid ? mid : ''
    webSocketReconnect(url, type, callback)
  }
  if (type === 'Push') {
    webSocketReconnect(url, type, callback)
  }
}
// 客户端接收服务端数据时触发,e为接受的数据对象
function webSocketOnMessage(e, callback) {
  if (callback && e && e.data) {
    callback(e, JSON.parse(e.data))
  }
  // 将data传给在外定义的接收数据的函数，至关重要。
  /* 在此函数中还可以继续根据项目需求来写其他东西。 比如我的项目里需要根据接收的数据来判断用户登录是否失效了，此时需要关闭此连接，跳转到登录页去。*/
}

// 发送数据
function webSocketSend(type, data) {
  if (webSocket[type] && webSocket[type].readyState === 1) {
    data = JSON.stringify(data)
    webSocket[type].send(data) // 在这里根据自己的需要转换数据格式
  }
}

// 关闭socket
function webSocketClose(url, type, e, callback) {
  // 因为我建立了多个socket，所以我需要知道我关闭的是哪一个socket，就做了一些判断
  if (webSocket[type]) {
    webSocket[type].close()
    heartCheck.stop(type)
  }
  if (e && e.code === 2) {
    webSocket[type].close()
    heartCheck.stop(type)
    return
  }
  if (e && e.code === 1006) {
    webSocketReconnect(url, type, callback)
  }
}
// 重连 Socket
function webSocketReconnect(url, type) {
  if (type === 'Push') {
    pushTimer = setInterval(() => {
      initWebSocket(url, type)
    }, 180000)
  }
  if (type === 'Chat') {
    chatTimer = setInterval(() => {
      initWebSocket(url, type)
    }, 180000)
  }
}
// 在其他需要socket地方调用的函数，用来发送数据及接受数据
function sendSock(type, data) {
  webSocketSend(type, data)
}

// 将初始化socket函数、发送（接收）数据的函数、关闭连接的函数export出去
export default {
  initWebSocket,
  webSocketClose,
  sendSock
}
