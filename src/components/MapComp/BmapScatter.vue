<template>
  <v-chart :option="option"></v-chart>
</template>

<script>
// 引入echarts中对于百度地图的支持
import 'echarts/extension/bmap/bmap'
import { getMapData } from '@/request' // @表示src
function convertData (city, geodata) {
  // city => [{name:'海门',value:10}]
  // geodata => {'海门':[100,200]}
  // target res => [{name:'海门',value:[100,200,10]}]
  const res = []
  city.forEach((item) => {
    const geo = geodata[item.name]
    if (geo) {
      res.push({
        name: item.name,
        value: geo.concat(item.value)
      })
    }
  })
  return res
}
export default {
  data () {
    return {
      option: {}
    }
  },
  methods: {
    renderChart (data) {
      this.option = {
        bmap: {
          key: 'kKu3eAqGR5IhvQxC3idDk8YdNsHTo2Eu',
          center: [108.954355, 34.346721],
          zoom: 5,
          roam: false,
          mapStyle: {
            styleJson: [
              {
                featureType: 'water',
                elementType: 'all',
                stylers: {
                  color: '#d1d1d1'
                }
              },
              {
                featureType: 'land',
                elementType: 'all',
                stylers: {
                  color: '#f3f3f3'
                }
              },
              {
                featureType: 'railway',
                elementType: 'all',
                stylers: {
                  visibility: 'off'
                }
              },
              {
                featureType: 'highway',
                elementType: 'all',
                stylers: {
                  color: '#fdfdfd'
                }
              },
              {
                featureType: 'highway',
                elementType: 'labels',
                stylers: {
                  visibility: 'off'
                }
              },
              {
                featureType: 'arterial',
                elementType: 'geometry',
                stylers: {
                  color: '#fefefe'
                }
              },
              {
                featureType: 'arterial',
                elementType: 'geometry.fill',
                stylers: {
                  color: '#fefefe'
                }
              },
              {
                featureType: 'poi',
                elementType: 'all',
                stylers: {
                  visibility: 'off'
                }
              },
              {
                featureType: 'green',
                elementType: 'all',
                stylers: {
                  visibility: 'off'
                }
              },
              {
                featureType: 'subway',
                elementType: 'all',
                stylers: {
                  visibility: 'off'
                }
              },
              {
                featureType: 'manmade',
                elementType: 'all',
                stylers: {
                  color: '#d1d1d1'
                }
              },
              {
                featureType: 'local',
                elementType: 'all',
                stylers: {
                  color: '#d1d1d1'
                }
              },
              {
                featureType: 'arterial',
                elementType: 'labels',
                stylers: {
                  visibility: 'off'
                }
              },
              {
                featureType: 'boundary',
                elementType: 'all',
                stylers: {
                  color: '#fefefe'
                }
              },
              {
                featureType: 'building',
                elementType: 'all',
                stylers: {
                  color: '#d1d1d1'
                }
              },
              {
                featureType: 'label',
                elementType: 'labels.text.fill',
                stylers: {
                  color: '#999999'
                }
              }
            ]
          }
        },
        title: {
          text: '网点地图',
          left: 'center'
        },
        series: [
          {
            name: '新中地外卖',
            coordinateSystem: 'bmap',
            type: 'scatter',
            data,
            // 通过以下两个配置选项共同生效点的不同大小
            encode: {
              value: 2 // 2代表索引值
            },
            symbolSize (value) {
              return value[2] / 10 // 2代表索引值
            }
          },
          {
            name: '新中地外卖',
            coordinateSystem: 'bmap',
            type: 'effectScatter',
            data: data.sort((a, b) => {
              return b.value[2] - a.value[2]
            }).slice(0, 10),
            encode: {
              value: 2
            },
            symbolSize (value) {
              return value[2] / 10
            },
            rippleEffect: {
              color: 'purple',
              brushType: 'stroke'
            },
            tooltip: {
              formatter: (params) => {
                return params.data.name + '销售额' + params.data.value[2]
              },
              textStyle: {
                color: 'green'
              }
            }
          }
        ],
        tooltip: {
          trigger: 'item'
        }
      }
    }
  },
  async mounted () {
    const res = await getMapData()
    this.renderChart(convertData(res.city, res.geodata))
  }
}
</script>

<style scoped></style>
