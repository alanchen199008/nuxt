<template>
  <div class="d-container" flex="dir:top">
    <van-pull-refresh
      v-model="refreshing"
      class="scroll-touch"
      flex-box="1"
      @refresh="onRefresh"
    >
      <template slot="pulling">
        <loader />
      </template>
      <template slot="loosing">
        <loader />
      </template>
      <template slot="loading">
        <loader />
      </template>
      <div class="swiper">
        <d-swiper />
      </div>
      <!-- <home-notice /> -->
      <home-message />
      <home-match />
      <home-expert />
      <div class="expert-title" flex="cross:center box:mean">
        <div class="expert-title-left">
          <img src="@/assets/public/flag.png"> 专家热推
        </div>
        <div class="expert-title-right">
          <!-- <span
            v-for="(item, index) in types"
            :key="item.key"
            :class="isActive === index ? 'active' : ''"
            @click="typeChange(item,index)"
          >{{ item.label }}</span> -->
        </div>
      </div>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <expert-recommend-item
          v-for="(item, index) in items.slice(0, 3)"
          :key="item.articleId"
          :item="item"
          :class="index === 0 ? 'f' : ''"
          @click="goLink"
        />
        <template v-if="items.length >= 3 && banner">
          <div class="banner">
            <img :src="banner.pic" alt="" @click="toDetail">
          </div>
        </template>
        <expert-recommend-item
          v-for="item in items.slice(3)"
          :key="item.articleId"
          :item="item"
          @click="goLink"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import usePullRefreshAndLoad from '@/mixins/usePullRefreshAndLoad'
import DSwiper from '@/components/Swiper'
import ExpertRecommendItem from '@/views/components/ExpertRecommendItem'
import {
  HomeExpert,
  // HomeNotice,
  HomeMessage,
  HomeMatch
} from './components'
import { getExpertRecommendList } from '@/api/expert'
import { getBanner } from '@/api/home'

export default {
  name: 'Home',
  components: {
    DSwiper,
    HomeExpert,
    // HomeNotice,
    HomeMessage,
    HomeMatch,
    ExpertRecommendItem
  },
  mixins: [usePullRefreshAndLoad(getExpertRecommendList)],
  data() {
    return {
      isActive: 0,
      types: [
        { value: 2, label: '足球', key: '0' }
        // { value: 3, label: '北单', key: '1' }
      ],
      params: {
        matchType: 2,
        sortBy: 'returnrate'
      },
      topItems: [],
      bottomItems: [],
      banner: null
    }
  },
  computed: {
    ...mapGetters(['mode'])
  },
  watch: {
    items() {
      this.items.map((item, index) => {
        if (item.greatGames && item.greatGames.indexOf(',') > -1) {
          item.greatGames = item.greatGames.split(',').join('/')
        }
        if (index < 3) {
          this.topItems.push(item)
        } else {
          this.bottomItems.push(item)
        }
        return item
      })
    }
  },
  created() {
    this.getRecommendBanner()
  },
  methods: {
    goLink(id) {
      this.$router.push({
        name: 'HomeRecommend',
        params: { locale: this.$i18n.locale, id }
      })
    },
    getRecommendBanner() {
      getBanner({ position: 4 }).then(([data, error]) => {
        if (!error) {
          if (data.length > 0) {
            this.banner = data[0]
          }
        }
      })
    },
    toDetail() {
      if (this.banner.jumpType === 1 && this.banner.outUrl) {
        window.location.href = this.banner.outUrl
      }
      if (this.banner.jumpType === 2) {
        this.$router.push({
          name: 'Activity',
          params: { id: this.banner.activityId }
        })
      }
    },
    typeChange(item, index) {
      if (this.isActive !== index) {
        this.isActive = index
        this.params.currentPage = 1
        this.params.matchType = item.value
        this.onRefresh()
      }
    },
    implementationGetParams() {
      return { ...this.params }
    }
  }
}
</script>

<style lang="scss" scoped>
.expert-title {
  background: #fff;
  font-size: 15px;
  color: #333;
  margin-top: 10px;
  padding: 8px 10px 0 10px;
  line-height: 30px;
  &-left {
    img {
      width: 7.5px;
      height: 12.5px;
      margin-right: 10px;
    }
  }
  &-right {
    text-align: right;
    span {
      background: #fff;
      border: 1px solid #e8e8e8;
      padding: 6px 12px;
      font-size: 13px;
      &.active {
        color: #0ac3ad;
        background: #f5f5f5;
        border-color: #f5f5f5;
      }
    }
  }
}
::v-deep .recommend-item {
  margin: 10px 0 0 0;
  padding: 15px;
  border-radius: 0;
  .recommend-item-position-name {
    left: 7.5px;
    top: 7.5px;
  }
}
.swiper{
  margin: 10px;
  border-radius: 6px;
  overflow: hidden;
}
.f {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  margin-top: 0;
}
.banner {
  margin: 10px auto;
  img {
    width: 100%;
  }
}
</style>
