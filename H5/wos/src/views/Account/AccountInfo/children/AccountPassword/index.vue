<template>
  <div>
    <van-nav-bar left-arrow title="修改密码" @click-left="$router.back(-1)" />
    <van-form
      validate-first
      :show-error-message="false"
      class="account-password"
      @submit="handleSubmit"
      @failed="onFailed"
    >
      <label class="account-password__label">原密码</label>
      <van-field
        v-model="ruleForm.oldpwd"
        type="password"
        name="oldpwd"
        placeholder="请输入6-12位字母/数字"
        :border="false"
        :rules="[{ validator: validAccountAndPassword, message: '请输入6-12位数字或字母', trigger: 'blur' }]"
      />
      <label class="account-password__label">新密码</label>
      <van-field
        v-model="ruleForm.newpwd"
        type="password"
        name="newpwd"
        placeholder="请输入6-12位字母/数字"
        :border="false"
        :rules="[{ validator: validAccountAndPassword, message: '请输入6-12位数字或字母', trigger: 'blur' }]"
      />
      <label class="account-password__label">确认新密码</label>
      <van-field
        v-model="ruleForm.agnpwd"
        type="password"
        name="agnpwd"
        placeholder="请输入6-12位字母/数字"
        :border="false"
        :rules="[{ validator: validConfirmPassword, message: '两次密码输入不一致', trigger: 'blur' }]"
      />

      <van-button class="liner-gradient" block native-type="submit">{{ $t('save') }}</van-button>

    </van-form>
  </div>

</template>

<script>
import MD5 from 'js-md5'
import { validAccountAndPassword } from '@/utils/validate'
import { updateLoginPwd } from '@/api/user'
import settings from '@/settings'
export default {
  name: 'AccountUpdatePassword',
  data() {
    return {
      ruleForm: {
        oldpwd: '',
        newpwd: '',
        agnpwd: ''
      }
    }
  },
  methods: {
    validAccountAndPassword,
    validConfirmPassword(val) {
      return this.ruleForm.newpwd === val
    },
    onFailed({ errors }) {
      this.$toast(errors[0].message)
    },
    handleSubmit() {
      updateLoginPwd({
        oldPwd: MD5(settings.passKey + this.ruleForm.oldpwd),
        newPwd: MD5(settings.passKey + this.ruleForm.newpwd)
      }).then(([_, err]) => {
        if (!err) {
          this.$toast.success('修改成功，请重新登录')
          this.$store.dispatch('user/logout').then(() => {
            this.$router.replace({ name: 'Home' })
            window.__GLOBAL.LoginControlDialog.open()
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.account-password {
  margin: 20px 15px 0;
  &__label {
    color: $--color-text-primary;
    font-size: 16px;
    padding-left: 10px;
    line-height: 30px;
    display: block;
  }

  ::v-deep {
    .van-field {
      background-color: #EFEFEF;
      border-radius: 4px;
      margin-bottom: 20px;
    }
  }
}
</style>
