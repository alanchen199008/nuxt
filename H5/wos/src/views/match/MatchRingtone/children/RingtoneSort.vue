<template>
  <div flex="dir:top">
    <van-nav-bar title="赛事排序" left-text="" left-arrow @click-left="onClickLeft" />
    <van-radio-group v-model="radio" style="margin-top: 10px">
      <van-cell-group>
        <van-cell title="按比赛时间排序">
          <template #right-icon>
            <van-radio :name="1" :checked-color="checkedColor" />
          </template>
        </van-cell>
        <van-cell title="按联赛名称排序">
          <template #right-icon>
            <van-radio :name="2" :checked-color="checkedColor" />
          </template>
        </van-cell>
      </van-cell-group>
    </van-radio-group>
    <div class="action-button">
      <van-button type="primary" block @click="handleSubmit">{{ $t('confirm') }}</van-button>
    </div>
  </div>
</template>

<script>
import variables from '@/styles/variables.scss'
import { updateMatchRingtoneWithFootball } from '@/api/match'
export default {
  name: 'Matchsort',
  data() {
    return {
      radio: 1
    }
  },
  computed: {
    checkedColor() {
      return variables.theme
    }
  },

  created() {
    this.radio = Number(this.$route.query.value) || 1
  },
  methods: {
    handleSubmit() {
      updateMatchRingtoneWithFootball({
        matchSort: this.radio
      }).then(([_, err]) => {
        if (!err) {
          this.onClickLeft()
        }
      })
    },
    onClickLeft() {
      this.$router.back(-1)
    }
  }
}
</script>
