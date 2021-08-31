<template>
  <div class="info-tab-content">
    <div class="match-message-tabs">
      <van-tabs v-model="active" type="card" animated>
        <van-tab v-for="(item, index) in tabs" :key="index" :title="item.name">
          <div class="info-main">
            <wos-card :title="item.favorableTitle">
              <template v-if="item.favorable">
                <p v-for="(info, i) in item.favorable" :key="i" v-html="info" />
              </template>
              <template v-else>暂无</template>
            </wos-card>
            <wos-card :title="item.favorableTitle">

              <template v-if="item.unfavorable">
                <p
                  v-for="(info, i) in item.unfavorable"
                  :key="i"
                  v-html="info"
                />
              </template>
              <template v-else>暂无</template>
            </wos-card>
            <wos-card :title="item.neutralInfoTitle" class="neutral-info">
              <template v-if="item.neutralInfo">
                <p
                  v-for="(info, i) in item.neutralInfo"
                  :key="i"
                  v-html="info"
                />
              </template>
              <template v-else>暂无</template>
            </wos-card>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import WosCard from '@/components/WosCard'
import { getFavorableInfo } from '@/api/match'
export default {
  name: 'InfoTab',
  components: { WosCard },
  inject: ['messageInstance'],
  data() {
    return {
      active: 'home',
      tabs: [],
      neutralInfo: ''
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      getFavorableInfo({ matchId: this.$route.params.id }).then(
        ([data, error]) => {
          if (!error) {
            let home = {
              name: data.homeTeamName ? data.homeTeamName : this.messageInstance.message.homeTeamName,
              favorable: data.homeFavorableInfo,
              favorableTitle: data.homeFavorableInfo ? '有利情报(' + data.homeFavorableInfo.length.toString() + ')' : '有利情报(0)',
              unfavorable: data.homeAdverseInfo,
              unfavorableTitle: data.homeAdverseInfo ? '不利情报(' + data.homeAdverseInfo.length.toString() + ')' : '不利情报(0)',
              neutralInfo: data.neutralInfo,
              neutralInfoTitle: data.neutralInfo ? '中立情报(' + data.neutralInfo.length.toString() + ')' : '中立情报(0)'
            }
            this.tabs.push(home)
            let away = {
              name: data.awayTeamName ? data.awayTeamName : this.messageInstance.message.awayTeamName,
              favorable: data.awayFavorableInfo,
              favorableTitle: data.awayFavorableInfo ? '有利情报(' + data.awayFavorableInfo.length.toString() + ')' : '有利情报(0)',
              unfavorable: data.awayAdverseInfo,
              unfavorableTitle: data.awayAdverseInfo ? '不利情报(' + data.awayAdverseInfo.length.toString() + ')' : '不利情报(0)',
              neutralInfo: data.neutralInfo,
              neutralInfoTitle: data.neutralInfo ? '中立情报(' + data.neutralInfo.length.toString() + ')' : '中立情报(0)'
            }
            this.tabs.push(away)
          }
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.info-tab-content {
  .match-message-tabs {
    margin: 10px 0;
  }
  .info-main {
    text-align: left;
    .wos-card {
      ::v-deep .wos-card__body {
        p {
          position: relative;
          padding: 0 15px;
          &::before{
            width: 7px;
            height: 7px;
            border-radius: 3.5px;
            background:#1ecea3;
            content: '';
            display: inline-block;
            position: absolute;
            left: 0;
            top:6px;
          }
        }
      }
    }
    .neutral-info {
      ::v-deep .wos-card__head {
        text-align: center;
        &::before {
          display: none;
        }
      }
    }
  }
}
</style>
