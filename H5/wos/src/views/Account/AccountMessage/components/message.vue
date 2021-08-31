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
      <van-cell
        v-for="item in items"
        :key="item.id"
        class="message-item"
        :to="{
          name: 'AccountMessageDetail',
          params: { id: item.id, item: item }
        }"
      >
        <div flex="cross:center box:mean">
          <div class="message-item__icon" flex-box="0">
            <img-icon icon-name="notice-icon" size="big" />
            <span v-if="!item.read" class="dot" />
          </div>
          <div class="message-item-content">
            <div class="message-item__title">{{ item.title }}</div>
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
import { getMessages } from '@/api/account'
export default {
  name: 'Message',
  mixins: [usePullRefreshAndLoad(getMessages)],
  props: {
    type: {
      type: Number,
      default: 2
    }
  },
  data() {
    return {
      params: {
        currentPage: 1,
        pageSize: 10
      }
    }
  },
  mounted() {
    this.onRefresh()
  },
  methods: {
    implementationGetParams() {
      return { ...this.params }
    }
  }
}
</script>

<style lang="scss" scoped>
.message-item {
  &-content {
    width: 200px;
    padding: 0 10px;
  }
  &__icon{
    width: 48px;
    height: 48px;
    text-align: center;
    position: relative;
    .dot{
      width: 10px;
      height: 10px;
      background: #EA4335;
      border-radius: 50%;
      display: block;
      position: absolute;
      right: 2.5px;
      bottom: 2.5px;
    }
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
  color:#999;
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
    color:#999;
  }
}
</style>
