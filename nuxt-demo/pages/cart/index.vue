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
  components: {
    [Card.name]: Card,
    [Checkbox.name]: Checkbox,
    [SubmitBar.name]: SubmitBar,
    [CheckboxGroup.name]: CheckboxGroup
  },
  async asyncData() {
      const {
        data
      } = await restaurants();
      // console.log(data)
      // data.map(item => {
      //   item.image_path = config.IMG_URL + item.image_path;
      // });
      return {
        goods: data
      };
  },
  data() {
    return {
      checkedGoods: [],
      goods: [
        // {
        //   id: '1',
        //   title: '进口香蕉',
        //   desc: '约250g，2根',
        //   price: 200,
        //   num: 1,
        //   thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/2f9a36046449dafb8608e99990b3c205.jpeg'
        // }
      ]
    };
  },

  computed: {
    submitBarText() {
      const count = this.checkedGoods.length;
      return '结算' + (count ? `(${count})` : '');
    },

    totalPrice() {
      // return this.goods.reduce((total, item) => total + (this.checkedGoods.indexOf(item.id) !== -1 ? item.price : 0), 0);\
 
      return this.goods.reduce((total, item) => {
        return total + (this.checkedGoods.indexOf(item.id) !== -1 ? parseFloat(item.float_delivery_fee) : 0)
      }, 0);
      
    }
  },
  filters: {
    // formatPrice: function (value) {
    //   return (price / 100).toFixed(2);
    // },
    // filePath:function(value) {
    //   return config.IMG_URL + value
    // }
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
