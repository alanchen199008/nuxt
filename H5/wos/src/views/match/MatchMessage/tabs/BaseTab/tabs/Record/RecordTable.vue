<template>
  <div class="record-table">
    <table>
      <colgroup>
        <col width="22%">
        <col width="22%">
        <col width="12%">
        <col width="22%">
        <col width="12%">
        <col width="10%">
      </colgroup>
      <thead>
        <tr>
          <th>日期/赛事</th>
          <th class="is-right">主队</th>
          <th>比分</th>
          <th class="is-left">客队</th>
          <th>盘路</th>
          <th>进球</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in items" :key="item.matchTime + i">
          <td>
            <div class="time-small">{{ item.matchTime | parseTime('{y}-{m}-{d}') }}</div>
            <div> {{ item.competitionName }} </div>
          </td>
          <td class="is-right">
            <div :class="getNameClass(item.homeScore, item.awayScore, item.homeTeamId)">{{ item.homeTeamName }}</div>
          </td>
          <td>
            <div class="score">{{ item.homeScore }}-{{ item.awayScore }}</div>
            <div class="score-small">({{ item.homeHalfScore }}-{{ item.awayHalfScore }})</div>
          </td>
          <td class="is-left">
            <div :class="getNameClass(item.awayScore, item.homeScore, item.awayTeamId)">{{ item.awayTeamName }}</div>
          </td>
          <td>
            <div v-if="item.panLuResult" :class="aroundList[item.panLuResult].class">
              {{ item.panLu }}
              <br>
              {{ aroundList[item.panLuResult].txt }}
            </div>
          </td>
          <td>
            <div v-if="item.jinQiuResult" :class="goalList[item.jinQiuResult].class">
              {{ item.jinQiu }}
              <br>
              {{ goalList[item.jinQiuResult].txt }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="items.length === 0" class="record-table__empty-block">
      暂无数据
    </div>
  </div>

</template>

<script>

const aroundList = {
  1: { txt: '赢', class: 'color-red-regular' },
  2: { txt: '输', class: 'color-blue-regular' },
  3: { txt: '走', class: 'color-green-regular' }
}

const goalList = {
  1: { txt: '大', class: 'color-red-regular' },
  2: { txt: '小', class: 'color-blue-regular' },
  3: { txt: '走', class: 'color-green-regular' }
}

export default {
  inject: ['messageInstance'],
  props: {
    away: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      aroundList,
      goalList
    }
  },
  methods: {
    getNameClass(a, b, id) {
      const { homeTeamId, awayTeamId } = this.messageInstance.message
      const teamId = this.away ? awayTeamId : homeTeamId
      if (id === teamId) {
        if (a > b) {
          return 'color-red-regular'
        } else if (a < b) {
          return 'color-blue-regular'
        } else {
          return 'color-green-regular'
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.record-table {
  position: relative;
  border: 1px solid #ddd;

  table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
  }
  tr > th {
    font-weight: initial;
    height: 32px;
    background-color: var(--table-head-color);
  }
  tr > td {
    padding: 0 2px;
    height: 50px;
    text-align: center;
    border-top: 1px solid #ddd;
    color: var(--text-regular);

    & > div {
      &.time-small {
        transform: scale(0.916);
      }
      &.score {
        font-size: 14px;
        font-weight: bold;
      }
      &.score-small {
        transform: scale(0.833);
        color: var(--text-secondary);
      }
    }
  }

  th.is-left,
  td.is-left {
    text-align: left;
  }

  th.is-right,
  td.is-right {
    text-align: right;
  }

  &__empty-block {
    width: 100%;
    line-height: 30px;
    text-align: center;
  }
}
</style>
