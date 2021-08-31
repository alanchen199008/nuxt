const ReadyState = {
  Connecting: 0,
  Open: 1,
  Closing: 2,
  Closed: 3
}

Object.freeze(ReadyState)

export default class {
  constructor(connectionUrl, opts = {}) {
    if (connectionUrl.startsWith('//')) {
      const scheme = window.location.protocol === 'https:' ? 'wss' : 'ws'
      connectionUrl = `${scheme}:${connectionUrl}`
    }

    this.connectionUrl = connectionUrl
    this.opts = opts

    this.reconnection = this.opts.reconnection || false
    this.reconnectionAttempts = this.opts.reconnectionAttempts || Infinity
    this.reconnectionDelay = this.opts.reconnectionDelay || 1000
    this.reconnectTimeoutId = 0
    this.reconnectionCount = 0

    this.onOpen = this.opts.onOpen || void 0
    this.onClose = this.opts.onClose || void 0
    this.onMessage = this.opts.onMessage || void 0
    this.onError = this.opts.onError || void 0
    this.onReconnectError = this.opts.onReconnectError || void 0

    this.connect(connectionUrl, opts)
  }

  reconnect() {
    if (this.reconnectionCount < this.reconnectionAttempts && this.WebSocket?.readyState !== ReadyState.Open) {
      this.reconnectionCount++
      clearTimeout(this.reconnectTimeoutId)

      this.reconnectTimeoutId = setTimeout(() => {
        this.connect(this.connectionUrl, this.opts)
      }, this.reconnectionDelay)
    }
  }

  connect(connectionUrl, opts = {}) {
    this.reconnectTimeoutId && clearTimeout(this.reconnectTimeoutId)
    try {
      this.WebSocket = new WebSocket(connectionUrl)

      this.WebSocket.onopen = (event) => {
        this.onOpen && this.onOpen(event)
        if (this.reconnection) this.reconnectionCount = 0
      }

      this.WebSocket.onmessage = (message) => {
        this.onMessage && this.onMessage(message)
      }

      this.WebSocket.onclose = (event) => {
        if (this.reconnection) this.reconnect()
        this.onClose && this.onClose(event)
      }

      this.WebSocket.onerror = (event) => {
        this.onError && this.onError(event)
      }
    } catch (error) {
      console.log(error)
    }

    if (!('sendObj' in this.WebSocket)) {
      this.WebSocket.sendObj = (obj) => this.sendMessage(JSON.stringify(obj))
    }

    return this.WebSocket
  }

  sendMessage(message) {
    if (this.WebSocket.readyState === ReadyState.Open) {
      this.WebSocket?.send(message)
    }
  }

  disconnect() {
    this.reconnectTimeoutId && clearTimeout(this.reconnectTimeoutId)
    this.reconnectionCount = this.reconnectionAttempts
    this.WebSocket?.close()
  }
}
