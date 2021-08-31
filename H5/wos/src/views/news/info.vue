<template>
  <div class="news-info">
    <van-nav-bar :title="typeName" left-arrow @click-left="onClickLeft" />
    <div class="news-content">
      <div class="news-main">
        <div class="title">{{ news.newsTitle }}</div>
        <div class="sub-title" flex="cross:center box:first">
          <span class="time">
            {{ news.createTime | parseTime("{y}-{m}-{d} {h}:{i}") }}
          </span>
          <span class="readnum">
            <svg-icon icon-class="eye-open" size="mini" />
            <font>{{ news.initReading + news.realReading }}</font>阅读 来源:{{ news.newsAuthor }}
          </span>
        </div>
        <div class="txt-main" v-html="news.newsContent" />
      </div>
    </div>
  </div>
</template>

<script>
import baseData from '@/mixins/baseData'
import { getAppInfoDetails } from '@/api/news'
export default {
  ame: 'NewsInf',
  mixins: [baseData],
  data() {
    return {
      typeName: '',
      news: {},
      newsType: [],
      from: ''
    }
  },
  mounted() {
    const { id, from } = this.$route.params
    this.newsType = JSON.parse(sessionStorage.getItem('news-type-list'))
    if (!this.newsType) {
      this.getBaseData().then(data => {
        this.newsType = data
      })
    }
    this.from = from
    this.getData(id)
  },
  methods: {
    getData(id) {
      getAppInfoDetails({ objectId: id })
        .then(([data, error]) => {
          if (!error) {
            if (data) {
              this.news = data
              this.typeName = this.getNewsTypeName(this.news.typeId) || data.typeName
            }
          }
        })
    },
    getNewsTypeName(id) {
      let typeName = ''
      if (this.newsType) {
        this.newsType.map(item => {
          if (id === item.objectId) {
            typeName = item.typeName
          }
          return item
        })
      }
      return typeName
    },
    onRefresh() {
      this.newsdata = []
      this.query.index = 1
      this.getData()
      this.isLoading = false
    },
    changegetData() {
      this.newsdata = []
      this.query.index = 1
      this.getData()
    },
    onClickLeft() {
      if (this.from === 'Home') {
        this.$router.push({ name: this.from, params: { component: 'News' }})
      } else
      if (this.form === 'News') {
        this.$router.push({ name: this.from })
      } else {
        this.$router.back(-1)
      }
    },
    toNews(item) {
      this.$router.push({
        path: '/newsinfo',
        query: item
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.news-info {
  background: #ffffff;
  .news-content {
    height: calc(100vh - 44px);
    .news-main {
      padding: 0 20px;
      height: 100%;
      overflow-x: hidden;
      overflow-y: auto;
      .title {
        font-size: 18px;
        font-weight: bold;
        margin: 15px 0 15px 0;
      }
      .sub-title {
        margin-bottom: 20px;
        .time {
          font-size: 14px;
          color: #bbbbbb;
          text-align: left;
        }
        .readnum {
          font-size: 14px;
          color: #bbbbbb;
          text-align: right;
          font {
            color: #21d4ad;
            margin: 0 8px 0 8px;
          }
        }
      }
      .image {
        text-align: center;
        margin: 20px auto;
        img {
          width: 100%;
          object-fit: caption;
        }
      }
      .txt-main {
        font-size: 14px;
        width: 100%;
        word-wrap: break-word;
        color: #666;
        ::v-deep  {
          img {
            margin: 20px auto;
            width: 100%!important;
            object-fit: cover;
          }
        }
      }
    }
  }
}
</style>
