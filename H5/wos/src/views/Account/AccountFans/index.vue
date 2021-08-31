<template>
  <div class="bar-default" flex="dir:top box:first">
    <van-nav-bar left-arrow title="我的粉丝" @click-left="$router.back(-1)" />
    <div flex-box="1">
      <van-pull-refresh
        v-model="refreshing"
        class="scroll-touch"
        @refresh="onRefresh"
      >
        <van-list v-model="loading" :finished="finished" :error="loaderr" finished-text="没有更多了" @load="onLoad">
          <van-cell v-for="item in items" :key="item.id" class="fans-item">
            <div flex="cross:center box:mean">
              <div class="fans-item__avatar" flex-box="0">
                <avatar :src="item.avatar" />
              </div>
              <div class="fans-item__content">
                <div class="nickname">{{ item.nickname }}</div>
                <div class="date">关注于 {{ item.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</div>
              </div>
            </div>
          </van-cell>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { getFansList } from '@/api/account'
import usePullRefreshAndLoad from '@/mixins/usePullRefreshAndLoad'
export default {
  mixins: [usePullRefreshAndLoad(getFansList)],
  created() {
    this.fetch()
  }
}
</script>

<style lang="scss" scoped>
.fans-item {
  &__avatar{
    width: 60px;
  }
  &__content{
    padding: 0 15px;
    .nickname{
      font-size: 16px;
      color: #333;
    }
    .date{
      font-size: 13px;
      color: #999;
    }
  }
}
</style>
