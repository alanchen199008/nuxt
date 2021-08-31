<template>
  <div :class="classes" flex="main:center cross:center">
    <van-empty :image="options.image" :description="options.description">
      <van-button v-if="type === 'error'" round color="#21D4AD" @click="$emit('click')">点击重试</van-button>
      <van-button v-if="type === 'match' || type === 'expert' || type === 'recommend'" round color="#21d4ad" @click="goLink">去关注</van-button>
    </van-empty>
  </div>
</template>
<script>

import { oneOf } from '@/utils/assist'

const EMPTY_TYPE = {
  'error': {
    image: require('@/assets/status/error.png'),
    description: '网络开小差'
  },
  'search': {
    image: require('@/assets/status/search.png'),
    description: '暂时没有相关数据!'
  },
  'match': {
    image: require('@/assets/status/match.png'),
    description: '还未关注任何赛事'
  },
  'expert': {
    image: require('@/assets/status/expert.png'),
    description: '还未关注任何专家'
  }
}
export default {
  name: 'DEmpty',
  props: {
    type: {
      validator(value) {
        return oneOf(value, ['error', 'match', 'search', 'expert'])
      },
      default: 'search'
    }
  },
  computed: {
    options() {
      return EMPTY_TYPE[this.type]
    },
    classes() {
      return [
        'd-empty',
        {
          [`d-empty-${this.type}`]: !!this.type
        }
      ]
    }
  },
  methods: {
    goLink() {
      if (this.$route.name === 'Match') {
        this.$emit('tab-change', 'instant')
      }
      if (this.$route.name === 'Forecast') {
        this.$emit('tab-change', 0)
      }
      if (this.$route.name === 'Expert') {
        this.$emit('tab-change', 0)
      }
    }
  }
}
</script>

<style lang="scss">
.d-empty {
  height: 100%;
  &-error {
    .van-empty__image {
      width: 118.5px;
      height: 91.5px;
    }
  }

  &-search {
    .van-empty__image {
      width: 121px;
      height: 127px;
    }
  }

  &-match {
    .van-empty__image {
      width: 142.5px;
      height: 101px;
    }
  }

  &-expert {
    .van-empty__image {
      width: 142.5px;
      height: 92px;
    }
  }
}
</style>
