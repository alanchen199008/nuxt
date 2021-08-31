<template>
  <van-tabbar
    v-model="activeValue"
    safe-area-inset-bottom
    route
  >
    <van-tabbar-item
      v-for="tabbar in tabbars"
      :key="tabbar.iconClass"
      :to="{ name: tabbar.name }"
    >
      <template #icon="{ active }">
        <svg-icon v-if="active" :icon-class="tabbar.iconClass + '_active'" class-name="active" />
        <svg-icon v-else :icon-class="tabbar.iconClass" />
        <template v-if="tabbar.name === 'Account' && !active">
          <span v-if="info.newMsg > 0" class="new-dot" />
        </template>
      </template>
      <span>{{ tabbar.label }}</span>
    </van-tabbar-item>
  </van-tabbar>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'DTabbar',
  data() {
    return {
      activeValue: 0,
      tabbars: [
        { label: '首页', name: 'Home', iconClass: 'home' },
        { label: '赛事', name: 'Match', iconClass: 'match' },
        { label: '专家', name: 'Expert', iconClass: 'expert' },
        { label: '预测', name: 'Forecast', iconClass: 'forecast' },
        { label: '我的', name: 'Account', iconClass: 'account' }
      ]
    }
  },
  computed: {
    ...mapGetters(['info'])
  }
}
</script>
<style lang="scss" scoped>
$tabbar: van-tabbar;
::v-deep .#{$tabbar} {
  &-item {
    position: relative;
    .svg-icon {
      font-size: 26px;
    }
    .new-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #ff0000;
      display: inline-block;
      position: absolute;
      right: 0;
      z-index: 1;
      top:0;
    }
    &--active {
      .#{$tabbar}-item__icon {
        border-radius: 50%;
        margin-top: -15px;
        margin-bottom: 0;
        background-color:  #fff;
        border-top: 1px solid #ebebeb;
        z-index: 1;
      }
      .#{$tabbar}-item__text{
        margin-top: -5px;
        color: #21D4AD;
        position: relative;
        z-index: 2;
      }
      .svg-icon {
        width: 48px;
        height: 48px;
      }
    }
  }
}
</style>
