<template>
  <div class="odds-list eu-list">
    <div v-if="status" class="odds-list-item status-list" flex="cross:center box:first">
      <span class="first name">总体统计</span>
      <div class="van-hairline--left">
        <div flex="box:mean">
          <p>下降家数</p>
          <p>{{ status.homeDownCount }}</p>
          <p>{{ status.tieDownCount }}</p>
          <p>{{ status.awayDownCount }}</p>
        </div>
        <div flex="box:mean">
          <p>上升家数</p>
          <p>{{ status.homeUpCount }}</p>
          <p>{{ status.tieUpCount }}</p>
          <p>{{ status.awayUpCount }}</p>
        </div>
        <div flex="box:mean">
          <p>平均变化</p>
          <change-avg :changeing="status.homeWinAvg" :change="false">
            <template slot-scope="{ icon, classes, avg }">
              <img v-if="icon" :src="icon" class="change-img">
              <span :class="classes">{{ avg }}</span>
            </template>
          </change-avg>

          <change-avg :changeing="status.tieAvg" :change="false">
            <template slot-scope="{ icon, classes, avg }">
              <img v-if="icon" :src="icon" class="change-img">
              <span :class="classes">{{ avg }}</span>
            </template>
          </change-avg>

          <change-avg :changeing="status.awayWinAvg" :change="false">
            <template slot-scope="{ icon, classes, avg }">
              <img v-if="icon" :src="icon" class="change-img">
              <span :class="classes">{{ avg }}</span>
            </template>
          </change-avg>
        </div>
      </div>
    </div>

    <div class="odds-list-head van-hairline--bottom" flex="cross:center box:first">
      <p class="first">公司</p>
      <p>项目</p>
      <p>主胜</p>
      <p>平局</p>
      <p>客胜</p>
    </div>
    <div class="odds-list-body">
      <div
        v-for="(item, name) in items"
        :key="name"
        class="odds-list-item"
        flex="cross:center box:justify"
        @click="goMessage(item.companyName)"
      >
        <div class="first name">
          <div>{{ item.companyName }}</div>
        </div>
        <div class="van-hairline--left" flex-box="1">
          <div flex="box:mean">
            <p>初盘</p>
            <p>{{ item.openingWin }}</p>
            <p>{{ item.openingTie }}</p>
            <p>{{ item.openingLose }}</p>
          </div>
          <div flex="box:mean">
            <p>{{ item.updateTime | formatDate }}</p>
            <p>{{ item.instantWin }}</p>
            <p>{{ item.instantTie }}</p>
            <p>{{ item.instantLose }}</p>
          </div>
          <div flex="box:mean">
            <p>平均变化</p>
            <change-avg :instant="item.instantWin" :opening="item.openingWin">
              <template slot-scope="{ icon, classes, avg }">
                <img v-if="icon" :src="icon" class="change-img">
                <span :class="classes">{{ avg }}</span>
              </template>
            </change-avg>

            <change-avg :instant="item.instantTie" :opening="item.openingTie">
              <template slot-scope="{ icon, classes, avg }">
                <img v-if="icon" :src="icon" class="change-img">
                <span :class="classes">{{ avg }}</span>
              </template>
            </change-avg>

            <change-avg :instant="item.instantLose" :opening="item.openingLose">
              <template slot-scope="{ icon, classes, avg }">
                <img v-if="icon" :src="icon" class="change-img">
                <span :class="classes">{{ avg }}</span>
              </template>
            </change-avg>
          </div>
        </div>
        <p><van-icon name="arrow" size="12px" color="#ccc" style="vertical-align: middle" /></p>
      </div>
    </div>
  </div>
</template>
<script>
import ChangeAvg from '../components/ChangeAvg'
import { getMatchOddsStatus } from '@/api/match'
export default {
  components: { ChangeAvg },
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      status: null
    }
  },
  created() {
    this.getStatus()
  },
  methods: {
    getStatus() {
      getMatchOddsStatus(this.$route.params.id)
        .then(([data, err]) => {
          if (!err) {
            this.status = data || {}
          }
        })
    },
    goMessage(name) {
      this.$router.push({
        name: 'MatchChangeMessage',
        params: { type: 'eu' },
        query: { name: encodeURIComponent(name) }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../public.scss';
</style>
