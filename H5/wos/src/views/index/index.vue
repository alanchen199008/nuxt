<template>
  <div class="d-container" flex="dir:top">
    <van-tabs v-model="component" animated class="main-tabs van-hairline--bottom" :before-change="beforeChange">
      <van-tab
        v-for="(tab, index) in tabs"
        :key="index"
        :title="tab.name"
        :name="tab.value"
      >
        <template
          #title
        >{{ tab.name }}
          <img v-if="tab.iconStatus === 0 && tab.icon" :src="tab.icon">
        </template>
      </van-tab>
    </van-tabs>
    <component :is="componentName" :tabModel="tabModel" />
    <silde-left-view />
  </div>
</template>

<script>
import { getMenus } from '@/api/app'
import { getUrlKey, param2Obj } from '@/utils'
import { Home, News } from './components'
import FIFA from '../open/FIFA'
import EFA from '../open/EFA'
import ECC from '../open/ECC'
import LM from '../open/LM'
export default {
  components: { Home, News, FIFA, EFA, ECC, LM },
  data() {
    return {
      tabModel: null,
      component: 'Home',
      tabs: [
        { name: '综合', value: 'Home', icon: '', iconStatus: 1 },
        { name: '资讯', value: 'News', icon: '', iconStatus: 1 }
      ]
    }
  },
  computed: {
    componentName() {
      let str = this.component
      this.url = str
      return param2Obj(str).tab || str
    }
  },
  created() {
    const { tab } = this.$route.query
    if (tab) {
      this.component = tab
    }
    this.getData()
  },
  methods: {
    getData() {
      getMenus().then(([data, err]) => {
        if (!err) {
          data = data.map(o => {
            let value = getUrlKey('tab', o.link)
            const matchType = getUrlKey('matchType', o.link)
            if(matchType) {
              value = o.link
            }
            return ({ ...o, value: value })
          })
          this.tabs = this.tabs.concat(data)
        }
      })
    },
    beforeChange(name) {
      if (this.component !== name) {
        this.tabModel
        this.tabs.map((item, index) => {
          if (name === index) {
            window.location.href = item.link
          } else {
            this.component = name
          }
          if(this.component == item.value){
            this.tabModel = item
          }
          return item
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .main-tabs {
  .van-tabs__wrap {
    position: relative;
    &::after {
      width: 20px;
      height: 100%;
      display: inline-block;
      position: absolute;
      right: 0;
      top: 0;
      background-image: linear-gradient(
        -90deg,
        rgba(255, 255, 255, 1) 0%,
        rgba(255, 255, 255, 0) 100%
      );
      content: "";
      // display: none;

    }
    .van-tabs__nav {
        padding-right: 20px;
        .van-tab {
          flex: none;
          padding: 0 15px;
          &__text {
            img {
              width: 13px;
              height: 14px;
              vertical-align: top;
              margin-left: 4px;
              position: absolute;
              right: 0;
              top: 5px;
            }
          }
        }
        .van-tabs__line {
          bottom: 18px;
        }
      }
  }
}
</style>
