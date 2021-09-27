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
          <th width="40">名次</th>
          <th>球员</th>
          <th width="100">国家</th>
          <th width="60">总进球</th>
        </tr>
        <template v-if="shooterTops.length > 0">
          <tr v-for="(item, index) in shooterTops" :key="index">
            <td><span class="position" :class=" index<=2 ? 'primary':'default'">{{ item.position }}</span></td>
            <td>{{ item.player }}</td>
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
import { getShooterTops } from '@/api/eurocc'
export default {
  data() {
    return {
      shooterTops: []
    }
  },
  created() {
    // this.getData()
  },
  methods: {
    getData() {
      getShooterTops().then(([data, error]) => {
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
