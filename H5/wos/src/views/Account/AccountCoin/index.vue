<template>
  <div flex="dir:top box:first" class="bar-default account-coin">
    <van-nav-bar left-text="" left-arrow @click-left="goBack">
      <template #title>
        <template v-if="isExpert">
          <van-tabs v-model="current" type="card" class="match-message-tabs header">
            <van-tab v-for="tab in tabs" :key="tab.value" :title="tab.label" :name="tab.name" />
          </van-tabs>
        </template>
        <template v-else>
          球币明细
        </template>
      </template>
    </van-nav-bar>
    <component :is="current" />
  </div>
</template>

<script>
import { getExpertInfo } from '@/api/user'
import { CoinIncome, PushIncome } from './components'
export default {
  name: 'AccountCoin',
  components: { CoinIncome, PushIncome },
  data() {
    return {
      current: 'coin-income',
      tabs: [
        { label: '球币明细', value: 0, name: 'coin-income' },
        { label: '发方案收益', value: 1, name: 'push-income' }
      ],
      isExpert: false
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      getExpertInfo().then(([data, error]) => {
        if (!error) {
          if (data) {
            this.isExpert = true
          }
        }
      })
    },
    goBack() {
      this.$router.push({ name: 'Account' })
    }
  }
}
</script>

<style lang="scss">
.account-coin {
  .match-message-tabs .van-tabs__nav--card {
    background-color: #F5F5F5;
  }
}
</style>
