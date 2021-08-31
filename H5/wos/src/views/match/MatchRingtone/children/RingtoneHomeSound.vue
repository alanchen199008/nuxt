<template>
  <div flex="dir:top">
    <van-nav-bar title="主队进球声音" left-text="" left-arrow @click-left="onClickLeft" />
    <van-radio-group v-model="radio">
      <van-cell-group>
        <van-cell v-for="item in SoundList" :key="item.value" :title="item.name">
          <template #right-icon>
            <van-radio :name="item.value" :checked-color="checkedColor" @click="handleSelect" />
          </template>
        </van-cell>
      </van-cell-group>
      <audio ref="audio" muted hidden="true" controls preload :src="require(`@/assets/audio/${radio}.mp3`)" />
    </van-radio-group>
    <div class="action-button">
      <van-button type="primary" block @click="handleUpdate">{{ $t('confirm') }}</van-button>
    </div>
  </div>
</template>

<script>
import { updateMatchRingtoneWithFootball } from '@/api/match'
import { mapGetters } from 'vuex'
import variables from '@/styles/variables.scss'
export default {
  name: 'Matchsort',
  data() {
    return {
      radio: 0,
      SoundList: [
        { name: '默认', value: 0 },
        { name: '哨子', value: 1 },
        { name: '鼓声', value: 2 },
        { name: '广播', value: 3 },
        { name: '号角', value: 4 },
        { name: '胜利', value: 5 }
      ],
      data: { }
    }
  },
  computed: {
    ...mapGetters(['memberId']),
    checkedColor() {
      return variables.theme
    },
    prompt: {
      get() {
        return this.$store.getters.prompt
      },
      set(value) {
        this.$store.dispatch('app/setPrompt', value)
      }
    }
  },

  created() {
    const { value } = this.$route.params
    if (value) {
      this.radio = value
    }
  },
  methods: {
    onClickLeft() {
      this.$router.push({ name: 'MatchRingtone' })
    },
    handleSelect() {
      this.$refs.audio.play()
    },
    handleUpdate() {
      if (this.memberId) {
        updateMatchRingtoneWithFootball({ homeGoalSound: this.radio })
          .then(([_, error]) => {
            if (!error) {
              this.$toast('修改主队提示音成功！')
              setTimeout(() => {
                this.$router.push({ name: 'MatchRingtone' })
              }, 1000)
            }
          })
      }
      this.prompt.homeGoalSound = this.radio
      // this.$toast('修改主队提示音成功！')
      // setTimeout(() => {
      //   this.$router.push({ name: 'MatchRingtone' })
      // }, 1000)
    }
  }
}
</script>

