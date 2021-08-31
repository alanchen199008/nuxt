<template>
  <div class="auth-warpper">
    <template v-if="$route.name === 'Forget'">
      <router-view />
    </template>
    <template v-else>
      <div class="anth-logo">
        <img src="@/assets/user-logo.png" width="59">
      </div>
      <div class="anth-video">
        <video playsinline autoplay="autoplay" muted="muted" loop="loop" preload="auto" src="@/assets/media/background.mp4" />
      </div>
      <router-view class="anth-container" />
    </template>
  </div>
</template>
<style lang="scss">
.auth-warpper {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.anth-logo {
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  width: 78px;
  z-index: 1;
  img {
    width: 100%;
    height: 100%;
  }
}

.anth-video {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  video {
    background-position: center;
    object-fit: cover;
    object-position: 50% 50%;
    filter: blur(0);
    height: 100%;
    transition: filter .35s ease-in-out;
    width: 100%;
  }
}

.anth-footer {
  padding: 18px;
}

.anth-container {
  position: absolute;
  bottom: 24px;
  background-color: rgba(255, 255, 255, 0.33);
  border-radius: 9px;
  margin: 0 24px;
  padding: 10px 28px;
  left: 0;
  right: 0;
  text-align: center;
  color: #fff;
  font-size: 15px;
  h2 {
    font-size: 19px;
    color: #fff;
    line-height: 60px;
  }

  .van-field {
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 24px;
    & + .van-field {
      margin-top: 25px;
    }

    &__control {
      color: #fff;
      font-size: 16px;
      &::placeholder {
        color: rgba(255, 255, 255, 0.6);
        font-size: 16px;
      }
    }
  }

  .van-button {
    font-size: 20px;
    height: 47px;
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
