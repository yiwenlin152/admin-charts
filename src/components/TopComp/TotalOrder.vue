<template>
    <div class="total-order">
        <CommonCard title="累计订单额" :value="reportData.orderToday">
            <template #default>
                <v-chart :option="option"></v-chart>
            </template>
            <template #footer>
                <span>昨日销售额</span>
                <span class="strong">￥ {{ reportData.orderLastDay }}</span>
            </template>
        </CommonCard>
    </div>
</template>

<script>
import CommonCardMixin from '@/mixins/CommonCardMixin'

export default {
  mixins: [CommonCardMixin],
  data () {
    return {
      option: null
    }
  },
  methods: {
    renderChart (data) {
      this.option = {
        grid: {
          left: 0,
          top: 0,
          right: 0,
          bottom: 0
        },
        xAxis: {
          type: 'category',
          show: false,
          boundaryGap: false
        },
        yAxis: {
          type: 'value',
          show: false
        },
        series: {
          data: data,
          type: 'line',
          areaStyle: {
            color: 'purple'
          },
          lineStyle: {
            width: 0
          },
          itemStyle: {
            opacity: 0
          },
          smooth: true
        }
      }
    }
  },
  watch: {
    reportData (newValue) {
      this.renderChart(newValue.orderTrend)
    }
  }
}
</script>

<style scoped>

</style>
