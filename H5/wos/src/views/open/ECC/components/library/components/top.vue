<template>
  <div class="contnet">
    <div v-for="item in items" :key="item.key" class="module">
      <div class="module-title">{{ item.title }}</div>
      <div class="module-content">
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
          <tr v-for="(team,index) in item.items" :key="index">
            <td>{{ team.position }}</td>
            <td>
              <img
                :src="team.teamLogo"
                alt=""
              >{{ team.teamName }}
            </td>
            <td>{{ team.total }}</td>
            <td>{{ team.won + '/' + team.draw + '/' + team.loss }}</td>
            <td>{{ team.goals +'/'+team.goalsAgainst }}/0</td>
            <td>{{ team.goalDiff }}</td>
            <td>{{ team.points }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { getGroupTops } from '@/api/euro'
export default {
  data() {
    return {
      items: []
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      getGroupTops({ stageId: 46440 })
        .then(([data, error]) => {
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
                  this.items.push(obj)
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
.content{
  font-size: 12px;
  height: 100%;
  overflow: auto;
  background: #3fbdd0;
  .module{
    margin: 10px 14px;
    background: #fff;
    .module-title{
      text-align: center;
      line-height: 32px;
      background: #f6f6f7;
    }
    .module-content{
    .top-list {
      width: 100%;
      table-layout: fixed;
      font-size: 12px;
      border-collapse: collapse;
      tr {
        line-height: 32px;
        th {
          font-weight: normal;
          border-bottom: 1px solid #c5ebf0;
        }
        td {
          text-align: center;
          color: #888;
          padding: 4px;
          border-bottom: 1px solid #c5ebf0;
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
    }
  }
}
</style>
