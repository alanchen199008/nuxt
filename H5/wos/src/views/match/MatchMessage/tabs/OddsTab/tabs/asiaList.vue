<template>
  <div class="odds-list">
    <div class="odds-list-head" flex="cross:center box:first">
      <p class="first">公司</p>
      <p>项目</p>
      <p>主胜</p>
      <p>盘口</p>
      <p>客胜</p>
    </div>
    <div class="odds-list-body">
      <div
        v-for="(item, i) in items"
        :key="i"
        class="odds-list-item van-hairline--bottom"
        flex="cross:center box:justify"
        @click="goMessage(item.companyName)"
      >
        <div class="first name">
          <div>{{ item.companyName }}</div>
        </div>
        <div class="van-hairline--left">
          <div flex="box:mean">
            <p>初盘</p>
            <p>{{ item.openingWin }}</p>
            <p>{{ item.openingTie }}</p>
            <p>{{ item.openingLose }}</p>
          </div>
          <div flex="box:mean">
            <p>{{ item.updateTime | formatDate }}</p>
            <change-avg :instant="item.instantWin" :opening="item.openingWin">
              <template slot-scope="{ icon }">
                <img v-if="icon" :src="icon" class="change-img">
                <span>{{ item.instantWin }}</span>
              </template>
            </change-avg>
            <p><span>{{ item.instantTie }}</span></p>
            <!-- <change-avg :instant="item.instantTie" :opening="item.openingTie">
              <template slot-scope="{ icon }">
                <img v-if="icon" :src="icon" class="change-img">
                <span>{{ item.instantTie }}</span>
              </template>
            </change-avg> -->

            <change-avg :instant="item.instantLose" :opening="item.openingLose">
              <template slot-scope="{ icon }">
                <img v-if="icon" :src="icon" class="change-img">
                <span>{{ item.instantLose }}</span>
              </template>
            </change-avg>
          </div>
        </div>
        <p class="last"><van-icon name="arrow" size="12px" color="#ccc" style="vertical-align: middle" /></p>
      </div>
    </div>
  </div>
</template>
<script>
import ChangeAvg from '../components/ChangeAvg'
export default {
  components: { ChangeAvg },
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    goMessage(name) {
      this.$router.push({
        name: 'MatchChangeMessage',
        params: { type: 'asia' },
        query: { name: encodeURIComponent(name) }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../public.scss';
</style>
