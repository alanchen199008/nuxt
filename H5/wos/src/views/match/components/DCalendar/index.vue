<template>
  <div>
    <div class="d-calendar" flex="cross:center box:mean">
      <div ref="list" class="quick-list">
        <div ref="main" class="quick-list-main" flex="cross:center">
          <button
            v-for="(item, index) in items"
            :key="index"
            ref="item"
            class="item"
            flex-box="1"
            :class="isActive === index ? 'active' : ''"
            :disabled="item.disabled"
            @click="handleClick(item, index)"
          >
            <b v-if="item.value === today">
              {{ item.value | parseTime("{m}-{d}") }}
            </b>
            <template v-else>
              {{ item.value | parseTime("{m}-{d}") }}
            </template>
            <br>
            <template v-if="item.value === today"><b>今日</b></template>
            <template v-else>周{{ item.value | parseTime("{a}") }}</template>
          </button>
        </div>
      </div>

      <div class="calendar-button van-hairline--left" flex-box="0">
        <img-icon icon-name="calendar" size="small" @click="handleCalendar" />
      </div>
      <van-popup v-model="isCalendar" round style="position:absolute; width:85%; overflow:visible;">
        <div class="calendar">
          <div class="calendar-header">
            <font> {{ today | parseTime("{y}") }}年</font>
          </div>
          <div class="calendar-content">
            <calendar :sunday-start="true" :chose="chose" :ago-day-hide="postation === '1' ? disabled : ''" :future-day-hide="postation === '0' ? disabled : ''" @choseDay="choseDay" />
          </div>
          <div class="calendar-footer">
            <button @click="handleCancel">取消</button> <button @click="handleConfirm">确认</button>
          </div>
        </div>
      </van-popup>
    </div>
    <div v-if="isDate" class="date">{{ chose | parseTime('{y}-{m}-{d} 周{a}') }}</div>
  </div>
</template>
<script>
import { parseTime } from '@/utils'
import Calendar from '@/components/Calendar'
export default {
  name: 'DCalendar',
  components: { Calendar },
  props: {
    postation: {
      type: String,
      default: '' // 0 完赛 1赛程
    }
  },
  data() {
    return {
      isActive: null,
      items: [],
      today: parseTime(new Date(), '{y}/{m}/{d}'),
      chose: parseTime(new Date(), '{y}/{m}/{d}'),
      isCalendar: false,
      disabled: '',
      isDate: false
    }
  },
  created() {
    this.items = this.getItems(7, this.postation)
    this.items.map((item, index) => {
      if (this.today === item.value) {
        this.isActive = index
      }
      if (this.postation === '0' && new Date(this.today).getTime() < new Date(item.value).getTime()) {
        item.disabled = true
      }
      return item
    })
  },
  mounted() {
    if (this.postation === '0') {
      this.$refs.main.scrollLeft = this.$refs.item[0].offsetWidth * 4
    }
    if (this.postation === '0') {
      this.disabled = Number(new Date().getTime() / 1000).toFixed(0).toString()
    }
    if (this.postation === '1') {
      this.disabled = Number(new Date().getTime() / 1000 - 86400).toFixed(0).toString()
    }
  },
  methods: {
    handleClick(item, index) {
      this.isDate = false
      if (this.isActive !== index) {
        this.isActive = index
        this.chose = item.value
        this.$emit('click', parseTime(item.value, '{y}-{m}-{d}'))
      }
    },
    getContainer() {
      return document.querySelector('.app-wrapper')
    },
    getItems(num, postation) {
      const now = new Date(new Date().setHours(0)).getTime()
      let time = 1000 * 60 * 60 * 24
      let beforeDays = []
      let afterDays = []
      let array = []
      for (let i = 0; i <= num - 1; i++) {
        beforeDays.push({
          value: parseTime(now - time * (i + 1), '{y}/{m}/{d}'),
          disabled: false
        })
        afterDays.push({
          value: parseTime(now + time * (i + 1), '{y}/{m}/{d}'),
          disabled: false
        })
      }
      if (postation === '0') {
        array = [...beforeDays.reverse(),
          { value: parseTime(now, '{y}/{m}/{d}'), disabled: false }]
      }
      if (postation === '1') {
        array = [
          { value: parseTime(now, '{y}/{m}/{d}'), disabled: false },
          ...afterDays
        ]
      }
      return array
    },
    choseDay(value) {
      this.chose = value
    },
    handleCalendar() {
      this.isCalendar = true
    },
    handleConfirm() {
      this.isCalendar = false
      this.isActive = null
      this.items.map((item, index) => {
        if (new Date(this.chose).getTime() === new Date(item.value).getTime()) {
          this.isActive = index
          if (this.postation === '0') {
            this.$refs.main.scrollLeft = (this.$refs.item[0].offsetWidth * index * -1) - (this.$refs.item[0].offsetWidth * 3)
          } else {
            this.$refs.main.scrollLeft = (this.$refs.item[0].offsetWidth * index) - (this.$refs.item[0].offsetWidth * 3)
          }
        }
        return item
      })
      let max = new Date(this.items[this.items.length - 1].value).getTime()
      let min = new Date(this.items[0].value).getTime()
      let active = new Date(this.chose).getTime()
      if (active < min || active > max) {
        this.isDate = true
      } else {
        this.isDate = false
      }
      this.$emit('confirm', this.chose)
    },
    handleCancel() {
      this.isCalendar = false
    }
  }
}
</script>

<style lang="scss" scoped>
.date{
  font-size: 14px;
  text-align: center;
  color: #edb445;
  line-height: 24px;
  margin-bottom: 5px;
}
.d-calendar {
  background: linear-gradient(0deg, #ffffff 0%, #f5f5f5 100%);
  margin-top: 2px;
  margin-bottom: 5px;
  padding: 7px 0;
  .quick-list {
    overflow: hidden;
    height: 34px;
    &-main {
      height: 100%;
      overflow-x: auto;
      &::-webkit-scrollbar {
        display: none;
      }
      .item {
        background: none;
        @include DIN-FONT(10px);
        width: 46.67px;
        padding: 0 8px;
        display: inline-block;
        text-align: center;
        user-select: none;
        white-space: nowrap;
        color: #666;
        &.active {
          color: #21d4ad;
        }
        &[disabled] {
          color: #999;
        }
      }
    }
  }
  .calendar-button {
    width: 48px;
    height: 27px;
    line-height: 27px;
    text-align: center;
    .img-icon {
      margin-top: -8px;
    }
  }
  & ::v-deep .van-popup--round {
    border-radius: 4px;
    .calendar {
      position: relative;
      padding-bottom: 14px;
      .calendar-header {
        position: relative;
        left: 0;
        right: 0;
        top: -34px;
        height: 160px;
        background: url("~@/assets/public/calendar-header.png") no-repeat bottom center;
        background-size: 100% auto;
        padding: 50px 40px;
        font {
          color: #fff;
          font-size: 18px;
          font-weight: bold;
        }
      }
      .calendar-footer {
        text-align: right;
        padding: 0 9px;
        line-height: 32px;
        button {
          font-size: 13px;
          background: none;
          margin: 0 15px 0 15px;
          vertical-align: middle;
        }
      }
    }
  }
}
</style>
