<template>
  <div class="release-recommned">
    <div class="release-recommned-header">
      <van-nav-bar left-arrow @click-left="$parent.prev()">
        <template #title>
          <div class="tab" flex="box:mean">
            <div
              v-for="(item, index) in types"
              :key="index"
              :class="params.type == item.value ? 'active' : ''"
              @click="typeChange(item)"
            >
              {{ item.label }}
            </div>
          </div>
        </template>
      </van-nav-bar>
    </div>
    <div class="release-recommned-content">
      <div class="release-recommned-main">
        <van-row>
          <van-col
            v-for="(button, index) in buttons"
            :key="index"
            span="6"
            flex="cross:center"
          ><button
            class="tag-button"
            :class="button.active ? 'active' : ''"
            @click="handleClick(button)"
          >
            {{ button.competitionName }}
          </button>
          </van-col>
        </van-row>
      </div>
    </div>
    <div class="release-recommned-footer" flex="box:last">
      <div class="filter-button">
        <button @click="handleSelect">全选</button>
        <button @click="toggleSelect">反选</button>
      </div>
      <van-button class="liner-gradient" @click="handleConfirm">{{
        $t("confirm")
      }}</van-button>
    </div>
  </div>
</template>

<script>
import { getLiveCompetitonList } from '@/api/expert'
import variables from '@/styles/variables.scss'
export default {
  data() {
    return {
      params: {
        ballType: 1,
        type: 2,
        competitionIds: []
      },
      query: {
        type: 2
      },
      rules: [],
      radio: null,
      types: [
        { label: '足球', value: 2 }
        // { label: '北单', value: 3 }
      ],
      buttons: []
    }
  },
  computed: {
    checkColor() {
      return variables.primaryColor
    }
  },
  created() {
    this.getData(this.query)
  },
  methods: {
    getData(params) {
      this.buttons = []
      getLiveCompetitonList(params).then(
        ([data, error]) => {
          if (!error) {
            this.buttons = data.map((item, index) => {
              this.$set(item, 'active', false)
              return item
            })
          }
        }
      )
    },
    typeChange(item) {
      if (this.params.type !== item.value) {
        this.radio = null
        this.params.competitionIds = []
        this.params.type = item.value
        this.query.type = item.value
        this.getData(this.query)
      }
    },
    handleClick(item) {
      if (item.active) {
        item.active = false
        this.params.competitionIds.map((i, index) => {
          if (item.competitionId === i) {
            this.params.competitionIds.splice(index, 1)
          }
          return item
        })
        this.rules.map((i, index) => {
          if (item.competitionId === i.competitionId) {
            this.rules.splice(index, 1)
          }
          return item
        })
      } else {
        item.active = true
        this.params.competitionIds.push(item.competitionId)
        const obj = {
          competitionId: item.competitionId,
          rules: item.rules
        }
        this.rules.push(obj)
      }
    },
    handleSelect() {
      this.params.competitionIds = []
      this.buttons.map(item => {
        item.active = true
        this.params.competitionIds.push(item.competitionId)
      })
    },
    toggleSelect() {
      this.params.competitionIds = []
      this.buttons.map(item => {
        if (item.active) {
          item.active = false
        } else {
          item.active = true
          this.params.competitionIds.push(item.competitionId)
        }
        return item
      })
    },
    handleConfirm() {
      if (this.params.competitionIds.length === 0) {
        return this.$toast('至少选择一个联赛!')
      }
      this.$parent._handleSetMatch(this.params)
      this.$parent.next()
    }
  }
}
</script>

<style lang="scss" scoped>
.release-recommned {
  background: #fff;
  .release-recommned-header {
    background: #fff;
    .tab {
      width: 144px;
      div {
        border: 1px solid #e0e0e0;
        line-height: 32px;
        font-size: 14px;
        &.active {
          background: #00c8b0;
          border-color: #00c8b0;
          color: #fff;
        }
        &:first-child {
          border-right: 0;
          border-top-left-radius: 16px;
          border-bottom-left-radius: 16px;
        }
        &:last-child {
          border-left: 0;
          border-top-right-radius: 16px;
          border-bottom-right-radius: 16px;
        }
      }
    }
  }
  .release-recommned-content {
    height: calc(100vh - 104px);
    overflow: hidden;
    .release-recommned-main {
      height: calc(100% - 54px);
      overflow-x: hidden;
      overflow-y: auto;
      .van-row {
        padding: 15px;
        .van-col--6 {
          text-align: center;
          padding: 4px;
        }
      }
    }

    .info {
      .van-icon {
        vertical-align: middle;
        margin-top: -2px;
      }
      padding: 0 15px;
      line-height: 24px;
      font-size: 12px;
      text-align: justify;
    }
  }
  .release-recommned-footer {
    border-top: 1px solid #ebebeb;
    background: #fff;
    font-size: 14px;
    padding: 12px 10px;
    .filter-button {
      button {
        width: 58px;
        background: #f8f8f8;
        line-height: 32px;
        border: 1px solid #e0e0e0;
        font-size: 12px;
        color: #666;
        &:first-child {
          border-top-left-radius: 16px;
          border-bottom-left-radius: 16px;
          margin-right: -1px;
        }
        &:last-child {
          border-top-right-radius: 16px;
          border-bottom-right-radius: 16px;
          margin-left: -1px;
        }
      }
    }
    button.liner-gradient {
      width: 90px;
      height: 35px;
      font-size: 17px;
    }
  }
}
</style>
