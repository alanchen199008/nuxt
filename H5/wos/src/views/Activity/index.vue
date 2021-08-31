<template>
  <div class="activity">
    <van-nav-bar
      left-arrow
      :title="info.activityTitle"
      @click-left="onClickLeft"
    >
      <template v-if="!memberId" #right>
        <span @click="handleShow">登陆</span>
      </template>
    </van-nav-bar>
    <div class="activity-content">
      <div class="main">
        <template v-if="info.remarkType === 0">
          <img v-lazy="info.remark">
        </template>
        <template v-else>
          <div ref="remark" class="remark" v-html="info.remark" />
        </template>
      </div>
    </div>
    <div class="activity-footer">
      <van-button block type="primary" @click="toUrl">立即参加</van-button>
    </div>
  </div>
</template>

<script>
import { getActivityInfo } from '@/api/activity'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      info: {},
      today: new Date().getTime()
    }
  },
  computed: {
    ...mapGetters(['memberId'])
  },
  mounted() {
    this.getData({ id: this.$route.params.id })
  },
  methods: {
    getData(data) {
      getActivityInfo(data).then(([data, error]) => {
        if (!error) {
          this.info = data
        }
      })
    },
    onClickLeft() {
      this.$router.back(-1)
    },
    handleShow() {
      window.__GLOBAL.LoginControlDialog.open()
    },
    toUrl() {
      if (this.info.redirecType === 0) {
        window.location.href = this.info.jumpUrl
      } else {
        if (this.info.jumpType === 5) {
          this.$router.push({ name: 'Match', params: { tab: 'instant' }})
        }
        if (this.info.jumpType === 6) {
          this.$router.push({ name: 'Match', params: { tab: 'schedule' }})
        }
        if (this.info.jumpType === 7) {
          this.$router.push({ name: 'Expert', params: { sortby: '1' }})
        }
        if (this.info.jumpType === 8) {
          this.$router.push({ name: 'Expert', params: { sortby: '2' }})
        }
        if (this.info.jumpType === 9) {
          this.$router.push({ name: 'Expert', params: { sortby: '3' }})
        }
        if (this.info.jumpType === 10) {
          this.$router.push({ name: 'Expert', params: { tab: 'Recommend', sortby: 'time' }})
        }
        if (this.info.jumpType === 11) {
          this.$router.push({
            name: 'Expert',
            params: { tab: 'Recommend', sortby: 'returnrate' }
          })
        }
        if (this.info.jumpType === 12) {
          this.$router.push({
            name: 'Expert',
            params: { tab: 'Recommend', sortby: 'winrate' }
          })
        }
        if (this.info.jumpType === 13) {
          this.$router.push({
            name: 'Expert',
            params: { tab: 'Recommend', sortby: 'linkwin' }
          })
        }
        if (this.info.jumpType === 14) {
          this.$router.push({ name: 'Forecast', params: { position: 0 }})
        }
        if (this.info.jumpType === 15) {
          this.$router.push({ name: 'Forecast', params: { position: 2 }})
        }
        if (this.info.jumpType === 16) {
          this.$router.push({ name: 'AccountRecharge' })
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.activity {
  width: 100%;
  height: 100vh;
  & &-content {
    height: calc(100% - 108px);
    overflow: hidden;
    .main {
      height: 100%;
      overflow-x: hidden;
      overflow-y: auto;
      padding: 15px;
      font-size: 14px;
      color: #666;
      img {
        width: 100%;
        object-fit: contain;
      }
    }
  }
  & &-footer {
    padding: 0 15px;
    .van-button {
      vertical-align: middle;
    }
    text-align: center;
  }
}
::v-deep .remark {
  p:first-child {
    img {
      width: 100% !important;
      height: auto !important;
      vertical-align: top;
    }
  }
}
</style>
