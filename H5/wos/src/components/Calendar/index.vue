<template>
  <section class="wh_container">
    <div class="wh_content_all">
      <div class="wh_top_changge">
        <li @click="PreMonth(myDate, false)">
          <div class="wh_jiantou1" />
        </li>
        <li class="wh_content_li">{{ dateTop }}</li>
        <li @click="NextMonth(myDate, false)">
          <div class="wh_jiantou2" />
        </li>
      </div>
      <div class="wh_tag">
        <div
          v-for="(tag, index) in textTop"
          :key="index"
          class="wh_content_item"
        >
          <div class="wh_top_tag">{{ tag }}</div>
        </div>
      </div>
      <div class="wh_content">
        <div
          v-for="(item, index) in list"
          :key="index"
          class="wh_content_item"
          @click="clickDay(item, index)"
        >
          <div
            class="wh_item_date"
            :class="[
              { wh_isMark: item.isMark },
              { wh_other_dayhide: item.otherMonth !== 'nowMonth' },
              { wh_want_dayhide: item.dayHide },
              { wh_isToday: item.isToday },
              { wh_chose_day: item.chooseDay },
              setClass(item)
            ]"
          >
            {{ item.id }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { parseTime } from '@/utils'
import timeUtil from './utils'
export default {
  props: {
    markDate: {
      type: Array,
      default: () => []
    },
    markDateMore: {
      type: Array,
      default: () => []
    },
    textTop: {
      type: Array,
      default: () => ['日', '一', '二', '三', '四', '五', '六']
    },
    sundayStart: {
      type: Boolean,
      default: () => false
    },
    agoDayHide: {
      type: String,
      default: ''
    },
    futureDayHide: {
      type: String,
      default: ''
    },
    chose: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      myDate: new Date(),
      list: [],
      historyChose: [],
      dateTop: ''
    }
  },
  watch: {
    markDate: {
      handler(val, oldVal) {
        this.getList(this.myDate)
      },
      deep: true
    },
    markDateMore: {
      handler(val, oldVal) {
        this.getList(this.myDate)
      },
      deep: true
    },
    agoDayHide: {
      handler(val, oldVal) {
        this.getList(this.myDate)
      },
      deep: true
    },
    futureDayHide: {
      handler(val, oldVal) {
        this.getList(this.myDate)
      },
      deep: true
    },
    sundayStart: {
      handler(val, oldVal) {
        timeUtil.sundayStart = val
        this.getList(this.myDate)
      },
      deep: true
    },
    chose: {
      handler(val, oldVal) {
        this.getList(this.myDate, val)
      },
      deep: true
    }
  },
  mounted() {
    this.getList(this.myDate, this.chose)
  },
  methods: {
    setClass(data) {
      let obj = {}
      obj[data.markClassName] = data.markClassName
      return obj
    },
    clickDay(item, index) {
      if (item.otherMonth === 'nowMonth' && !item.dayHide) {
        this.getList(this.myDate, item.date)
      }
    },
    ChoseMonth(date, isChosedDay = true) {
      date = parseTime(date, '{y}-{m}-{d}')
      this.myDate = new Date(date)
      this.$emit('changeMonth', parseTime(this.myDate, '{y}-{m}-{d}'))
      if (isChosedDay) {
        this.getList(this.myDate, date, isChosedDay)
      } else {
        this.getList(this.myDate)
      }
    },
    PreMonth(date, isChosedDay = true) {
      date = parseTime(date, '{y}-{m}-{d}')
      this.myDate = timeUtil.getOtherMonth(this.myDate, 'preMonth')
      this.$emit('changeMonth', parseTime(this.myDate, '{y}-{m}-{d}'))
      if (isChosedDay) {
        this.getList(this.myDate, date, isChosedDay)
      } else {
        this.getList(this.myDate)
      }
    },
    NextMonth(date, isChosedDay = true) {
      date = parseTime(date, '{y}-{m}-{d}')
      this.myDate = timeUtil.getOtherMonth(this.myDate, 'nextMonth')
      this.$emit('changeMonth', parseTime(this.myDate, '{y}-{m}-{d}'))
      if (isChosedDay) {
        this.getList(this.myDate, date, isChosedDay)
      } else {
        this.getList(this.myDate)
      }
    },
    forMatArgs() {
      let markDate = this.markDate
      let markDateMore = this.markDateMore
      markDate = markDate.map(k => {
        return parseTime(k, '{y}-{m}-{d}')
      })
      markDateMore = markDateMore.map(k => {
        k.date = parseTime(k.date, '{y}-{m}-{d}')
        return k
      })
      return [markDate, markDateMore]
    },
    getList(date, chooseDay, isChosedDay) {
      const [markDate, markDateMore] = this.forMatArgs()
      this.dateTop = parseTime(date, '{y}年{m}月')
      let arr = timeUtil.getMonthList(this.myDate)
      for (let i = 0; i < arr.length; i++) {
        let markClassName = ''
        let k = arr[i]
        k.chooseDay = false
        const nowTime = k.date
        const t = new Date(nowTime).getTime() / 1000
        // 看每一天的class
        for (const c of markDateMore) {
          if (c.date === nowTime) {
            markClassName = c.className || ''
          }
        }
        // 标记选中某些天 设置class
        k.markClassName = markClassName
        k.isMark = markDate.indexOf(nowTime) > -1
        // 无法选中某天
        if (this.agoDayHide) {
          k.dayHide = t < this.agoDayHide
        }
        if (this.futureDayHide) {
          k.dayHide = t > this.futureDayHide
        }
        if (k.isToday) {
          this.$emit('isToday', nowTime)
        }
        let flag = !k.dayHide && k.otherMonth === 'nowMonth'
        if (chooseDay && chooseDay === nowTime && flag) {
          this.$emit('choseDay', nowTime)
          this.historyChose.push(nowTime)
          k.chooseDay = true
        } else if (this.historyChose[this.historyChose.length - 1] === nowTime && !chooseDay && flag
        ) {
          k.chooseDay = true
        }
      }
      this.list = arr
    }
  }
}
</script>

<style lang="scss" scoped>
@media screen and (min-width: 460px) {
  .wh_item_date:hover {
    background: #71c7a5;
    cursor: pointer;
  }
}
.wh_container {
  max-width: 410px;
  margin: auto;
}
.wh_top_changge {
  display: flex;
  li {
    cursor: pointer;
    display: flex;
    color: #fff;
    font-size: 18px;
    flex: 1;
    justify-content: center;
    align-items: center;
    height: 47px;
    list-style-type: none;
    &.wh_content_li {
      cursor: auto;
      flex: 2.5;
      color: #333;
    }
  }
}
.wh_content_all {
  background: #fff;
  width: 100%;
  overflow: hidden;
}
.wh_content {
  display: flex;
  flex-wrap: wrap;
  padding: 0 3% 0 3%;
  width: 100%;
}
.wh_tag {
  display: flex;
  flex-wrap: wrap;
  padding: 0 3% 0 3%;
  width: 100%;
}
.wh_content:first-child .wh_content_item_tag,
.wh_content:first-child .wh_content_item {
  color: #ddd;
  font-size: 16px;
}
.wh_content_item,
.wh_content_item_tag {
  font-size: 15px;
  width: 13.4%;
  text-align: center;
  color: #fff;
  position: relative;
}
.wh_content_item {
  height: 40px;
}
.wh_top_tag {
  width: 40px;
  height: 40px;
  line-height: 40px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #999;
}
.wh_jiantou1 {
  width: 12px;
  height: 12px;
  border-top: 2px solid #333;
  border-left: 2px solid #333;
  transform: rotate(-45deg);
}
.wh_jiantou1:active,
.wh_jiantou2:active {
  border-color: #ddd;
}
.wh_jiantou2 {
  width: 12px;
  height: 12px;
  border-top: 2px solid #333;
  border-right: 2px solid #333;
  transform: rotate(45deg);
}
.wh_content_item > .wh_isMark {
  margin: auto;
  border-radius: 100px;
  background: blue;
  z-index: 2;
}
.wh_item_date {
  width: 32px;
  height: 32px;
  line-height: 32px;
  font-size: 14px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  color: #333;
  &.wh_other_dayhide {
    color: #fff;
  }
  &.wh_isToday {
    background: #b3b3b3;
    color: #fff;
    &.wh_chose_day {
      background: #00c8b0;
      color: #fff;
    }
  }
  &.wh_chose_day {
    background: #00c8b0;
    color: #fff;
  }
  &.wh_want_dayhide{
    color: #b3b3b3;
    &.wh_other_dayhide{
      color:#fff;
    }
  }
}
</style>
