<template>
  <div class="account-mobile">
    <van-nav-bar left-arrow title="绑定手机号" @click-left="goback" />
    <van-form
      ref="validateForm"
      validate-first
      :show-error-message="false"
      @submit="onSubmit"
      @failed="onFailed"
    >
      <van-field
        v-model="ruleForm.phone"
        label="手机号"
        name="phone"
        size="large"
        placeholder="请输入手机号"
        :rules="[{ pattern: /^([1][3,4,5,6,7,8,9])\d{9}$/, message: '请输入正确内容' }]"
      />
      <van-field
        v-model="ruleForm.smsCaptcha"
        label="验证码"
        size="large"
        center
        clearable
        placeholder="请输入验证码"
        :rules="[{ required: true, message: '请填写验证码' }]"
      >
        <template #button>
          <van-button
            id="captcha"
            :disabled="disabled"
            :loading="loading"
            @click.prevent="handleGetCaptcha"
          >{{ txt }}</van-button>
        </template>
      </van-field>

      <van-field
        v-model="ruleForm.password"
        label="密码"
        name="password"
        size="large"
        type="password"
        placeholder="请输入6-12位数字或字母"
        :rules="[{ validator: validAccountAndPassword, message: '请填写正确内容' }]"
      />

      <div class="action-button">
        <van-button class="liner-gradient" block native-type="submit">{{ $t('save') }}</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import MD5 from 'js-md5'
import { mapMutations } from 'vuex'
import settings from '@/settings'
import useSmsCaptcha from '@/mixins/useSmsCaptcha'
import initNECaptchaFn from '@/mixins/initNECaptchaFn'
import { bindPhone, getSmsCode } from '@/api/user'
import { validAccountAndPassword } from '@/utils/validate'
export default {
  name: 'AccountMobile',
  mixins: [useSmsCaptcha, initNECaptchaFn()],
  data() {
    return {
      validAccountAndPassword,
      ruleForm: {
        phone: '',
        smsCaptcha: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapMutations('user', ['SET_INFO']),
    goback() {
      this.$router.back(-1)
    },
    onVerifyChange(captcha) {
      const params = {
        phone: this.ruleForm.phone,
        transType: 3,
        captcha
      }

      this.loading = true

      getSmsCode({ ...params }).then(([_, err]) => {
        this.loading = false
        if (!err) {
          this.disabled = true
          this.conut(60)
          this.$toast({
            message: '验证码发送成功',
            position: 'top',
            duration: 1500
          })
        } else {
          this.disabled = false
          this.txt = '获取验证码'
        }
      })
    },
    handleGetCaptcha() {
      this.$refs.validateForm.validate('phone').then(() => {
        this.onVerify()
      }).catch(() => {})
    },
    onSubmit() {
      this.$toast.loading({ forbidClick: true })
      bindPhone({
        ...this.ruleForm,
        password: MD5(settings.passKey + this.ruleForm.password)
      }).then(([_, err]) => {
        this.$toast.clear()
        if (!err) {
          this.SET_INFO({ phone: this.ruleForm.phone })
          this.$toast.success('绑定成功')
          this.goback()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.account-mobile {
  ::v-deep .van-field__button {
    border-left: 1px solid #EBEBEB;

    .van-button {
      display: block;
      padding: 0;
      height: auto;
      line-height: inherit;
      border: 0;
      color: #FF9000;
      background-color: transparent;
    }
  }
}
</style>
