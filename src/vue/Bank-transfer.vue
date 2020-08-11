<template>
  <!-- 固定帳號匯款 -->
  <div id="body">
    <div v-if="step == '1'">
      <TransferDonation ref="stepOne" @nextStep="setTransferDonation($event)"></TransferDonation>
    </div>
    <div v-if="step == '2'">
      <MemberInfo ref="stepTwo" @nextStep="setMemberinfo($event)"></MemberInfo>
    </div>
    <div v-if="step == '3'">
      <TransferInfo ref="stepThree" @nextStep="setTransferInfo($event)"></TransferInfo>
    </div>
    <div v-if="step == '4'">
      感謝回報內容
    </div>
  </div>
</template>

<script>
import MemberInfo from "./components/member-info";
import TransferDonation from "./components/transfer-donation";
import TransferInfo from "./components/transfer-info";
export default {
  components: {
    MemberInfo,
    TransferDonation,
    TransferInfo,
  },
  data() {
    return {
      step: "1", // 依步驟要顯示的component
      bwbcTransfer: {
        amount: null, // 捐款金額
        receipt: null, // 收據開立方式
        donatorName: null, // 收據抬頭
        address: null, // 地址
        memberName: null, // 姓名
        genderTypeCode: null, // 性別
        payerTypeCode: null, // 是否參加福智廣論研討班
        useridType: null, // 身分證選填全碼或末四碼
        sin: null, // 身分證字號
        sinLast4: null, // 身分證字號末四碼
        cellPhone: null, // 手機號碼
        homePhone: null, // 住家電話
        email: null, // 電子信箱
        region: null, // 居住地
        accountLast5: null, // 匯款帳號末五碼
        name: null, // 匯款人
        donaDate: null, // 匯款日期
      },
    };
  },
  methods: {
    setTransferDonation(transferDonation) {
      this.bwbcTransfer.amount = transferDonation.amount;
      this.bwbcTransfer.receipt = transferDonation.receipt;
      this.bwbcTransfer.donatorName = transferDonation.donatorName;
      this.bwbcTransfer.address = transferDonation.address;
      this.step = transferDonation.step;
      console.log(
        "amount=" +
          this.bwbcTransfer.amount +
          ", receipt=" +
          this.bwbcTransfer.receipt +
          ", donatorName=" +
          this.bwbcTransfer.donatorName +
          ", address=" +
          this.bwbcTransfer.address
      );
    },
    setMemberinfo(memberInfo) {
      this.bwbcTransfer.memberName = memberInfo.name;
      this.bwbcTransfer.genderTypeCode = memberInfo.genderTypeCode;
      this.bwbcTransfer.payerTypeCode = memberInfo.payerTypeCode;
      this.bwbcTransfer.useridType = memberInfo.useridType;
      this.bwbcTransfer.sin = memberInfo.sin;
      this.bwbcTransfer.sinLast4 = memberInfo.sinLast4;
      this.bwbcTransfer.cellPhone = memberInfo.cellPhone;
      this.bwbcTransfer.homePhone = memberInfo.homePhone;
      this.bwbcTransfer.email = memberInfo.email;
      this.bwbcTransfer.region = memberInfo.region;
      this.step = memberInfo.step;
      console.log(
        "name=" +
          this.bwbcTransfer.name +
          ", genderTypeCode=" +
          this.bwbcTransfer.genderTypeCode +
          ", payerTypeCode=" +
          this.bwbcTransfer.payerTypeCode +
          ", useridType=" +
          this.bwbcTransfer.useridType +
          ", sin=" +
          this.bwbcTransfer.sin +
          ", sinLast4=" +
          this.bwbcTransfer.sinLast4 +
          ", cellPhone=" +
          this.bwbcTransfer.cellPhone +
          ", homePhone=" +
          this.bwbcTransfer.homePhone +
          ", email=" +
          this.bwbcTransfer.email +
          ", region=" +
          this.bwbcTransfer.region
      );
    },
    setTransferInfo(transferInfo) {
      this.bwbcTransfer.accountLast5 = transferInfo.accountLast5;
      this.bwbcTransfer.name = transferInfo.name;
      this.bwbcTransfer.donaDate = transferInfo.donaDate;
      this.step = transferInfo.step;
      console.log(
        "accountLast5=" +
          this.bwbcTransfer.accountLast5 +
          ", name=" +
          this.bwbcTransfer.name +
          ", donaDate=" +
          this.bwbcTransfer.donaDate
      );
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
.el-row {
  margin: 16px 0;
}
</style>