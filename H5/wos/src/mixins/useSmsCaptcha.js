export default {
  data() {
    return {
      loading: false,
      disabled: false,
      timer: null,
      txt: '获取验证码'
    }
  },
  methods: {
    conut(t) {
      this.timer = setInterval(() => {
        t--
        if (t) {
          this.txt = t + '秒后重新获取'
        } else {
          clearInterval(this.timer)
          this.timer = null
          this.txt = '获取验证码'
          this.disabled = false
        }
      }, 1000)
    }
  }
}
