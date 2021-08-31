<template>
  <div class="register-container">
    <h2>注册新用户</h2>
    <van-form validate-first :show-error-message="false" @failed="onFailed" @submit="onVerify">
      <van-field
        v-model="ruleForm.memberName"
        name="memberName"
        placeholder="输入用户名"
        :border="false"
        :rules="[{ required: true, message: '请输入用户名', trigger: 'onBlur' }]"
      />
      <van-field
        v-model="ruleForm.nickname"
        name="nickname"
        placeholder="输入昵称"
        :border="false"
        :rules="[{ required: true, message: '请输入昵称', trigger: 'onBlur' }]"
      />
      <van-field
        v-model="ruleForm.password"
        name="password"
        type="password"
        placeholder="输入密码"
        :border="false"
        :rules="[{ required: true, message: '请输入密码', trigger: 'onBlur' },{ pattern: /^[A-Za-z0-9]{6,12}$/,message:'密码必须是字母或数字且不小于6位'}]"
      />
      <van-field
        v-model="ruleForm.cofirmPassword"
        name="cofirmPassword"
        type="password"
        placeholder="确认密码"
        :border="false"
        :rules="[{ required: true, message: '请再次输入密码', trigger: 'onBlur' },{ pattern: /^[A-Za-z0-9]{6,12}$/,message:'密码必须是字母或数字且不小于6位'}]"
      />
      <!-- <van-field v-model="ruleForm.parentPromotionCode" :border="false" placeholder="推广码" /> -->
      <div class="agreement">
        <van-radio v-model="checked" :icon-size="14" checked-color="#07c160" flex="cross:center">
          <span class="agreement-tip">
            我已阅读并同意
            <router-link :to="{ name: 'UserAgreement' }">《相关条款》</router-link>和
            <router-link :to="{ name: 'PrivacyPolicy' }">《隐私政策》</router-link></span>
        </van-radio>
      </div>

      <div id="captcha" class="result__captcha" />
      <van-button size="large" color="#86C924" native-type="submit">注册</van-button>

    </van-form>

    <div class="anth-footer" @click="goLogin">已有账号，立即登录</div>

  </div>
</template>
<script>
import MD5 from 'js-md5'
import settings from '@/settings'
import initNECaptchaFn from '@/mixins/initNECaptchaFn'
import { mapActions } from 'vuex'
export default {
  name: 'Register',
  mixins: [initNECaptchaFn()],
  data() {
    return {
      checked: '',
      ruleForm: {
        memberName: '',
        nickname: '',
        password: '',
        cofirmPassword: ''
        // parentPromotionCode: ''
      }
    }
  },
  mounted() {

  },
  methods: {
    ...mapActions('user', ['loginAction']),
    goLogin() {
      this.loginAction(true)
      // this.$router.push({ name: 'Login' })
    },
    onFailed({ errors }) {
      this.$toast.fail({
        icon: 'cross',
        message: errors[0].message
      })
    },

    onVerifyChange(captcha) {
      const params = {
        memberName: this.ruleForm.memberName,
        nickname: this.ruleForm.nickname,
        password: MD5(settings.passKey + this.ruleForm.password),
        // parentPromotionCode: this.ruleForm.parentPromotionCode,
        captcha
      }

      this.$store.dispatch('user/register', params).then(() => {
        this.instance && this.instance.refresh()
        this.$router.push({ path: '/' })
      })
    }
  }

}
</script>
<style lang="scss" scoped>

.agreement {
  &-tip {
    color: #fff;
    font-size: 12px;
    line-height: 1;
  }
}

.reister-login {
  padding: 18px 0;
}
</style>
