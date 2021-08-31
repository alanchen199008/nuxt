<template>
  <div class="vue-player">
    <div id="player" ref="player" />
    <!-- <span ref="play" class="play-button" @click="handlePlay" />
    <span ref="pause" class="pause-button" @click="handlePause" /> -->
    <span ref="close" class="close-button" @click="handleCLose">&times;</span>
    <!-- <video
      ref="video"
      preload="auto"
      class="video-js vjs-default-skin"
      webkit-playsinline="true"
      playsinline="true"
      style="width: 100%; height: 100%; object-fit: fill"
      @click="handleClick"
    >
      <source :src="url" type="application/x-mpegURL">
    </video> -->
  </div>
</template>

<script>
// import videojs from 'video.js'
// import 'videojs-contrib-hls'
import 'xgplayer'
import Player from 'xgplayer-hls.js'
export default {
  name: 'VuePlayer',
  props: {
    url: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      player: null,
      pause: false,
      play: false
    }
  },
  mounted() {
    // https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8
    // http://cctvalih5ca.v.myalicdn.com/live/cctv1_2/index.m3u8
    this.init(this.url)
  },
  methods: {
    init(url) {
      this.player = new Player({
        id: 'player',
        url: url || '',
        playsinline: true,
        whitelist: [''],
        autoplay: false,
        fluid: true
      })
      // this.player = videojs(this.$refs.video, {
      //   bigPlayButton: true,
      //   textTrackDisplay: false,
      //   posterImage: false,
      //   errorDisplay: false,
      //   controls: true,
      //   language: 'zh-CN',
      //   autoplay: true,
      //   hls: { withCredentials: true }
      // })
      // this.player.on('play', () => {
      //   this.$refs.close.classList.add('hide')
      //   // this.$refs.pause.classList.add('hide')
      //   // this.$refs.play.classList.add('hide')
      // })
      // this.player.on('pause', () => {
      //   this.$refs.close.classList.remove('hide')
      //   // this.$refs.play.classList.remove('hide')
      // })
    },
    handlePlay() {
      this.player.play()
    },
    handlePause() {
      this.player.pause()
    },
    handleCLose() {
      this.player.pause()
      this.$emit('close', false)
    },
    handleClick() {
      if (this.play) {
        this.play = false
        this.pause = true
        this.player.pause()
      } else {
        this.pause = false
        this.play = true
        this.player.play()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#player{
  position: absolute;
  z-index: 88;
}
.vue-player {
  width: 100%;
  height: 205px;
  // height: 161px;
  position: relative;
  .close-button {
    position: absolute;
    color: #fff;
    z-index: 1000;
    // left: 14px;
    right: 18px;
    top: -24px;
    font-size: 18px;
    opacity: 1;
    transition: 0.1s linear;
    &.hide {
      opacity: 0;
      transition: 0.1s linear;
    }
  }
  .play-button {
    width: 48px;
    line-height: 48px;
    position: absolute;
    border-radius: 32px;
    display: inline-block;
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    margin: 0 auto;
    margin-top: -14px;
    z-index: 1000;
    background: rgba(255, 255, 255, 0.3);
    border: 1px solid #fff;
    text-align: center;
    &::before {
      margin-top: -24px;
      margin-left: 4px;
      height: 12px;
      border-style: solid;
      border-width: 12px 0 12px 24px;
      border-color: transparent transparent transparent #fff;
      content: "";
      display: inline-block;
    }
    &.hide{
      display: none;
    }
  }
  .pause-button {
    width: 48px;
    line-height: 48px;
    position: absolute;
    border-radius: 32px;
    display: inline-block;
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    margin: 0 auto;
    margin-top: -14px;
    z-index: 1000;
    background: rgba(255, 255, 255, 0.3);
    border: 1px solid #fff;
    text-align: center;
    opacity: 0;
    &::before {
      width: 6px;
      height: 24px;
      content: "";
      background: #fff;
      display: inline-block;
      margin-right: 3px;
      border-radius: 3px;
    }
    &::after {
      width: 6px;
      height: 24px;
      content: "";
      background: #fff;
      display: inline-block;
      margin-left: 3px;
      border-radius: 3px;
    }
  }
  &:hover{
    .pause-button{
      opacity: 1;
    }
  }
}
</style>

<style lang="scss">
.video-js.vjs-playing .vjs-tech {
  pointer-events: auto !important;
}
</style>
