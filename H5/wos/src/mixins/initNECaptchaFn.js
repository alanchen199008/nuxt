import settings from '@/settings'

export default (element = '#captcha') => ({
  data() {
    return {
      instance: null,
      ready: false
    }
  },
  mounted() {
    this.initNECaptchaFn()
  },
  methods: {
    initNECaptchaFn() {
      this.ready = false
      window.initNECaptchaWithFallback({
        element,
        captchaId: settings.captchaId,
        mode: 'bind',
        width: '4rem',
        feedbackEnable: false,
        // enableClose: true,
        onReady: () => {
          this.ready = true
        },
        onVerify: async(err, data) => {
          if (err) return
          this.instance.refresh()
          await this.onVerifyChange(data.validate)
        }
      }, instance => {
        this.instance = instance
      }, err => {
        console.error(err)
      })
    },
    onFailed({ errors }) {
      this.$toast(errors[0].message)
    },
    onVerify() {
      this.instance && this.instance.verify()
    }
  }
})
