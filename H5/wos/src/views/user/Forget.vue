<template>
  <div class="forget">
    <van-nav-bar left-arrow title="忘记密码" @click-left="goBack" />
    <div class="content">
      <van-form
        ref="validateForm"
        validate-first
        :show-error-message="false"
        @failed="onFailed"
        @submit="handleReset"
      >
        <div class="van-form-item">
          <div class="label">手机号</div>
          <van-field
            v-model="submitForm.phone"
            type="tel"
            name="phone"
            placeholder="请输入手机号"
            maxlength="11"
            :rules="[{ validator: validPhone, message: '手机号格式不合法' }]"
          />
        </div>
        <div class="van-form-item">
          <div id="captcha" class="result__captcha" />
          <div class="label">验证码</div>
          <van-field
            v-model="submitForm.smsCaptcha"
            placeholder="请输入验证码"
            class="valide-code-input"
            name="smsCaptcha"
            :rules="[{ pattern: /^\d{6}$/, message: '验证码格式不合法' }]"
          >
            <template #button>
              <button
                class="valide-button"
                :class="isDisabled ? 'disabled' : ''"
                :disabled="isDisabled"
                @click.prevent="handleGetCaptcha"
              >
                {{ buttonText }}
              </button>
            </template>
          </van-field>
        </div>
        <div class="van-form-item">
          <div class="label">新密码</div>
          <van-field
            v-model="submitForm.newLoginPwd"
            type="password"
            placeholder="请输入新密码(6-12位字母/数字)"
            maxlength="12"
            name="newLoginPwd"
            :rules="[{ validator: validAccountAndPassword, message: '请输入6-12位数字或字母' }]"
          />
        </div>
        <div class="van-form-item">
          <van-button
            size="large"
            block
            native-type="submit"
            class="submit-button"
          >确认重置</van-button>
        </div>
      </van-form>
    </div>
    <div class="footer">
      <p class="button-bar">
        <button class="contact-button" @click="contactCustomer">
          联系客服
        </button>
      </p>
      <p class="tips">
        *如果您还没有绑定过手机，请联系客服并提供登录账号找回
      </p>
    </div>
  </div>
</template>

<script>
import MD5 from 'js-md5'
import settings from '@/settings'
import { getSmsCode, resetPassword } from '@/api/user'
import { validAccountAndPassword, validPhone } from '@/utils/validate'
import initNECaptchaFn from '@/mixins/initNECaptchaFn'
export default {
  mixins: [initNECaptchaFn()],
  data() {
    return {
      isDisabled: false,
      buttonText: '获取验证码',
      time: null,
      submitForm: {
        phone: '',
        smsCaptcha: '',
        newLoginPwd: ''
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.time)
  },
  methods: {
    validAccountAndPassword,
    validPhone,
    goBack() {
      this.$router.back(-1)
    },
    handleGetCaptcha() {
      this.$refs.validateForm.validate('phone').then(() => {
        this.onVerify()
      })
    },
    onVerifyChange(captcha) {
      this.isDisabled = true
      const data = {
        phone: this.submitForm.phone,
        transType: 2,
        transDesc: '',
        captcha
      }
      getSmsCode(data).then(([_, error]) => {
        if (!error) {
          this.isDisabled = true
          this.$toast('发送验证码成功!')
          this.conut(60)
        } else {
          this.isDisabled = false
        }
      })
    },
    conut(t) {
      this.time = setInterval(() => {
        t--
        if (t) {
          this.buttonText = t + '秒后重新获取'
        } else {
          clearInterval(this.time)
          this.time = null
          this.buttonText = '获取验证码'
          this.isDisabled = false
        }
      }, 1000)
    },
    handleReset() {
      const data = {
        phone: this.submitForm.phone,
        smsCaptcha: this.submitForm.smsCaptcha,
        newLoginPwd: MD5(settings.passKey + this.submitForm.newLoginPwd.trim())
      }
      resetPassword(data)
        .then(([_, error]) => {
          if (!error) {
            this.$dialog.confirm({
              title: '提示',
              message: '重置密码成功，是否重新登录???'
            }).then(() => {
              window.__GLOBAL.LoginControlDialog.open()
            }).catch(() => {
              this.$router.push({ name: 'Home' })
            })
          }
        })
    },
    contactCustomer() {
      this.$router.push({ name: 'AccountFeedback' })
      // const token = getToken()
      // const TenantCode = localStorage.getItem('tenant-code') //
      // let userid
      // token ? (userid = getSession('memberId')) : (userid = GenerateUUID())
      // const data = {
      //   user_id: userid,
      //   tenant_code: TenantCode
      // }
      // getAccessCode(data).then(([data, error]) => {
      //   if (!error) {
      //     window.location.href =
      //       settings.customUrl +
      //       TenantCode +
      //       '/?authorization=' +
      //       data.authorization
      //   }
      // })
    }
  }
}
</script>

<style lang="scss" scoped>
.forget {
  background: #fff;
  .content {
    padding: 0 15px;
    .van-form-item {
      padding: 12px 0;
      .label {
        font-size: 16px;
        line-height: 32px;
        color: #333;
      }
      ::v-deep.van-field {
        background: #efefef;
        border-radius: 4px;
        &.valide-code-input {
          padding-top: 0;
          padding-right: 0;
          padding-bottom: 0;
        }
      }
      .valide-button {
        line-height: 44px;
        background: #fff;
        border: 1px solid #dcdcdc;
        padding: 0 10px;
        border-radius: 4px;
        &.disabled {
          background: #dcdcdc;
        }
      }
      .submit-button {
        width: 100%;
        line-height: 46px;
        font-size: 18px;
        color: #fff;
        background: linear-gradient(45deg, #00d1cb 0%, #00a0e3 100%);
        border-radius: 8px;
      }
    }
  }
  .footer {
    height: calc(100vh - 42px);
    padding: 100px 15px;
    p {
      margin: 15px auto;
      &.button-bar {
        text-align: center;
        .contact-button {
          font-size: 16px;
          background: #ecf9ff;
          border: 1px solid #00a0e3;
          border-radius: 4px;
          color: #00a0e3;
          padding: 0 24px;
          line-height: 40px;
        }
      }
      &.tips {
        font-size: 14px;
        text-align: center;
        color: #999;
        padding: 0 36px;
      }
    }
  }
}
</style>
