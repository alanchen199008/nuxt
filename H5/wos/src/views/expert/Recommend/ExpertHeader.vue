<template>
  <div class="expert-header header-warpper">
    <div flex="main:justify corss:center" class="expert-header-filter">
      <div>专家方案</div>
      <img src="@/assets/icons/filter.png" width="23" height="23" @click="onClick">
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    onClick() {
      this.$router.push({ name: 'RecommendFiter' })
    }
  }
}
</script>

<style lang="scss" scoped>
.expert-header {
  flex: 1 0 97px;
  background-size: 100%;

  &-filter {
    font-size: 16px;
    color: #fff;
    padding: 16px 10px;
  }
}
</style>
