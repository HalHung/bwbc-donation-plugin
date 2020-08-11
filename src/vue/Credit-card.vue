<template>
  <!-- 信用卡捐款 -->
  <div id="body">
    <div v-if="step == '1'">
      <CardDonationInfo @nextStep="setCardDonationInfo($event)"></CardDonationInfo>
    </div>
    <div v-if="step == '2'">
      <MemberInfo @nextStep="setMemberInfo($event)"></MemberInfo>
    </div>
    <div v-if="step == '3'">
      <CreditCardInfo @nextStep="setCreditCardInfo($event)"></CreditCardInfo>
    </div>
    <div v-if="step == '4'"></div>
  </div>
</template>

<script>
import CardDonationInfo from "./components/card-donation-info";
import MemberInfo from "./components/member-info";
import CreditCardInfo from "./components/credit-card-info";
import API from "../api";
export default {
  components: { CardDonationInfo, MemberInfo, CreditCardInfo },
  data() {
    return {
      step: "1", // 依步驟要顯示的component
      bwbcCardDonate: {
        paymentToolCode: null, // 捐款模式: E單次捐款 R定期定額
        amount: null, // 捐款金額
        receiptTypeCode: null, // 收據開立方式: 1.BY_TIME單筆 2.ANNUAL年開 3.UNWANTTED不需寄發
        donatorName: null, // 收據抬頭
        address: null, // 地址
        name: null, // 會員姓名
        genderTypeCode: null, // 性別
        payerTypeCode: null, // 是否參加福智廣論研討班
        sin: null, // 身分證字號
        sinLast4: null, // 身分證字號末四碼
        cellPhone: null, // 手機號碼
        homePhone: null, // 住家電話
        email: null, // 電子信箱
        card:{
          number: null, // 信用卡號碼
          expMonth: null, // 有效月
          expYear: null, // 有效年
          cvc: null, // 安全碼
        },
        donaUseCode:"Z",
        donaItemCode:"W11"
      },
      region: null, // 居住地
      useridType: null, // 身分證選填全碼或末四碼
    };
  },
  methods: {
    donate(){
      if(this.useridType == "全碼"){
        this.bwbcCardDonate.sinLast4 = this.bwbcCardDonate.sin.substr(6, 4);
      }else {
        this.bwbcCardDonate.sin = null;
      }
      if(this.bwbcCardDonate.receiptTypeCode == "UNWANTTED"){
        this.bwbcCardDonate.donatorName = this.bwbcCardDonate.name;
        this.bwbcCardDonate.address = {addressType:"TAIWAN",city:this.region}
      }
      API.donate.wpDonateCard(this.bwbcCardDonate).then(res=>{
          let data = res.data;
          if (data.status == 200 && data.message == "成功取得3D HTML") {
            var body2 = data.data.Result;
            document.body.innerHTML = body2;
            document.forms[0].submit();
          } else if (data.status == 200) {
            this.step=4;
          } else {
            console.log(`data.pageChange:${data.pageChange}`);
            switch (data.pageChange) {
              case "NEXT":
                this.step=4;
                var t = "提示";
                var c = data.message;
                if (data.message.includes(":")) {
                  t = data.message.split(":")[0];
                  c = data.message.split(":")[1];
                }
                this.showMessageBox(t, c);
                break;
              case "NONE":
                var t = "提示";
                var c = data.message;
                if (data.message.includes(":")) {
                  t = data.message.split(":")[0];
                  c = data.message.split(":")[1];
                }
                this.showMessageBox(t, c);
                break;
              default:
                var t = "提示";
                var c = data.message;
                if (data.message.includes(":")) {
                  t = data.message.split(":")[0];
                  c = data.message.split(":")[1];
                }
                this.showMessageBox(t, c);
                break;
            }
          }
      })
    },
    setCardDonationInfo(cardDonationInfo) {
      this.bwbcCardDonate.paymentToolCode = cardDonationInfo.paymentToolCode;
      this.bwbcCardDonate.amount = cardDonationInfo.amount;
      this.bwbcCardDonate.receiptTypeCode = cardDonationInfo.receipt;
      this.bwbcCardDonate.donatorName = cardDonationInfo.donatorName;
      this.bwbcCardDonate.address = cardDonationInfo.address;
      this.step = cardDonationInfo.step;
    },
    setMemberInfo(memberInfo) {
      this.bwbcCardDonate.name = memberInfo.name;
      this.bwbcCardDonate.genderTypeCode = memberInfo.genderTypeCode;
      this.bwbcCardDonate.payerTypeCode = memberInfo.payerTypeCode;
      this.useridType = memberInfo.useridType;
      this.bwbcCardDonate.sin = memberInfo.sin;
      this.bwbcCardDonate.sinLast4 = memberInfo.sinLast4;
      this.bwbcCardDonate.cellPhone = memberInfo.cellPhone;
      this.bwbcCardDonate.homePhone = memberInfo.homePhone;
      this.bwbcCardDonate.email = memberInfo.email;
      this.region = memberInfo.region;
      this.step = memberInfo.step;
    },
    setCreditCardInfo(creditCardInfo) {
      this.bwbcCardDonate.card.number = creditCardInfo.number;
      this.bwbcCardDonate.card.expMonth = creditCardInfo.cardMonth;
      this.bwbcCardDonate.card.expYear = creditCardInfo.cardYear;
      this.bwbcCardDonate.card.cvc = creditCardInfo.cvc;
      // this.step = cardDonationInfo.step;
      this.donate()
    },
    showMessageBox(title, content) {
      this.dialog.title = title;
      this.dialog.content = content;
      this.dialog.isShow = true;
    }
  },
};
</script>

<style lang="scss" scoped>
#body {
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}
/deep/ .el-input__inner {
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}
</style>