<template>
  <div class="site-list">
    <div class="list-item">
      <div class="empty">暂无数据</div>
    </div>

    <!-- <div class="list-item">
      <div class="site-name">温布利球场</div>
      <div class="site-address"><img src="https://m.leisu.com/_nuxt/img/britain.2d861fa.jpg" alt="">英国伦敦</div>
      <div class="site-picture">
        <div class="img" :style="{backgroundImage:'url(https://m.leisu.com/_nuxt/img/1005-1.5c1b62d.jpg)'}" />
      </div>
    </div>  -->
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.site-list{
  margin-top: 10px;
  padding: 0 8px 10px 8px ;
 .list-item{
   margin-top: 10px;
   padding: 12px;
   background: #FFF;
   .site-name{
     font-size: 18px;
     font-weight: 400;
     line-height: 32px;
   }
   .site-address{
     line-height: 32px;
     img{
       width:20px ;
       height: 20px;
       border-radius: 50%;
       vertical-align: middle;
       margin-top: -4px;
       margin-right: 4px;
     }
   }
   .site-picture{
     width: 335px;
     height: 186px;
     .img{
       width: inherit;
       height: inherit;
       background-repeat: no-repeat;
       background-size: contain;
     }
   }
 }
 .empty{
   color: #888;
   text-align: center;
   font-size: 14px;
 }
}
</style>
