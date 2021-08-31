<template>
  <div class="events">
    <div class="filter">
      只看进球 <van-switch v-model="filter" size="22px" />
    </div>
    <div class="events-item start" flex="box:mean cross:stretch">
      <div class="left" />
      <div flex-box="0" class="middle">
        <img src="~@/assets/event/10.png" alt="">
      </div>
      <div class="right" />
    </div>
    <div
      v-for="(item, index) in list"
      :key="index"
      class="events-item"
      flex="box:mean cross:stretch"
    >
      <div class="left">
        <div v-if="item.position === 1" class="home">
          <div v-if="item.homeScore || item.awayScore">
            {{ item.homeScore + "-" + item.awayScore }}
          </div>
          <div v-if="item.type !== 9">
            {{ item.playerName }}
            <img :src="require(`@/assets/event/${item.type}.png`)">
          </div>
          <div v-else>
            <div>
              {{ item.inPlayerName
              }}<img class="s" src="~@/assets/event/9u.png">
            </div>
            <div>
              {{ item.outPlayerName
              }}<img class="s" src="~@/assets/event/9d.png">
            </div>
          </div>
        </div>
      </div>
      <div flex-box="0" class="middle">
        <img v-if="item.type === 10" :src="require(`@/assets/event/${item.type}.png`)">
        <div v-if="item.type === 11" class="match"> 中场 {{ item.homeScore ? item.homeScore : 0 }} - {{ item.awayScore ? item.awayScore : 0 }}</div>
        <div v-if="item.type === 12" class="match" :class="item.type === 12 ? 'matchEnd' : ''"> 结束 {{ item.homeScore ? item.homeScore : 0 }} - {{ item.awayScore ? item.awayScore : 0 }} </div>
        <div v-if="item.type === 19" class="match"> 伤停补时 {{ item.homeScore ? item.homeScore : 0 }} - {{ item.awayScore ? item.awayScore : 0 }}</div>
        <div v-if="item.typeV2 === 26" class="match"> 加时赛结束 {{ item.homeScore ? item.homeScore : 0 }} - {{ item.awayScore ? item.awayScore : 0 }} </div>
        <div v-if="item.typeV2 === 27" class="match"> 点球大战结束  </div>
        <div v-if="item.type === 8 && item.typeV2 === 30" class="match"> 点球未进 {{ item.homeScore ? item.homeScore : 0 }} - {{ item.awayScore ? item.awayScore : 0 }} </div>
        <div v-if="item.type !== 10 && item.type !== 11 && item.type !== 12 && item.type !== 19 && item.typeV2 !== 26 && item.typeV2 !== 27 " class="time"> <font>{{ item.time }}</font></div>
      </div>
      <div class="right">
        <div v-if="item.position === 2" class="away">
          <div v-if="item.homeScore || item.awayScore">
            {{ item.homeScore + "-" + item.awayScore }}
          </div>
          <div v-if="item.type !== 9">
            <img :src="require(`@/assets/event/${item.type}.png`)">
            {{ item.playerName }}
          </div>
          <div v-else>
            <div>
              <img class="s" src="~@/assets/event/9u.png">{{
                item.inPlayerName
              }}
            </div>
            <div>
              <img class="s" src="~@/assets/event/9d.png">{{
                item.outPlayerName
              }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="events-item end" flex="box:mean cross:stretch">
      <div class="left" />
      <div flex-box="0" class="middle">
        <img src="~@/assets/event/12.png" alt="">
      </div>
      <div class="right" />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      filter: false,
      list: this.data
    }
  },
  watch: {
    filter(value) {
      if (value) {
        sessionStorage.setItem('match-events', JSON.stringify(this.data))
        let arry = []
        this.data.map(item => {
          if (item.type === 1 || item.type === 11 || item.type === 12 || item.type === 19 || item.type === 26) { arry.push(item) }
          return item
        })
        this.list = arry
      } else {
        this.list = JSON.parse(sessionStorage.getItem('match-events'))
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.events {
  font-size: 12px;
  color: $--color-text-regular;
  margin-top: 12.5px;
  .filter {
    text-align: right;
    height: 32px;
    line-height: 32px;
    ::v-deep .van-switch {
      vertical-align: middle;
      margin-top: -4px;
    }
  }
  &-item {
    .middle {
      max-width: 100px;
      min-width: 75px;
      position: relative;
      &::before {
        width: 1px;
        height: 100%;
        margin: 0 auto;
        background: #e0e0e0;
        content: "";
        display: inline-block;
        position: absolute;
        left: 0;
        right: 0;
        margin: 0 auto;
      }
      img {
        width: 15px;
        height: 15px;
        vertical-align: middle;
        position: absolute;
        left: 0;
        right: 0;
        margin: 0 auto;
      }
      .match {
        background: #fff;
        position: relative;
        z-index: 10;
        text-align: center;
        margin: 10px auto;
        margin: 0 -10px 20px -10px;
        &.matchEnd {
          bottom: -10px;
        }
      }
    }
    .left {
      text-align: right;
    }
    .right {
      text-align: left;
    }
    .match {
      max-width: 100px;
      min-width: 100px;
      color: #d90915;
      font-size: 12px;
      line-height: 30px;
      border-radius: 15px;
    }
    .time {
      width: 24px;
      line-height: 24px;
      border-radius: 12px;
      background: #fff;
      position: absolute;
      font-size: 12px;
      left: 0;
      right: 0;
      top: 12px;
      margin: 0 auto;
      text-align: center;
      font{
        display: inline-block;
        transform: scale(0.7);
      }
    }
    .home,
    .away {
      background: #fff;
      margin: 10px 0 10px 0;
      border-radius: 4px;
      padding: 4px;
      position: relative;
      img {
        width: 15px;
        height: 15px;
        vertical-align: middle;
        margin-top: -4px;
        &.s {
          width: 6px;
          height: 12px;
          margin: 0 4px 0 4px;
        }
      }
    }
    .home {
      position: relative;
      margin-left: 10px;
      margin-right: -10px;
      &::after {
        position: absolute;
        content: "";
        width: 12px;
        height: 12px;
        display: inline-block;
        border-top: 8px solid transparent;
        border-left: 14px solid #fff;
        border-bottom: 8px solid transparent;
        right: -12px;
        top: 6px;
      }
    }
    .away {
      position: relative;
      margin-left: -10px;
      margin-right: 10px;
      &::before {
        position: absolute;
        content: "";
        width: 12px;
        height: 12px;
        display: inline-block;
        border-top: 8px solid transparent;
        border-right: 14px solid #fff;
        border-bottom: 8px solid transparent;
        left: -12px;
        top: 6px;
      }
    }
    &.start {
      .middle {
        height: 50px;
        display: inline-block;
        img {
          top: -5px;
        }
        &::before {
          top: 50%;
        }
        &::after {
          width: 14px;
          height: 14px;
          background: #ff6600;
          display: inline-block;
          position: absolute;
          border-radius: 7px;
          left: 0;
          right: 0;
          content: "";
          margin: 0 auto;
          top: 15px;
        }
      }
    }
    &.end {
      .middle {
        height: 50px;
        display: inline-block;
        img {
          top: 20px;
        }
        &::before {
          display: none;
        }
      }
    }
  }
}
</style>
