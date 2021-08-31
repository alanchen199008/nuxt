<template>
  <div>
    <van-nav-bar
      title="标题"
      left-text="返回"
      left-arrow
      @click-left="$router.go(-1)"

      :fixed="true"
    />
    
    <van-checkbox-group class="card-goods" v-model="checkedGoods">
      <div class="card-goods__item flex"
        v-for="item in goods"
        :key="item.id"
        >
      <van-checkbox :name="item.id" >
      </van-checkbox>
      <NuxtLink :to="{name:'goods',params:{productId:item.id,title:item.name}}">
        <van-card
            :title="item.name"
            :desc="item.desc"
            :num="item.num"
            :price="formatPrice(item.float_delivery_fee)"
            :thumb="filePath(item.image_path)"
          >
        </van-card>
      </NuxtLink>
      </div>
      
    </van-checkbox-group>
    <van-submit-bar
      :price="totalPrice"
      :disabled="!checkedGoods.length"
      :button-text="submitBarText"
      @submit="onSubmit"
    />
  </div>
</template>

<script>
import { Checkbox, CheckboxGroup, Card, SubmitBar, Toast } from 'vant';
import config from "~/config";
import {
  restaurants
} from "~/assets/services/shopping";
  import * as shoppingApi from "~/assets/services/shopping";

export default {
  metaInfo: {
    title: 'Foo Bar'
  },
  // 独立设置head信息
  head(){
      return{
        title:'购物车',
        meta:[
          {hid:'description',name:'news',content:'This is news page'}
        ]
      }
  },
  components: {
    [Card.name]: Card,
    [Checkbox.name]: Checkbox,
    [SubmitBar.name]: SubmitBar,
    [CheckboxGroup.name]: CheckboxGroup
  },
  async asyncData({ app }) {
      const {
        data
      } = await restaurants();
      // const { data } = await app.$axios.$get('/api/shopping/restaurants')
      return {
        goods: data
      };
  },
  data() {
    return {
      checkedGoods: [],
      goods: []
    };
  },
  async mounted() {
    // const {
    //   data
    // } = await restaurants();
    // // const { data } = await this.$axios.$get('/api/shopping/restaurants')
    // this.goods=data

  },
  computed: {
    submitBarText() {
      const count = this.checkedGoods.length;
      return '结算' + (count ? `(${count})` : '');
    },

    totalPrice() {
      return this.goods.reduce((total, item) => {
        return total + (this.checkedGoods.indexOf(item.id) !== -1 ? parseFloat(item.float_delivery_fee) : 0)
      }, 0);
      
    }
  },
  filters: {
  },
  methods: {
    formatPrice(price) {
      return (price / 100).toFixed(2);
    },
    filePath:function(value) {
      return config.IMG_URL + value
    },
    onSubmit() {
      Toast('点击结算');
    }
  }
};
</script>

<style lang="less">
.card-goods {
  padding: 10px 0;
  background-color: #fff;

  &__item {
    position: relative;
    background-color: #fafafa;

    .van-checkbox__label {
      width: 100%;
      height: auto; // temp
      padding: 0 10px 0 15px;
      box-sizing: border-box;
    }

    .van-checkbox__icon {
      top: 50%;
      left: 10px;
      z-index: 1;
      position: absolute;
      margin-top: -10px;
    }

    .van-card {
      margin-left: 30px;
    }

    .van-card__price {
      color: #f44;
    }
  }
}
</style>
