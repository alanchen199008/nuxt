<template>
  <div flex="dir:top" class="account-recommend">
    <van-nav-bar left-arrow title="我的方案" @click-left="onClickLeft" @click-right="onClickRight">
      <template #right>
        <img src="@/assets/account/add.png" width="23" height="23">
      </template>
    </van-nav-bar>
    <van-dropdown-menu>
      <van-dropdown-item v-model="params.isRecharge" overlay :options="frees" @change="onRefresh" />
      <van-dropdown-item v-model="params.ballType" overlay :options="balls" @change="onRefresh" />
      <van-dropdown-item v-model="params.scheduleFlag" overlay :options="schedules" @change="onRefresh" />
      <van-dropdown-item v-model="params.dayType" overlay :options="date" @change="onRefresh" />
    </van-dropdown-menu>
    <van-pull-refresh v-model="refreshing" flex-box="1" class="scroll-touch" @refresh="onRefresh">
      <d-empty v-if="isFetching && !items.length" />
      <van-list
        v-model="loading"
        :finished="finished"
        :error="loaderr"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <recommend-item
          v-for="(item,index) in items"
          :key="index"
          :item="item"
          :more="false"
          @refresh-list="onRefresh"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import RecommendItem from './RecommendItem'
import { getExpertIsSend } from '@/api/expert'
import { getArticles } from '@/api/account'
import usePullRefreshAndLoad from '@/mixins/usePullRefreshAndLoad'
export default {
  name: 'AccountRecommend',
  components: { RecommendItem },
  mixins: [usePullRefreshAndLoad(getArticles)],
  data() {
    return {
      frees: [
        {
          value: 1,
          text: '免费'
        },
        {
          value: 2,
          text: '付费'
        },
        {
          value: 0,
          text: '全部'
        }
      ],
      schedules: [
        {
          value: 1,
          text: '单场'
        },
        {
          value: 2,
          text: '串场'
        },
        {
          value: 0,
          text: '全部'
        }
      ],
      balls: [
        {
          value: 1,
          text: '足球'
        },
        {
          value: 2,
          text: '篮球'
        },
        {
          value: 0,
          text: '全部'
        }
      ],
      date: [
        {
          value: 1,
          text: '今日'
        },
        {
          value: 3,
          text: '近3日'
        },
        {
          value: 7,
          text: '近7日'
        },
        {
          value: 30,
          text: '近30日'
        }
      ],
      params: {
        isRecharge: 0,
        scheduleFlag: 0,
        ballType: 0,
        dayType: 1
      }
    }
  },
  methods: {
    onClickLeft() {
      this.$router.push({ name: 'Account' })
    },
    implementationGetParams() {
      return { ...this.param }
    },
    onClickRight() {
      getExpertIsSend()
        .then(([data, err]) => {
          if (!err) {
            this.$router.push({ name: 'ExpertRelease', params: { step: data === 0 ? 0 : 1, locale: this.$i18n.locale, from: this.$route.name }}).catch(() => {})
          }
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.account-recommend {
  background-color: $--background-color-base;
}

</style>
