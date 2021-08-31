<template>
  <div class="release-container">
    <component :is="active" />
  </div>
</template>

<script>

import { Setting, Match, Rules, Push } from './steps'

const STEPS = ['Setting', 'Match', 'Rules', 'Push']

export default {
  components: { Setting, Match, Rules, Push },
  data() {
    return {
      origin: 0,
      step: 0,
      params: {},
      from: ''
    }
  },

  computed: {
    active() {
      return STEPS[this.step]
    }
  },

  watch: {
    step(value) {
      this.$router.push({ name: 'ExpertRelease', params: { step: value, from: this.from }}).catch(() => {})
    }
  },

  created() {
    const { step, from } = this.$route.params
    this.step = step || 0
    this.origin = step
    this.from = from || ''
  },
  methods: {
    prev() {
      if (this.step === 0 || (this.step === 1 && this.origin === 1)) {
        this.params = {}
        this.$router.replace({ name: this.from })
      } else {
        this.step -= 1
      }
    },
    next() {
      this.step += 1
    },
    _handleSetMatch(match) {
      this.params.match = match
    },
    _handleSetArticle(article) {
      this.params.article = article
    }
  }
}
</script>
