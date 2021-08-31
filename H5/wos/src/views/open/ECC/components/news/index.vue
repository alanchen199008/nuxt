<template>
  <div class="content listcontent">
    <van-pull-refresh
      v-model="refreshing"
      class="scroll-touch"
      flex-box="1"
      @refresh="onRefresh"
    >
      <van-swipe autoplay>
        <van-swipe-item v-for="(item,index) in swipers" :key="index" @click="toDetail(item.objectId)">
          <div class="news-thumb-item">
            <div
              class="img"
              :style="{ backgroundImage: 'url('+ item.url + ')' }"
            />
            <div class="news-thumb-title">
              {{ item.newsTitle }}
            </div>
          </div>
        </van-swipe-item>
      </van-swipe>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div v-for="item in items" :key="item.objectId" class="list-item" flex="cross:center" @click="toDetail(item.objectId)">
          <div class="list-item-content">
            <div class="title">
              {{ item.newsTitle }}
            </div>
            <div class="sub-title" flex="main:justify">
              <span>{{ item.createTime | parseTime('{m}-{d} {h}:{i}') }}</span>
              <span> <van-icon name="eye" /> {{ item.view >= 10000 ? '9999+' : item.view }} </span>
            </div>
          </div>
          <div flex-box="0" class="list-item-thumb">
            <div
              class="img"
              :style="{ backgroundImage: 'url('+ item.url + ')' }"
            />
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getNewsList } from '@/api/euro'
import usePullRefreshAndLoad from '@/mixins/usePullRefreshAndLoad'
export default {
  mixins: [usePullRefreshAndLoad(getNewsList)],
  data() {
    return {
      swipers: [],
      params: {
        typeId: '60e4136ff05dd973809213e1',
        pageSize: 20
      }
    }
  },
  watch: {
    items() {
      this.items.map(item => {
        let view = item.initReading + item.realReading
        this.$set(item, 'view', view)
        return item
      })
    }
  },
  created() {
    this.getData()
  },
  methods: {
    implementationGetParams() {
      return { ...this.params }
    },
    getData() {
      const params = {
        typeId: '60a718ea56eb1f64e87dc37f',
        pageSize: 3,
        hotMatch: 1
      }
      getNewsList(params).then(([data, error]) => {
        if (!error) {
          this.swipers = data
        }
      })
    },
    toDetail(id) {
      this.$router.push({ name: 'HomeNewsInfo', params: { id, from: this.$route.name }})
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  font-size: 12px;
  height: 100%;
  overflow: auto;
  background: #b7bafc;
  display: flex;
  flex-direction: column;
  padding-bottom: 60px;
  ::v-deep .van-swipe {
    margin: 8px 12px 0 12px;
    position: relative;
    .van-swipe__indicators {
      left: 93%;
      bottom: 5px;
    }
  }
  .news-thumb-item {
    width: 100%;
    height: 240px;
    position: relative;
    .img {
      width: inherit;
      height: inherit;
      background-repeat: no-repeat;
      background-size: cover;
    }
    .news-thumb-title {
      position: absolute;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      z-index: 1;
      bottom: 0;
      background: rgba(0, 0, 0, 0.7);
      color: #fff;
      padding: 4px 8px;
    }
  }
  .list-item {
    background: #fff;
    margin: 8px 12px 0 12px;
    padding: 8px;
    .list-item-content {
      padding: 4px;
      .title {
        padding: 4px;
        color: #333;
        font-weight: 600;
        font-size: 14px;
        height: 48px;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .sub-title {
        line-height: 24px;
      }
    }
    .list-item-thumb {
      width: 100px;
      height: 66px;
      text-align: center;
      .img {
        width: inherit;
        height: inherit;
        background-repeat: no-repeat;
        background-size: contain;
      }
    }
  }
}
</style>
