class Socket {
    /**
     * @description: 初始化实例属性，保存参数
     * 
     */
    constructor(connectionUrl,options) {
        if (connectionUrl.startsWith('//')) {
            const scheme = window.location.protocol === 'https:' ? 'wss' : 'ws'
            connectionUrl = `${scheme}:${connectionUrl}`
        }
        this.url = connectionUrl;
        this.callback = options.received || options.onMessage;
        this.name = options.name || 'default';
        this.ws = null;
        this.status = null;
        this.pingInterval = null;
        // 心跳检测频率
        this._timeout = 3000;
        this.isHeart = options.isHeart || options.reconnection;
        this.isReconnection = options.isReconnection;  

        this.onOpen = options.onOpen || void 0
        this.onClose = options.onClose || void 0
        this.onMessage = options.onMessage || void 0
        this.onError = options.onError || void 0
        this.onReconnectError = options.onReconnectError || void 0

        this.connect()
    }
    connect(data) {
        this.ws = new WebSocket(this.url);
        // 建立连接
        this.ws.onopen = (e) => {
            this.status = 'open';
            console.log("连接成功",e)
            if(this.isHeart) {
                // 心跳
                this._heartCheck()
            }
            // // 给后台发送数据
            // if(data !== undefined) {
            //     return this.ws.send(JSON.stringify({type: 'init'}))
            // }
            this.onOpen && this.onOpen(e)
        }
        // 接受服务器返回的信息
        this.ws.onmessage = (e) => {
            // if(typeof this.callback === 'function'){
            //     return this.callback(e)
            // }else{
            //     console.log('参数的类型必须为函数')
            // }
            this.onMessage && this.onMessage(e)
        }
        // 关闭连接
        this.ws.onclose = (e) => {
            console.log('onclose',e)
            this._closeSocket(e)
            this.onClose && this.onClose(e)
        }
        // 报错
        this.onerror = (e) => {
            console.log('onerror',e)
            this._closeSocket(e)
            this.onError && this.onError(e)
        }

        // 
        this.ws.sendObj = (e) => {
            this.sendMsg(e)
        }

        // this.ws.disconnect = (e) => {
        //     this.close()
        // }

        this.WebSocket = this.ws
    }
    sendMsg(data) {
        let msg = JSON.stringify(data)
        return this.ws.send(msg)
    }
    _resetHeart() {
        clearInterval(this.pingInterval)
        return this
    }
    _heartCheck() {
        this.pingInterval = setInterval(() => {
            if(this.ws.readyState === 1) {
                this.ws.send(JSON.stringify({ type: 'ping'}))
            }
        },this._timeout)
    }
    _closeSocket(e) {
        this._resetHeart()
        if(this.status !== 'close') {
            console.log('断开，重连',e)
            if(this.isReconnection){
                // 重连
                this.connect()
            }
        }else{
            // 手动关闭了
            console.log('手动关闭',e)
        }
    }
    close() {
        this.status = 'close'
        this._resetHeart()
        return this.ws.close();
    }
    disconnect() {
        this.close()
    }
}

export default Socket