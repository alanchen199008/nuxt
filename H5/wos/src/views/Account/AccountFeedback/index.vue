<template>
  <div class="account-feedback">
    <van-nav-bar left-arrow title="联系客服" @click-left="goBack" />
    <van-list v-if="address">
      <van-cell
        is-link
        value="在线客服"
        center
        :url="address.threeCustomer"
      >
        <template #title>
          <span class="custom-icon online" />
        </template>
      </van-cell>

      <van-cell
        is-link
        value="QQ客服"
        center
        :url="`https://wpa.qq.com/msgrd?v=3&uin=${address.customerQq}&site=${domain}&menu=yes`"
      >
        <template #title>
          <span class="custom-icon qq" />
        </template>
      </van-cell>
    </van-list>
    <div class="footer">
      有问题找客服，免费7x24小时在线服务
    </div>
  </div>
</template>

<script>
import { getAddress, getAccessCode } from '@/api/user'
import { mapGetters } from 'vuex'
export default {
  name: 'AccountFeedback',
  data() {
    return {
      address: null
    }
  },
  computed: {
    ...mapGetters(['info']),
    domain() {
      return document.domain
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    fetch() {
      getAddress()
        .then(([data, err]) => {
          if (!err) {
            this.address = data
          }
        })
      const tenantCode = localStorage.getItem('tenant-code')
      const params = {
        user_id: this.info.memberId ? String(this.info.memberId) : '',
        tenant_code: tenantCode
      }
      getAccessCode(params)
        .then(([data, err]) => {
          this.address.threeCustomer = this.address.threeCustomer + tenantCode + '/?authorization=' + data.authorization
        })
    },
    goBack() {
      this.$router.back(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.account-feedback {
  ::v-deep .van-cell__value {
    font-size: 16px;
    color: var(--text-primary);
  }
  .footer {
    width: 100%;
    text-align: center;
    position: absolute;
    bottom: 45px;
    font-size: 14px;
    color: var(--text-secondary);
    text-align: center;
  }
}
</style>
