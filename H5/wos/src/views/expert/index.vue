<template>
  <div class="d-container expert-warpper" flex="dir:top">
    <van-nav-bar :border="false" class="expert-nav-bar" @click-right="onClickRight">
      <template #left>
        <van-tabs v-model="type" :line-width="28" class="expert-nab-tabs" :before-change="beforeChange">
          <van-tab v-for="tab in tabs" :key="tab.id" :title="tab.label" />
        </van-tabs>
      </template>
      <template #right>
        <button class="recommend-button"><img-icon icon-name="plus" style="width:8px;height:8px" /> 发布</button>
      </template>
    </van-nav-bar>
    <keep-alive>
      <component :is="activeName" v-if="activeName === 'Specialist'" flex="dir:top box:first" flex-box="1" class="expert-conatienr" />
      <component :is="activeName" v-else flex="dir:top box:first" flex-box="1" class="expert-conatienr" @tab-change="tabChange" />
    </keep-alive>
    <silde-left-view />
  </div>
</template>

<script>
import { getExpertIsSend } from '@/api/expert'
import Specialist from './Specialist'
import Recommend from './Recommend'
import Attention from './Attention'
import { mapGetters } from 'vuex'
export default {
  name: 'ExpertLst',
  components: { Specialist, Recommend, Attention },
  data() {
    return {
      tabs: [
        { value: 0, label: '专家', name: 'Specialist' },
        { value: 1, label: '方案', name: 'Recommend' },
        { value: 2, label: '关注', name: 'Attention' }
      ],
      type: 0,
      isGreat: null
    }
  },
  computed: {
    ...mapGetters(['memberId']),
    activeName() {
      return this.tabs[this.type].name
    }
  },
  created() {
    const { tab } = this.$route.params
    tab === 'Recommend' ? this.type = 1 : tab === 'Attention' ? this.type = 2 : 0
  },
  methods: {
    onClickRight() {
      if (!this.memberId) {
        return window.__GLOBAL.LoginControlDialog.open()
      }
      getExpertIsSend()
        .then(([data, err]) => {
          if (!err) {
            this.$router.push({ name: 'ExpertRelease', params: { step: data === 0 ? 0 : 1, locale: this.$i18n.locale, from: this.$route.name }}).catch(() => {})
          }
        })
    },
    tabChange(value) {
      this.type = value
    },
    beforeChange(name) {
      if (name === 2 && !this.memberId) {
        return window.__GLOBAL.LoginControlDialog.open()
      }
      if (this.type !== name) {
        this.type = name
      }
    }
  }
}
</script>

<style lang="scss">
.expert-warpper {
  .expert-nav-bar {
    .van-nav-bar__left {
      padding: 0;
    }

    .van-tab {
      font-size: 16px;
      font-weight: 400;
      padding: 0 20px;
    }

    .van-tabs__line {
      bottom: 20px;
      background-color: #82E43A;
      border-radius: 2px;
    }
    .recommend-button{
      line-height: 24px;
      border-radius: 12px;
      border: 1px solid #E0E0E0;
      background: #fff;
      padding: 0 12px ;
      font-size: 12px;
      color: #333;
    }
  }
}

</style>

<style lang="scss" scoped>
// .expert-conatienr {
//   background-image: $--background-head-gradient;
//   background-size: 100% 97px;
//   background-repeat: no-repeat;
//   background-color: transparent;
// }
</style>
