<template>
  <div class="login-container">
    <h2>账号登录</h2>
    <van-form validate-first :show-error-message="false" @failed="onFailed" @submit="onVerify">
      <van-field
        v-model="ruleForm.memberName"
        name="memberName"
        placeholder="输入用户名"
        :border="false"
        :rules="[{ required: true, pattern: /^[A-Za-z0-9]{6,12}$/, message: '请输入用户名' }]"
      />
      <van-field
        v-model="ruleForm.password"
        type="password"
        placeholder="输入密码"
        name="password"
        :border="false"
        :rules="[{ required: true, pattern: /^[A-Za-z0-9]{6,12}$/, message: '请输入密码' }]"
      />

      <div class="login-links">
        <span @click="goForget">忘记密码?</span>
        <span @click="contactCustomer">联系客服</span>
      </div>
      <div id="captcha" class="result__captcha" />
      <van-button size="large" color="#86C924" block native-type="submit" :disabled="!ready">登录</van-button>
    </van-form>
    <div class="login-links " flex="main:justify cross:center">
      <span @click="goRegister">注册新用户</span>
      <span @click="goIndex">随便逛逛</span>
    </div>
  </div>
</template>
<script>
import MD5 from 'js-md5'
import initNECaptchaFn from '@/mixins/initNECaptchaFn'
import settings from '@/settings'
import { getAccessCode } from '@/api/user'
import { GenerateUUID } from '@/utils/tools'
import { getToken, getSession } from '@/utils/auth'
export default {
  name: 'Login',
  mixins: [initNECaptchaFn()],
  data() {
    return {
      ruleForm: {
        memberName: '',
        password: ''
      },
      custom: ''
    }
  },
  mounted() {
    this.getCustomUrl()
  },
  methods: {
    goRegister() {
      this.$router.push({ name: 'Register' })
    },
    goIndex() {
      this.$router.push({ path: '/' })
    },
    goForget() {
      this.$router.push({ name: 'Forget' })
    },
    getCustomUrl() {
      const token = getToken()
      const TenantCode = window.localStorage.getItem('tenant-code')
      let userid
      token ? userid = getSession('memberId') : userid = GenerateUUID()
      const data = {
        user_id: userid,
        tenant_code: window.localStorage.getItem('tenant-code')
      }
      getAccessCode(data)
        .then(([data, error]) => {
          if (!error) {
            this.custom = settings.customUrl + TenantCode + '/?authorization=' + data.authorization
          }
        })
    },
    contactCustomer() {
      window.location.href = this.custom
    },
    onVerifyChange(captcha) {
      const params = {
        memberName: this.ruleForm.memberName,
        password: MD5(settings.passKey + this.ruleForm.password.trim()),
        captcha
      }

      this.$store.dispatch('user/login', params).then(() => {
        this.instance && this.instance.refresh()
        this.$router.push({ path: '/' })
      })
    }
  }

}
</script>
<style lang="scss" scoped>
.login-links {
  padding: 15px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  & > span {
    color: #fff;
    font-size: 14px;
  }
}

.login-reister {
  font-size: 14px;
  text-align: center;
  line-height: 32px;

}

</style>
