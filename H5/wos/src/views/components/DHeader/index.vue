<template>
  <div class="d-header">
    <van-tabs v-model="tab" line-height="2px" animated :before-change="beforeChange" scrollspy>
      <van-tab v-for="(item,index) in tabs" :key="index" :name="item.value">
        <template #title> {{ item.label }}<img v-if="item.iconStatus === 0 && item.icon" :src="item.icon">
        </template>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import { getMenus } from '@/api/app'
export default {
  name: 'DHeader',
  data() {
    return {
      tab: 'Home',
      tabs: [
        { label: '综合', value: 'Home', icon: '', iconStatus: 0 },
        { label: '资讯', value: 'News', icon: '', iconStatus: 0 }
      ]
    }
  },
  created() {
    this.getData()
    const { component } = this.$route.params
    if (component) {
      this.tab = 'News'
    }
  },
  methods: {
    getData() {
      getMenus().then(([data, error]) => {
        if (!error) {
          let tab = {}
          let menus = []
          menus = data
          menus.map(item => {
            if (item.name === '欧洲杯') {
              tab = {
                label: item.name,
                value: 'Euro',
                icon: item.icon,
                iconStatus: item.iconStatus
              }
            } else {
              tab = {
                label: item.name,
                value: item.link,
                icon: item.icon,
                iconStatus: item.iconStatus
              }
            }
            this.tabs.push(tab)
            return item
          })
        }
      })
    },
    beforeChange(name) {
      if (this.tab !== name && name.indexOf('www') < 0 - 1 || this.tab !== name && name.indexOf('www') < 0) {
        this.tab = name
        this.$emit('change', name)
      } else {
        this.$emit('change', name)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.d-header {
  background-color: white;
  padding: 4px 0;
  position: relative;
  &::after{
      width: 30px;
      height: 50px;
      display: inline-block;
      position: absolute;
      right: 0;
      bottom: 0;
      background-image: linear-gradient( -90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%);
      content: '';
    }
  &__logo {
    padding-left: 12px;
    img {
      display: block;
      width: 93px;
      height: auto;
    }
  }
  &__right {
    padding: 0 5px;
    width: 65%;
  }
   ::v-deep .van-tab {
        flex: none;
        padding: 0 15px;
        &__text {
        overflow: visible;
        position: relative;
        img {
          width: 14px;
          height: 14px;
          vertical-align: top;
          margin-left: 4px;
          position: absolute;
          right: -16px;
          top: 0;
        }
      }
    }
    ::v-deep .van-tabs__line {
      bottom: 20px;
    }
    ::v-deep .van-popover__wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
    }
}
</style>
