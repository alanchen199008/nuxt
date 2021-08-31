<template>
  <div class="recommend-description">
    <h2><img-icon icon-name="hot" size="mini" /> 推荐理由</h2>
    <p v-if="data.free || data.buy || data.self || (data.expired && data.end)" v-html="data.content" />
    <p v-else class="buy-tip"><span class="buy-tip">购买后可见</span></p>
    <p class="tip">
      <img-icon icon-name="info" size="mini" />
      所有言论仅代表发布者个人观点，与平台无关。 {{ data.from }}
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'RecommendDescription',
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ...mapGetters(['memberId'])
  }
}
</script>

<style lang="scss" scoped>
.recommend-description {
  background: #fff;
  padding: 10px 20px;
  h2 {
    font-size: 14px;
    color: #333;
    .img-icon {
      margin-top: -4px;
    }
  }
  p {
    padding: 10px 0;
    font-size: 13px;
    text-align: justify;
    &.tip {
      font-size: 12px;
      padding: 10px;
      .img-icon {
        margin-top: -4px;
      }
    }
    &.buy-tip {
      text-align: center;
      span {
        font-size: 15px;
        line-height: 32px;
        display: inline-block;
        border-radius: 16px;
        padding: 0 22px;
        background: #eee;
        color: #999;
      }
    }
  }
}
</style>
