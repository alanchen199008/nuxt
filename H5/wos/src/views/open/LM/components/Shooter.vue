<template>
  <div class="shooter-tops">
    <!-- <van-pull-refresh
      v-model="refreshing"
      class="scroll-touch"
      flex-box="1"
      @refresh="onRefresh"
    > -->
      <table class="top-list">
        <tr>
          <!-- <th width="40">名次</th> -->
          <th width="115">球员</th>
          <th width="">球队</th>
          <th width="85">进球/点球数</th>
        </tr>
        <template v-if="shooterTops.length > 0">
          <tr v-for="(item, index) in shooterTops" :key="index" :class="index%2===0?'bg':''">
            <td class="left">
              <span class="position default" >{{ item.position }}</span>
              <!-- <img class="tx" src="~@/assets/LM/banner.png"/> -->
              {{ item.player }}
            </td>
            <td>{{ item.teamName }}</td>
            <td>{{ item.goalNumber }}</td>
          </tr>
        </template>
        <tr>
          <td colspan="4" class="empty">
            暂无数据
          </td>
        </tr>
      </table>
    <!-- </van-pull-refresh> -->
  </div>
</template>

<script>
import {
  getLMRoundShoterRank
} from '@/api/lm'
import usePullRefresh from '@/mixins/usePullRefresh'
export default {
  name: 'Lm-shooter',
  // mixins: [usePullRefresh(getLMRoundShoterRank)],
  data() {
    return {
      shooterTops: [],
      matchType: this.$route.query.matchType || 1,//1：英超  2：意甲 3：西甲 4：德甲 5：法甲
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      getLMRoundShoterRank({type:this.matchType}).then(([data, error]) => {
        if (!error) {
          this.shooterTops = data
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.shooter-tops {
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
  // table-layout: fixed;
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
          min-width: 12px;
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
