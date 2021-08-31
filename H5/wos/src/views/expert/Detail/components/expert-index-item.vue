<template>
  <van-row class="expert-index-item">
    <van-col span="5" class="expert-header">
      <van-image class="expert-header-cover" round fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
      <!-- <img :src="follow" class="follow"> -->
    </van-col>
    <van-col span="14" class="expert-info">
      <ul>
        <li class="name">超人波神2</li>
        <li class="etype">分析师</li>
        <li class="odds">平均赔率：<span>1.99</span></li>

        <li>擅长联赛<span>英超、意甲</span></li>
      </ul>
    </van-col>
    <van-col span="5" class="expert-info" style="text-align:right;">
      <ul style="margin-right:10px;">
        <li class="stype"><span>818%</span></li>
        <li class="etype">返还率</li>
      </ul>
    </van-col>
  </van-row>
</template>

<script>
export default {
  name: 'ExpertIndexItem',
  data() {
    return {
      // follow: require('../../../assets/expert/follow.png'),
      // nofollow: require('../../../assets/expert/Take-the-pass.png')
    }
  }
}
</script>
<style lang="scss" scoped>
.expert-index-item {
  border: 1px solid #eeeeee;
  border-radius: 8px;
  background: #ffffff;
  margin: 0px 10px 10px 10px;
  & .expert-header {
    text-align: center;
    & .expert-header-cover {
      width: 50px;
      height: 50px;
      border: 4px solid #cecece;
      margin-top: 10px;
    }
    & .follow {
      width: 80%;
    }
  }

  & .expert-info {
    margin-top: 8px;
    & ul {
      margin: 0px;
      padding: 0px;
      list-style: none;
      & li {
        width: 100%;
        font-size: 0.32rem;
        line-height: 1.7;
      }
      & li.name {
        font-size: 0.42rem;
        color: #333333;
      }
      & li.etype {
        font-size: 0.3rem;
        color: #aaaaaa;
      }
      & li.odds {
        & span {
          font-size: 0.38rem;
        }
      }
      & li.stype {
        & span {
          color: red;
          font-size: 0.38rem;
        }
      }
    }
  }
}
</style>
