<template>
  <transition
    name="van-slide-up"
    @after-enter="afterEnter"
    @after-leave="afterLeave"
  >
    <div v-show="visible" class="auth-warpper">
      <button class="auth-close" @click="close">&times;</button>
      <img src="@/assets/login/service.png" class="auth-sercice" @click="goService">
      <input id="captcha" type="text" hidden class="result__captcha">
      <component
        :is="type"
        ref="anthContainer"
        class="anth-container"
      />
    </div>
  </transition>

</template>
<script>
import initNECaptchaFn from '@/mixins/initNECaptchaFn'
import Login from './Login'
import Register from './Register'
export default {
  name: 'LoginControl',
  components: { Login, Register },
  mixins: [initNECaptchaFn()],
  data() {
    return {
      type: 'login',
      visible: false
    }
  },
  methods: {
    open(type = 'login') {
      this.type = type
      this.visible = true
    },
    close() {
      this.visible = false
    },
    changeType(type) {
      this.type = type
    },
    afterEnter() {
      this.$refs.anthContainer.afterEnter && this.$refs.anthContainer.afterEnter()
    },
    afterLeave() {
      this.$refs.anthContainer.afterLeave && this.$refs.anthContainer.afterLeave()
    },
    onVerifyChange(captcha) {
      this.$refs.anthContainer.onVerifyChange(captcha)
    },
    goService() {
      this.close()
      this.$router.push({ name: 'AccountFeedback', params: { locael: this.$i18n.locael }})
    }
  }
}
</script>
<style lang="scss">
.auth-warpper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 80;
  overflow: scroll;
  background: url('../../assets/login/bg.png') top center no-repeat;
  background-size: cover;
  font-size: 14px;
  text-align: center;
  color: #fff;
}

.auth-close {
  width: 48px;
  line-height: 48px;
  position: absolute;
  font-size: 32px;
  z-index: 1;
  background: none;
  color: #fff;
  top: 15px;
  left: 15px;
}

.auth-sercice {
  width: 21px;
  height: 40px;
  position: absolute;
  z-index: 1;
  top: 20px;
  right: 20px;
}

.anth-container {
  padding: 0 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  transform: translate(-50%, -50%);
  h2 {
    font-size: 19px;
    color: #fff;
    letter-spacing: 4px;
  }

  &__left {
    background-color: rgba(204, 204, 204, 0.4);
    border-radius: 9px 0 0 9px;
    padding: 0 20px;
    ::v-deep .van-field {
      background-color: rgba(0, 0, 0, 0.4);
    }
  }
  &__right {
    width: 50px;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 0 9px 9px 0;
    img {
      width: 20px;
      height: 20px;
    }
    .text {
      margin-top: 5px;
      width: 20px;
      font-size: 15px;
      line-height: 24px;
    }
  }

  .van-field {
    padding: 12.5px 15px;
    border-radius: 25px;
    background-color: rgba(0, 0, 0, 0.4);
    & + .van-field {
      margin-top: 10px;
    }

    &__left-icon {
      margin-top: 2px;
      margin-right: 10px;
      width: 20px;
      height: 20px;
      img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }

    &__control {
      color: #fff;
      &::placeholder {
        color: rgba(255, 255, 255, 0.6);
      }
    }
  }

  .van-button {
    font-size: 20px;
    height: 45px;
    border-radius: 28px;
    margin-top: 10px;
  }

  &.register-container {
    .van-field {
      & + .van-field {
        margin-top: 10px;
      }
    }
  }
}
</style>
