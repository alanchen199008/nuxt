<template>
  <div flex="dir:top box:first">
    <van-nav-bar left-arrow :title="options.label" @click-left="$router.go(-1)" />
    <div v-if="resource" class="change-container" flex="dir:top box:first">
      <div class="change-container-head" flex="box:mean">
        <span v-for="column in options.columns" :key="column.pror">{{ column.title }}</span>
      </div>
      <div class="change-container-body" flex="box:first">
        <div class="body-left scroll-touch">
          <div
            v-for="(value, name) in resource"
            :key="name"
            class="body-left-item van-ellipsis"
            :class="[active === name && 'active']"
            @click="onchange(name)"
          >{{ name }}</div>
        </div>
        <div v-if="active" ref="changeTable" class="body-right van-hairline--left scroll-touch">
          <div
            v-for="item in items"
            :key="item.key"
            class="body-right-item van-hairline--bottom"
            flex="box:mean"
          >
            <p :class="item.homeWin.color">{{ item.homeWin.number }}</p>
            <p :class="item.draw.color">{{ item.draw.number }}</p>
            <p :class="item.awayWin.color">{{ item.awayWin.number }}</p>
            <p>{{ item.changeTime | parseTime('{m}-{d} {h}:{i}') }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getMatchOddsChangeList } from '@/api/match'
import { columns, getChangeTypeWithItems } from './utils'

export default {
  data() {
    return {
      resource: null,
      active: ''
    }
  },
  computed: {
    options() {
      return columns[this.$route.params.type]
    },
    items() {
      if (!this.active || !this.resource) return []
      return getChangeTypeWithItems(this.resource[this.active])
    }

  },
  created() {
    this.active = decodeURIComponent(this.$route.query.name)
  },
  methods: {
    afterEnter() {
      this.$toast.loading({
        loadingType: 'spinner',
        forbidClick: true
      })
      const { id, type } = this.$route.params
      getMatchOddsChangeList({ matchId: id, type })
        .then(([data, err]) => {
          this.$toast.clear()
          if (!err) {
            this.resource = data
          // this.active = Object.keys(data)[0]
          }
        })
    },
    onchange(name) {
      if (this.active !== name) {
        this.active = name
        this.$nextTick(() => {
          this.$refs.changeTable.scrollTop = 0
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.change-container {
  font-size: 12px;
  text-align: center;
  &-head {
    line-height: 34px;
    background-color: var(--paper-background-color);
  }
  &-body {
    .body-left {
      width: 20%;
      &-item {
        color: var(--text-regular);
        line-height: 40px;
        padding: 0 5px;
        &.active {
          color: white;
          background-color: var(--paper-green-900);
        }
      }
    }
    .body-right {
      &-item {
        line-height: 40px;
        &:nth-of-type(2n) {
          background-color:#FAFAFA;
        }
      }
    }
  }
}
</style>
