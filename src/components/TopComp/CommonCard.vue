<template>
    <div class="common-card">
        <div class="title">{{title}}</div>
        <div class="value">{{value}}</div>
        <div class="chart">
            <slot name="default"></slot>
        </div>
        <div class="line"></div>
        <div class="footer">
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script>
export default {
  props: ['title', 'value']
}
</script>

<style lang="scss" scoped>
.title{
    font-size: 12px;
    color: #777;
    letter-spacing: 1px;
}
.value{
    margin-top: 10px;
    font-size: 24px;
    font-weight: 600;
}
.chart{
    height: 50px;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 6px;
}
.line{
    margin-top: 18px;
    border-top: 1px solid #ddd;
}
.footer{
    margin-top: 10px;
}
span{
    font-size: 14px;
    color: #464545;
}
span.strong{
    margin-left: 8px;
    font-weight: 550;
}
span.increase{
    display: inline-block;
    width: 0;
    height: 0;
    border-width: 4px;
    border-color: transparent transparent green transparent;
    border-style: solid;
    margin-left: 10px;
    transform: translateY(-50%);
}
</style>
