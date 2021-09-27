<template>
  <div class="release-recommned">
    <div class="release-recommned-header">
      <van-nav-bar left-arrow @click-left="$parent.prev()"  @click-right="onClickRight">
        <template #title>
          选择赛事
        </template>
        <template #right>
          <img src="@/assets/expert/filter.png" width="18" height="18">
        </template>
      </van-nav-bar>
    </div>
    <filter></filter>
    <div class="release-recommned-content">
      <div class="release-match-group">
        <div class="release-match-group-hd">
          2021-07-28&nbsp;&nbsp;周一&nbsp;&nbsp;共2场比赛&nbsp;&nbsp;已选1场
          <img class="more" src="~@/assets/expert/arrow.png" />
        </div>
        <div class="release-match-group-bd">
          <div class="release-match-group-item">
            <van-checkbox class="check" checked-color="#00B48DFF"></van-checkbox>
            <div class="release-match-group-item-row">
              <div class="left">
                <div style="flex:1">
                  <span style="color:#FF9E20FF">爱尔高联</span>&nbsp;&nbsp;3023
                </div>07-28
              </div>
              <div class="center"></div>
              <div class="right">
                15:00   
              </div>
            </div>
            <div class="release-match-group-item-row">
              <div class="left">
                <span class="teamname">
                  智利女足   
                </span>
              </div>
              <div class="center">VS</div>
              <div class="right">
                <span class="teamname">
                  日本女足   
                </span>
                
              </div>
            </div>
          </div>
          <div class="release-match-group-item">
            <van-checkbox class="check" checked-color="#00B48DFF"></van-checkbox>
            <div class="release-match-group-item-row">
              <div class="left">
                <div style="flex:1">
                  <span style="color:#FF9E20FF">爱尔高联</span>&nbsp;&nbsp;3023
                </div>
                07-28 
              </div>
              <div class="center"></div>
              <div class="right">
                15:00   
              </div>
            </div>
            <div class="release-match-group-item-row">
              <div class="left">
                <span class="teamname">
                  智利女足   
                </span>
              </div>
              <div class="center">VS</div>
              <div class="right">
                <span class="teamname">
                  日本女足   
                </span>
                
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="release-match-group current">
        <div class="release-match-group-hd">
          2021-07-28&nbsp;&nbsp;周一&nbsp;&nbsp;共2场比赛&nbsp;&nbsp;已选1场
          <img class="more" src="~@/assets/expert/arrow.png" />
        </div>
        <div class="release-match-group-bd">
          <div class="release-match-group-item">
            <van-checkbox class="check" checked-color="#00B48DFF"></van-checkbox>
            <div class="release-match-group-item-row">
              <div class="left">
                <div style="flex:1">
                  <span style="color:#FF9E20FF">爱尔高联</span>&nbsp;&nbsp;3023
                </div>
                07-28 
              </div>
              <div class="center"></div>
              <div class="right">
                15:00   
              </div>
            </div>
            <div class="release-match-group-item-row">
              <div class="left">
                <span class="teamname">
                  智利女足   
                </span>
              </div>
              <div class="center">VS</div>
              <div class="right">
                <span class="teamname">
                  日本女足   
                </span>
                
              </div>
            </div>
          </div>
          <div class="release-match-group-item">
            <van-checkbox class="check" checked-color="#00B48DFF"></van-checkbox>
            <div class="release-match-group-item-row">
              <div class="left">
                <div style="flex:1">
                  <span style="color:#FF9E20FF">爱尔高联</span>&nbsp;&nbsp;3023
                </div>
                07-28 
              </div>
              <div class="center"></div>
              <div class="right">
                15:00   
              </div>
            </div>
            <div class="release-match-group-item-row">
              <div class="left">
                <span class="teamname">
                  智利女足   
                </span>
              </div>
              <div class="center">VS</div>
              <div class="right">
                <span class="teamname">
                  日本女足   
                </span>
                
              </div>
            </div>
          </div>
        </div>
      </div>
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
      <!-- <div class="filter-button">
        <button @click="handleSelect">全选</button>
        <button @click="toggleSelect">反选</button>
      </div> -->
      <van-button class="liner-gradient" @click="handleConfirm">
        下一步
      </van-button>
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
      // params: {
      //   "level": 3,
      //   "ballType": 1,
      //   // "tenantCode": "",
      //   "type": 1,
      //   "condition": true
      // },
      query: {
        "level": 3,
        "ballType": 1,
        // "tenantCode": "",
        "type": 2,
        "condition": true
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
    },
    onClickRight() {
      this.$router.push({ name: 'ExpertReleaseFiter'})
    }

  }
}
</script>

<style lang="scss" scoped>
.release-recommned {
  background: #f6f6f6;
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
    height: calc(100vh - 114px);
    overflow: hidden;
    background: #f6f6f6;
    .release-recommned-main {
      height: calc(100% - 70px);
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
    // border-top: 1px solid #ebebeb;
    background: #f6f6f6;
    font-size: 14px;
    padding: 12px 14px;
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
      width: 100%;
      height: 46px;
      font-size: 16px;
      border-radius: 22px;
    }
  }
}
.release-match-group {
  margin: 8px 10px 0;
  font-size: 12px;
  &-hd {
    color: #007C61FF;
    line-height: 25px;
    background: #8ADAC9;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    .more {
      width: 11px;
      height: 6px;
      // transform: rotate(-90deg);
      position: absolute;
      right: 10px;
    }
  }
  &-item {
    background: #FFFFFFFF;
    border-radius: 5px;
    margin-top: 8px;
    padding: 4px 12px;
    color: #333333FF;
    position: relative;
    .check{
      position: absolute;
      right: 10px;
      top: 50%;
      margin-top: -8px;
    }
    &-row{
      display: flex;
      padding: 4px 0;
      .left {
        flex: 1;
        display: flex;
        justify-content: flex-end;
        .teamname {
          text-align: right;
        }
      }
      .center {
        width: 32px;
        font-size: 15px;
        color: #CCCCCCFF;
        text-align: center;
        font-weight: bold;
      }
      .right {
        flex: 1;
      }
      .teamname {
        width: 110px;
        font-weight: bold;
      }
    }
    
  }
  &.current {
    .more {
      transform: rotate(-90deg);
    }
    .release-match-group-bd {
      display: none;
    }
  }
}
</style>
