<template>
  <div class="match-chatroom">
    <div class="match-chatroom-header">
      <van-notice-bar
        scrollable
        left-icon="volume-o"
        color="#EF9636"
        background="#FCEDDD"
        :text="text"
        @click="toDetail(text)"
        @replay="replay"
      />
    </div>
    <div ref="content" class="match-chatroom-content">
      <div ref="main" class="match-chatroom-content-main">
        <div
          v-for="(item, i) in messages"
          :key="i"
          class="match-chart-item"
        >
          <font>
            {{ item.memberId !== info.memberId ? item.nickname : "我" }}:</font>
          {{ item.content }}
        </div>
      </div>
    </div>
    <div class="match-chatroom-footer" flex="box:last corss:center">
      <div class="field">
        <van-field v-model="message.content" placeholder="请输入聊天内容" />
      </div>
      <div flex-box="0" class="button">
        <van-button
          type="primary"
          size="small"
          block
          @click="handleSend"
        >发送</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getChatRoomAccess } from '@/api/user'
import { getNewsInfo } from '@/api/home'
// import UseWebSocket from '@/mixins/useWebSocket'
import UseWebSocket from '@/mixins/socket'
import { setLocalStorage, getLocalStorage } from '@/utils/auth'
export default {
  name: 'ChatTab',
  data() {
    return {
      observer: null,
      messages: [],
      message: {
        content: '',
        contentType: 'text',
        from: {
          path: 'user'
        },
        to: {
          path: ''
        },
        type: 'message.broadcast',
        clientMsgId: new Date().getTime()
      },
      notices: [],
      content: '',
      text: '',
      index: 0
    }
  },
  computed: {
    ...mapGetters(['info'])
  },
  watch: {
    messages() {
      this.$nextTick(() => {
        this.$refs.main.scrollTop =
          this.$refs.main.scrollHeight - this.$refs.main.offsetHeight
      })
    }
  },
  created() {
    this.init()
  },
  mounted() {
    this.getNotice()
  },
  beforeDestroy() {
    console.log(this)
    this.observer?.disconnect()
    this.checkTimeoutId && clearInterval(this.checkTimeoutId)
  },
  methods: {
    init() {
      const data = {
        tenantCode: this.info.tenantCode,
        tenantKey: this.info.tenantCode,
        roomCode: 'MATCH_' + this.$route.params.id,
        userType: 'user',
        userId: this.info.memberId,
        userName: this.info.nickname,
        userThumb: this.info.avatar,
        userTags: this.info.positionName
      }
      getChatRoomAccess(data).then(([data, error, res]) => {
        if (!error) {
          this.webSocket(res.data.token)
        }
      })
    },

    onMessage(data) {
      if (data.type === 'notification.users.count') {
        this.message.to.path = data.to.path
      }
      if (data.type === 'message.broadcast.state.ok' && this.message.clientMsgId === data.clientMsgId) {
        let message = {
          memberId: this.info.memberId,
          nickname: this.info.nickname,
          content: this.message.content
        }
        this.messages.push(message)
        this.message.content = ''
        this.message.clientMsgId = null
      }
      if (data.type === 'message.broadcast') {
        let message = {
          memberId: data.from.passToken.userId,
          nickname: data.from.passToken.userName,
          content: data.content,
          clientMsgId: data.clientMsgId
        }
        this.messages.push(message)
        setLocalStorage('latestMessageUid', data.clientMsgId)
      }
    },
    webSocket(token) {
      this.observer = new UseWebSocket(`${process.env.VUE_APP_CHAT_SOCKET}/ws?srctype=1&token=${token}&uid=${getLocalStorage('latestMessageUid') || ''}`, {
        reconnection: true,
        reconnectionAttempts: 3,
        onOpen: () => {
          this.checkTimeoutId = setInterval(() => {
            // this.observer?.WebSocket.sendMessage('ping')
            this.observer?.WebSocket.sendObj({ cmdType: 'ping'})
          }, 1000 * 30)
        },
        onMessage: (e) => {
          const data = JSON.parse(e.data)
          this.onMessage(data)
        },
        onReconnectError: () => {
          this.$toast('请检查网络链接!')
        }
      })
    },
    handleSend() {
      if (this.message.content === '') {
        this.$toast('请输入聊天内容!')
      } else {
        this.message.content = this.message.content.trim()
        this.message.clientMsgId = new Date().getTime()
        this.observer?.WebSocket.sendObj(this.message)
      }
    },
    getNotice() {
      getNewsInfo({ type: 2 })
        .then(([data, error]) => {
          if (!error) {
            this.notices = data || []
            if (this.notices.length > 0) {
              this.text = this.notices[0].title
            }
          }
        })
    },
    toDetail(text) {
      this.notices.map(item => {
        if (item.title.indexOf(text) > -1) {
          this.$router.push({ name: 'NewsDetail', params: { id: item.objectId, locale: this.$i18n.locale }})
        }
        return item
      })
    },
    replay() {
      const i = this.notices.length - 1
      if (this.index >= i) {
        this.index = 0
      } else {
        this.index++
      }
      this.notices.map((item, index) => {
        if (this.index === index) {
          this.text = item.title
        }
        return
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.match-chatroom {
  height: 100%;
  overflow: hidden;
  &-header {
  }
  &-content {
    height: calc(100% - 100px);
    overflow: hidden;
    &-main {
      height: 100%;
      overflow-x: hidden;
      overflow-y: auto;
      .match-chart-item {
        font-size: 14px;
        padding: 0 15px;
        line-height: 24px;
        margin-top: 8px;
        margin-bottom: 8px;
        color: #666;
        font {
          white-space: nowrap;
          color: #333;
          font-weight: bold;
        }
        text-align: justify;
      }
    }
  }
  &-footer {
    height: 60px;
    background: #fff;
    .field {
      padding: 4px 0;
      &::v-deep .van-field {
        &__control {
          border-radius: 16px;
          background: #f1f1f5;
          font-size: 14px;
          padding: 4px 10px;
          &::-webkit-input-placeholder {
          }
        }
      }
    }
    .button {
      width: 106px;
      line-height: 60px;
      padding: 14px 10px 14px 6px;
      &::v-deep .van-button {
        vertical-align: middle;
        font-size: 18px;
      }
    }
  }
}
</style>
