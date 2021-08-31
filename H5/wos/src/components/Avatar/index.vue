<template>
  <div class="avatar" @click="onClick">
    <van-image round lazy-load fit="cover" :src="avatar" class="avatar-portrait" />
    <van-image v-if="validURL(grade)" lazy-load :src="grade" class="avatar-grade" />
  </div>
</template>

<script>
import { validURL } from '@/utils/validate'
import defaultAvatar from '@/assets/default.png'
export default {
  name: 'Avatar',
  props: {
    src: {
      type: String,
      default: ''
    },
    grade: {
      type: String,
      default: ''
    }
  },
  computed: {
    avatar() {
      return validURL(this.src) && this.src || defaultAvatar
    }
  },
  methods: {
    validURL,
    onClick() {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss">
.avatar {
  position: relative;
  &-portrait {
    width: 62px;
    height: 62px;
    border: 3px solid #eeeeee;
  }
  &-grade {
    position: absolute;
    bottom: 4px;
    right: 4px;
    width: 16px;
    height: 16px;
  }
}
</style>
