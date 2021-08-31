<template>
  <div class="content">
    <div v-for="item in items" :key="item.key" class="module">
      <div class="module-title">{{ item.title }}</div>
      <div class="module-content">
        <div class="team-list" flex="cross:center box:mean">
          <div v-for="(team,index) in item.items" :key="index" class="team">
            <div>
              <img :src="team.teamLogo" alt="">
            </div>
            <div>{{ team.teamName }}</div>
            <div>积分:{{ team.points }}</div>
          </div>
        </div>
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
.module {
  margin: 10px 14px;
  background: #fff;
  .module-title {
    line-height: 32px;
    text-align: center;
      background: #f6f6f7;
  }
  .module-content {
    padding:5px;
    .team{
      text-align: center;
      img{
        width:32px;
        height: 32px;
      }
    }
  }
}
</style>
