<template>
<div>
  <div class="video-player-box" 
       @play="onPlayerPlay($event)"
       @pause="onPlayerPause($event)"
       @ready="playerReadied"
       @statechanged="playerStateChanged($event)"
       v-video-player:myVideoPlayer="playerOptions">
  </div>

  <div class="barrages>
    <vue-baberrage
      :isShow="barrageIsShow"
      :barrageList="barrageList"
      :maxWordCount="maxWordCount"
      :throttleGap="throttleGap"
      :loop="barrageLoop"
      :boxHeight="boxHeight"
      :messageHeight="messageHeight"
      :lanesCount="lanesCount"
    >
    </vue-baberrage>
  </div>
</div>
</template>

<script>
  import Vue from "vue";
  import { vueBaberrage, MESSAGE_TYPE } from "vue-baberrage";

  Vue.use(vueBaberrage);
// import 'video.js/dist/video-js.css'

// import { videoPlayer } from 'vue-video-player'

  // Similarly, you can also introduce the plugin resource pack you want to use within the component
  // import 'some-videojs-plugin'
  export default {
    layout: 'navlayout',
    components: {
      // videoPlayer
      vueBaberrage
    },
    data() {
      return {
        playerOptions : {
            playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
            autoplay: false, //如果true,浏览器准备好时开始回放。
            muted: false, // 默认情况下将会消除任何音频。
            loop: false, // 导致视频一结束就重新开始。
            preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
            language: 'zh-CN',
            aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
            fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
            sources: [{
              type: "",//这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
              src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm" //url地址
            }],
            poster: "https://alifei05.cfp.cn/creative/vcg/veer/1600water/veer-311488864.jpg", //你的封面地址
            // width: document.documentElement.clientWidth, //播放器宽度
            notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
            controlBar: {
              timeDivider: true,
              durationDisplay: true,
              remainingTimeDisplay: false,
              fullscreenToggle: true  //全屏按钮
            }
        },
        msg: "就是个辣鸡~就是个辣鸡~就是个辣鸡~",
        barrageIsShow: true, // 消息框全顯示的高度
        messageHeight: 30,
        boxHeight: 412,
        barrageLoop: true,
        maxWordCount: 120,
        throttleGap: 5000,
        barrageList: [],
        lanesCount: 4,
      }
    },
    mounted() {
      console.log('this is current player instance object', this.player)
      this.addToList();
    },
    computed: {
      // player() {
      //   return this.$refs.videoPlayer.player
      // }
    },
    methods: {
      // listen event
      onPlayerPlay(player) {
        // console.log('player play!', player)
      },
      onPlayerPause(player) {
        // console.log('player pause!', player)
      },
      // ...player event

      // or listen state event
      playerStateChanged(playerCurrentState) {
        // console.log('player current update state', playerCurrentState)
      },

      // player is ready
      playerReadied(player) {
        console.log('the player is readied', player)
        // you can use it to do something...
        // player.[methods]
      },

      removeList () {
        this.barrageList = []
      },

      addToList() {
        let list = [
          {
            id: 1,
            avatar:
              "https://www.google.com/search?q=%E5%9B%BE%E7%89%87&tbm=isch&source=iu&ictx=1&fir=2tLMTBYQMTAwvM%252C52L9RPt5gLBg7M%252C_&vet=1&usg=AI4_-kSRdi-c9NVz2JgdG-Hhq6c0eYOSNg&sa=X&ved=2ahUKEwjrhrz1097tAhXDgtgFHY_RBkEQ9QF6BAgGEAE#imgrc=2tLMTBYQMTAwvM",
            msg: this.msg,
            time: Math.random() * 9 + 3,
            barrageStyle: "red",
          },
          {
            id: 2,
            avatar:
              "https://www.google.com/search?q=%E5%9B%BE%E7%89%87&tbm=isch&source=iu&ictx=1&fir=2tLMTBYQMTAwvM%252C52L9RPt5gLBg7M%252C_&vet=1&usg=AI4_-kSRdi-c9NVz2JgdG-Hhq6c0eYOSNg&sa=X&ved=2ahUKEwjrhrz1097tAhXDgtgFHY_RBkEQ9QF6BAgGEAE#imgrc=2tLMTBYQMTAwvM",
            msg: this.msg,
            time: Math.random() * 9 + 5,
            barrageStyle: "green",
          },
          {
            id: 3,
            avatar:
              "https://www.google.com/search?q=%E5%9B%BE%E7%89%87&tbm=isch&source=iu&ictx=1&fir=2tLMTBYQMTAwvM%252C52L9RPt5gLBg7M%252C_&vet=1&usg=AI4_-kSRdi-c9NVz2JgdG-Hhq6c0eYOSNg&sa=X&ved=2ahUKEwjrhrz1097tAhXDgtgFHY_RBkEQ9QF6BAgGEAE#imgrc=2tLMTBYQMTAwvM",
            msg: this.msg,
            time: Math.random() * 9 + 3,
            barrageStyle: "normal",
          },
          {
            id: 4,
            avatar:
              "https://www.google.com/search?q=%E5%9B%BE%E7%89%87&tbm=isch&source=iu&ictx=1&fir=2tLMTBYQMTAwvM%252C52L9RPt5gLBg7M%252C_&vet=1&usg=AI4_-kSRdi-c9NVz2JgdG-Hhq6c0eYOSNg&sa=X&ved=2ahUKEwjrhrz1097tAhXDgtgFHY_RBkEQ9QF6BAgGEAE#imgrc=2tLMTBYQMTAwvM",
            msg: this.msg,
            time: Math.random() * 9 + 5,
            barrageStyle: "blue",
          },
          {
            id: 5,
            avatar:
              "https://www.google.com/search?q=%E5%9B%BE%E7%89%87&tbm=isch&source=iu&ictx=1&fir=2tLMTBYQMTAwvM%252C52L9RPt5gLBg7M%252C_&vet=1&usg=AI4_-kSRdi-c9NVz2JgdG-Hhq6c0eYOSNg&sa=X&ved=2ahUKEwjrhrz1097tAhXDgtgFHY_RBkEQ9QF6BAgGEAE#imgrc=2tLMTBYQMTAwvM",
            msg: this.msg,
            time: Math.random() * 9 + 3,
            barrageStyle: "red",
          },
          {
            id: 6,
            avatar:
              "https://www.google.com/search?q=%E5%9B%BE%E7%89%87&tbm=isch&source=iu&ictx=1&fir=2tLMTBYQMTAwvM%252C52L9RPt5gLBg7M%252C_&vet=1&usg=AI4_-kSRdi-c9NVz2JgdG-Hhq6c0eYOSNg&sa=X&ved=2ahUKEwjrhrz1097tAhXDgtgFHY_RBkEQ9QF6BAgGEAE#imgrc=2tLMTBYQMTAwvM",
            msg: this.msg,
            time: Math.random() * 9 + 5,
            barrageStyle: "normal",
          },
          {
            id: 7,
            avatar:
              "https://www.google.com/search?q=%E5%9B%BE%E7%89%87&tbm=isch&source=iu&ictx=1&fir=2tLMTBYQMTAwvM%252C52L9RPt5gLBg7M%252C_&vet=1&usg=AI4_-kSRdi-c9NVz2JgdG-Hhq6c0eYOSNg&sa=X&ved=2ahUKEwjrhrz1097tAhXDgtgFHY_RBkEQ9QF6BAgGEAE#imgrc=2tLMTBYQMTAwvM",
            msg: this.msg,
            time: Math.random() * 9 + 5,
            barrageStyle: "red",
          },
          {
            id: 8,
            avatar:
              "https://www.google.com/search?q=%E5%9B%BE%E7%89%87&tbm=isch&source=iu&ictx=1&fir=2tLMTBYQMTAwvM%252C52L9RPt5gLBg7M%252C_&vet=1&usg=AI4_-kSRdi-c9NVz2JgdG-Hhq6c0eYOSNg&sa=X&ved=2ahUKEwjrhrz1097tAhXDgtgFHY_RBkEQ9QF6BAgGEAE#imgrc=2tLMTBYQMTAwvM",
            msg: this.msg,
            time: Math.random() * 9 + 5,
            barrageStyle: "normal",
          },
          {
            id: 9,
            avatar:
              "https://www.google.com/search?q=%E5%9B%BE%E7%89%87&tbm=isch&source=iu&ictx=1&fir=2tLMTBYQMTAwvM%252C52L9RPt5gLBg7M%252C_&vet=1&usg=AI4_-kSRdi-c9NVz2JgdG-Hhq6c0eYOSNg&sa=X&ved=2ahUKEwjrhrz1097tAhXDgtgFHY_RBkEQ9QF6BAgGEAE#imgrc=2tLMTBYQMTAwvM",
            msg: this.msg,
            time: Math.random() * 9 + 5,
            barrageStyle: "red",
          },
          {
            id: 10,
            avatar:
              "https://www.google.com/search?q=%E5%9B%BE%E7%89%87&tbm=isch&source=iu&ictx=1&fir=2tLMTBYQMTAwvM%252C52L9RPt5gLBg7M%252C_&vet=1&usg=AI4_-kSRdi-c9NVz2JgdG-Hhq6c0eYOSNg&sa=X&ved=2ahUKEwjrhrz1097tAhXDgtgFHY_RBkEQ9QF6BAgGEAE#imgrc=2tLMTBYQMTAwvM",
            msg: this.msg,
            time: Math.random() * 9 + 5,
            barrageStyle: "yellow",
          },
        ];
        list.forEach((v) => {
          this.barrageList.push({
            id: v.id,
            avatar: v.avatar,
            msg: v.msg,
            time: v.time,
            type: MESSAGE_TYPE.NORMAL,
            barrageStyle: v.barrageStyle,
          });
        });
      },
      // 暂停弹幕
      pauseBaberrage () {
        this.$refs.baberrage.pause()
      },
      changeHeight (height) {
        this.stageHeight = height
      },
      // 自定义泳道选择函数
      posRender (lanes) {
        // 全部放到第一条泳道
        return 0
      }
      
    }
  }
</script>


<style>
.video-js .vjs-big-play-button{
  top: 50%;
  left: 50%;
  margin-left: -1.5em;
  margin-top: -.8em;
}
    
</style>

