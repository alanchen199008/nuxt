<template>
  <div class="d-container" flex="dir:top">
    <div class="tab van-hairline--top">
      <van-tabs
        v-model="params.typeId"
        title-inactive-color="#999999"
        title-active-color="#333"
        color="#21D4AD"
        line-width="19"
        line-height="2px"
        :before-change="beforeChange"
        animated
      >
        <van-tab
          v-for="(item, index) in typeLst"
          :key="index"
          :title="item.typeName"
          :name="item.objectId"
        />
      </van-tabs>
    </div>
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
          v-for="(item, index) in items"
          :key="index"
          is-link
          @click="toNews(item)"
        >
          <template #title>
            {{ item.newsTitle }}
            <div flex="cross:center box:mean">
              <template v-if="params.hotMatch === 1">
                <div class="tagrow" flex-box="0">
                  <div
                    class="tag-item"
                    :style="{ background: item.color ? item.color : '#4FD072' }"
                  >
                    <font>{{ item.typeName }}</font>
                  </div>
                </div>
              </template>
              <div class="info" flex="cross:center box:mean">
                <span>{{
                  item.createTime | parseTime("{y}-{m}-{d} {h}:{i}")
                }}</span><span
                  class="view-num"
                ><svg-icon icon-class="eye-open" size="mini" />
                  {{ item.views &lt; 10000 ? item.views : '9999+' }}</span>
              </div>
            </div>
          </template>
          <template #right-icon>
            <div
              v-if="item.url"
              class="thumb"
              :style="{ 'background-image': 'url(' + item.url + ')' }"
            />
            <div v-else class="pic-holder" />
          </template>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import baseData from '@/mixins/baseData'
import { getNewsList } from '@/api/news'
import usePullRefreshAndLoad from '@/mixins/usePullRefreshAndLoad'
export default {
  name: 'News',
  mixins: [baseData, usePullRefreshAndLoad(getNewsList)],
  data() {
    return {
      titlename: '',
      typeLst: [],
      params: {
        typeId: '',
        pageSize: 20,
        hotMatch: 1
      }
    }
  },
  watch: {
    items() {
      this.items.map(item => {
        this.$set(item, 'views', item.realReading + item.initReading)
        return item
      })
    }
  },
  created() {
    const typeList = JSON.parse(sessionStorage.getItem('news-type-list'))
    if (typeList) {
      this.typeLst = typeList
      this.titlename = this.typeLst[0].typeName
    } else {
      this.getBaseData().then(data => {
        this.typeLst = data
      })
      this.titlename = this.typeLst[0].typeName
    }
  },
  mounted() {
    this.fetch()
  },
  methods: {
    implementationGetParams() {
      return { ...this.params }
    },
    beforeChange(name) {
      if (this.params.typeId !== name) {
        this.params.typeId = name
        this.typeLst.map((item, index) => {
          if (name === item.objectId) {
            this.params.hotMatch = index === 0 ? 1 : null
          }
          return item
        })
        this.onRefresh()
      }
    },
    toNews(item) {
      const params = { titlename: this.titlename, params: this.params }
      this.$router.push({
        name: 'HomeNewsInfo',
        params: { id: item.objectId, from: this.$route.name }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.tab {
  margin-bottom: 6px;
}
.tagrow {
  width: 58px;
  line-height: 24px;
  text-align: center;
  padding: 2px;
  & .tag-item {
    color: #fff;
    width: 48px;
    line-height: 20px;
    font-size: 12px;
    font {
      display: inline-block;
      transform: scale(0.83);
    }
  }
}
.info {
  font-size: 12px;
  white-space: nowrap;
  color: #777777;
  .view-num {
    width: 60px;
    text-align: right;
  }
}
.thumb {
  width: 87px;
  height: 66px;
  border-radius: 4px;
  display: inline-block;
  background-size: cover;
}
.pic-holder {
  width: 87px;
  height: 66px;
  background: #eeeeee url("~@/assets/public/news-pic-holder.png") no-repeat
    center;
  background-size: contain;
  border: 1px solid #eeeeee;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.08);
  border-radius: 5px;
}
::v-deep .van-cell {
  .van-cell__title {
    font-size: 16px;
    color: #333;
    padding: 0 8px 0 0;
    text-align: justify;
  }
}
::v-deep .tab {
  .van-tab {
    width: 83px;
  }
}
</style>
