<template>
  <!-- 固定帳號匯款 -->
  <div id="body">
    <div v-show="step == '1'" id="step-one">
      <TransferDonation @nextStep="setTransferDonation($event)"></TransferDonation>
    </div>
    <div v-show="step == '2'" id="step-two">
      <TransferInfo @nextStep="setTransferInfo($event)"></TransferInfo>
    </div>
    <div v-show="step == '3'" id="step-three">
      <MemberInfo
        v-if="bwbcTransferDonate.donatorTypeCode == 'PERSON'"
        :donationInfo="bwbcTransferDonate"
        @nextStep="setMemberInfo($event)"
      ></MemberInfo>
      <CompanyInfo
        v-if="bwbcTransferDonate.donatorTypeCode == 'CORPORATION'"
        :donationInfo="bwbcTransferDonate"
        @nextStep="setCorporationInfo($event)"
      ></CompanyInfo>
    </div>
    <div v-if="step == '4'">
      <span style="font-weight:500; font-size:20px; color:#9c8044;">感謝您進行了線上捐款</span>
      <p style="font-size:16px;">
        謝謝您認同我們的教育理念，更為了教育環境盡一份力！
        <br />若捐款有問題我們將主動跟您聯繫。
      </p>
      <div>
        <span style="font-size:18px; color:#9c8044;">以下是您回報的資訊：</span>
        <p style="font-size:16px; margin:0;">捐款方式：匯款</p>
        <p
          style="font-size:16px; margin:0;"
          v-if="bwbcTransferDonate.donatorTypeCode == 'PERSON'"
        >捐款人：{{bwbcTransferDonate.name}}</p>
        <p style="font-size:16px; margin:0;" v-else>捐款公司：{{bwbcTransferDonate.companyInfo.name}}</p>
        <p
          style="font-size:16px; margin:0;"
          v-if="bwbcTransferDonate.donatorTypeCode == 'PERSON'"
        >手機號碼：{{bwbcTransferDonate.cellPhone}}</p>
        <p style="font-size:16px; margin:0;" v-else>聯絡電話：{{bwbcTransferDonate.cellPhone}}</p>
        <p style="font-size:16px; margin:0;">捐款項目：福智佛教學院</p>
        <p style="font-size:16px; margin:0;">回報日期：{{donaDate}}</p>
        <p style="font-size:16px; margin:0;">捐款金額：{{bwbcTransferDonate.amount}}</p>
        <p
          style="font-size:16px; margin:0;"
          v-show="bwbcTransferDonate.receiptTypeCode == 'BY_TIME'"
        >收據開立方式：單筆開立</p>
        <p
          style="font-size:16px; margin:0;"
          v-show="bwbcTransferDonate.receiptTypeCode == 'UNWANTTED'"
        >收據開立方式：不需寄發</p>
      </div>
      <p style="font-size:16px;">再次誠摯感謝您！</p>
      <p style="font-size:16px;">
        若您有疑惑，歡迎您透過以下方式聯繫我們：
        <br />捐款專線：05-582-8222 分機6085
        <br />福智佛教學院籌備處信箱：bwbc.po@blisswisdom.org
        <br />
      </p>
    </div>
  </div>
</template>

<script>
import MemberInfo from "./components/member-info";
import TransferDonation from "./components/transfer-donation";
import TransferInfo from "./components/transfer-info";
import CompanyInfo from "./components/company-info";
export default {
  components: {
    MemberInfo,
    TransferDonation,
    TransferInfo,
    CompanyInfo,
  },
  data() {
    return {
      step: "1",
      bwbcTransferDonate: {
        donatorTypeCode: null, // PERSON自然人捐款 CORPORATION法人捐款
        isForeign: null, // 國籍
        amount: null, // 捐款金額
        receiptTypeCode: null, // 收據開立方式: 1.BY_TIME單筆 2.UNWANTTED不需寄發
        donatorName: null, // 收據抬頭
        address: null, // 地址
        step: null,
        transfer: {
          memo1: null, // 匯款帳號末五碼
          memo2: null, // 匯款人
          date1: null, // 匯款日期
        },
        name: null, // 會員姓名
        genderTypeCode: null, // 性別
        payerTypeCode: null, // 是否參加福智廣論研討班
        sin: null, // 身分證字號
        sinLast4: null, // 身分證字號末四碼
        cellPhone: null, // 手機號碼
        phone_country_code: null,
        homePhone: null, // 住家電話
        email: null, // 電子信箱
        region: null, // 居住地
        useridType: null, // 身分證選填全碼或末四碼
        notifyTypeCode: null, // 通知方式 1.SMS簡訊 2.EMAIL電子信件 3.NONE不通知
        companyInfo: {
          name: null, // 公司名稱
          sinCompany: null, // 公司統編
          companyAddress: null, // 聯絡地址
        },
        donaUseCode: "Z",
        donaItemCode: "W11",
        fromCard: false,
      },
      donaDate: null,
      dialog: {
        title: "",
        content: "",
        isShow: false,
      },
    };
  },
  mounted() {
    var today = new Date();
    this.donaDate =
      today.getFullYear() +
      "/" +
      (today.getMonth() + 1) +
      "/" +
      today.getDate();
  },
  methods: {
    setTransferDonation(transferDonation) {
      this.bwbcTransferDonate.donatorTypeCode =
        transferDonation.donatorTypeCode;
      this.bwbcTransferDonate.isForeign = transferDonation.isForeign;
      this.bwbcTransferDonate.amount = transferDonation.amount;
      this.bwbcTransferDonate.receiptTypeCode = transferDonation.receipt;
      this.bwbcTransferDonate.donatorName = transferDonation.donatorName;
      this.bwbcTransferDonate.address = transferDonation.address;
      this.step = transferDonation.step;
      console.log(
        this.bwbcTransferDonate.donatorTypeCode +
          " / " +
          this.bwbcTransferDonate.isForeign +
          " / " +
          this.bwbcTransferDonate.amount +
          " / " +
          this.bwbcTransferDonate.receiptTypeCode +
          " / " +
          this.bwbcTransferDonate.donatorName +
          " / " +
          this.bwbcTransferDonate.address +
          " / " +
          this.step
      );
    },
    setMemberInfo(memberInfo) {
      this.bwbcTransferDonate.name = memberInfo.name;
      this.bwbcTransferDonate.genderTypeCode = memberInfo.genderTypeCode;
      this.bwbcTransferDonate.payerTypeCode = memberInfo.payerTypeCode;
      this.useridType = memberInfo.useridType;
      this.bwbcTransferDonate.sin = memberInfo.sin;
      this.bwbcTransferDonate.sinLast4 = memberInfo.sinLast4;
      this.bwbcTransferDonate.cellPhone = memberInfo.cellPhone;
      this.bwbcTransferDonate.phone_country_code =
        memberInfo.phone_country_code;
      this.bwbcTransferDonate.homePhone = memberInfo.homePhone;
      this.bwbcTransferDonate.email = memberInfo.email;
      this.bwbcChequeDonate.notifyTypeCode = "NONE";
      this.region = memberInfo.region;
      this.step = memberInfo.step;
      console.log(
        this.bwbcTransferDonate.name +
          " / " +
          this.bwbcTransferDonate.genderTypeCode +
          " / " +
          this.bwbcTransferDonate.payerTypeCode +
          " / " +
          this.bwbcTransferDonate.sin +
          " / " +
          this.bwbcTransferDonate.sinLast4 +
          " / " +
          this.bwbcTransferDonate.cellPhone +
          " / " +
          this.bwbcTransferDonate.phone_country_code +
          " / " +
          this.bwbcTransferDonate.homePhone +
          " / " +
          this.bwbcTransferDonate.email +
          " / " +
          this.step
      );
    },
    setTransferInfo(transferInfo) {
      this.bwbcTransferDonate.memo1 = transferInfo.memo1;
      this.bwbcTransferDonate.memo2 = transferInfo.memo2;
      this.bwbcTransferDonate.date1 = transferInfo.date1;
      this.step = transferInfo.step;
      console.log(
        "帳號末五碼 =" +
          this.bwbcTransferDonate.memo1 +
          ", 匯款人 =" +
          this.bwbcTransferDonate.memo2 +
          ", 匯款日 =" +
          this.bwbcTransferDonate.date1 +
          ", step" +
          this.step
      );
    },
    setCorporationInfo(companyInfo) {
      this.bwbcTransferDonate.companyInfo.name = companyInfo.name;
      this.bwbcTransferDonate.companyInfo.sinCompany = companyInfo.sinCompany;
      this.bwbcTransferDonate.companyInfo.companyAddress =
        companyInfo.companyAddress;
      this.bwbcTransferDonate.name = companyInfo.contactName;
      this.bwbcTransferDonate.genderTypeCode = "MALE";
      this.bwbcTransferDonate.payerTypeCode = "NOT_HEARD";
      this.bwbcTransferDonate.sin = null;
      this.bwbcTransferDonate.sinLast4 = "0000";
      this.bwbcTransferDonate.cellPhone = companyInfo.contactPhone;
      this.bwbcTransferDonate.phone_country_code = null;
      this.bwbcTransferDonate.homePhone = null;
      this.bwbcTransferDonate.email = companyInfo.contactEmail;
      this.bwbcTransferDonate.region = null;
      this.bwbcTransferDonate.useridType = "末四碼";
      this.bwbcTransferDonate.notifyTypeCode = "NONE";
      this.step = companyInfo.step;
      console.log(
        this.bwbcTransferDonate.companyInfo.name +
          " / " +
          this.bwbcTransferDonate.companyInfo.sinCompany +
          " / " +
          this.bwbcTransferDonate.companyInfo.companyAddress +
          " / " +
          this.bwbcTransferDonate.name +
          " / " +
          this.bwbcTransferDonate.genderTypeCode +
          " / " +
          this.bwbcTransferDonate.sin +
          " / " +
          this.bwbcTransferDonate.sinLast4 +
          " / " +
          this.bwbcTransferDonate.cellPhone +
          " / " +
          this.bwbcTransferDonate.phone_country_code +
          " / " +
          this.bwbcTransferDonate.homePhone +
          " / " +
          this.bwbcTransferDonate.email +
          " / " +
          this.bwbcTransferDonate.region +
          " / " +
          this.bwbcTransferDonate.useridType +
          " / " +
          this.bwbcTransferDonate.notifyTypeCode +
          " / " +
          this.step
      );
    },
  },
};
</script>

<style lang="scss" scoped>
#body {
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;

  /deep/ .el-input__inner {
    font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
      "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  }

  .el-row {
    margin: 8px 0px 10px;
  }

  /deep/ .el-button {
    color: #9c8044;
    border-color: #9c8044;
    background-color: #fff9ee;
    &:hover {
      color: white;
      background-color: #9c8044;
      border-color: #9c8044;
    }
  }
}
</style>