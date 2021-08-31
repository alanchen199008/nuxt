<template>
  <d-card title="今日热点" full @right-click="_rightClick">
    <template #extra>
      <span flex="cross:center">更多 <svg-icon icon-class="arrow-right" /></span>
    </template>
    <div class="hot-message">
      <div class="hot-message-list">
        <div v-for="(item,index) in news.slice(0,5)" :key="index" class="list-item" @click="goNewsInfo(item)">
          <span class="list-item-title"># {{ item.newsTitle }} </span><img v-if="item.isView === 1" :src="item.statusImg" alt="">
        </div>
      </div>
      <div class="hot-message-thumb">
        <div class="thumb-main" flex="cross:center">
          <div v-for="(item,index) in news.slice(5,10)" :key="index" class="thumb-item" @click="goNewsInfo(item)">
            <div class="thumb">
              <div class="img" :style="{ 'background-image':'url(' + item.url +')'}" />
            </div>
            <h2>{{ item.newsShortTitle }}</h2>
            <p>{{ item.createTime | formatDate() }} <svg-icon icon-class="eye-open" size="mini" /> {{ item.view > 10000 ? '9999+' : item.view }} </p>
          </div>
        </div>
      </div>
    </div></d-card>
</template>
<script>
import DCard from '../components/DCard'
import { getNewsList } from '@/api/news'

export default {
  name: 'HomeMessage',
  components: { DCard },
  data() {
    return {
      news: []
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      const data = {
        pageSize: 10,
        hotMatch: 1
      }
      getNewsList(data).then(([data, error]) => {
        if (!error) {
          this.news = data.map(item => {
            let view = item.initReading + item.realReading
            this.$set(item, 'view', view)
            return item
          })
        }
      })
    },
    _rightClick() {
      this.$router.push({ name: 'News' })
    },
    goNewsInfo(item) {
      this.$router.push({ name: 'HomeNewsInfo', params: { id: item.objectId }})
    }
  }
}
</script>
<style lang="scss" scoped>
.hot-message {
  color: #666;
  font-size: 12px;
  &-list {
    font-size: 12px;
    color: #666;
    padding: 0 13px;
    .list-item{
      font-size: 13px;
      line-height: 24px;
      .list-item-title{
        width: auto;
        max-width: calc(100% - 18px);
        display: inline-block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        vertical-align: middle;
        margin-right: 4px;
      }
      img{
        width: 14px;
        height: 14px;
        vertical-align: middle;
      }
    }
  }
  &-thumb{
    width: 100%;
    padding: 0 0 13px 13px ;
    overflow: hidden;
    margin-top: 5px;
    min-height:149px;
    position: relative;
    &::after{
      width: 20px;
      height: 100%;
      display: inline-block;
      position: absolute;
      right: 0;
      top: 0;
      background-image: linear-gradient( -90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%);
      content: '';
    }
    .thumb-main{
      overflow-x: auto;
      .thumb-item{
        flex: 1 0 126px;
        border-radius: 5px;
        background: #f3f3f3;
        overflow: hidden;
        margin-right: 15px;
        padding: 0 0 5px 0 ;
        .thumb{
          width: 100%;
          height: 86px;
          overflow: hidden;
          .img{
            width:126px;
            height: 84px;
            display: inline-block;
            background-size:cover ;
          }
        }
        h2{
        font-size: 12px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: 0 5px;
        margin: 5px 0 5px 0;
        }
        p{
          text-align: right;
          padding: 0 5px;
          color: #C3C3C3;
        }
      }
    }
  }
}
</style>
