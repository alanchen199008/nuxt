<template>
  <div id="app">
    <router-view />
    <login-control ref="LoginControlDialog" />
  </div>
</template>

<script>
import LoginControl from '@/components/login-control'
export default {
  name: 'App',
  components: { LoginControl },
  mounted() {
    window.__GLOBAL = {
      LoginControlDialog: this.$refs.LoginControlDialog
    }
  }
}
</script>

<style lang="scss">
  #app {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    position: relative;
  }

</style>
