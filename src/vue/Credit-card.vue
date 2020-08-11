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

export default {
  components: { CardDonationInfo, MemberInfo, CreditCardInfo },
  data() {
    return {
      step: "1", // 依步驟要顯示的component
      bwbcCardDonate: {
        apaymentToolCode: null, // 捐款模式: E單次捐款 R定期定額
        amount: null, // 捐款金額
        receipt: null, // 收據開立方式: 1.BY_TIME單筆 2.ANNUAL年開 3.UNWANTTED不需寄發
        donatorName: null, // 收據抬頭
        address: null, // 地址
        memberName: null, // 會員姓名
        genderTypeCode: null, // 性別
        payerTypeCode: null, // 是否參加福智廣論研討班
        useridType: null, // 身分證選填全碼或末四碼
        sin: null, // 身分證字號
        sinLast4: null, // 身分證字號末四碼
        cellPhone: null, // 手機號碼
        homePhone: null, // 住家電話
        email: null, // 電子信箱
        region: null, // 居住地
        cardNumber: null, // 信用卡號碼
        cardMonth: null, // 有效月
        cardYear: null, // 有效年
        cvc: null, // 安全碼
      },
    };
  },
  methods: {
    setCardDonationInfo(cardDonationInfo) {
      this.bwbcCardDonate.paymentToolCode = cardDonationInfo.paymentToolCode;
      this.bwbcCardDonate.amount = cardDonationInfo.amount;
      this.bwbcCardDonate.receipt = cardDonationInfo.receipt;
      this.bwbcCardDonate.donatorName = cardDonationInfo.donatorName;
      this.bwbcCardDonate.address = cardDonationInfo.address;
      this.step = cardDonationInfo.step;
      console.log(
      '捐款模式：'+this.bwbcCardDonate.paymentToolCode+
      ', 捐款金額：'+this.bwbcCardDonate.amount+
      ', 收據：'+this.bwbcCardDonate.receipt+
      ', 收據抬頭：'+this.bwbcCardDonate.donatorName+
      ', 地址：'+this.bwbcCardDonate.address+
      ', step:'+this.step
      );
    },
    setMemberInfo(memberInfo) {
      this.bwbcCardDonate.memberName = memberInfo.name;
      this.bwbcCardDonate.genderTypeCode = memberInfo.genderTypeCode;
      this.bwbcCardDonate.payerTypeCode = memberInfo.payerTypeCode;
      this.bwbcCardDonate.useridType = memberInfo.useridType;
      this.bwbcCardDonate.sin = memberInfo.sin;
      this.bwbcCardDonate.sinLast4 = memberInfo.sinLast4;
      this.bwbcCardDonate.cellPhone = memberInfo.cellPhone;
      this.bwbcCardDonate.homePhone = memberInfo.homePhone;
      this.bwbcCardDonate.email = memberInfo.email;
      this.bwbcCardDonate.region = memberInfo.region;
      this.step = memberInfo.step;
      console.log(
        "name=" +
          this.bwbcCardDonate.memberName +
          ", genderTypeCode=" +
          this.bwbcCardDonate.genderTypeCode +
          ", payerTypeCode=" +
          this.bwbcCardDonate.payerTypeCode +
          ", useridType=" +
          this.bwbcCardDonate.useridType +
          ", sin=" +
          this.bwbcCardDonate.sin +
          ", sinLast4=" +
          this.bwbcCardDonate.sinLast4 +
          ", cellPhone=" +
          this.bwbcCardDonate.cellPhone +
          ", homePhone=" +
          this.bwbcCardDonate.homePhone +
          ", email=" +
          this.bwbcCardDonate.email +
          ", region=" +
          this.bwbcCardDonate.region
      );
    },
    setCreditCardInfo(creditCardInfo) {
      this.bwbcCardDonate.address = cardDonationInfo.address;
      this.bwbcCardDonate.cardNumber = cardDonationInfo.cardNumber;
      this.bwbcCardDonate.cardMonth = cardDonationInfo.cardMonths;
      this.bwbcCardDonate.cardYear = cardDonationInfo.cardYear;
      this.bwbcCardDonate.cvc = cardDonationInfo.cvc;
      this.step = cardDonationInfo.step;
    },
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