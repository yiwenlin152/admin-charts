<template>
  <div class="third-comp">
    <div class="left-card">
      <el-card shadow="hover">
        <template #header>
          <span class="title css-2">关键词搜索</span>
        </template>
        <div class="content">
          <div class="charts">
            <div class="left-chart">
              <div class="title">搜索用户量</div>
              <div class="number">{{ totalUser }}</div>
              <div class="line-chart">
                <v-chart :option="userOption"></v-chart>
              </div>
            </div>
            <div class="right-chart">
              <div class="title">搜索量</div>
              <div class="number">{{ totalSearch }}</div>
              <div class="line-chart">
                <v-chart :option="searchOption"></v-chart>
              </div>
            </div>
          </div>
          <div class="table">
            <el-table :data="curkeyWordData" style="width: 100%">
              <el-table-column prop="rank" label="排名" width="60"> </el-table-column>
              <el-table-column prop="keyWord" label="关键词" align="center">
              </el-table-column>
              <el-table-column
                prop="totalSearch"
                label="总搜索量"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="totalUser"
                label="搜索用户数"
                align="center"
              >
              </el-table-column>
            </el-table>
            <el-pagination
              background
              layout="prev, pager, next"
              :total="keyWordData.length"
              :page-size="pageSize"
              @current-change="handleCurrentChange"
            >
            </el-pagination>
          </div>
        </div>
      </el-card>
    </div>
    <div class="right-card">
      <el-card shadow="hover">
        <template #header>
          <span class="title css-2">分类销售排行</span>
          <el-radio-group v-model="radio" @input="radioChange">
            <el-radio-button label="品类">品类</el-radio-button>
            <el-radio-button label="商品">商品</el-radio-button>
          </el-radio-group>
        </template>
        <div class="pie-chart">
          <v-chart :option="categoryOption"></v-chart>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getKeyWordData, getCategoryData } from '@/request'
export default {
  data () {
    return {
      userOption: {},
      searchOption: {},
      keyWordData: [],
      curkeyWordData: [],
      pageSize: 6,
      totalSearchArr: [],
      totalUserArr: [],
      radio: '品类',
      categoryOption: {},
      categoryData: []
    }
  },
  computed: {
    totalSearch () {
      return this.keyWordData.reduce((total, item) => {
        return total + item.totalSearch
      }, 0)
    },
    totalUser () {
      return this.keyWordData.reduce((total, item) => {
        return total + item.totalUser
      }, 0)
    }
  },
  methods: {
    renderLineChart (search, user) {
      this.userOption = {
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
          data: user,
          type: 'line',
          areaStyle: {
            color: 'skyblue'
          },
          itemStyle: {
            opacity: 0
          },
          smooth: 'true'
        }
      }
      this.searchOption = {
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
          data: search,
          type: 'line',
          areaStyle: {
            color: 'skyblue'
          },
          itemStyle: {
            opacity: 0
          },
          smooth: 'true'
        }
      }
    },
    handleCurrentChange (page) {
      this.curkeyWordData = this.keyWordData.slice(
        (page - 1) * this.pageSize,
        page * this.pageSize
      )
    },
    renderPieChart (data) {
      // 需要给data添加上一个name字段 从而可以让legend读取到
      data = data.map(item => {
        item.name = item.title + '|' + item.value
        return item
      })
      const totalSale = data.reduce((pre, cur) => {
        return pre + cur.value
      }, 0)
      this.categoryOption = {
        title: [{
          text: '品类分布',
          textStyle: {
            color: '#666',
            fontSize: 14
          },
          left: 20,
          top: 20
        }, {
          text: '累计订单量',
          subtext: totalSale,
          x: '40%',
          y: '45%',
          textAlign: 'center',
          textStyle: {
            color: '#999',
            fontSize: 14
          },
          subtextStyle: {
            color: '#333',
            fontSize: 28
          }
        }],
        legend: {
          // legend自动读取的是data数据中的name字段
          left: '80%',
          top: 'top',
          textStyle: {
            color: '#888'
          }
        },
        series: {
          name: '品类分布',
          data: data,
          type: 'pie',
          radius: ['45%', '60%'],
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 8
          },
          center: ['40%', '50%'],
          label: {
            show: true,
            postion: 'outside',
            formatter: (params) => {
              return params.data.title
            }
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: (params) => {
            return params.seriesName + '<br/>' + params.marker + params.data.title +
            '<br/>' + params.marker + '销售额:' + params.data.value
          }
        }
      }
    },
    radioChange (label) {
      if (label === '品类') {
        this.renderPieChart(this.categoryData.data1)
      } else {
        this.renderPieChart(this.categoryData.data2)
      }
      // this.renderPieChart(this.curCategoryData)
    }
  },
  async mounted () {
    const keyWordRes = await getKeyWordData()
    this.keyWordData = keyWordRes
    // 初始状态下 表格中显示前6条数据
    this.curkeyWordData = keyWordRes.slice(0, this.pageSize)
    // 获取折线图数据
    this.totalSearchArr = this.keyWordData.map(item => item.totalSearch).slice(0, 10).reverse()
    this.totalUserArr = this.keyWordData.map(item => item.totalUser).slice(0, 10).reverse()
    this.renderLineChart(this.totalSearchArr, this.totalUserArr)

    const categoryDataRes = await getCategoryData()
    this.categoryData = categoryDataRes
    // this.categoryData.data1.forEach((item) => {
    //   this.curCategoryData.push({ name: item.title, value: item.value })
    // })
    this.renderPieChart(this.categoryData.data1)
  }
}
</script>

<style lang="scss" scoped>
.third-comp {
  margin-top: 20px;
  display: flex;
  gap: 20px;
  .left-card {
    flex: 1;
    .content {
      padding: 20px;
      .charts {
        display: flex;
        gap: 20px;
        // justify-content: space-between;
        & > div {
          flex: 1;
          .title {
            font-size: 14px;
            color: #727171;
          }
          .number {
            margin-top: 10px;
            font-weight: 600;
            font-size: 20px;
          }
          .echarts {
            height: 50px;
          }
        }
      }
      .table{
        .el-pagination {
          margin-top: 16px;
          display: flex;
          justify-content: flex-end;
        }
      }
    }
  }
  .right-card {
    flex: 1;
    height: 100%;
    ::v-deep .el-card__header {
      position: relative;
      .el-radio-group {
        position: absolute;
        top: 10%;
        right: 2%;
      }
    }
    ::v-deep .el-card__body {
      height: 558px;
      .pie-chart {
        height: 100%;
      }
    }
  }
  .css-2 {
    font-weight: 600;
  }
}
</style>
