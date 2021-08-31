<template>
  <div class="odds-tab">
    <div class="match-message-tabs">
      <van-tabs v-model="active" type="card">
        <van-tab v-for="tab in tabs" :key="tab.name" :title="tab.label" :name="tab.name" />
      </van-tabs>
    </div>
    <component :is="active" :items="oddsData[active]" />

    <silde-left-view />
  </div>
</template>
<script>
import { getMatchCompanyOdds } from '@/api/match'
import { euList, asiaList, bsList } from './tabs'
export default {
  name: 'OddsTab',
  components: { euList, asiaList, bsList },
  data() {
    return {
      active: 'euList',
      tabs: [
        { name: 'euList', label: '胜平负' },
        { name: 'asiaList', label: '让球' },
        { name: 'bsList', label: '总进球' }
      ],
      oddsData: {
        euList: [],
        asiaList: [],
        bsList: []
      }
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    fetch() {
      getMatchCompanyOdds(this.$route.params.id)
        .then(([data, err]) => {
          if (!err) {
            this.oddsData = data || {}
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.odds-tab {
  color: var(--text-regular);
  .match-message-tabs {
    margin: 10px 0;
  }
}

</style>
