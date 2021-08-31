<template>
  <div>
    <van-nav-bar left-arrow title="修改个人简介" @click-left="go" />
    <van-cell-group title="个人简介">
      <van-field
        v-model="introduction"
        rows="4"
        type="textarea"
        maxlength="100"
        placeholder="请输入个人简介"
        show-word-limit
      />
    </van-cell-group>
    <div class="action-button">
      <van-button
        block
        class="liner-gradient"
        @click="handleSubmit"
      >{{ $t('save') }}</van-button>
    </div>
  </div>
</template>

<script>
import { updateintroduction } from '@/api/user'
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'AccountProfile',
  data() {
    return {
      introduction: ''
    }
  },
  computed: {
    ...mapGetters(['info'])
  },
  created() {
    this.introduction = this.info.introduction
  },
  methods: {
    ...mapMutations('user', ['SET_INFO']),
    go() {
      this.$router.back(-1)
    },
    handleSubmit() {
      const params = { introduction: this.introduction }
      updateintroduction(params).then(() => {
        this.SET_INFO(params)
        this.$toast.success('修改成功')
        this.go()
      }).catch(() => {

      })
    }
  }
}
</script>
