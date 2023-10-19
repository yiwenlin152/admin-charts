import Vue from 'vue'
import App from './App.vue'
import './main.css'
import * as echarts from 'echarts' // 引入echarts
import './plugins/vue-echarts' // 引入绘制图表的组件
import './plugins/element-ui' // 引入组件库
import 'element-ui/lib/theme-chalk/index.css'
import 'reset-css' // 引入清除默认样式的css
Vue.config.productionTip = false
// 可以在入口中给每个组件实例都注入一些成员
Vue.prototype.$echarts = echarts

new Vue({
  render: h => h(App)
}).$mount('#app')
