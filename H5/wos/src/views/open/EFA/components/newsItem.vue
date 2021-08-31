<template>
  <div class="news-item" flex="cross:center box:mean" @click="handleClick(item.objectId)">
    <div class="news-item-content">
      <div class="title">{{ item.newsTitle }}</div>
      <div class="sub-title" flex="main:justify">
        <span>{{ item.createTime | parseTime("{m}-{d} {h}:{i}") }}</span>
        <span class="views">
          <van-icon name="eye" />
          {{ item.views >= 10000 ? "9999+" : item.views }}
        </span>
      </div>
    </div>
    <div flex-box="0" class="news-item-thumb">
      <div v-if="item.url" class="img" :style="{ backgroundImage: 'url(' + item.url + ')' }" />
      <div v-else class="pic-holder" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ...mapGetters(['mode'])
  },
  methods: {
    handleClick(id) {
      if (this.mode === 0) {
        this.$router.push({ name: 'HomeNewsInfo', params: { id }})
      }
      if (this.mode === 1) {
        window.android.intoInfoDetail(id)
      }
      if (this.mode === 2) {
        window.webkit.messageHandlers.RealTimeInfoDetail.postMessage({ objectId: id, typeName: '欧冠' })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.news-item {
  background: #fff;
  padding: 8px;
  font-size: 12px;
  border-bottom: 1px solid #F1F1F1;
  .news-item-content {
    padding: 4px;
    .title {
      padding: 4px;
      color: #333;
      font-weight: 600;
      font-size: 14px;
      height: 48px;
      text-align: justify;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .sub-title {
      padding: 4px;
      line-height: 24px;
      color: #888;
      .views{
        .van-icon{
          vertical-align: middle;
          margin-top: -4px;
        }
      }
    }
  }
  .news-item-thumb {
    width: 100px;
    height: 66px;
    text-align: center;
    .img {
      width: inherit;
      height: inherit;
      background-repeat: no-repeat;
      background-size: contain;
    }
    .pic-holder {
      width: 87px;
      height: 66px;
      background: #eeeeee url("~@/assets/public/news-pic-holder.png") no-repeat center;
      background-size: contain;
      border: 1px solid #eeeeee;
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.08);
      border-radius: 5px;
    }
  }
}
</style>
