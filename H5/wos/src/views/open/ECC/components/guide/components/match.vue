<template>
  <div class="match">
    <div class="match-content">
      <van-tabs type="card" animated title-inactive-color="#6b71ea">
        <van-tab title="背景">
          <div class="text">
            欧洲杯是由欧足联承办每四年举行一次的足坛盛会，2020年欧洲杯原定于2020年6月12日至2020年7月12日在欧足联旗下12个成员国的12座城市进行。
            2020年3月17日，欧足联宣布由于新冠疫情影响，欧洲杯推迟一年进行。2020年6月17日，欧足联正式确认2020年欧洲杯将在2021年6月12日至2021年7月12日举行，比赛名称仍保留“2020年欧洲杯”（UEFA
            Euro 2020）。 为纪念欧洲杯60年，本届欧洲杯将采用无主办国的巡回赛方式在欧洲的12个城市举行，半决赛和决赛将在英国伦敦的温布利球场举行。
          </div>
          <div class="euro-logo">
            <img src="@/assets/euro/logo.png" alt="">
          </div>

        </van-tab>
        <van-tab title="赛制">
          <div class="text">
            2020年欧洲杯共有24支球队参加正赛,分为6个小组，以小组单循环得分制比赛，每组得分最高两队与4个最好小组第三晋身16强淘汰赛，由十六强至决赛均采取一场决胜负的形式进行，若90分钟内打成平手，需加时赛再决胜负，加时并不设黄金入球或银球制，两队必须完成加时上、下半场各15分钟的赛事，加时入球较多的一队胜出，若加时后打成平手则需以点球分胜负，1984年起，欧洲杯已取消季军赛，按积分与净胜球确定三、四名。</div>
          <div class="euro-logo"><img src="@/assets/euro/logo.png" alt=""></div>
        </van-tab>
        <van-tab title="球队">
          <div class="empty">暂无数据</div>

        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
 .match{
   padding: 8px;
   .match-content{
     padding: 2px 8px;
     background: #fff;
     .text{
       padding: 4px;
       text-align: justify;
       color: #666;
       font-size: 12px;
     }
     .empty{
       text-align: center;
       color: #888;
       line-height: 48px;
     }
      .euro-logo{
        img{
          width: 80px;
          height: 80px;
          margin: 30px 128px  0 128px;
        }
      }
      ::v-deep .van-tabs {
      margin-top: 12px;
      &__nav {
        &--card {
          border: none;
          margin: 0;
          .van-tab {
            border: none;
            display: block;
            height: 0;
            border-color: transparent transparent #f7f8fa;
            border-style: none solid solid;
            border-width: 0 0 28px 11px;
            text-align: center;
            &--active {
              background: none;
              border-color: transparent transparent #6b71ea;
            }
            .van-tab__text {
              line-height: 28px;
              font-size: 14px;
            }
            &:first-child {
              transform: rotate(-180deg);
              .van-tab__text {
                transform: rotate(-180deg);
              }
            }
            &:last-child {
            }
            &:nth-child(2) {
              &.van-tab--active {
                background: #6b71ea;
              }
              background: #f7f8fa;
              transform: rotate(0deg) skew(-20deg, 0deg);
              .van-tab__text {
                transform: rotate(0deg) skew(20deg, 0deg);
              }
            }
          }
        }
      }
    }
   }

 }
</style>
