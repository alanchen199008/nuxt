<template>
  <div>
    <nuxt/>
    <van-tabbar v-model="navActive">
      <van-tabbar-item name="index" icon="home-o">
        <NuxtLink :to="{name:'index'}">
          HOME
        </NuxtLink>
      </van-tabbar-item>
      <van-tabbar-item name="goods" icon="home-o">
        <NuxtLink :to="{name:'goods'}">
          goods
        </NuxtLink>
      </van-tabbar-item>
      <van-tabbar-item name="cart" icon="home-o">
        <NuxtLink :to="{name:'cart'}">
          cart
        </NuxtLink>
      </van-tabbar-item>
      <van-tabbar-item name="user" icon="home-o">
        <NuxtLink :to="{name:'user'}">
          user
        </NuxtLink>
      </van-tabbar-item>
    </van-tabbar>

  </div>
</template>

<script>

export default {
  name: "navlayout",
  data() {
    return {
      navActive : this.$route.name
    };
  },
  created() {

  },
};
</script>

<style>

</style>
