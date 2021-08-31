<template>
  <div class="rank-container-item">
    <div class="rank-container-item__head" flex="main:justify cross:center">
      <div class="rank-container-item__head--title">{{ resource.teamName }}</div>
      <div
        class="rank-container-item__head--extra"
        @click="goLink(resource.teamId, resource.competitionId, resource.teamName,resource.seasonId,resource.stageId,resource.group)"
      >
        <span>往季排名</span>
        <van-icon name="arrow" color="#999" />
      </div>
    </div>

    <table
      cellspacing="0"
      cellpadding="0"
      width="100%"
      class="rank-container-item__table"
    >
      <tbody>
        <tr>
          <th>{{ resource.competitionName }}</th>
          <th>赛</th>
          <th>胜</th>
          <th>平</th>
          <th>负</th>
          <th>进/失</th>
          <th>积分</th>
          <th>排名</th>
        </tr>
        <tr v-for="item in ['whole', 'home', 'away']" :key="item">
          <td>{{ resource[item].type | parseType }}</td>
          <td>{{ resource[item].total }}</td>
          <td>{{ resource[item].won }}</td>
          <td>{{ resource[item].draw }}</td>
          <td>{{ resource[item].loss }}</td>
          <td>{{ resource[item].goals }}/{{ resource[item].goalsAgainst }}</td>
          <td>{{ resource[item].points }}</td>
          <td>{{ resource[item].position }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

const typeList = ['', '总', '主', '客', '进', '半']

export default {
  filters: {
    parseType(type) {
      return typeList[type]
    }
  },
  props: {
    resource: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    goLink(teamId, competitionId, name, seasonId, stageId, group) {
      this.$router.push({ name: 'MatchSeasonMessage', params: { teamId, competitionId, seasonId: seasonId, stageId: stageId, group: group }, query: { name: encodeURIComponent(name) }})
    }
  }
}
</script>
