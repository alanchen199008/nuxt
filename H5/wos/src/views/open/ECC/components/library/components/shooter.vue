<template>
  <div class="content">
    <div class="module">
      <div class="module-title">
        <div class="list-item" flex="cross:center box:mean">
          <div flex-box="0" class="rank">名次</div>
          <div flex-box="1" class="name">球员</div>
          <div flex-box="1" class="country">国家</div>
          <div flex-box="0" class="total">总进球</div>
        </div>
      </div>
      <div class="module-content">
        <div class="shooter-list">
          <div v-for="(item,index) in items" :key="index" class="list-item van-hairline--bottom" flex="cross:center box:mean">
            <div class="rank" flex-box="0"><font v-if="index <= 2" color="#6b71ea">{{ item.position }}</font> <template v-else>{{ item.position }}</template></div>
            <div class="name" flex-box="1">{{ item.player }}</div>
            <div class="country" flex-box="1">{{ item.teamName }}</div>
            <div class="total" flex-box="0">{{ item.goalNumber }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getShooterTops } from '@/api/euro'
export default {
  data() {
    return {
      items: []
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      getShooterTops().then(([data, error]) => {
        if (!error) {
          this.items = data
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.module {
  margin: 10px 14px;
  background: #fff;
  padding:5px;
  .module-title {
    font-weight: 400;
    .list-item {
      line-height: 28px;
      text-align: center;
      .rank {
        width: 40px;
      }
      .name {
      }
      .country {
      }
      .total {
        width: 40px;
      }
    }
  }
  .module-content {
    .empty {
      text-align: center;
      color:#888;
    }
    .list-item {
      line-height: 48px;
      .rank {
        width: 40px;
        text-align: center;
      }
      .name {
      }
      .country {
        text-align: center;
      }
      .total {
        width: 40px;
        text-align: center;
      }
    }
  }
}
</style>
