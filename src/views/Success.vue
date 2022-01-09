<template>
  <div class="page">
    <div class="tip1">支付平台</div>
    <div class="content">
      <img class="img1" src="~@/assets/images/success_zfb.png">
      <div class="tip2">支付成功</div>
      <div class="tip4">温馨提示：请手动返回商户页面</div>
      <div class="tip3">
        <img src="~@/assets/images/rmb.png">
        <span>{{this.param.total_amount}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getRequest } from '@/utils/tools'
export default {
  name: 'Success',
  data () {
    return {
      param: ''
    }
  },
  created () {
    this.param = getRequest()
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.page{
  width: 100%;
  height: 100%;
  padding: 10px 20px;
  .tip1{
    padding: 0 0 10px 0;
    font-size: 15px;
  }
  .content{
    display: flex;
    flex-direction: column;
    align-items: center;
    .img1{
      width: 100px;
      height: 100px;
      margin: 20px 0 10px 0;
    }
    .tip2{
      font-size: 18px;
      color: #000000;
      font-weight: bold;
      padding-bottom: 10px;
    }
    .tip3{
      display: flex;
      align-items: baseline;
      justify-content: center;
      padding-top: 60px;
      img{
        width: 25px;
        height: 25px;
      }
      span{
        font-size: 45px;
        color: #000000;
        font-weight: bold;
        padding: 0 5px;
      }
    }
    .tip4{
      font-size: 12px;
    }
  }
}
</style>
