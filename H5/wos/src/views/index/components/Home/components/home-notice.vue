<template>
  <div class="index-notice">
    <van-notice-bar background="#fff" color="#666" :text="text" :scrollable="scrollable" @replay="replay">
      <template #left-icon>
        <img src="@/assets/public/notice.png" alt="">
      </template>
    </van-notice-bar>
  </div>
</template>

<script>
import { getNewsInfo } from '@/api/home'
export default {
  name: 'HomeNotice',
  data() {
    return {
      text: '',
      index: 0,
      scrollable: true,
      notices: []
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      getNewsInfo({ type: 1 })
        .then(([data, error]) => {
          if (!error) {
            this.notices = data.filter(item => { return item.scroll })
            if (this.notices.length !== 0) {
              this.text = this.notices[0].title
            }
          }
        })
    },
    toDetail(text) {
      this.notices.map(item => {
        if (item.title.indexOf(text) > -1) {
          this.$router.push({ name: 'NewsDetail', params: { id: item.id, locale: this.$i18n.locale }})
        }
        return item
      })
    },
    replay() {
      const i = this.notices.length - 1
      if (this.index >= i) {
        this.index = 0
      } else {
        this.index++
      }
      this.text = this.notices[this.index].title
    }
  }
}
</script>
<style lang="scss" scoped>
.index-notice {
  height: 40px;
  ::v-deep .van-notice-bar {
    padding: 0 10px;
    & img {
      width: 43px;
      height: 23px;
      margin-right: 10px;
    }
  }
}
</style>
