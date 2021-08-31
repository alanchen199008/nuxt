export default {
  install(Vue) {
    const bus = new Vue({})
    if (!Vue.$vant) {
      Vue.$vux = {
        bus
      }
    } else {
      Vue.$vant.bus = bus
    }

    Vue.mixin({
      created: function() {
        if (this.$vant) {
          this.$vux.bus = bus
        } else {
          this.$vant = {
            bus
          }
        }
      }
    })
  }
}
