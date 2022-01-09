<template>
  <div class="page">
    <div class="header">
      <div class="tip1">支付平台</div>
      <div class="tip2">网上支付订单等待支付</div>
      <div class="tip3">实付金额</div>
      <div class="tip4">
        <img src="~@/assets/images/rmb.png">
        <span>{{this.param.tranNum}}</span>
      </div>
    </div>
    <div class="body">
      <div class="content">
        <div class="tip1">请选择支付方式</div>
        <van-divider/>
        <van-radio-group v-model="type" direction="horizontal">
          <div class="item">
            <img class="logo" src="~@/assets/images/zfb.png">
            <div class="right">
              <div class="label">
                <div class="top">支付宝</div>
                <div class="bottom">10亿人都在用，真安全，真方便</div>
              </div>
              <van-radio name="1" :disabled="param.paychannel === 'wepay'"></van-radio>
            </div>
          </div>
          <div class="item default">
            <div class="logo"></div>
            <div class="right">
            </div>
          </div>
          <div class="item">
            <img class="logo" src="~@/assets/images/wx.png">
            <div class="right">
              <div class="label">
                <div class="top">微信</div>
                <div class="bottom">推荐使用微信支付</div>
              </div>
              <van-radio name="2" :disabled="param.paychannel === 'alipay'"></van-radio>
            </div>
          </div>
        </van-radio-group>
        <van-divider/>
      </div>
      <van-button :color="type ? type == '1' ? '#1677ff' : '#48b338' : ''" block @click="pay">{{type ? type == '1' ? '支付宝' : '微信' : ''}}支付</van-button>
    </div>
    <van-popup v-model="show" :close-on-click-overlay="false">
      <div class="popup-content">
        <div class="tips">金额有误，请输入正确的金额</div>
        <van-cell-group>
          <van-field v-model="tranNum" type="number" label="实付金额" placeholder="请输入实付金额" clearable required :error-message="error"/>
        </van-cell-group>
        <van-button class="btn" size="small" color="#1677ff" @click="changeTranNum">修改</van-button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Divider, RadioGroup, Radio, Button, Notify, Popup, Field, CellGroup } from 'vant'
import { aliPay } from '@/api/pay'
import { getRequest } from '@/utils/tools'
export default {
  name: 'PayHome',
  data () {
    return {
      type: '',
      param: '',
      show: false,
      tranNum: '',
      error: ''
    }
  },
  components: {
    VanDivider: Divider,
    VanRadioGroup: RadioGroup,
    VanRadio: Radio,
    VanButton: Button,
    VanPopup: Popup,
    VanField: Field,
    VanCellGroup: CellGroup
  },
  created () {
    // bussinessId returnUrl tradeNo proName proNo tranNum
    this.param = getRequest()
    if (!this.param.bussinessId) {
      Notify({ type: 'danger', message: '参数异常，请从正确的渠道进入', duration: 0 })
      return
    }
    if (!this.param.tranNum || !new RegExp(/(?:^[1-9]([0-9]+)?(?:\.[0-9]{1,2})?$)|(?:^(?:0)$)|(?:^[0-9]\.[0-9](?:[0-9])?$)/).test(this.param.tranNum)) {
      this.show = true
    }
    if (this.param.paychannel === 'wepay') {
      this.type = '2'
    } else if (this.param.paychannel === 'alipay') {
      this.type = '1'
    }
  },
  methods: {
    pay () {
      if (!this.param.bussinessId) {
        return
      }
      if (this.type === '2') {
        if (!this.param.returnUrl) {
          this.param.returnUrl = `${process.env.VUE_APP_URL}payment-platform/success`
        }
        aliPay({
          ...this.param,
          paychannel: 'wepay'
        }).then(response => {
          window.location = response.h5_url
        })
      } else if (this.type === '1') {
        if (!this.param.returnUrl) {
          this.param.returnUrl = `${process.env.VUE_APP_URL}payment-platform/success`
        }
        aliPay({
          ...this.param,
          paychannel: 'alipay'
        }).then(response => {
          const div = document.createElement('divform')
          div.innerHTML = response.form
          document.body.appendChild(div)
          document.forms[0].submit()
        })
      }
    },
    changeTranNum () {
      if (!new RegExp(/(?:^[1-9]([0-9]+)?(?:\.[0-9]{1,2})?$)|(?:^(?:0)$)|(?:^[0-9]\.[0-9](?:[0-9])?$)/).test(this.tranNum)) {
        this.error = '格式错误，请保留两位小数'
        return
      }
      this.error = ''
      this.param.tranNum = this.tranNum
      this.show = false
    }
  }
}
</script>

<style lang="less" scoped>
.page{
  width: 100%;
  height: 100%;
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  .header{
    width: 100%;
    height: 180px;
    .tip1{
      padding: 0 0 10px 0;
      font-size: 15px;
    }
    .tip2{
      text-align: center;
      font-size: 12px;
      color: #9e9e9e;
    }
    .tip3{
      text-align: center;
      font-size: 16px;
      color: #000000;
      padding: 10px 0;
    }
    .tip4{
      display: flex;
      align-items: baseline;
      justify-content: center;
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
  }
  .body{
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-bottom: 50px;
    .tip1{
      font-size: 16px;
      color: #000000;
      font-weight: bold;
    }
    .item{
      width: 100%;
      height: 60px;
      display: flex;
      align-items: center;
      .logo{
        width: 45px;
        height: 45px;
        margin-right: 20px;
      }
      .right{
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex: 1;
        .label{
          .top{
            font-size: 18px;
            color: #000000;
          }
          .bottom{
            font-size: 13px;
            color: #9e9e9e;
          }
        }
      }
    }
    .default{
      height: 10px;
      .right{
        border-bottom: 1px solid #ebedf0;
      }
    }
  }
  .popup-content{
    width: 300px;
    height: 150px;
    padding: 10px 0;
    position: relative;
    .tips{
      padding: 0 10px 10px 10px;
      font-size: 13px;
      font-weight: bold;
    }
    .btn{
      position: absolute;
      bottom: 10px;
      left: 10px;
      width: 280px;
    }
  }
}
</style>
