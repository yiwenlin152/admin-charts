<template>
    <v-chart :option="option"></v-chart>
</template>

<script>
import 'echarts-liquidfill'
import { getReportData } from '@/request'
export default {
  data () {
    return {
      option: null
    }
  },
  methods: {
    renderChart (data) {
      this.option = {
        series: {
          type: 'liquidFill',
          data: [data],
          radius: '80%',
          color: ['red'],
          amplitude: '4%',
          outline: {
            borderDistance: 2,
            itemStyle: {
              borderWidth: 2
            }
          }
        }
      }
    }
  },
  async mounted () {
    const res = await getReportData()
    this.renderChart(+(res.salesGrowLastDay / 100).toFixed(2))
  }
}
</script>

<style scoped>

</style>
