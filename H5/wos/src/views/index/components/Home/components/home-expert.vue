<template>
  <d-card title="足球专家" full @right-click="_rightClick">
    <van-row class="hot-expert">
      <van-col v-for="(item, i) in expertlst" :key="i" :span="6" class="hot-expert-item" @click="goExpertDetail(item)">
        <Avatar :src="item.avatar" />
        <div class="hot-expert-item__name">{{ item.nickName }}</div>
        <div class="hot-expert-item__rate">{{ parseInt(item.returnrate) }}%</div>
      </van-col>
    </van-row>
  </d-card>
</template>
<script>
import { DCard } from '../components'
import { getExpertList } from '@/api/home'

export default {
  name: 'HomeExpert',
  components: { DCard },
  data() {
    return {
      name: 'returnrate',
      tabs: [
        { title: '方案', name: 'recommend' },
        { title: '胜率榜', name: 'winrate' },
        { title: '返还榜', name: 'returnrate' }
      ],
      expertlst: []
    }
  },
  mounted() {
    this.getData(this.name)
  },
  methods: {
    getData(sortby) {
      getExpertList({ sortBy: 'week_returnrate', limitNum: 8 })
        .then(([data, error]) => {
          if (!error) {
            this.expertlst = data
          }
        })
    },
    handleSortBy(name) {
      this.name = name
      this.getData(this.name)
    },
    _rightClick() {
      this.$router.push({ name: 'Expert' })
    },
    goExpertDetail(item) {
      this.$router.push({ name: 'HomeExpert', params: { id: item.expertId, from: this.$route.name }})
    }
  }
}
</script>
<style lang="scss" scoped>
.hot-expert {
  padding-bottom: 10px;
  &-item {
    text-align: center;
    font-size: 12px;
    color: #666;
    padding: 10px 0;
    height: 112px;
    &__avatar{
      border: 2.5px solid #eee;
      width: 58px;
      height: 58px;
    }
    &__rate {
      color: #FF512E;
      font-weight: 500;
      font-family: DIN-Medium;
    }
    &__more{
      padding: 15px;
      border:  2.5px solid #eee;
      border-radius: 50%;
      display: inline-block;
      .icon-more{
        font-size: 32px;
        color: #c3c3c3;
      }
    }
  }
}
</style>
