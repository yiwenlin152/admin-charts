<template>
  <div class="top-comp">
    <el-row :gutter="20">
      <el-col :span="6"
        ><el-card shadow="hover"><TotalSale :reportData="reportData"/></el-card
      ></el-col>
      <el-col :span="6"
        ><el-card shadow="hover"><TotalOrder :reportData="reportData"></TotalOrder></el-card
      ></el-col>
      <el-col :span="6"
        ><el-card shadow="hover"><TodayUser :reportData="reportData"></TodayUser></el-card
      ></el-col>
      <el-col :span="6"
        ><el-card shadow="hover"><TotalUser :reportData="reportData"/></el-card
      ></el-col>
    </el-row>
  </div>
</template>

<script>
import TotalSale from './TotalSale.vue'
import TotalOrder from './TotalOrder.vue'
import TotalUser from './TotalUser.vue'
import TodayUser from './TodayUser.vue'
import { getReportData } from '../../request'
export default {
  components: {
    TotalSale,
    TotalOrder,
    TotalUser,
    TodayUser
  },
  data () {
    return {
      reportData: {}
    }
  },
  async mounted () {
    const res = await getReportData()
    this.reportData = res
  }
}
</script>

<style scoped></style>
