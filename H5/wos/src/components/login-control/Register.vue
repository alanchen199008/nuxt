<template>
  <div class="register-container" flex="corss:center">

    <div class="anth-container__left" flex-box="1">
      <h2>注册</h2>
      <van-form
        validate-first
        :show-error-message="false"
        @failed="$parent.onFailed"
        @submit="$parent.onVerify"
      >
        <van-field
          v-model="ruleForm.memberName"
          name="memberName"
          placeholder="支持6-12位字母或数字的用户名"
          :border="false"
          :rules="[{ validator: validAccountAndPassword, message: '请输入6-12位数字或字母' }]"
        >
          <template #left-icon>
            <img src="@/assets/login/user.png">
          </template>
        </van-field>
        <van-field
          v-model="ruleForm.nickname"
          name="nickname"
          placeholder="支持2-12位中英数字"
          maxlength="12"
          :border="false"
          :rules="[{ validator: validNickName, message: '昵称输入不符合规范' }]"
        >
          <template #left-icon>
            <img src="@/assets/login/user.png">
          </template>
        </van-field>
        <van-field
          v-model="ruleForm.password"
          name="password"
          type="password"
          placeholder="6-12位字母或数字的密码"
          maxlength="12"
          :border="false"
          :rules="[{ validator: validAccountAndPassword, message: '请输入6-12位数字或字母' }]"
        >
          <template #left-icon>
            <img src="@/assets/login/pass.png">
          </template>
        </van-field>
        <van-field
          v-model="ruleForm.confirmPassword"
          name="cofirmPassword"
          type="password"
          placeholder="6-12位字母或数字的密码"
          maxlength="12"
          :border="false"
          :rules="[{ validator: validConfirmPassword, message: '两次密码输入不一致' }]"
        >
          <template #left-icon>
            <img src="@/assets/login/pass.png">
          </template>
        </van-field>
        <van-field
          v-model.trim="ruleForm.recommendCode"
          name="recommendCode"
          placeholder="7位数字邀请码(选填)"
          :border="false"
          :required="false"
          :rules="[{ validator: validCode, message: '请输入7位数字' }]"
        >
          <template #left-icon>
            <img src="@/assets/login/code.png">
          </template>
        </van-field>
        <div class="agreement" flex="cross:center main:center">
          <label for=""><input v-model="isAgree" type="checkbox">我已阅读并同意</label>
          <span flex-box="0" @click="toLink('UserAgreement')">《用户协议》</span>和
          <span flex-box="0" @click="toLink('PrivacyPolicy')">《隐私政策》</span>
        </div>
        <van-button
          size="large"
          type="primary"
          native-type="submit"
          color="linear-gradient(to right, #00d1cb, #00a0e3)"
        >注册</van-button>
      </van-form>
    </div>
    <div
      class="anth-container__right"
      flex="dir:top main:center cross:center"
      @click="goLogin"
    >
      <img src="@/assets/login/login.png">
      <div class="text">返回登录</div>
    </div>
  </div>
</template>
<script>
import MD5 from 'js-md5'
import settings from '@/settings'
import { validNickName, validAccountAndPassword } from '@/utils/validate'
export default {
  name: 'Register',
  data() {
    return {
      isAgree: false,
      ruleForm: {
        memberName: '',
        nickname: '',
        password: '',
        confirmPassword: '',
        recommendCode: ''
      }
    }
  },
  methods: {
    validNickName,
    validAccountAndPassword,
    validConfirmPassword(val) {
      return new Promise(resolve => {
        resolve(this.ruleForm.password === val)
      })
    },
    validCode(val) {
      if (val) {
        return /\d{7}/.test(val)
      } else {
        return true
      }
    },
    close() {
      this.$parent.close()
    },
    goLogin() {
      this.$parent.changeType('login')
    },
    toLink(name) {
      this.$parent.close()
      this.$router.push({
        name: name,
        params: { locale: this.$route.params.locale }
      })
    },
    onVerifyChange(captcha) {
      if (!this.isAgree) {
        return this.$toast('请勾选同意用户协议与隐私政策!')
      } else {
        const params = {
          memberName: this.ruleForm.memberName,
          nickname: this.ruleForm.nickname,
          password: MD5(settings.passKey + this.ruleForm.password),
          recommendCode: this.ruleForm.recommendCode,
          captcha
        }
        this.$toast.loading({
          forbidClick: true
        })

        this.$store.dispatch('user/register', params).then(() => {
          this.clsoe()
          this.$router.push({ path: '/' })
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.agreement {
  padding: 12px 0;
  text-align: center;
  font-size: 12px;
  color: #fff;
  input{
     vertical-align: middle;
     margin-right: 8px;
     margin-top: -2px;
  }
  & > span {
    color: #91C2FF;
    cursor: pointer;
    white-space: nowrap;
  }
}

.register-container {
  .anth-container__left {
    padding: 0 8px 20px 8px;
  }
  h2 {
    line-height: 47px;
  }
}
</style>
