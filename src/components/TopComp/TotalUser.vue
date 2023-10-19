<template>
  <div class="total-user">
    <CommonCard title="累计用户数" :value="reportData.totalUser">
      <template #default>
        <v-chart :option="option"></v-chart>
      </template>
      <template #footer>
        <div class="wrapper">
          <div>
            <span>日同比</span>
            <span class="strong">{{reportData.userGrowLastDay}}%</span>
            <span class="increase"></span>
          </div>
          <div>
            <span>月同比</span>
            <span class="strong">{{reportData.userGrowLastMonth}}%</span>
            <span class="increase"></span>
          </div>
        </div>
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
    renderChart (value1, value2) {
      this.option = {
        xAxis: {
          type: 'value',
          show: false
        },
        yAxis: {
          type: 'category',
          show: false
        },
        grid: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        },
        series: [
          {
            name: '上月平台用户数',
            type: 'bar',
            data: [value1],
            barWidth: 10,
            itemStyle: {
              color: 'green'
            },
            stack: 'total'
          },
          {
            name: '本月平台用户数',
            type: 'bar',
            data: [value2],
            barWidth: 10,
            itemStyle: {
              color: '#ddd'
            },
            stack: 'total'
          },
          {
            type: 'custom',
            renderItem: (params, api) => {
              // 绘制图表中的三角形 关注: 这个三角形的位置 如何绘制三角形这个形状
              const endPoint = api.coord([api.value(0), 0])
              return {
                type: 'group',
                children: [
                  {
                    type: 'path',
                    shape: {
                      d: 'M511.744 319.999l-383.744 383.744h767.488l-383.744-383.744z', // 通过SVG来指定图形形状
                      x: endPoint[0] - 5,
                      y: 35,
                      width: 10,
                      height: 10,
                      layout: 'cover'
                    },
                    style: {
                      fill: 'green'
                    }
                  }, {
                    type: 'path',
                    shape: {
                      d: 'M889.696 320.8H158.848l365.504 365.536 365.344-365.536z', // 通过SVG来指定图形形状
                      x: endPoint[0] - 5,
                      y: 5,
                      width: 10,
                      height: 10,
                      layout: 'cover'
                    },
                    style: {
                      fill: 'green'
                    }
                  }
                ]
              }
            },
            data: [value1]
          }
        ]
      }
    }
  },
  // 需要监听reportData(数据并不是一开始就传过来的) mounted可以不用写了
  watch: {
    reportData (newValue) {
      this.renderChart(newValue.userLastMonth, newValue.userToday)
    }
  }
}
</script>

<style scoped>
.wrapper{
    display: flex;
    gap: 10px;
}
</style>
