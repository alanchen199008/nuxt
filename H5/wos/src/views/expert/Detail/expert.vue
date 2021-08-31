<template>
  <div class="expert-inner">
    <van-nav-bar left-arrow :border="false" style="background-color: transparent;" @click-left="toBack">
      <template #title>
        <font color="#ffffff">专家详情</font>
      </template>
      <template #right>
        <img-icon v-if="!self" :icon-name="icon" size="mini" @click="handleAttention(expertId)" />
      </template>
    </van-nav-bar>
    <div class="content">
      <div class="expert-detail">
        <expert-detail :data="expert.detail" />
        <expert-chart v-if="expert.recent.recentRecord && expert.recent.recentRecord.length > 2" :expertid="expert.chart.expertid" />
        <expert-recent :data="expert.recent" />
        <expert-recommend :items="expert.recommendList" :expert-id="expertId" />
        <expert-recommend-history :items="expert.recommendList" :expert-id="expertId" />
      </div>
    </div>
    <silde-left-view />
  </div>
</template>
1
<script>
import { ExpertDetail, ExpertChart, ExpertRecent, ExpertRecommend, ExpertRecommendHistory } from './components'
import { getExpertDetail, getMemberRecommendList, doExpertAttention } from '@/api/expert'
import { mapGetters } from 'vuex'
export default {
  components: {
    ExpertDetail,
    ExpertChart,
    ExpertRecent,
    ExpertRecommend,
    ExpertRecommendHistory
  },
  data() {
    return {
      pid: null,
      self: false,
      icon: '',
      from: '',
      expert: {
        detail: {},
        chart: {
          expertid: null,
          odds: '',
          hit: ''
        },
        recommendList: [],
        concernFlag: false,
        recent: {
          recentRecord: null
        }
      },
      back: {}
    }
  },
  computed: {
    ...mapGetters(['memberId'])
  },
  created() {
    const { id, pid } = this.$route.params
    if (pid) {
      this.pid = pid
    } else {
      this.getData({ expertId: id })
    }
    this.expert.chart.expertid = this.expertId = id.toString()
  },
  methods: {
    getData(params) {
      getExpertDetail(params)
        .then(([data, error]) => {
          if (!error) {
            this.expertMemberId = data.memberId
            this.expert.detail = {
              avatar: data.avatar,
              nickName: data.nickName,
              positionLogo: data.positionLogo,
              positionName: data.positionName,
              introduction: data.introduction,
              greatGames: data.greatGames,
              fansNum: data.fansNum,
              artcileNum: data.artcileNum,
              returnrate: data.returnrate
            }
            this.expert.recent = {
              recentRecord: data.recentRecord,
              linkwin: data.linkwin
            }
            data.concernFlag ? this.icon = 'unattention' : this.icon = 'attention'
            this.memberId === data.memberId ? this.self = true : this.self = false
          }
        })
      getMemberRecommendList(params)
        .then(([data, error]) => {
          if (!error) {
            this.expert.recommendList = data || []
          }
        })
    },
    handleAttention(id) {
      if (this.self) return
      doExpertAttention({ expertId: id })
        .then(([data, error]) => {
          if (!error) {
            if (data === 1) { this.icon = 'unattention' }
            if (data === 0) { this.icon = 'attention' }
          }
        })
    },
    toBack() {
      this.$router.back(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.expert-inner {
  background: linear-gradient(45deg, #00d1cb 0%, #00a0e3 100%) no-repeat $--background-color-base;
  background-size: 100% 97px;
  ::v-deep .van-nav-bar .van-icon {
    color: white;
  }
  ::v-deep .van-nav-bar_title   {
    color: white;
  }
  .content {
    height: calc(100vh - 44px);
    overflow: hidden;
    .expert-detail {
      font-size: 14px;
      padding: 0 10px;
      position: relative;
      z-index: 1;
      overflow-x:hidden;
      overflow-y:auto;
      height: 100%;
      .panel {
        background: #fff;
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.04);
        border-radius: 6px;
        margin-bottom: 10px;
        padding: 15px;
      }
    }
  }
}
</style>
