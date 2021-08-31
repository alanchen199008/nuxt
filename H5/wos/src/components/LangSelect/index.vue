<template>
  <van-popover
    v-model="visible"
    placement="bottom-end"
    :actions="actions"
    get-container="#app"
    @select="onSelect"
  >
    <template #reference>
      <img :src="require(`@/assets/local/${locale}.png`)" width="18" height="18" @click="visible = true">
    </template>
  </van-popover>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      actions: [
        { text: '中文简体', locale: 'zh-CN' },
        { text: 'Engish', locale: 'en-US' },
        { text: 'ภาษาไทย', locale: 'th-TH' }
        // { text: 'हिन्दी', value: 'hi-IN' }
      ]
    }
  },
  computed: {
    locale() {
      return this.$store.getters.language
    }
  },
  watch: {
    locale(val) {
      this.$router.replace({
        name: this.$route.name,
        params: { locale: val }
      })
    }
  },
  methods: {
    onSelect({ locale }) {
      this.visible = false
      this.$i18n.locale = locale
      this.$store.dispatch('app/setLanguage', locale)
    }
  }
}
</script>
