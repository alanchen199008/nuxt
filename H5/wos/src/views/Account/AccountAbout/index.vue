<template>
  <div class="about-container">
    <van-nav-bar left-arrow title="关于我们" @click-left="onClickLeft" />
    <div class="about-container">
      <div class="about-main">
        <img :src="require('@/assets/about.png')" alt="">
        <p>世界波V{{ version }}</p>
      </div>
      <van-cell-group>
        <van-cell :to="{name:'UserAgreement'}">用户许可协议</van-cell>
        <van-cell :to="{name:'PrivacyPolicy'}">隐私政策</van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AccountAbout',
  computed: {
    version() {
      return process.env.VUE_APP_VERSION
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.about-container {
  text-align: center;
  .about-main{
    background: #E7F0EE;
    padding: 41px 0;
    line-height: 24px;
    img{
      width: 103px;
    }
    p{
      font-size: 14px;
      margin-top: 5px;
    }
  }
  .title {
    font-size: 14px;
    color: #000;
    text-align: center;
    margin: 12vh 0;
  }
}
</style>
