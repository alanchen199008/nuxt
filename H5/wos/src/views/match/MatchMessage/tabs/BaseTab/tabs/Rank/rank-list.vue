<template>
  <div class="rank-container-item">
    <div class="rank-container-item__head" flex="main:justify cross:center">
      <div class="rank-container-item__head--title">{{ resource.competitionName }} <template v-if="resource.groupName">{{ resource.groupName }}组积分榜</template></div>
      <div flex="cross:center" class="record-container-item__head--extra">
        {{ resource.year }}
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
          <th>排名</th>
          <th>球队</th>
          <th>赛</th>
          <th>胜</th>
          <th>平</th>
          <th>负</th>
          <th>进球</th>
          <th>失球</th>
          <th>积分</th>
        </tr>
        <tr
          v-for="(rank, i) in resource.ranks"
          :key="i"
          :class="(rank.teamId === homeTeamId || rank.teamId === awayTeamId) && 'current-row'"
        >
          <td>{{ i + 1 }}</td>
          <td :style="{ backgroundColor: rank.promotionColor, color: rank.promotionColor && 'white' }" class="van-ellipsis">
            {{ rank.teamName }}
          </td>
          <td>{{ rank.total }}</td>
          <td>{{ rank.won }}</td>
          <td>{{ rank.draw }}</td>
          <td>{{ rank.loss }}</td>
          <td>{{ rank.goals }}</td>
          <td>{{ rank.goalsAgainst }}</td>
          <td>{{ rank.points }}</td>
        </tr>
      </tbody>
    </table>

    <div v-if="Array.isArray(resource.ranks) && resource.ranks.length === 0" class="rank-container-item__table__empty-block">
      暂无数据
    </div>

    <div v-if="resource.promotions" class="rank-container-item__tip">
      <span
        v-for="item in resource.promotions"
        :key="item.promotionId"
      >
        <i :style="{ backgroundColor: item.color }" />
        {{ item.name }}
      </span>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    resource: {
      type: Object,
      default: () => ({})
    },
    homeTeamId: {
      type: Number,
      default: null
    },
    awayTeamId: {
      type: Number,
      default: null
    }
  }
}
</script>
