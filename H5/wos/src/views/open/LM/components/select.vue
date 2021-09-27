<template>
  <van-action-sheet
    v-model="selectModel.show"
    cancel-text="取消"
    close-on-click-action

    >
    <div ref="scDom">
      <div class="LmS-item" :ref="selectModel.select.roundNum==item.roundNum?'sel'+item.roundNum:''" :id="'sel'+item.roundNum" :class="selectModel.select.roundNum==item.roundNum?'current':''" @click="handleClick(item,index)" v-for="(item,index) in selectModel.actions">{{item.name}}</div>
    </div>
  </van-action-sheet>
</template>

<script>

export default {
  name: "LmSelect",
  props: {
    selectModel: {
      type: Object,
      default: {
          show:false,
          select:null,
          actions:[]
      }
    },
    // actions:{
    //   type: Array,
    //   default: []
    // }
  },
  data() {
    return {
  
    }
  },
  computed: {

  },
  created() {

    
  },
  mounted() {
  },
  watch: {
    'selectModel.show' : {
      handler(newName, oldName) {
        if(newName==true){
          this.$nextTick(() => {
            const selectEl = this.$refs["sel"+this.selectModel.select.roundNum][0]
            selectEl.scrollIntoView()
          })
        }
      },
    },
  },
  methods: {
    handleClick(item,index) {
      this.selectModel.show = false
      this.$emit('select', item)
    }
  }
}
</script>

<style lang="scss" scoped>
.van-action-sheet__cancel{
    background: #21D4AD;
    color: #fff;
    margin: 10px 13px;
    width: auto;
    border-radius: 6px;
    font-size: 15px;
    height: 43px;
}
.LmS-item{
  font-size: 15px;
  color: #9D9D9D;
  height: 42px;
  line-height: 42px;
  text-align: center;
  &.current{
    border: solid 1px #eee;
    border-right: none;
    border-left: solid 3px #21D4AD;
    color: #ff0000;
  }
  &:active {
    background: rgba($color: #000000, $alpha: .05);
  }
}
</style>
