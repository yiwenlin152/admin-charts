<template>
    <div class="year-sale">
        <v-chart :option="option"></v-chart>
    </div>
</template>

<script>
export default {
  props: ['saleData', 'activeIndex'],
  data () {
    return {
      option: null
    }
  },
  methods: {
    renderChart (value1, value2) {
      this.option = {
        title: {
          text: '年度销售额',
          textStyle: {
            fontSize: 14
          }
        },
        xAxis: {
          type: 'category',
          data: value1
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              type: 'dotted'
            }
          }
        },
        // grid: {
        //   left: 0
        // },
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
  watch: {
    saleData (newValue) {
      if (this.activeIndex === '1') {
        this.renderChart(newValue.saleFulleYearAxis, newValue.saleFulleYear)
      } else {
        this.renderChart(newValue.visitFullYeadAxis, newValue.visitFullYear)
      }
    },
    activeIndex (newValue) {
      if (newValue === '1') {
        this.renderChart(this.saleData.saleFulleYearAxis, this.saleData.saleFulleYear)
      } else {
        this.renderChart(this.saleData.visitFullYeadAxis, this.saleData.visitFullYear)
      }
    }
  }
}
</script>

<style scoped>
.year-sale{
    flex: 0 0 70%;
    height: 434px;
}
</style>
