<template>
    <v-chart :option="option"></v-chart>
</template>

<script>
import 'echarts-wordcloud'
import { getKeyWordData } from '@/request'
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
          type: 'wordCloud',
          shape: 'cardioid',
          width: '100%',
          height: '100%',
          data,
          textStyle: {
            // Color can be a callback function or a color string
            color: function () {
              // Random color
              return 'rgb(' + [
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160)
              ].join(',') + ')'
            }
          },
          emphasis: {
            focus: 'self',

            textStyle: {
              textShadowBlur: 5,
              textShadowColor: '#333'
            }
          }
        },
        tooltip: {}
      }
    }
  },
  async mounted () {
    let res = await getKeyWordData()
    res = res.slice(0, 6).map(item => {
      return {
        name: item.keyWord,
        value: item.totalSearch
      }
    })
    this.renderChart(res)
  }
}
</script>

<style scoped>

</style>
