<template>
  <div v-if="resource" class="linkup-container">
    <div class="linkup-container-item">
      <div class="linkup-container-head">
        <span class="linkup-container-head__title">首发阵容</span>
      </div>
      <starting-list
        :home="resource.home"
        :away="resource.away"
        :home-formation="resource.homeFormation"
        :away-formation="resource.awayFormation"
      >
        <template #home>
          <img :src="messageInstance.message.homeLogo">
          <span>{{ resource.homeTeamName }}</span>
        </template>
        <template #away>
          <img :src="messageInstance.message.awayLogo">
          <span>{{ resource.awayTeamName }}</span>
        </template>
      </starting-list>
    </div>

    <div class="linkup-container-item">
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
    <div class="linkup-container-item">
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
  </div>
</template>
<script>
import { getMatchBaseFaceLineup } from '@/api/match'
import StartingList from './StartingList'
import BenchList from './BenchList'
import ChangerList from './ChangerList'
export default {
  inject: ['messageInstance'],
  components: { StartingList, BenchList, ChangerList },
  data() {
    return {
      resource: null
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
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.linkup-container {
  &-item {
    background-color: white;
    margin-bottom: 10px;
    padding: 0 10px;
    .team-name {
      margin-left: 15px;
    }
  }
  &-head {
    position: relative;
    padding: 16px 0 10px 10px;
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
