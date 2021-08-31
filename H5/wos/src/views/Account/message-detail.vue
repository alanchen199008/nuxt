<template>
  <div class="message-detail">
    <van-nav-bar left-arrow :title="message.title" @click-left="goBack" />
    <div class="message-detail-content">
      <div class="message-detail-content__title">
        <div class="date">{{ message.createTime | parseTime() }}</div>
      </div>
      <div class="message-detail-content__content" v-html="message.content" />
    </div>
  </div>
</template>

<script>
import { getMessagesDetail } from '@/api/account'
import { getNewMessage } from '@/api/user'
export default {
  data() {
    return {
      message: {}
    }
  },
  computed: {
    info: {
      get() {
        return this.$store.getters.info
      },
      set(value) {
        this.$store.dispatch('user/updateInfo', value)
      }
    }
  },
  created() {
    const { id, item } = this.$route.params
    this.getData(id)
    this.message = item
  },
  methods: {
    getData(id) {
      getMessagesDetail({ stationLetterId: id })
        .then(([_, error]) => {
          if (!error) {
            getNewMessage().then(([msg, err]) => {
              if (!err) {
                this.info.newMsg = msg.count
              }
            })
          }
        })
    },
    goBack() {
      this.$router.back(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
.message-detail-content {
  padding: 0 15px;
  &__title {
    font-size: 20px;
    margin: 15px 0 15px 0;
    color: #333;
    text-align: center;
    .date {
      font-size: 12px;
      color: #999;
    }
  }
  &__content {
    background: #f5f5f7;
    padding: 15px;
    border-radius: 6px;
    ::v-deep p {
      margin: 10px 0 10px 0;
      color: #333;
      font-size: 14px;
      text-align: justify;
    }
  }
}
</style>
