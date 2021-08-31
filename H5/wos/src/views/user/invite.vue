<template>
  <div class="invite">
    <van-nav-bar left-arrow title="邀请好友" @click-left="goBack" />
    <div class="content">
      <div class="main">
        <div class="top" flex="cross:center box:mean">
          <div class="top-left">
            <span v-if="inviteList.length > 0" class="stats">
              <van-swipe vertical :show-indicators="false" autoplay="3000" style="height:28px">
                <van-swipe-item v-for="(item,index) in inviteList" :key="index">
                  <span class="avatar"><img :src="item.avatar ? item.avatar : require('@/assets/default.png')" alt=""></span>
                  <font color="#7A82F3">{{ item.nickname }} </font>获得<font color="#FF0000">{{ item.invitionAmount }}</font>个球币
                </van-swipe-item>
              </van-swipe>
            </span>
          </div>
          <div class="top-right">
            <span class="rule" @click="isRule = true">活动规则</span>
          </div>
        </div>
        <div class="rea-packet">
          <div class="num">{{ inviteInfo.inviter }}</div>
          <div class="icon">
            <img-icon icon-name="gold" size="small" /> 球币
          </div>
          <div class="txt">邀请好友，快速领取</div>
          <div class="invite-code" flex="cross:center box:last">
            <div class="text">
              邀请码: <span id="code">{{ info.promotionCode }}</span>
            </div>
            <div class="button">
              <button ref="copy" data-clipboard-target="#code">复制</button>
            </div>
          </div>
        </div>
        <div class="help">
          <div class="title">如何获得红包?</div>
          <div class="process" flex="box:mean">
            <div class="process-item">
              <s class="circle">
                <img-icon icon-name="process-1" size="small" />
              </s>
              <div>分享<br>给好友</div>
            </div>
            <div class="step">
              <i><img-icon icon-name="process-step" size="mini" /></i>
            </div>
            <div class="process-item">
              <s class="circle">
                <img-icon icon-name="process-2" size="small" />
              </s>
              <div>好友<br>下载APP</div>
            </div>
            <div class="step">
              <i><img-icon icon-name="process-step" size="mini" /></i>
            </div>
            <div class="process-item">
              <s class="circle">
                <img-icon
                  icon-name="process-3"
                  size="small"
                /></s>
              <div>好友填写<br>邀请码并注册</div>
            </div>
          </div>
          <div class="button">
            <button @click="handleShare">立即邀请</button>
          </div>
        </div>
        <div class="tip">本活动规则最终解释权归世界波所有</div>
      </div>
    </div>
    <van-popup v-model="isShare" position="bottom">
      <div class="share" flex="box:mean">
        <div>
          <button ref="qq" data-clipboard-target="#shareURL" class="qq" />
          <div id="qq" class="url">{{ shareURL }}</div>
          <div>分享到QQ</div>
        </div>
        <div>
          <button ref="wechat" data-clipboard-target="#shareURL" class="wechat" />
          <div id="wechat" class="url">{{ shareURL }}</div>
          <div>分享到微信</div>
        </div>
        <div>
          <button ref="fc" data-clipboard-target="#shareURL" class="fc" />
          <div id="fc" class="url">{{ shareURL }}</div>
          <div>分享到朋友圈</div>
        </div>
      </div>
      <button class="close-button" @click="isShare = false">取消</button>
    </van-popup>
    <van-popup v-model="isRule" position="bottom">
      <div class="rules">
        <h1>活动规则</h1>
        <h2>1.如何才算邀请成功？</h2>
        <p>
          活动期间，好友下载APP，填写您的邀请码并完成注册，即可邀请
          成功！（注册成功但未填写邀请码，视为邀请失效
        </p>
        <h2>2.邀请奖励会如何发放？</h2>
        <p>
          活动期间，每成功邀请1位好友，您都将获得总价值10元的球币，多邀多得，上不封顶（球币将实时发放至个人账号）
        </p>
        <h2>3.温馨提示</h2>
        <p>
          若出现不正当手段获取奖励，经核实后，我方有权取消该用户参与
          本次活动的资格，并将其账号进行封禁；同时有权收回活动中已发
          放的奖励，拒绝赋予其今后参加本公司任何活动的权利，并追求相关法律责任。
        </p>
        <p>PS：本邀请活动规则最终解释权归世界波运营团队所有</p>
      </div>
      <button class="close-button" @click="isRule = false">关闭</button>
    </van-popup>
    <div id="shareURL">{{ shareURL }}</div>
  </div>
</template>

<script>
import ClipBoard from 'clipboard'
import { mapGetters } from 'vuex'
import { getInvitationInfo, getInvitationRewardList, getWosVersion } from '@/api/user'
export default {
  data() {
    return {
      inviteCode: null,
      isShare: false,
      isRule: false,
      shareURL: '',
      inviteInfo: {
        inviteCode: null,
        inviter: 0,
        invitee: 0
      },
      inviteList: [],
      downloadURL: ''
    }
  },
  computed: {
    ...mapGetters(['info'])
  },
  created() {
    const { inviteCode } = this.$route.query
    if (inviteCode) {
      this.getApp()
      this.inviteInfo.inviteCode = this.inviteCode = inviteCode
      this.$nextTick(() => {
        const copydown = new ClipBoard(this.$refs.copydown)
        copydown.on('success', e => {
          e.clearSelection()
          this.$toast('复制成功!')
          setTimeout(() => {
            window.location.href = this.downloadURL
          }, 3000)
        })
        copydown.on('error', e => {
          this.$toast('复制失败,请重试!')
        })
      })
    }
    this.getData()
  },
  methods: {
    async getData() {
      const [data, error] = await getInvitationInfo()
      if (!error) {
        this.inviteInfo.avatar = this.info.avatar
        this.inviteInfo.inviteCode = this.info.promotionCode
        this.inviteInfo.nickname = this.info.nickname
        this.inviteInfo.inviter = data.inviter
        this.inviteInfo.invitee = data.invitee
        this.shareURL = 'https://down.wosprdapp.net/?channelCode=rdc&inviteCode=' + this.inviteInfo.inviteCode
      }
      const [items, err] = await getInvitationRewardList({ type: 1, pageSize: 50 })
      if (!err) {
        this.inviteList = items
      }
      this.initClipBoard()
    },
    getApp() {
      getWosVersion()
        .then(([data, error]) => {
          if (!error) {
            let u = navigator.userAgent
            let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 // 判断是否是 android终端
            let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
            if (isAndroid) {
              this.downloadURL = data.androidUrl
            }
            if (isIOS) {
              this.downloadURL = data.iosUrl
            }
          }
        })
    },
    initClipBoard() {
      const copy = new ClipBoard(this.$refs.copy)
      copy.on('success', e => {
        this.$toast('复制邀请码成功')
        e.clearSelection()
      })
      copy.on('error', e => {
        this.$toast('复制邀请码失败,请重试!')
      })
    },
    handleShare() {
      this.isShare = true
      this.$nextTick(() => {
        const qq = new ClipBoard(this.$refs.qq)
        qq.on('success', e => {
          this.isShare = false
          this.$toast('复制分享链接成功')
          setTimeout(() => {
            window.location.href = 'mqq://'
          }, 3000)
        })
        qq.on('error', e => {
          return this.$toast('1暂不支持分享,敬请期待~')
        })

        const wechat = new ClipBoard(this.$refs.wechat)
        wechat.on('success', e => {
          return this.$toast('暂不支持分享,敬请期待~')
          // this.isShare = false
          // window.location.href = 'weixin://'
        })
        wechat.on('error', e => {
          return this.$toast('暂不支持分享,敬请期待~')
        })

        const fc = new ClipBoard(this.$refs.fc)
        fc.on('success', e => {
          return this.$toast('暂不支持分享,敬请期待~')
          // this.isShare = false
          // window.location.href = 'weixin://dl/moments'
        })
        fc.on('error', e => {
          return this.$toast('暂不支持分享,敬请期待~')
        })
      })
    },
    handleDownload() {
      // const copy = new ClipBoard(this.$refs.copydown)
    },
    goBack() {
      this.$router.back(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.invite {
  width: 100%;
  height: 100%;
  #shareURL{
    position: absolute;
    z-index: -1;
  }
  .content {
    height: calc(100% - 44px);
    overflow-x: hidden;
    overflow-y: auto;
    background: #e6e8f7;
    .main {
      width: 100%;
      height: 100%;
      background: url("~@/assets/invite/invite-bg.png") no-repeat top center;
      background-size: contain;
      .top {
        line-height: 28px;
        &-left {
          .stats {
            width: 180px;
            border-top-right-radius: 14px;
            border-bottom-right-radius: 14px;
            display: inline-block;
            font-size: 12px;
            background: #fff;
            ::v-deep .van-swipe-item{
              padding: 0 10px;
            }
            .avatar {
              width: 22px;
              height: 22px;
              margin-right: 4px;
              border-radius: 11px;
              overflow: hidden;
              display: inline-block;
              vertical-align: middle;
              margin-top: -2px ;
              img {
                width: 100%;
                height: 100%;
                object-fit: cover;
              }
            }
          }
        }
        &-right {
          text-align: right;
          .rule {
            width: 72px;
            background: linear-gradient(0deg, #fd303b 0%, #ff7484 98%);
            border-top-left-radius: 14px;
            border-bottom-left-radius: 14px;
            display: inline-block;
            font-size: 12px;
            text-align: center;
            color: #fff;
          }
        }
      }
      .rea-packet {
        width: 100%;
        height: 300px;
        margin-top: 123px;
        background: url("~@/assets/invite/red-packet.png") no-repeat top center;
        background-size: contain;
        text-align: center;
        font-size: 16px;
        color: #660f12;
        padding: 30px 0;
        .num {
          @include DIN-FONT(36px, #ff2236);
        }
        .icon {
          margin: 15px auto;
          .img-icon {
            margin-top: -4px;
          }
        }
        .txt {
          line-height: 68px;
        }
        .invite-code {
          width: 295px;
          margin: 0 auto;
          background: #fff;
          line-height: 48px;
          border-radius: 24px;
          overflow: hidden;
          .text {
            text-align: left;
            padding: 0 16px;
          }
          .button {
            width: 80px;
            button {
              line-height: 40px;
              background: linear-gradient(0deg, #626def 0%, #9aa1f9 100%);
              box-shadow: 0px 4px 0px 0px #262c71;
              font-size: 18px;
              color: #fff;
              padding: 0 18px;
              border-radius: 20px;
            }
          }
        }
      }
      .help {
        width: 325px;
        margin: 30px auto;
        border-radius: 6px;
        background: #fff;
        font-size: 16px;
        padding: 10px;
        .title {
          color: #3c1a50;
          text-align: center;
          line-height: 36px;
        }
        .process {
          font-size: 14px;
          color: #666;
          text-align: center;
          margin: 15px auto;
          .step {
            width: 32px;
            i {
              height: 50px;
              line-height: 50px;
            }
          }
          &-item {
            width: 110px;
            s {
              width: 50px;
              height: 50px;
              text-align: center;
              line-height: 50px;
              border-radius: 25px;
              display: inline-block;
              &.circle {
                background: #f6f7fc;
              }
            }
          }
        }
        .button {
          text-align: center;
          margin: 15px auto;
          button {
            width: 295px;
            line-height: 40px;
            border-radius: 20px;
            background: linear-gradient(90deg, #ff993f 0%, #fd484b 100%);
            box-shadow: 0px 10px 15px 0px rgba(253, 103, 70, 0.3);
            color: #fff;
          }
        }
      }
      .issue {
        width: 325px;
        margin: 0 auto;
        border-radius: 6px;
        background: #fff;
        font-size: 14px;
        padding: 10px;
        color: #666;
        .title {
          color: #3c1a50;
          text-align: center;
          line-height: 36px;
        }
        &-list {
          &-item {
            .img-icon {
              width: 40px;
              height: 40px;
              margin-right: 10px;
            }
            line-height: 40px;
            background: #f6f7fc;
            border-radius: 20px;
            margin-bottom: 10px;
          }
        }
      }
      .tip {
        text-align: center;
        color: #a1a4bf;
        font-size: 13px;
        line-height: 50px;
      }
    }
  }
  .rules {
    margin: 0 25px 0 25px;
    h1 {
      font-size: 16px;
      text-align: center;
      color: #333;
      line-height: 32px;
      margin-top: 10px;
    }
    h2 {
      font-size: 13px;
      color: #666;
      font-weight: 600;
      margin-top: 15px;
    }
    p {
      color: #666;
      font-size: 13px;
      text-align: justify;
      margin-bottom: 15px;
    }
  }
  .share {
    text-align: center;
    font-size: 13px;
    color: #666;
    button {
      width: 50px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      display: inline-block;
      border-radius: 25px;
      margin-top: 25px;
      margin-bottom: 12px;
      &.qq{
        background:#f5f5f5 url('~@/assets/invite/share-1.png') no-repeat center;
        background-size: 24px auto;
      }
       &.wechat{
        background:#f5f5f5 url('~@/assets/invite/share-2.png') no-repeat center;
        background-size: 24px auto;
      }
       &.fc{
        background:#f5f5f5 url('~@/assets/invite/share-3.png') no-repeat center;
        background-size: 24px auto;
      }
    }
    .url{
      display: none;
    }
  }
  .close-button {
    width: 100%;
    line-height: 48px;
    background: #fff;
    color: #333;
    font-size: 18px;
    border-top: 1px solid #e8e8e8;
  }
}
</style>
