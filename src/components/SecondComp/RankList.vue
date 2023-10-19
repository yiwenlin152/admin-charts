<template>
  <div class="rank-list">
    <div class="title">排行榜</div>
    <div class="item" v-for="(item, index) in curData" :key="index">
      <div class="left">
        <span :class="item.no <= 3 ? 'top-3' : ''">{{ item.no }}</span>
        <span>{{ item.title }}</span>
      </div>
      <span>{{ item.sales }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['saleData', 'activeIndex'],
  data () {
    return {
      curData: {}
    }
  },
  watch: {
    saleData (newValue) {
      if (this.activeIndex === '1') {
        this.curData = this.saleData.saleRank
      } else {
        this.curData = this.saleData.visitRank
      }
    },
    activeIndex (newValue) {
      if (newValue === '1') {
        this.curData = this.saleData.saleRank
      } else {
        this.curData = this.saleData.visitRank
      }
    }
  }
}
</script>

<style scoped>
.rank-list {
  flex: 1;
  .title {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 10px;
  }
  .item {
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
    font-size: 14px;
    .left {
      display: flex;
      gap: 20px;
    }
  }
}

.left span:first-child {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  line-height: 20px;
  text-align: center;
}
span.top-3 {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  line-height: 20px;
  text-align: center;
  background-color: #09b3f7;
  color: #fff;
}
</style>
