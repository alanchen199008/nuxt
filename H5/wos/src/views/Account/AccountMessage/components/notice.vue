<template>
  <van-pull-refresh
    v-model="refreshing"
    class="scroll-touch"
    @refresh="onRefresh"
  >
    <van-list
      v-model="loading"
      :finished="finished"
      :error="loaderr"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in items" :key="item.id" class="message-item" :to="{ name: 'AccountNoticeDetail', params: { id: item.id, item: item }}">
        <div flex="cross:center box:mean">
          <div class="message-item__icon" flex-box="0">
            <img-icon icon-name="notice-icon" size="big" />
          </div>
          <div class="message-item-content">
            <h4 class="message-item__title">{{ item.title }}</h4>
            <div
              ref="content"
              class="message-item__content"
              v-html="item.content"
            />
          </div>
          <div class="message-item__date">
            {{ item.createTime | parseDate() }}
          </div>
        </div>
      </van-cell>
    </van-list>
  </van-pull-refresh>
</template>

<script>
import usePullRefreshAndLoad from '@/mixins/usePullRefreshAndLoad'
import { getAnnouncementList } from '@/api/account'
export default {
  name: 'Notice',
  mixins: [usePullRefreshAndLoad(getAnnouncementList)],
  props: {
    type: {
      type: Number,
      default: 1
    }
  },
  created() {
    this.fetch()
  }
}
</script>
<style lang="scss" scoped>
.message-item {
  &-content {
    width: 200px;
    padding: 0 10px;
  }
  &__icon {
    width: 48px;
    height: 48px;
    text-align: center;
  }
  &__title {
    font-size: 16px;
    color: #333;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &__content {
    height: 24px;
    overflow: hidden;
    color: #999;
    ::v-deep p {
      width: 200px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  &__date {
    font-size: 13px;
    width: 15%;
    color: #999;
  }
}
</style>
