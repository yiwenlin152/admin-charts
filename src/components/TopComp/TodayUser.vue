<template>
    <div class="totay-user">
        <CommonCard title="今日用户交易数" :value="reportData.userToday">
            <template #default>
                <v-chart :option="option"></v-chart>
            </template>
            <template #footer>
                <span>退货率</span>
                <span class="strong">{{reportData.returnRate}}%</span>
            </template>
        </CommonCard>
    </div>
</template>

<script>
import CommonCardMixin from '@/mixins/CommonCardMixin.js'

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
          data: ['00:00', '03:00', '05:00', '07:00', '09:00', '11:00', '13:00', '15:00', '17:00', '19:00', '21:00', '23:00'],
          name: '实时交易量',
          show: false
        },
        yAxis: {
          type: 'value',
          show: false
        },
        series: [
          {
            data: data,
            type: 'bar',
            name: '实时交易量',
            barWidth: '60%'
          }
        ],
        tooltip: {}
      }
    }
  },
  watch: {
    reportData (newValue) {
      this.renderChart(newValue.orderUserTrend)
    }
  }
}
</script>

<style scoped>

</style>
