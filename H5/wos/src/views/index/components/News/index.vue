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
        <div class="news-item">
          <div class="news-item-cell">
            <div class="news-item-left">
              <div class="title">
                周四竞彩大势：奥运女足季军 战奥运女足季军战欧联凯尔特 人能凯尔特人能否反客为主？
                周四竞彩大势：奥运女足季军 战奥运女足季军战欧联
              </div>
              <div class="des">
                <span class="hot-tag">欧洲杯</span>
                <span>23分钟前</span>
              </div>
              <div class="des">
                <span>23分钟前</span>
                <div>
                  <span class="ico-img ico-view">1000+</span>
                  <span class="ico-img ico-message">123</span>
                </div>
              </div>
            </div>
            <img class="r-img" src="https://uat-strin.wosprdapp.net/image/news/5f2c7ded-824c-430f-9f02-51570919e5bb.png">
          </div>
          <div class="message-hot">
            <div class="ell2">
              <svg-icon icon-class="divine-evaluation" size="mini" />
              <span class="nickname">世界波足球体育：</span>奥运女奥运女足季军战欧联凯战欧 联凯尔特人战欧联凯尔特人能欧联凯尔特人能否反客为...
            </div>
          </div>
        </div>
        <div class="news-item">
          <div class="news-item-cell">
            <div class="news-item-left">
              <div class="title">
                周四竞彩大势：奥运女足季军 战奥运女足季军战欧联凯尔特 人能凯尔特人能否反客为主？
                周四竞彩大势：奥运女足季军 战奥运女足季军战欧联
              </div>
              <div class="pic">
                <img src="https://uat-strin.wosprdapp.net/image/news/5f2c7ded-824c-430f-9f02-51570919e5bb.png">
                <img src="https://uat-strin.wosprdapp.net/image/news/5f2c7ded-824c-430f-9f02-51570919e5bb.png">
                <img src="https://uat-strin.wosprdapp.net/image/news/5f2c7ded-824c-430f-9f02-51570919e5bb.png">
              </div>
              <div class="des">
                <span>23分钟前</span>
                <div>
                  <span class="ico-img ico-view">1000+</span>
                  <span class="ico-img ico-message">123</span>
                </div>
              </div>
            </div>
            <img class="r-img" src="https://uat-strin.wosprdapp.net/image/news/5f2c7ded-824c-430f-9f02-51570919e5bb.png">
          </div>
          <div class="message-hot">
            <div class="ell2">
              <svg-icon icon-class="divine-evaluation" size="mini" />
              <span class="nickname">世界波足球体育：</span>奥运女奥运女足季军战欧联凯战欧 联凯尔特人战欧联凯尔特人能欧联凯尔特人能否反客为...
            </div>
          </div>
        </div>
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
                  item.createTime | parseDateFormatNews
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
import SvgIcon from '../../../../components/SvgIcon.vue'
export default {
  components: { SvgIcon },
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
.hot-tag {
  background: #F5F6F8FF;
  border-radius: 10px;
}
.ico-view {
  &::before {
    content: "";
    display: inline-block;
    width: 14px;
    height: 10px;
    background: url("~@/assets/news/eye.png") no-repeat;
    background-size: cover;
    margin-right: 2px;
  }
}
.ico-message {
  &::before {
    content: "";
    display: inline-block;
    width: 12px;
    height: 11px;
    background: url("~@/assets/news/message.png") no-repeat;
    background-size: cover;
    margin-right: 2px;
  }
}
.news-item {
  padding: 14px 14px 10px;
  line-height: 21px;
  font-size: 12px;
  background: #fff;
  position: relative;
  &-cell {
    display: flex;
  }
  &-left {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .title {
    font-size: 16px;
    color: var(--color-text-primary);
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    word-wrap: break-word;
    -webkit-box-orient: vertical;
    margin-bottom: 10px;
  }
  .r-img {
    width: 122px;
    height: 90px;
    border-radius: 2px;
    margin-left: 10px;
  }
  .pic {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    img {
      // width: 107px;
      height: 66px;
      margin-right: 10px;
      flex: 1;
      &:last-child {
        margin: 0;
      }
    }
  }
  .des {
    color:#C3C3C3FF;
    display: flex;
    justify-content: space-between;
  }
  .message-hot {
    background: #F8F8F6FF;
    border-radius: 4px;
    color: #7F7F7FFF;
    padding: 10px;
    margin: 13px 0 4px;
    // overflow: hidden;
    // text-overflow: ellipsis;
    // -webkit-line-clamp: 2;
    // display: -webkit-box;
    // word-wrap: break-word;
    // -webkit-box-orient: vertical;
    .nickname {
      color:#3E4782FF;
    }
    .ell2 {
      @include ell2();
    }
    .svg-icon {
      width: 29px;
      height: 13px;
      margin-right: 6px;
    }
  }
  .ico-img {
    margin-left: 10px;
  }
  &::after {
    content: "";
    display: block;
    // border-bottom: solid 1px #DFDFDFFF;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    transform: scaleY(0.5);
    height: 1px;
    background: #DFDFDFFF;
  }
  &.single {
    .title {
      -webkit-line-clamp: 3;
    }
  }
}
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
