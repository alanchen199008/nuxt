<template>
  <div class="tops">
    <template v-if="groupTops.length > 0">
      <table v-for="(item, i) in groupTops" :key="i" class="top-list">
        <caption> {{ item.title }}
        </caption>
        <tr>
          <th width="40">排名</th>
          <th>球队</th>
          <th width="24">赛</th>
          <th width="80">胜/平/负</th>
          <th width="40">进/失</th>
          <th width="24">净</th>
          <th width="48">积分</th>
        </tr>
        <tr v-for="(team, index) in item.items" :key="index">
          <td><span class="position" :class=" index<=2 ? 'primary':'default'">{{ team.position }}</span></td>
          <td><img :src="team.teamLogo" alt="">{{ team.teamName }}</td>
          <td>{{ team.total }}</td>
          <td>{{ team.won + "/" + team.draw + "/" + team.loss }}</td>
          <td>{{ team.goals + "/" + team.goalsAgainst }}/0</td>
          <td>{{ team.goalDiff }}</td>
          <td>{{ team.points }}</td>
        </tr>
      </table>
    </template>
    <div v-else class="empty">暂无数据</div>
  </div>
</template>

<script>
import { getGroupTops } from '@/api/eurocc'
export default {
  data() {
    return {
      params: {
        stageId: null
      },
      groupTops: []
    }
  },
  created() {
    // this.getData()
  },
  methods: {
    getData() {
      getGroupTops({ stageId: 46440 }).then(([data, error]) => {
        if (!error) {
          let title = Object.keys(data)
          let array = Object.values(data)
          let obj = {}
          title.map((item, index) => {
            array.map((team, i) => {
              if (index === i) {
                obj = {
                  title: this.getGroupName(Number(item)) + '组',
                  items: team,
                  key: i
                }
                // this.groupTops.push(obj)
              }
              return team
            })
            return item
          })
        }
      })
    },
    getGroupName(num) {
      let string = ''
      if (num === 1) {
        string = 'A'
      } else if (num === 2) {
        string = 'B'
      } else if (num === 3) {
        string = 'C'
      } else if (num === 4) {
        string = 'D'
      } else if (num === 5) {
        string = 'E'
      } else if (num === 6) {
        string = 'F'
      } else if (num === 7) {
        string = 'G'
      } else if (num === 8) {
        string = 'H'
      } else if (num === 9) {
        string = 'I'
      } else if (num === 10) {
        string = 'J'
      } else if (num === 11) {
        string = 'K'
      } else if (num === 12) {
        string = 'L'
      } else if (num === 13) {
        string = 'M'
      } else if (num === 14) {
        string = 'N'
      } else if (num === 15) {
        string = 'O'
      } else if (num === 16) {
        string = 'P'
      } else {
        string = ''
      }
      return string
    }
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
      line-height: 32px;
      th {
        font-weight: normal;
        border-bottom: 1px solid #EFF1F2;
      }
      td {
        text-align: center;
        color: #888;
        padding: 4px;
        border-bottom: 1px solid #EFF1F2;
        .position{
          text-align: center;
          width: 22px;
          line-height: 18px;
          border: 2px solid transparent;
          border-radius: 17px;
          display: inline-block;
          &.default{
            background: #fff;
            border-color: #D0CECE;
            color: #BAB8B8;
          }
          &.primary{
            background: #4ACC96;
            border-color: #4ACC96;
            color: #fff;
          }}
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
