<template>
  <div v-if="resource" class="linkup-container">
    <div v-if="resource.home || resource.away" class="linkup-container-item">
      <div class="linkup-container-head">
        <span class="linkup-container-head__title">首发阵容</span>
      </div>
      <starting-list
        :home="resource.home"
        :away="resource.away"
      >
        <template #home>
          <img :src="messageInstance.message.homeLogo">
          <span>{{ resource.homeTeamName }}</span>
          <div v-if="resource.homeFormation" class="formation">
            教练：{{ resource.homeManager }}<br>
            阵型：{{ resource.homeFormation }}
          </div>
        </template>
        <template #away>
          <img :src="messageInstance.message.awayLogo">
          <span>{{ resource.awayTeamName }}</span>
          <div v-if="resource.awayFormation" class="formation">
            教练：{{ resource.awayManager }}<br>
            阵型：{{ resource.awayFormation }}
          </div>
        </template>
      </starting-list>
    </div>
    <div v-if="false" class="linkup-container-item">
      <div class="linkup-container-head">
        <span class="linkup-container-head__title">伤停情况</span>
      </div>
      <lay-off-list
        :home-changer="resource.homeChanger"
        :away-changer="resource.awayChanger"
      >
        <template #home>
          <van-image
            :src="messageInstance.message.homeLogo"
            round
            width="0.6667rem"
            lazy-load
            fit="cover"
          />
          <span class="team-name">{{ resource.homeTeamName }}</span>
        </template>
        <template #away>
          <van-image
            :src="messageInstance.message.awayLogo"
            width="0.6667rem"
            lazy-load
            fit="cover"
          />
          <span class="team-name">{{ resource.awayTeamName }}</span>
        </template>
      </lay-off-list>
    </div>
    <div v-if="showAlternate" class="linkup-container-item">
      <div class="linkup-container-head">
        <span class="linkup-container-head__title">本场换人</span>
      </div>
      <changer-list
        :home-changer="resource.homeChanger"
        :away-changer="resource.awayChanger"
      >
        <template #home>
          <van-image
            :src="messageInstance.message.homeLogo"
            round
            width="0.6667rem"
            lazy-load
            fit="cover"
          />
          <span class="team-name">{{ resource.homeTeamName }}</span>
        </template>
        <template #away>
          <van-image
            :src="messageInstance.message.awayLogo"
            width="0.6667rem"
            lazy-load
            fit="cover"
          />
          <span class="team-name">{{ resource.awayTeamName }}</span>
        </template>
      </changer-list>
    </div>
    <div v-if="showReplace" class="linkup-container-item">
      <div class="linkup-container-head">
        <span class="linkup-container-head__title">本场替补</span>
      </div>
      <bench-list
        :home-bench="resource.homeBench"
        :away-bench="resource.awayBench"
      >
        <template #home>
          <van-image
            :src="messageInstance.message.homeLogo"
            round
            width="0.6667rem"
            lazy-load
            fit="cover"
          />
          <span class="team-name">{{ resource.homeTeamName }}</span>
        </template>
        <template #away>
          <van-image
            :src="messageInstance.message.awayLogo"
            width="0.6667rem"
            lazy-load
            fit="cover"
          />
          <span class="team-name">{{ resource.awayTeamName }}</span>
        </template>
      </bench-list>
    </div>
  </div>
</template>
<script>
import { getMatchBaseFaceLineup } from '@/api/match'
import StartingList from './StartingList'
import BenchList from './BenchList'
import ChangerList from './ChangerList'
import LayOffList from './LayOffList'
export default {
  inject: ['messageInstance'],
  components: { StartingList, BenchList, ChangerList, LayOffList },
  data() {
    return {
      resource: null
    }
  },
  computed: {
    showReplace() {
      return this.resource?.homeBench?.length > 0 || this.resource?.awayBench?.length > 0
    },
    showAlternate() {
      return this.resource?.homeChanger?.length > 0 || this.resource?.awayChanger?.length > 0
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    fetch() {
      getMatchBaseFaceLineup(this.$route.params.id).then(([data, err]) => {
        if (!err) {
          this.resource = data
          // this.resource = {
          //   "homeTeamName": "福塔雷萨",
          //   "awayTeamName": "塞阿拉",
          //   "homeFormation": "4-4-2",
          //   "awayFormation": "4-2-3-1",
          //   "home": [
          //     {
          //       "id": 113442,
          //       "teamId": 11304,
          //       "first": 1,
          //       "name": "费利佩·阿尔维斯",
          //       "logo": "http://cdn.sportnanoapi.com/football/player/80c78d2d0dec4adf187090b5f669cc85.png",
          //       "shirtNumber": 12,
          //       "position": "G",
          //       "x": 50,
          //       "y": 12
          //     }
          //   ],
          //   "homeBench": [
          //     {
          //       "id": 49360,
          //       "teamId": 11304,
          //       "first": 0,
          //       "name": "埃德森",
          //       "logo": "http://cdn.sportnanoapi.com/football/player/5edb931fc48d56222c66b739d508b524.png",
          //       "shirtNumber": 91,
          //       "position": "F",
          //       "x": 0,
          //       "y": 0
          //     }
          //   ],
          //   "away": [
          //     {
          //       "id": 106084,
          //       "teamId": 15219,
          //       "first": 1,
          //       "name": "理查德",
          //       "logo": "http://cdn.sportnanoapi.com/football/player/c160e58149885bf19d9e9584ce99e5e4.png",
          //       "shirtNumber": 91,
          //       "position": "G",
          //       "x": 50,
          //       "y": 12
          //     }
          //   ],
          //   "awayBench": [
          //     {
          //       "id": 100847,
          //       "teamId": 15219,
          //       "first": 0,
          //       "name": "韦斯克利",
          //       "logo": "http://cdn.sportnanoapi.com/football/player/fd788795660948ade11aa4753cfd0737.png",
          //       "shirtNumber": 39,
          //       "position": "M",
          //       "x": 0,
          //       "y": 0
          //     }
          //   ],
          //   "homeChanger": [
          //     {
          //       "time": "",
          //       "inLogo": "",
          //       "outLogo": "",
          //       "inShirtNumber": "",
          //       "outShirtNumber": "",
          //       "inPlayerName": "",
          //       "outPlayerName": ""
          //     }
          //   ],
          //   "awayChanger": [
          //     {
          //       "time": "",
          //       "inLogo": "",
          //       "outLogo": "",
          //       "inShirtNumber": "",
          //       "outShirtNumber": "",
          //       "inPlayerName": "",
          //       "outPlayerName": ""
          //     }
          //   ],
          //   "homeInjury": [
          //     {
          //       "logo": "",
          //       "name": "",
          //       "position": "",
          //       "reason": ""
          //     }
          //   ],
          //   "awayInjury": [
          //     {
          //       "logo": "",
          //       "name": "",
          //       "position": "",
          //       "reason": ""
          //     }
          //   ],
          //   "homeManager": "",
          //   "awayManager": ""
          // }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.formation {
  position: absolute;
  right: 10px;
  font-size: 12px;
}
.linkup-container {
  &-item {
    background-color: white;
    margin-bottom: 10px;
    padding: 0 10px 20px;
    .team-name {
      margin-left: 15px;
    }
  }
  &-head {
    position: relative;
    padding: 16px 0 15px 10px;
    text-align: left;
    line-height: 1;
    &__title {
      font-size: 15px;
    }
    &::before {
      content: '';
      position: absolute;
      left: 0;
      width: 3px;
      height: 15px;
      background-color: var(--paper-orange-500);
      border-radius: 3px;
    }
  }
}
</style>
