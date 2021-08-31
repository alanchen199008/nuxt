<template>
  <div class="login-container" flex="corss:center">
    <div class="anth-container__left" flex-box="1">
      <h2>登录</h2>
      <van-form
        validate-first
        :show-error-message="false"
        @failed="$parent.onFailed"
        @submit="$parent.onVerify"
      >
        <van-field
          v-model="ruleForm.memberName"
          name="memberName"
          placeholder="6-12位字母或数字的用户名"
          :border="false"
          :rules="[{ validator: validAccountAndPassword, message: '请输入6-12位数字或字母', trigger: 'onBlur' }]"
        >
          <template #left-icon>
            <img src="@/assets/login/user.png">
          </template>
        </van-field>
        <van-field
          v-model="ruleForm.password"
          type="password"
          placeholder="6-12位字母或数字的密码"
          name="password"
          maxlength="12"
          :border="false"
          :rules="[{ validator: validAccountAndPassword, message: '请输入6-12位数字或字母', trigger: 'onBlur' }]"
        >
          <template #left-icon>
            <img src="@/assets/login/pass.png">
          </template>
        </van-field>

        <div class="login-links" flex="main:justify cross:center">
          <van-checkbox v-model="remember">
            记住密码
            <template #icon="props">
              <img class="img-icon" :src="props.checked ? activeIcon : inactiveIcon" width="16">
            </template>
          </van-checkbox>
          <span @click="goForget">忘记密码?</span>
        </div>
        <van-button
          size="large"
          color="linear-gradient(to right, #00d1cb, #00a0e3)"
          block
          native-type="submit"
          :disabled="!$parent.ready"
        >登录</van-button>
      </van-form>
      <div class="login-others">
        <span @click="close">先去逛逛</span>
      </div>
    </div>
    <div
      class="anth-container__right"
      flex="dir:top main:center cross:center"
      @click="goRegister"
    >
      <img src="@/assets/login/register.png">
      <div class="text">注册新用户</div>
    </div>
  </div>
</template>
<script>
import MD5 from 'js-md5'
import Cookies from 'js-cookie'
import { Base64 } from 'js-base64'
import settings from '@/settings'
import { validAccountAndPassword } from '@/utils/validate'
import activeIcon from '@/assets/login/rember_boder.png'
import inactiveIcon from '@/assets/login/rember.png'
export default {
  name: 'Login',
  data() {
    return {
      remember: false,
      activeIcon,
      inactiveIcon,
      ruleForm: {
        memberName: '',
        password: ''
      }
    }
  },
  methods: {
    validAccountAndPassword,
    goRegister() {
      this.$parent.changeType('register')
    },
    close() {
      this.$parent.close()
    },
    goForget() {
      this.close()
      this.$router.push({ name: 'Forget' })
    },

    afterEnter() {
      const memberName = Cookies.get('memberName')
      if (memberName) {
        const password = Base64.decode(Cookies.get('password'))
        this.ruleForm.memberName = memberName
        this.ruleForm.password = password
        this.remember = true
      }
    },

    afterLeave() {
      this.ruleForm.memberName = ''
      this.ruleForm.password = ''
    },

    onVerifyChange(captcha) {
      const params = {
        memberName: this.ruleForm.memberName,
        password: MD5(settings.passKey + this.ruleForm.password.trim()),
        captcha
      }

      this.$toast.loading({
        forbidClick: true
      })

      this.$store
        .dispatch('user/login', params)
        .then(() => {
          this.$toast.clear()

          if (this.remember) {
            Cookies.set('memberName', this.ruleForm.memberName)
            Cookies.set('password', Base64.encode(this.ruleForm.password))
          } else {
            Cookies.remove('memberName')
            Cookies.remove('password')
          }
          this.close()
        })
        .catch(() => {
          this.$toast.clear()
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.login-links {
  padding: 12px 0;
  ::v-deep .van-checkbox__label {
    color: #fff;
  }
  & > span {
    cursor: pointer;
  }
}

.login-others {
  padding: 18px 0;
  & > span {
    cursor: pointer;
  }
}

.login-container {
  h2 {
    line-height: 90px;
  }
}
</style>
