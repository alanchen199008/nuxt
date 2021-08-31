<template>
  <div v-show="visable && show" class="swiper-main">
    <van-swipe :autoplay="autoplay" :height="height">
      <template v-if="items.length > 0">
        <van-swipe-item v-for="item in items" :key="item.id" @click="handleClick(item)">
          <img v-if="item.pic" v-lazy="item.pic" width="100%" height="100%">
        </van-swipe-item>
      </template>
      <template v-else>
        <van-swipe-item>
          <img src="~@/assets/slide-holder.png" alt="">
        </van-swipe-item>
      </template>
    </van-swipe>
  </div>
</template>
<script>
import { getBanner } from '@/api/home'
export default {
  name: 'DSwiper',
  props: {
    position: {
      type: Number,
      default: 1
    },
    autoplay: {
      type: Number,
      default: 3000
    },
    height: {
      type: Number,
      default: 125
    }
  },
  data() {
    return {
      visable: true,
      show: true,
      items: []
    }
  },
  watch: {
    items() {
      if (this.items.length === 0 && this.position !== 1) {
        this.show = false
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      getBanner({ position: this.position })
        .then(([data, err]) => {
          if (!err) {
            this.items = data
            this.$emit('count', this.items.length)
          }
        })
    },
    handleClick(item) {
      if (item.jumpType === 1 && item.outUrl) {
        window.location.href = item.outUrl
      }
      if (item.jumpType === 2) {
        this.$router.push({ name: 'Activity', params: { id: item.activityId }})
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.hot-swiper {
  height: 125px;
  img{
    height: 100%;
    object-fit:cover;
  }
}
</style>
