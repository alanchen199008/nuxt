<template>
  <div class="record-filter">
    <div flex="cross:center">
      <van-checkbox v-model="currentSameTeam" @change="onChangeTeam">
        <slot>同主客</slot>
        <template #icon="props">
          <img class="img-icon" :src="props.checked ? activeIcon : inactiveIcon">
        </template>
      </van-checkbox>
      <van-checkbox v-model="currentSameCompetition" @change="onChangeCompetition">
        同赛事
        <template #icon="props">
          <img class="img-icon" :src="props.checked ? activeIcon : inactiveIcon">
        </template>
      </van-checkbox>
    </div>
    <div class="record-filter-tab">
      <div
        v-for="t in [10, 20]"
        :key="t"
        class="record-filter-tab__item"
        :class="[t === currentNumber && 'active']"
        @click="onChangeNumber(t)"
      >{{ t }}场</div>
    </div>
  </div>
</template>

<script>
import activeIcon from '@/assets/public/checkbox-checked.png'
import inactiveIcon from '@/assets/public/checkbox.png'
export default {
  props: {
    team: {
      type: Boolean,
      default: false
    },
    competition: {
      type: Boolean,
      default: false
    },
    number: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      activeIcon,
      inactiveIcon,
      currentSameTeam: this.team,
      currentSameCompetition: this.competition,
      currentNumber: this.number
    }
  },
  methods: {
    onChangeTeam(value) {
      this.$emit('update:team', value)
    },
    onChangeCompetition(value) {
      this.$emit('update:competition', value)
    },
    onChangeNumber(value) {
      this.currentNumber = value
      this.$emit('update:number', value)
    }
  }
}
</script>

<style lang="scss" scoped>
.record-filter {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0 10px 0;
  ::v-deep .van-checkbox  {
    & + .van-checkbox {
      margin-left: 16px;
    }
    &__label {
      color: var(--text-primary);
    }
  }
  .img-icon {
    width: 13px;
    height: 13px;
  }

  &-tab {
    &__item {
      display: inline-block;
      width: 45px;
      height: 20px;
      line-height: 20px;
      background-color: #F1F0F2;
      text-align: center;
      cursor: pointer;
      &:first-child {
        border-radius: 2px 0 0 2px;
      }
      &:last-child {
        border-radius: 0 2px 2px 0;
      }
      &.active {
        color: white;
        background-color: var(--paper-green-700);
      }
    }
  }
}
</style>
