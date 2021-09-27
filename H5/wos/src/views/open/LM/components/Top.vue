<template>
  <div class="tops">
    <template v-if="groupTops.length > 0">
      <table class="top-list">
        <tr>
          <th width="40">排名</th>
          <th>球队</th>
          <th width="24">赛</th>
          <th width="80">胜/平/负</th>
          <th width="40">进/失</th>
          <th width="24">净</th>
          <th width="48">积分</th>
        </tr>
        <tr v-for="(team, index) in groupTops" :key="index">
          <td><span class="position">{{ team.position }}</span></td>
          <td class="teamLogo"><img :src="team.teamLogo" alt="">{{ team.teamName }}</td>
          <td>{{ team.total }}</td>
          <td>{{ team.won + "/" + team.draw + "/" + team.loss }}</td>
          <td>{{ team.goals + "/" + team.goalsAgainst }}</td>
          <td>{{ team.goalDiff }}</td>
          <td>{{ team.points }}</td>
        </tr>
      </table>
    </template>
    <div v-else class="empty">暂无数据</div>
  </div>
</template>

<script>
import {
  getLMRoundScoreRank,
} from '@/api/lm'
export default {
  name: 'Lm-Top',
  data() {
    return {
      params: {
        stageId: null
      },
      groupTops: [],
      matchType: this.$route.query.matchType || 1,//1：英超  2：意甲 3：西甲 4：德甲 5：法甲
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      getLMRoundScoreRank({type:this.matchType}).then(([data, error]) => {
        if (!error) {
          this.groupTops = data
          
        }
      })
    },

  }
}
</script>

<style lang="scss" scoped>
.tops{
  max-height: 100vh;
  box-sizing: border-box;
  padding-bottom: 150px;
}
 .top-list {
    caption {
      font-size: 14px;
      background: #F1F3F4;
      color: #7A7A7A;
      line-height: 32px;
      font-weight: 600;
      padding: 0 8px;
    }
    width: 100%;
    table-layout: fixed;
    font-size: 12px;
    border-collapse: collapse;
    background: #fff;
    tr {
      &.bg{
        td{background: #F0F7F8;}
      }
      line-height: 32px;
      th {
        font-weight: normal;
        color: #6C6C6C;
        border-bottom: 1px solid #EFF1F2;
        background: #EFF1F2;
      }
      td {
        &.teamLogo{
          display: flex;
          align-items: center;
          flex-direction: column;
        }
        &.left{
          text-align: left;
          display: flex;
          // align-items: baseline;
          align-items: center;
          // margin-right: 2px;
          .tx{
            width: 22px;
            height: 22px;
            border-radius: 22px;
          }
        }
        text-align: center;
        color: #585858;
        padding: 10px 4px;
        line-height: 1.2;
        border-bottom: 1px solid #EFF1F2;
        font-size: 11px;
        .position{
          text-align: center;
          // width: 22px;
          // line-height: 18px;
          width: 12px;
          height: 12px;
          color: #BAB8B8;
          font-size: 13px;
          border: 1px solid transparent;
          margin-right: 12px;
          border-radius: 12px;
          display: inline-block;
          &.default{
            background: #fff;
            border-color: #D0CECE;
            color: #A0A0A0;
            line-height: 11px;
            font-size: 8px;
            margin-left: 10px;
          }
          &.primary{
            background: #4ACC96;
            border-color: #4ACC96;
            color: #fff;
          }
        }
        img {
          width: 16px;
          height: 16px;
          vertical-align: middle;
          margin-top: -2px;
          margin-right: 4px;
        }
      }
    }
  }
  .empty {
  text-align: center;
  font-size: 14px;
  padding: 12px;
}
</style>
