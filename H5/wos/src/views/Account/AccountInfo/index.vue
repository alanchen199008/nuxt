<template>
  <div>
    <van-nav-bar left-arrow title="个人信息" @click-left="$router.back(-1)" />
    <van-cell-group>
      <van-cell title="头像" size="large" center is-link>
        <template #right-icon>
          <van-uploader :after-read="afterRead">
            <van-image
              round
              width="1.2rem"
              height="1.2rem"
              fit="fill"
              :src="info.avatar"
            />
          </van-uploader>
        </template>
      </van-cell>
      <van-cell size="large" title="账号" :value="info.memberName" />
      <van-cell size="large" title="昵称" :value="info.nickname" />
      <van-cell
        v-if="info.positionName"
        size="large"
        title="个人简介"
        :value="info.introduction"
        is-link
        :to="{ name: 'AccountProfile' }"
      />
      <van-cell v-if="info.phone" size="large" title="手机号" :value="phone" />
      <van-cell
        v-else
        size="large"
        title="手机号"
        is-link
        :to="{ name: 'AccountMobile' }"
      />
      <van-cell
        size="large"
        title="修改密码"
        is-link
        :to="{ name: 'AccountPassword' }"
      />
    </van-cell-group>
    <div class="action-button">
      <van-button
        block
        native-type="submit"
        class="liner-gradient"
        @click="logout"
      >退出登录</van-button>
    </div>

    <silde-left-view />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { uploadFile } from '@/api/app'
import { parsePhone } from '@/utils'
export default {
  name: 'AccountInfo',
  computed: {
    ...mapGetters(['info']),
    phone() {
      return parsePhone(this.info.phone)
    }
  },
  methods: {
    ...mapActions('user', ['updateUserInfo', 'logout']),
    afterRead({ file }) {
      const toast = this.$toast({
        type: 'loading',
        message: '上传中...',
        forbidClick: true
      })
      uploadFile({
        file,
        type: 'image',
        folder: 'head'
      })
        .then(([data, err]) => {
          if (!err) {
            this.updateUserInfo({ avatar: data[0] })
              .then(() => {
                toast.type = 'success'
                toast.message = '上传成功'
              })
              .catch(() => {
                toast.clear()
              })
          } else {
            toast.clear()
          }
        })
        .catch(() => {
          toast.clear()
        })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .van-cell__value {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
</style>
