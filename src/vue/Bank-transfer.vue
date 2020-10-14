<template>
  <!-- 固定帳號匯款 -->
  <div id="body" v-loading="loading" element-loading-text="努力傳送資料中...">
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
      <span style="font-weight:500; font-size:20px; color:#9c8044;">感謝您的支持</span>
      <p style="font-size:16px; color:#424242;">
        謝謝您認同我們的教育理念，更為了教育環境盡一份力！
        <br />若捐款有問題我們將主動跟您聯繫。
      </p>
      <div>
        <span style="font-size:18px; color:#9c8044;">以下是您回報的資訊：</span>
        <p style="font-size:16px; margin:0; color:#424242;">捐款方式：匯款</p>
        <p
          style="font-size:16px; margin:0; color:#424242;"
          v-if="bwbcTransferDonate.donatorTypeCode == 'PERSON'"
        >捐款人：{{bwbcTransferDonate.name}}</p>
        <p style="font-size:16px; margin:0; color:#424242;" v-else>捐款公司：{{bwbcTransferDonate.companyName}}</p>
        <p
          style="font-size:16px; margin:0; color:#424242;"
          v-if="bwbcTransferDonate.donatorTypeCode == 'PERSON'"
        >手機號碼：{{bwbcTransferDonate.cellPhone}}</p>
        <p style="font-size:16px; margin:0; color:#424242;" v-else>聯絡電話：{{bwbcTransferDonate.cellPhone}}</p>
        <p style="font-size:16px; margin:0; color:#424242;">捐款項目：福智佛教學院</p>
        <p style="font-size:16px; margin:0; color:#424242;">回報日期：{{donaDate}}</p>
        <p style="font-size:16px; margin:0; color:#424242;">捐款金額：{{bwbcTransferDonate.amount}}</p>
        <p
          style="font-size:16px; margin:0; color:#424242;"
          v-show="bwbcTransferDonate.receiptTypeCode == 'BY_TIME'"
        >收據開立方式：單筆開立</p>
        <p
          style="font-size:16px; margin:0; color:#424242;"
          v-show="bwbcTransferDonate.receiptTypeCode == 'UNWANTTED'"
        >收據開立方式：不需寄發</p>
      </div>
      <p style="font-size:16px; color:#424242;">再次誠摯感謝您！</p>
      <p style="font-size:16px; color:#424242;">
        若您有疑惑，歡迎您透過以下方式聯繫我們：
        <br />籌備處募款組辦公室電話02-7730-0016
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
import API from "../api";
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
      loading: false,
      bwbcTransferDonate: {
        donatorTypeCode: null, // PERSON自然人捐款 CORPORATION法人捐款
        paymentToolCode: 'E', // 捐款模式: E單次捐款 R定期定額
        isForeign: null, // 國籍
        amount: null, // 捐款金額
        receiptTypeCode: null, // 收據開立方式: 1.BY_TIME單筆 2.UNWANTTED不需寄發
        donatorName: null, // 收據抬頭
        address: null, // 地址
        memo1: null, // 匯款帳號末五碼
        memo2: null, // 匯款人
        date1: null, // 匯款日期
        name: null, // 會員姓名
        genderTypeCode: null, // 性別
        payerTypeCode: null, // 是否參加福智廣論研討班
        sin: null, // 身分證字號
        sinLast4: null, // 身分證字號末四碼
        cellPhone: null, // 手機號碼
        homePhone: null, // 住家電話
        email: null, // 電子信箱
        notifyTypeCode: null, // 通知方式 1.SMS簡訊 2.EMAIL電子信件 3.NONE不通知
        companyName: null, // 公司名稱
        sinCompany: null, // 公司統編
        companyAddress: null, // 聯絡地址
        donaUseCode: "Z",
        donaItemCode: "W11",
        imgData: null,
        from: "transfer",
      },
      region: null, // 居住地
      useridType: null, // 身分證選填全碼或末四碼
      phone_country_code: null,
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
    donate() {
      this.loading = !this.loading;
      console.log("loading");
      if (this.useridType == "全碼") {
        this.bwbcTransferDonate.sinLast4 = this.bwbcTransferDonate.sin.substr(
          6,
          4
        );
      } else {
        this.bwbcTransferDonate.sin = null;
      }
      if (this.bwbcTransferDonate.receiptTypeCode == "UNWANTTED") {
        this.bwbcTransferDonate.donatorName = this.bwbcTransferDonate.name;
        if (this.region !== null) {
          this.bwbcTransferDonate.address = {
            addressType: "TAIWAN",
            city: this.region,
          };
        }
      }
      API.donate.wpDonateSquare(this.bwbcTransferDonate).then((res) => {
        let data = res.data;
        if (data.status == 200) {
          this.step = "4";
        } else {
          console.log(`data.pageChange:${data.pageChange}`);
          switch (data.pageChange) {
            case "NEXT":
              this.step = "4";
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
        this.loading = !this.loading;
        console.log("done");
      });
    },
    setTransferDonation(transferDonation) {
      this.bwbcTransferDonate.donatorTypeCode =
        transferDonation.donatorTypeCode;
      this.bwbcTransferDonate.isForeign = transferDonation.isForeign;
      this.bwbcTransferDonate.amount = transferDonation.amount;
      this.bwbcTransferDonate.donatorName = transferDonation.donatorName;
      this.step = transferDonation.step;
    },
    setMemberInfo(memberInfo) {
      this.bwbcTransferDonate.name = memberInfo.name;
      this.bwbcTransferDonate.genderTypeCode = memberInfo.genderTypeCode;
      this.bwbcTransferDonate.payerTypeCode = memberInfo.payerTypeCode;
      this.useridType = memberInfo.useridType;
      this.bwbcTransferDonate.sin = memberInfo.sin;
      this.bwbcTransferDonate.sinLast4 = memberInfo.sinLast4;
      this.bwbcTransferDonate.cellPhone = memberInfo.cellPhone;
      this.phone_country_code = memberInfo.phone_country_code;
      this.bwbcTransferDonate.homePhone = memberInfo.homePhone;
      this.bwbcTransferDonate.donatorName = memberInfo.donatorName;
      this.bwbcTransferDonate.receiptTypeCode = memberInfo.receiptTypeCode;
      this.bwbcTransferDonate.email = memberInfo.email;
      this.bwbcTransferDonate.address = memberInfo.address;
      this.bwbcTransferDonate.notifyTypeCode = "NONE";
      this.region = memberInfo.region;
      this.step = memberInfo.step;
      if (this.step == "4") this.donate();
      // this.log();
    },
    setTransferInfo(transferInfo) {
      this.bwbcTransferDonate.memo1 = transferInfo.memo1;
      this.bwbcTransferDonate.memo2 = transferInfo.memo2;
      this.bwbcTransferDonate.date1 = this.getDateString(transferInfo.date1);
      this.bwbcTransferDonate.imgData = transferInfo.imgData;
      this.step = transferInfo.step;
    },
    setCorporationInfo(companyInfo) {
      this.bwbcTransferDonate.companyName = companyInfo.name;
      this.bwbcTransferDonate.sinCompany = companyInfo.sinCompany;
      this.bwbcTransferDonate.companyAddress = companyInfo.companyAddress;
      this.bwbcTransferDonate.name = companyInfo.contactName;
      this.bwbcTransferDonate.genderTypeCode = "MALE";
      this.bwbcTransferDonate.payerTypeCode = "NOT_HEARD";
      this.bwbcTransferDonate.sin = null;
      this.bwbcTransferDonate.sinLast4 = "0000";
      this.bwbcTransferDonate.cellPhone = companyInfo.contactPhone;
      this.bwbcTransferDonate.homePhone = null;
      this.bwbcTransferDonate.email = companyInfo.contactEmail;
      this.bwbcTransferDonate.donatorName = companyInfo.donatorName;
      this.bwbcTransferDonate.receiptTypeCode = companyInfo.receiptTypeCode;
      this.bwbcTransferDonate.address = companyInfo.address;
      this.bwbcTransferDonate.notifyTypeCode = "NONE";
      this.region = null;
      this.useridType = "末四碼";
      this.step = companyInfo.step;
      if (this.step == "4") this.donate();
      // this.log();
    },
    getDateString(date1) {
      let year = `${new Date(date1).getFullYear()}`;
      let month = new Date(date1).getMonth() + 1;
      let date = new Date(date1).getDate();
      return `${year}/${month < 10 ? `0${month}` : month}/${
        date < 10 ? `0${date}` : date
      }`;
    },
    log() {
      console.log(
        `捐款身份：`+this.bwbcTransferDonate.donatorTypeCode+`,`+
        `捐款模式：`+this.bwbcTransferDonate.paymentToolCode+`,`+
        `外國人：`+this.bwbcTransferDonate.isForeign+`,`+
        `捐款金額：`+this.bwbcTransferDonate.amount+`,`+
        `收據開立方式：`+this.bwbcTransferDonate.receiptTypeCode+`,`+
        `收據抬頭：`+this.bwbcTransferDonate.donatorName+`,`+
        `地址：`+this.bwbcTransferDonate.address+`,`+
        `匯款帳號末五碼：`+this.bwbcTransferDonate.memo1+`,`+
        `匯款人：`+this.bwbcTransferDonate.memo2+`,`+
        `匯款日期：`+this.bwbcTransferDonate.date1+`,`+
        `會員姓名：`+this.bwbcTransferDonate.name+`,`+
        `捐款金額：`+this.bwbcTransferDonate.amount+`,`+
        `性別：`+this.bwbcTransferDonate.genderTypeCode+`,`+
        `廣論演討班：`+this.bwbcTransferDonate.payerTypeCode+`,`+
        `身分證字號：`+this.bwbcTransferDonate.sin+`,`+
        `身分證後四碼：`+this.bwbcTransferDonate.sinLast4+`,`+
        `手機號碼：`+this.bwbcTransferDonate.cellPhone+`,`+
        `住家電話：`+this.bwbcTransferDonate.homePhone+`,`+
        `電子信箱：`+this.bwbcTransferDonate.email+`,`+
        `通知方式：`+this.bwbcTransferDonate.notifyTypeCode+`,`+
        `公司名稱：`+this.bwbcTransferDonate.companyName+`,`+
        `公司統編：`+this.bwbcTransferDonate.sinCompany+`,`+
        `聯絡地址：`+this.bwbcTransferDonate.companyAddress+`,`
      );
    }
  },
};
</script>

<style lang="scss" scoped>
@import 'node_modules/bootstrap/scss/bootstrap';
@import 'node_modules/bootstrap-vue/src/index.scss';
#body {
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