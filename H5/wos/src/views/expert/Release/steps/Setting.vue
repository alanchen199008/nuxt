<template>
  <div class="release-recommned">
    <div class="release-recommned-header">
      <van-nav-bar title="擅长联赛" left-arrow @click-left="goBack" />
    </div>
    <div class="release-recommned-content">
      <div class="match-message-tabs" style="background:##F5F5F5">
        <van-tabs v-model="params.machType" type="card" @change="handleChange">
          <van-tab
            v-for="tab in tabs"
            :key="tab.key"
            :name="tab.name"
            :title="tab.label"
          >
            <div class="buttons">
              <van-row type="flex">
                <van-col
                  v-for="(button, index) in buttons"
                  :key="index"
                  span="6"
                  flex="cross:center"
                >
                  <button
                    class="tag-button"
                    :class="button.active ? 'active' : ''"
                    :disabled="button.disabled"
                    @click="handleClick(button)"
                  >
                    {{ button.competitionName }}
                  </button>
                </van-col>
              </van-row>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
    <div class="release-recommned-footer" flex="box:mean">
      <div>
        <button class="clean" @click="handleClean">清空</button>
      </div>
      <div>
        <button class="next" @click="handleNext">下一步</button>
      </div>
    </div>
  </div>
</template>

<script>
import { getCompetitonList, setExpertGreatGame } from '@/api/expert'
export default {
  data() {
    return {
      params: {
        machType: 1
      },
      tabs: [
        { label: '全部', name: 1, key: 0 },
        { label: '足球', name: 2, key: 1 }
        // { label: '北单', name: 3, key: 2 }
      ],
      buttons: [],
      greatForm: {
        ballType: 1,
        matchType: 1,
        greatGames: [],
        greatGameIds: []
      }
    }
  },
  watch: {
    competitionIds() {
      if (this.greatForm.greatGameIds.length >= 3) {
        this.buttons.map(item => {
          if (item.active === false) {
            item.disabled = true
          }
          return item
        })
      } else {
        this.buttons.map(item => {
          item.disabled = false
          return item
        })
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    goBack() {
      this.$parent.prev(-1)
    },
    getData() {
      this.buttons = []
      getCompetitonList(this.params).then(([data, error]) => {
        this.buttons = data
        this.buttons.map(item => {
          this.$set(item, 'active', false)
          this.$set(item, 'disabled', false)
          return item
        })
      })
    },
    handleClean() {
      this.greatForm.greatGames = []
      this.greatForm.greatGameIds = []
      this.buttons.map(item => {
        item.active = false
        item.disabled = false
      })
    },
    handleClick(item) {
      if (item.active) {
        item.active = false
        this.greatForm.greatGameIds.map((id, index) => {
          if (item.competitionId === id) {
            this.greatForm.greatGameIds.splice(index, 1)
            this.greatForm.greatGames.splice(index, 1)
          }
          return item
        })
      } else {
        item.active = true
        this.greatForm.greatGameIds.push(item.competitionId)
        this.greatForm.greatGames.push(item.competitionName)
      }
    },
    handleChange(name) {
      this.greatForm.machType = name
      this.getData()
    },
    handleNext() {
      if (this.greatForm.greatGameIds.length === 0) {
        return this.$toast('请选择联赛赛事!')
      }
      const data = {
        ballType: this.greatForm.ballType,
        machType: this.greatForm.machType,
        greatGames: this.greatForm.greatGames.toString(),
        greatGameIds: this.greatForm.greatGameIds.toString()
      }
      setExpertGreatGame(data).then(([data, error]) => {
        if (!error) {
          if (data === 0) {
            return this.$toast('设置擅长失败')
          }
          this.$parent.next()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.release-recommned {
  background: #f5f5f5;
  .release-recommned-content {
    height: calc(100vh - 110px);
    overflow: hidden;
    .van-tab__pane {
      height: calc(100vh - 165px);
      overflow: hidden;
      .buttons {
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
      }
      .van-row {
        padding: 15px;
        .van-col--6 {
          text-align: center;
          padding: 4px;
        }
      }
    }
  }
  .release-recommned-footer {
    border-top: 1px solid #ebebeb;
    background: #fff;
    div {
      padding: 10px 20px;
      line-height: 0;
      text-align: center;
      button {
        width: 100%;
        line-height: 40px;
        font-size: 18px;
        color: #fff;
        border-radius: 4px;
        &.clean {
          background: #cccccc;
        }
        &.next {
          background: #00c8b0;
        }
      }
    }
  }
}
::v-deep .van-tabs__wrap {
  background: #f5f5f5;
  padding: 25px 0;
}
::v-deep .van-tabs__content {
  background: #fff;
}
</style>
