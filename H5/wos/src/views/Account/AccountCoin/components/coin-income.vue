<template>
  <van-pull-refresh v-model="refreshing" class="scroll-touch" @refresh="onRefresh">
    <d-empty v-if="isFetching && !items.length" />
    <van-list
      v-model="loading"
      :finished="finished"
      @load="onLoad"
    >
      <inconme-item v-for="item in items" :key="item.id" :item="item" />
    </van-list>
  </van-pull-refresh>
</template>
<script>
import InconmeItem from './inconme'
import { pageAccountChange } from '@/api/account'
import usePullRefreshAndLoad from '@/mixins/usePullRefreshAndLoad'
export default {
  components: { InconmeItem },
  mixins: [usePullRefreshAndLoad(pageAccountChange)]
}
</script>
