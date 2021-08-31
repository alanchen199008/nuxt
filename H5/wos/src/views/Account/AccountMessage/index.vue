<template>
  <div class="bar-default" flex="dir:top box:first">
    <van-nav-bar left-arrow @click-left="$router.back(-1)">
      <template #title>
        <van-tabs
          v-model="current"
          type="card"
          class="match-message-tabs header"
          :before-change="beforeChange"
        >
          <van-tab v-for="item in tabs" :key="item.key" :title="item.label" :name="item.value" />
        </van-tabs>
      </template>
    </van-nav-bar>
    <div class="scroll-touch" flex-box="1">
      <component :is="current" :type="type" />
    </div>
  </div>
</template>

<script>
import { notice, message } from './components'
export default {
  name: 'AccountMessage',
  components: { notice, message },
  data() {
    return {
      type: 1,
      current: 'notice',
      tabs: [
        { value: 'notice', label: '公告', key: '1' },
        { value: 'message', label: '消息', key: '2' }
      ]
    }
  },
  watch: {
    current(value) {
      if (value === 'notice') {
        this.type = 1
      } else {
        this.type = 2
      }
    }
  },
  methods: {
    beforeChange(name) {
      if (this.current !== name) {
        this.current = name
      }
    }
  }
}
</script>
