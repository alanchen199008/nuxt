<template>
  <div class="release-container">
    <component :is="active" />
  </div>
</template>

<script>

import { Setting, Match, Rules, Push } from './steps'

// const STEPS = ['Setting', 'Match', 'Rules', 'Push']
const STEPS = ['Setting', 'Rules', 'Push']
let params=null
export default {
  components: { Setting, Match, Rules, Push },
  data() {
    return {
      origin: 0,
      step: 0,
      params: {
        ballType: 1,
        type: 2
      },
      from: ''
    }
  },

  computed: {
    active() {
      return STEPS[this.step]
    },
    // params() {
      
    // }
  },

  watch: {
    step(value) {
      console.log(value)
      this.$router.push({ name: 'ExpertRelease', params: { step: value, from: this.from }}).catch(() => {})
    }
  },

  created() {
    const { step, from } = this.$route.params
    this.step = step || 0
    this.origin = sessionStorage.getItem('isFirstSend') ? 1 : 0
    this.from = from || ''
    let releaseStepParm = sessionStorage.getItem('releaseStepParm')
    if(releaseStepParm && releaseStepParm != 'undefined') {
      this.params = JSON.parse(releaseStepParm)
    }
  },
  mounted() {
    params=this.params
    window.onbeforeunload = function (e) {
      sessionStorage.setItem('releaseStepParm',JSON.stringify(params))
    };
    
  },
  methods: {
    prev() {
      if (this.step === 0 || (Number(this.step) === 1 && this.origin === 1)) {
        this.params = {}
        this.$router.replace({ name: this.from })
      } else {
        this.step = Number(this.step) - 1
      }
    },
    next() {
      this.step = Number(this.step) + 1
    },
    _handleSetMatch(match) {
      this.params.match = match
    },
    _handleSetArticle(article) {
      this.params.article = article
    }
  },
  beforeDestroy() {
  },
}
</script>
