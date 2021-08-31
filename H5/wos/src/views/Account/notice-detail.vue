<template>
  <div class="notice-detail">
    <van-nav-bar left-arrow title="公告" @click-left="goBack" />
    <div class="notice-detail-content">
      <div class="notice-detail-content__title">
        <b>{{ notice.title }}</b>
        <div class="date">{{ notice.createTime | parseTime() }}</div>
      </div>
      <div class="notice-detail-content__content" v-html="notice.content" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      notice: {}
    }
  },
  created() {
    const { item } = this.$route.params
    this.notice = item
  },
  methods: {
    goBack() {
      this.$router.back(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
.notice-detail-content{
  padding:0 15px;
  &__title{
    font-size: 20px;
    margin:15px 0 15px 0;
    color: #333;
    .date{
      font-size:14px;
      color: #999;
    }
  }
  &__content{
     ::v-deep p{
      margin-top: 10px;
      color:#666;
      font-size: 16px;
      span{
        white-space: normal !important;
      }
    }
  }
}

</style>
