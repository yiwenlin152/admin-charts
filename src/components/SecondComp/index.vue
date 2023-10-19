<template>
  <div class="second-comp">
    <el-card shadow="hover" class="box-card">
      <!-- 用这种方式作插槽 -->
      <template #header>
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-menu-item index="1">销售额</el-menu-item>
          <el-menu-item index="2">访问量</el-menu-item>
        </el-menu>
        <div class="right">
          <el-radio-group v-model="time">
            <el-radio-button label="今日">今日</el-radio-button>
            <el-radio-button label="本周">本周</el-radio-button>
            <el-radio-button label="本月">本月</el-radio-button>
            <el-radio-button label="今年">今年</el-radio-button>
          </el-radio-group>
          <el-date-picker
            v-model="pickerTime"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </div>
      </template>
      <div class="content">
        <div class="left-chart">
          <v-chart :option="option"></v-chart>
        </div>
        <div class="right-list">
          <div class="title">排行榜</div>
          <div class="item" v-for="item in rankData" :key="item.no">
            <span :class="{ 'top-3': item.no <= 3 }">{{ item.no }}</span>
            <span>{{ item.title }}</span>
            <span>{{ item.sales }}</span>
          </div>
        </div>
        <!-- <YearSale :saleData="saleData" :activeIndex="activeIndex" /> -->
        <!-- <RankList :saleData="saleData" :activeIndex="activeIndex" /> -->
      </div>
    </el-card>
  </div>
</template>

<script>
// import YearSale from './YearSale.vue'
import { getSaleData } from '@/request'
// import RankList from './RankList.vue'
export default {
  data () {
    return {
      activeIndex: '1',
      time: '今日',
      pickerTime: '',
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      option: {},
      saleData: {},
      rankData: {}
    }
  },
  //   components: { YearSale, RankList },
  methods: {
    handleSelect (key) {
      this.activeIndex = key
      if (key === '1') {
        this.rankData = this.saleData.saleRank
        this.renderChart(
          this.saleData.saleFulleYearAxis,
          this.saleData.saleFulleYear
        )
      } else {
        this.rankData = this.saleData.visitRank
        this.renderChart(
          this.saleData.visitFullYeadAxis,
          this.saleData.visitFullYear
        )
      }
    },
    renderChart (value1, value2) {
      this.option = {
        title: {
          text: '年度销售额',
          textStyle: {
            fontWeight: 600,
            fontSize: 14
          }
        },
        xAxis: {
          type: 'category',
          data: value1,
          axisTick: {
            alignWithLabel: true
          }
        },
        yAxis: {
          type: 'value',
          splitLine: {
            lineStyle: {
              type: 'dotted'
            }
          }
        },
        grid: {
          left: 40
        },
        series: {
          data: value2,
          type: 'bar',
          barWidth: '40%',
          itemStyle: {
            color: 'skyblue'
          }
        }
      }
    }
  },
  async mounted () {
    const res = await getSaleData()
    this.saleData = res
    this.rankData = res.saleRank
    this.renderChart(
      this.saleData.saleFulleYearAxis,
      this.saleData.saleFulleYear
    )
  }
}
</script>

<style lang="scss" scoped>
.second-comp {
  margin-top: 20px;
  position: relative;
  ::v-deep .el-card__header {
    padding: 0;
    border-bottom: none;
    .el-menu {
      padding-left: 50px;
    }
    .right {
      position: absolute;
      top: 10px;
      right: 2%;
      .el-date-editor {
        margin-left: 20px;
        .el-range-separator {
          padding: 0;
        }
      }
    }
  }
  .content {
    display: flex;
    .left-chart {
      flex: 0 0 70%;
      height: 434px;
    }
    .right-list {
      flex: 1;
      .title {
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 10px;
      }
      .item {
        display: flex;
        gap: 20px;
        margin: 20px 0;
        span {
          font-size: 14px;
          color: #464545;
        }
        span:nth-child(2) {
          flex: 1;
        }
        span:first-child {
          width: 20px;
          height: 20px;
          border-radius: 10px;
          line-height: 20px;
          text-align: center;
        }
        span.top-3 {
          background-color: #09b3f7;
          color: #fff;
        }
      }
    }
  }
}
</style>
