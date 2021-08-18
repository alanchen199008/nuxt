import Vue from 'vue'
// import { vueBaberrage } from 'vue-baberrage'
// Vue.use(vueBaberrage)

if (process.browser) {
  const vueBaberrage = require('vue-baberrage').vueBaberrage
  Vue.use(vueBaberrage)
}