<template>
  <div class="expert-info panel" flex="main:center cross:center">
    <div flex="box:first cross:center">
      <Avatar :src="data.avatar" />
      <div>
        <div class="expert-nick-name" flex="cross:center">
          {{ data.nickName }}
          <font class="gray">{{ data.positionName }}</font>
        </div>
        <div class="expert-speciality">
          <span class="tag danger">擅长联赛：{{ data.greatGames }}</span>
        </div>
      </div>
    </div>
    <div class="expert-description">{{ data.introduction }}</div>
    <div class="expert-digital" flex="cross:center main:center box:mean">
      <div>
        <div><strong>{{ data.artcileNum }}</strong></div>
        <div><font>方案</font></div>
      </div>
      <div>
        <div><strong>{{ Number(data.returnrate) +'%' }}</strong></div>
        <div><font>返还率</font></div>
      </div>
      <div>
        <div><strong>{{ data.fansNum }}</strong></div>
        <div><font>粉丝</font></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExpertDetail',
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>
.expert-info {
  width: 100%;
  display: inline-block;
  padding: 10px 15px;
  .expert-nick-name {
    padding: 0 16px;
    font-size: 16px;
    line-height: 32px;
    font {
      font-size: 14px;
      margin-left: 10px;
    }
  }
  .expert-speciality {
    padding: 0 16px;
  }
  .expert-description {
    text-align: justify;
    color: #666;
  }
  .expert-digital {
    text-align: center;
    padding: 10px 0;
    strong {
      font-size: 16px;
      font-weight: bold;
    }
    font {
      color: #999;
      font-size: 12px;
    }
  }
}
.tag {
  padding: 3px 6px;
  font-size: 12px;
  border-radius: 2px;
  &.danger {
    background: #faebeb;
    color: #f81445;
  }
}
font {
  &.gray {
    color: #999;
  }
}
</style>
