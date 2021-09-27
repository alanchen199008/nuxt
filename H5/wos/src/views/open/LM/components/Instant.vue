<template>
  <div class="instant">
    <van-pull-refresh
      v-model="refreshing"
      class="scroll-touch"
      flex-box="1"
      @refresh="onRefresh"
    >
      <div class="match-filter van-hairline--top-bottom">
        <div class="match-filter-main" flex="main:justify">
          <div class="match-filter-main_left" @click="preSelect" :class="selectModel.select.roundNum<=1?'disabled':''"><van-icon name="arrow-left" />上一轮</div>
          <div class="match-filter-main_center" @click="selectModel.show=!selectModel.show">{{selectModel.select.name}}<van-icon name="arrow" /></div>
          <div class="match-filter-main_right" @click="nextSelect" :class="selectModel.select.roundNum>=roundInfo.maxRound?'disabled':''">下一轮<van-icon name="arrow" /></div>
        </div>
      </div>
      <div class="match-list">
        <template v-if="items.length > 0">
          <match-item v-for="(match, index) in items" :key="index" :item="match" />
        </template>
        <div v-else class="empty">暂无数据</div>
      </div>
    </van-pull-refresh>
    
    <LmSelect :selectModel="selectModel" @select="handleClick" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MatchItem from './matchItem.vue'
import LmSelect from './select.vue'
// import { MatchItem, LmSelect } from './components'
import usePullRefresh from '@/mixins/usePullRefresh'
import {
  getLMRoundInfo,
  getLMRoundMatch,
} from '@/api/lm'
export default {
  name: 'Lm-Instant',
  components: { MatchItem , LmSelect },
  mixins: [usePullRefresh(getLMRoundMatch)],
  data() {
    return {
      selectModel: {
        show:false,
        actions:[],
        select:{}
      },
      roundInfo: {},
      matchType: this.$route.query.matchType || 1,
      active: 0,
      buttons: [],
      // params: {
      //   stageId: 100,
      //   pageSize:1
      // }
    }
  },

  computed: {
    ...mapGetters(['instantMatchList']),
    params(){
      return {
        type : this.matchType,
        roundNum : this.selectModel.select.roundNum
      }
    }
  },
  watch: {
    instantMatchList(items) {
      this.items.map(item => {
        items.map(i => {
          if (item.matchId === i.matchId) {
            this.$set(item, 'awayCornerkick', i.awayCornerkick)
            this.$set(item, 'awayHalfScore', i.awayHalfScore)
            this.$set(item, 'awayRedCards', i.awayRedCards)
            this.$set(item, 'awayScore', i.awayScore)
            this.$set(item, 'awayYellowCards', i.awayYellowCards)
            this.$set(item, 'homeCornerkick', i.homeCornerkick)
            this.$set(item, 'homeHalfScore', i.homeHalfScore)
            this.$set(item, 'homeRedCards', i.homeRedCards)
            this.$set(item, 'homeScore', i.homeScore)
            this.$set(item, 'homeYellowCards', i.homeYellowCards)
            this.$set(item, 'kickoffTime', i.kickoffTime)
            this.$set(item, 'liveTime', i.liveTime)
            this.$set(item, 'status', i.status)
          }
          return i
        })
        return item
      })
    }
  },
  created() {
    this.getData()
  },
  mounted() {
    this.subscribe()
  },
  beforeDestroy() {
    this.unsubscribe()
  },
  methods: {
    preSelect() {
      if(this.selectModel.select.roundNum > 1) {
        this.selectModel.select.roundNum--
        this.selectModel.select.name = "联赛第"+this.selectModel.select.roundNum+"轮"
        this.getItems(this.selectModel.select.roundNum)
      }
    },
    nextSelect() {
      if(this.selectModel.select.roundNum <this.roundInfo.maxRound) {
        this.selectModel.select.roundNum++
        this.selectModel.select.name = "联赛第"+this.selectModel.select.roundNum+"轮"
        this.getItems(this.selectModel.select.roundNum)
      }
    },
    async getItems(round) {
      const [items]=await getLMRoundMatch({type:this.matchType,roundNum:round})
      this.items=items
    },
    implementationGetParams() {
      return { ...this.params }
    },
    async getData() {
      const [roundInfo] = await getLMRoundInfo({type:this.matchType});
      roundInfo.round = this.$route.query.roundNum || roundInfo.round
      this.roundInfo = roundInfo
      // round.maxRound
      for(let i=1;i <= roundInfo.maxRound;i++){
        let roundEl={
          "name":"联赛第"+i+"轮",
          "roundNum":i
        }
        if(i==roundInfo.round){
          roundEl.active=true
          this.selectModel.select=Object.assign({}, roundEl)
        }
        this.selectModel.actions.push(roundEl)
      }
  
      // this.getItems(this.$route.query.roundNum || roundInfo.round)
      this.getItems(roundInfo.round)
      // getEuroCCAllInstant()
      //   .then(([data, error]) => {
      //     if (!error) {
      //       this.buttons = data
      //     }
      //   })
      this.onRefresh()
    },
    async handleClick(button, index) {
      this.selectModel.select = JSON.parse(JSON.stringify(button))
      this.getItems(button.roundNum)
      
    },
    // handleClick(button, index) {
    //   if (button.stageId === 1) {
    //     return this.$toast('资格赛进行中')
    //   } else {
    //     this.active = index
    //     this.params.stageId = button.stageId
    //     this.onRefresh()
    //   }
 
    //   getEuroCCInstant({ stageId: button.stageId })
    //     .then(([data, error]) => {
    //       if (!error) {
    //         if (index !== 0) {
    //           this.items = data.map(item => {
    //             this.$set(item, 'stageName', button.name + item.stageName)
    //             return item
    //           })
    //         } else {
    //           this.items = data
    //         }
    //       }
    //     })
    // },
    subscribe() {
      this.$socket.sendObj({
        cmdType: 'subscribe',
        data: {
          tenantCode: localStorage.getItem('tenant-code'),
          channelNames: ['football.instant.match']
        }
      })
    },
    unsubscribe() {
      this.$socket.sendObj({
        cmdType: 'unsubscribe',
        data: {
          tenantCode: localStorage.getItem('tenant-code'),
          channelNames: ['football.instant.match']
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.van-action-sheet__cancel{
    background: #21D4AD;
    color: #fff;
    margin: 10px 13px;
    width: auto;
    border-radius: 6px;
    font-size: 15px;
    height: 43px;
}
.instant{
  max-height: 100vh;
  box-sizing: border-box;
  padding-bottom: 150px;
 .match-filter {
    width: 100%;
    background: #eff1f2;
    overflow: hidden;
    .match-filter-main {
      font-size: 12px;
      display: flex;
      justify-content: space-between;
      overflow-y: auto;
      white-space: nowrap;
      color: #6C6C6C;
      padding:13px;
      &_center{
        color: #4ACC96;
      }
      button {
        border: 1px solid #acd5c4;
        line-height: 22px;
        width: 72px;
        border-radius: 18px;
        font-size: 14px;
        margin-right: 6px;
        &.default {
          color: #4acc96;
          background: #eff1f2;
        }
        &.primary {
          color: #fff;
          background: #4acc96;
          border-color: #4acc96;
        }
      }
    }
  }
  .empty{
    text-align: center;
    font-size: 14px;
    padding: 12px;
  }
}

</style>
