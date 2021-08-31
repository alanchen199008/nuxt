<template>
  <div class="account d-container" flex="dir:top">
    <van-nav-bar
      :border="false"
      style="background-color: transparent;"
      @click-right="goRouter('AccountMessage')"
    >
      <template #right>
        <div class="messge-icon">
          <img src="@/assets/icons/message.png" height="17.5">
          <div v-if="info.newMsg > 0" class="new-dot" />
        </div>
      </template>
    </van-nav-bar>
    <div class="account-user" flex="cross:center">
      <van-image
        fit="cover"
        round
        :src="info.avatar"
        @click="goRouter('AccountInfo')"
      />
      <div flex-box="1">
        <div class="name">
          {{ info.nickname }}
          <div v-if="info.positionName" class="account-user__position">
            {{ info.positionName }}
          </div>
        </div>
        <span class="introduction">{{ info.introduction }}</span>
      </div>
    </div>
    <van-row class="account-message">
      <van-col :span="8 " class="van-hairline--right">
        <div>
          <p>
            <img class="coin" src="@/assets/icons/coin.png" alt="">
            <span>球币</span>
          </p>
          <p class="number">{{ info.balance }}</p>
        </div>
      </van-col>
      <van-col :span="16">
        <van-row>
          <van-col :span="8" @click="goRouter('AccountRecommend')">
            <div class="number">{{ info.artcileNum }}</div>
            <div>方案</div>
          </van-col>
          <van-col :span="8" @click="goRouter('Expert', { tab: 'Attention' })">
            <div class="number">{{ info.concernNum }}</div>
            <div>关注</div>
          </van-col>
          <van-col :span="8" @click="goRouter('AccountFans')">
            <div class="number">{{ info.fansNum }}</div>
            <div>粉丝</div>
          </van-col>
        </van-row>
      </van-col>
    </van-row>

    <div flex-box="1" class="scroll-touch">
      <div class="account-ad">
        <d-swiper :position="3" :height="72" />
      </div>
      <van-cell-group class="account-group">
        <van-cell
          v-for="item in groupList"
          :key="item.name"
          is-link
          size="large"
          :to="{ name: item.name }"
        >
          <template #icon>
            <img :src="require(`@/assets/account/${item.icon}.png`)">
          </template>
          <template #title>
            <span>{{ item.label }} <span v-if="item.name === 'Invite'" class="flag">得球币</span></span>
          </template>
        </van-cell>
      </van-cell-group>
    </div>
    <silde-left-view />
  </div>
</template>

<script>
import { getNewMessage, getExpertInfo } from '@/api/user'
import DSwiper from '@/components/Swiper'
export default {
  name: 'Account',
  components: { DSwiper },
  data() {
    return {
      isNew: false,
      isExpert: false,
      groupList: [
        { icon: 'info', name: 'AccountInfo', label: '个人信息' },
        { icon: 'recharge', name: 'AccountRecharge', label: '充值明细' },
        { icon: 'expert', name: 'AccountRecommend', label: '我的方案' },
        { icon: 'coin', name: 'AccountCoin', label: '球币明细' },
        { icon: 'invite', name: 'Invite', label: '邀请好友' },
        { icon: 'feedback', name: 'AccountFeedback', label: '意见反馈' },
        { icon: 'about', name: 'AccountAbout', label: '关于我们' }
      ]
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
  beforeRouteUpdate(to, from, next) {
    if (to.name === 'AccountRecharge') {
      return this.$toast('暂不支持球币充值,敬请期待~')
    } else {
      next()
    }
  },
  created() {
    this.getData()
    console.log(this.info)
  },
  methods: {
    getData() {
      getExpertInfo()
        .then(([data, error]) => {
          if (!error) {
            if (data) {
              this.isExpert = true
            }
          }
        })
      getNewMessage()
        .then(([data, err]) => {
          if (!err) {
            this.info.newMsg = data.count
          }
        })
    },
    goRouter(name, params) {
      this.$router.push({ name, params })
    }
  }
}
</script>
<style lang="scss" scoped>
.account {
  background-image: $--background-head-gradient;
  background-size: 100% 155px;
  background-repeat: no-repeat;
  background-color: white;
  .introduction {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }
  &-message {
    margin: 0 15px;
    padding: 15px;
    border-radius: 9px;
    background-color: #fff;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.08);
    font-size: 14px;
    color: $--color-text-secondary;
    text-align: center;
    line-height: 24px;
    position: relative;
    z-index: 1;
    & > div {
      position: relative;
      ::v-deep .van-icon {
        font-size: 14px;
        vertical-align: middle;
      }
      &:first-child {
        padding-right: 12px;
      }
    }

    .coin {
      width: 15px;
      height: 15px;
      margin-right: 5px;
      vertical-align: text-top;
    }

    .number {
      font-weight: bold;
      @include DIN-FONT(18px, $--color-text-primary);
    }
    .small {
      font-size: 12px;
      .number {
        color: inherit;
        font-size: inherit;
      }
    }
  }
  &-user {
    margin-bottom: 10px;
    padding: 0 15px;
    font-size: 12px;
    color: white;

    ::v-deep .van-image {
      margin-right: 8px;
      overflow: inherit;
      img {
        width: 50px;
        height: 50px;
      }
    }
    .name {
      font-size: 16px;
      line-height: 30px;
    }
    &__position {
      display: inline-block;
      background-color: white;
      height: 20px;
      line-height: 20px;
      border-radius: 9px;
      color: #f1c71f;
      font-size: 11px;
      padding: 0 6px 0 6px;
      transform: scale(0.916);
      position: relative;
      img {
        width: 13px;
        height: 13px;
        position: absolute;
        left: 6px;
        top: 3px;
      }
    }
  }

  &-ad {
    margin: 15px 0 7.5px 0;
    padding: 0 15px;
  }
  &-group {
    ::v-deep .van-cell {
      padding: 25px 20px 25px 28px;
      font-size: 16px;
      font-weight: bolder;
      line-height: 25px;
      img {
        width: 25px;
        height: 25px;
      }
    }
    ::v-deep .van-cell__title {
      margin-left: 20px;
      position: relative;
      .flag{
        background: #ff0000;
        color: #fff;
        font-size: 12px;
        padding: 0 8px;
        border-radius:12px 12px 12px 0 ;
        line-height: 18px;
        font-weight: normal;
        display: inline-block;
        position: absolute;
        top:-12px;
      }
    }
  }

  .messge-icon {
    position: relative;
    img {
      height: 18px;
    }
    .new-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #ff0000;
      display: inline-block;
      position: absolute;
      right: -2px;
      top: -2px;
      z-index: 1;
    }
  }
}
</style>
