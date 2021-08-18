// import Vue from 'vue'
// import VueVideoPlayer from 'vue-video-player'

// // require videojs style
// import 'video.js/dist/video-js.css'
// // import 'vue-video-player/src/custom-theme.css'

// Vue.use(VueVideoPlayer, /* {
//   options: global default options,
//   events: global videojs events
// } */)


// import VideoPlayer from 'vue-video-player'
// require('video.js/dist/video-js.css')
// require('vue-video-player/src/custom-theme.css')
// Vue.use(VideoPlayer)

import Vue from 'vue'
// require('vue-video-player/node_modules/video.js/dist/video-js.css')
if (process.browser) {
  const VueVideoPlayer = require('vue-video-player/dist/ssr')
  Vue.use(VueVideoPlayer)
}