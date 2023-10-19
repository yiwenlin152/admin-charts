<template>
  <div class="total-sale">
    <CommonCard title="累计销售额" :value="reportData.salesToday">
      <template #default>
        <div>
          <span>日同比</span>
          <span class="strong">{{ reportData.salesGrowLastDay }}%</span>
          <span class="increase"></span>
        </div>
        <div>
          <span>月同比</span>
          <span class="strong">{{ reportData.saleSGrowLastMonth }}%</span>
          <span class="increase"></span>
        </div>
      </template>
      <template #footer>
        <div><span>昨日销售额</span><span class="strong">￥{{ reportData.salesLastDay }}</span></div>
      </template>
    </CommonCard>
  </div>
</template>

<script>
import CommonCardMixin from '@/mixins/CommonCardMixin'
export default {
  mixins: [CommonCardMixin]
}
</script>

<style scoped></style>
