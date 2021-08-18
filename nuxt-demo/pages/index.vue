<template>
  <div>
    <div class="barrages">
      <div class="video-player-box" 
          @play="onPlayerPlay($event)"
          @pause="onPlayerPause($event)"
          @ready="playerReadied"
          @statechanged="playerStateChanged($event)"
          v-video-player:myVideoPlayer="playerOptions">
      </div>
      <!-- <no-ssr> -->
      <vue-baberrage 
        ref="baberrage"
        :isShow="barrageIsShow"
        :barrageList="barrageList"
        :maxWordCount="maxWordCount"
        :throttleGap="throttleGap"
        :loop="barrageLoop"
        :boxHeight="boxHeight"
        :messageHeight="messageHeight"
        :lanesCount="lanesCount"
        >
        <!-- <template v-slot:default="slotProps">
          <span style="color: #000">
          {{slotProps.item.data.userName}}: {{slotProps.item.msg}}
          </span>
        </template> -->
        <!-- <template v-slot:default="slotProps">
          <img style="width:20px;height:20px;" :src="slotProps.item.avatar"/>
          {{slotProps.item.data.userName}}: {{slotProps.item.msg}}
        </template> -->
      </vue-baberrage>
      <!-- </no-ssr> -->
    </div>
    <van-button @click="pauseBaberrage">暂停弹幕</van-button>
    <van-button @click="playBaberrage">开始弹幕</van-button>

  </div>
</template>

<script>
  export default {
    layout: 'navlayout',
    components: {

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
        msg: '马优晨就是个辣鸡~',
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
      // console.log('this is current player instance object', this.player)
      this.addToList();
      this.changeHeight(40)
      console.log(this.$refs.baberrage)
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
        // console.log('the player is readied', player)
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
              "data:image/png;base64,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",
            msg: this.msg,
            time: Math.random() * 9 + 3,
            data: {
              userName: 'lilimore'
            },
            barrageStyle: "red",
          },
          {
            id: 2,
            avatar: "data:image/png;base64,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",
            msg: this.msg,
            data: {
              userName: 'alan'
            },
            time: 5,
            // type: MESSAGE_TYPE.NORMAL,
            extraWidth: 60
          }
        ];
        this.barrageList=list
        // list.forEach((v) => {
        //   this.barrageList.push({
        //     id: v.id,
        //     avatar: v.avatar,
        //     msg: v.msg,
        //     time: v.time,
        //     // type: MESSAGE_TYPE.NORMAL,
        //     barrageStyle: v.barrageStyle,
        //   });
        // });
      },
      // 暂停弹幕
      pauseBaberrage () {
        this.$refs.baberrage.pause()
      },
      playBaberrage () {
        this.$refs.baberrage.play()
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
  z-index: 88;
}


.baberrage-stage{
  top:0;
  /* z-index: 50; */
}

.barrages{
  position: relative;
  margin-top: 50px;
}
.video-player-box{
  position: relative;
    /* z-index: 70; */
}
</style>

