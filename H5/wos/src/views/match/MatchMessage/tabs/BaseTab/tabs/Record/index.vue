<template>
  <div v-if="resource" class="record-container">
    <div class="record-container-item">
      <h3 class="record-title">历史交锋</h3>
      <record-result :result="resource.vsResult" />
      <record-filter
        :team.sync="params.sameTeam"
        :competition.sync="params.sameCompetition"
        :number.sync="params.vsCount"
      />
      <record-table :items="resource.vsHistoryList" />
    </div>

    <div class="record-container-item">
      <h3 class="record-title">近期战绩</h3>
      <div class="record-name">
        <img :src="messageInstance.message.homeLogo">
        <span>{{ messageInstance.message.homeTeamName }}</span>
      </div>
      <record-result :result="resource.homeRecentResult" />
      <record-filter
        :team.sync="params.sameHome"
        :competition.sync="params.sameHomeCompetition"
        :number.sync="params.homeCount"
      >同主队</record-filter>
      <record-table :items="resource.homeHistoryList" />
      <div class="record-name">
        <img :src="messageInstance.message.awayLogo">
        <span>{{ messageInstance.message.awayTeamName }}</span>
      </div>
      <record-result :result="resource.awayRecentResult">客队</record-result>
      <record-filter
        :team.sync="params.sameAway"
        :competition.sync="params.sameAwayCompetition"
        :number.sync="params.awayCount"
      >同客队</record-filter>
      <record-table :items="resource.awayHistoryList" away />
    </div>
  </div>
</template>
<script>
import { getMatchBaseFaceRecord } from '@/api/match'
import RecordTable from './RecordTable'
import RecordFilter from './RecordFilter'
import RecordResult from './RecordResult'
import activeIcon from '@/assets/public/checkbox-checked.png'
import inactiveIcon from '@/assets/public/checkbox.png'
export default {
  inject: ['messageInstance'],
  components: { RecordTable, RecordFilter, RecordResult },
  data() {
    return {
      activeIcon,
      inactiveIcon,
      resource: null,
      params: {
        sameTeam: null,
        sameCompetition: false,
        sameHome: null,
        sameHomeCompetition: false,
        sameAway: null,
        sameAwayCompetition: false,
        vsCount: 10,
        homeCount: 10,
        awayCount: 10
      }
    }
  },
  watch: {
    params: {
      deep: true,
      handler() {
        this.fetch()
      }
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    fetch() {
      getMatchBaseFaceRecord({
        matchId: this.$route.params.id,
        ...this.params
      }).then(([data, err]) => {
        if (!err) {
          this.resource = data
        }
      })
    },
    getItemList(list, limit) {
      return (list || []).slice(0, limit)
    }
  }
}
</script>
<style lang="scss" scoped>
.record-container {
  &-item {
    background-color: white;
    padding: 0 10px 20px 10px;
    margin-bottom: 20px;
    .record-title {
      padding: 16px 0 10px 0;
      font-size: 15px;
      position: relative;
      padding-left: 10px;
      line-height: 1;
      &::before {
        content: '';
        position: absolute;
        left: 0;
        width: 3px;
        height: 15px;
        background-color: #F87D22;
        border-radius: 3px;
      }
    }
    .record-name {
      font-size: 15px;
      font-weight: bolder;
      margin: 10px 0;
      img {
        width: 20px;
        margin-right: 10px;
        vertical-align: middle;
      }
    }
  }
}
</style>
