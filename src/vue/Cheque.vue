<template>
  <div id="body" v-loading="loading" element-loading-text="努力傳送資料中...">
    <div v-show="step == '1'" id="step-one">
      <ChequeDonationInfo
        @nextStep="setChequeDonationInfo($event)"
      ></ChequeDonationInfo>
    </div>
    <div v-show="step == '2'" id="step-two">
      <ChequeInfo @nextStep="setChequeInfo($event)"></ChequeInfo>
    </div>
    <div v-show="step == '3'" id="step-three">
      <MemberInfo
        v-if="bwbcChequeDonate.donatorTypeCode == 'PERSON'"
        :donationInfo="bwbcChequeDonate"
        @nextStep="setMemberInfo($event)"
      ></MemberInfo>
      <CompanyInfo
        v-if="bwbcChequeDonate.donatorTypeCode == 'CORPORATION'"
        :donationInfo="bwbcChequeDonate"
        @nextStep="setCorporationInfo($event)"
      ></CompanyInfo>
    </div>
    <div v-if="step == '4'">
      <span style="font-weight: 500; font-size: 20px; color: #9c8044"
        >感謝您的支持</span
      >
      <p style="font-size: 16px; color: #424242">
        謝謝您認同我們的教育理念，更為了教育環境盡一份力！
        <br />若捐款有問題我們將主動跟您聯繫。
      </p>
      <div>
        <span style="font-size: 18px; color: #9c8044"
          >以下是您回報的資訊：</span
        >
        <p style="font-size: 16px; margin: 0; color: #424242">
          捐款方式：支票捐款
        </p>
        <p
          style="font-size: 16px; margin: 0; color: #424242"
          v-if="bwbcChequeDonate.donatorTypeCode == 'PERSON'"
        >
          捐款人：{{ bwbcChequeDonate.name }}
        </p>
        <p style="font-size: 16px; margin: 0; color: #424242" v-else>
          捐款公司：{{ bwbcChequeDonate.companyName }}
        </p>
        <p
          style="font-size: 16px; margin: 0; color: #424242"
          v-if="bwbcChequeDonate.donatorTypeCode == 'PERSON'"
        >
          手機號碼：{{ bwbcChequeDonate.cellPhone }}
        </p>
        <p style="font-size: 16px; margin: 0; color: #424242" v-else>
          聯絡電話：{{ bwbcChequeDonate.cellPhone }}
        </p>
        <p style="font-size: 16px; margin: 0; color: #424242">
          捐款項目：福智佛教學院
        </p>
        <p style="font-size: 16px; margin: 0; color: #424242">
          回報日期：{{ donaDate }}
        </p>
        <p style="font-size: 16px; margin: 0; color: #424242">
          捐款金額：{{ bwbcChequeDonate.amount }}
        </p>
        <p
          style="font-size: 16px; margin: 0; color: #424242"
          v-show="bwbcChequeDonate.receiptTypeCode == 'BY_TIME'"
        >
          收據開立方式：單筆開立
        </p>
        <p
          style="font-size: 16px; margin: 0; color: #424242"
          v-show="bwbcChequeDonate.receiptTypeCode == 'UNWANTTED'"
        >
          收據開立方式：不需寄發
        </p>
      </div>
      <p style="font-size: 16px; color: #424242">再次誠摯感謝您！</p>
      <p style="font-size: 16px; color: #424242">
        若您有疑惑，歡迎您透過以下方式聯繫我們：
        <br />籌備處募款組辦公室電話02-7730-0016
        <br />福智佛教學院籌備處信箱：bwbc.po@blisswisdom.org
        <br />
      </p>
    </div>
    <el-dialog
      custom-class="dialog-message-box"
      :title="dialog.title"
      :visible.sync="dialog.isShow"
      :show-close="false"
    >
      <span v-html="dialog.content"></span>
      <span slot="footer" class="dialog-footer">
        <el-row class="top-line">
          <el-col>
            <el-button @click="dialog.isShow = false" class="primary-color"
              >我知道了</el-button
            >
          </el-col>
        </el-row>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ChequeDonationInfo from "./components/cheque-donation-info";
import ChequeInfo from "./components/cheque-info";
import MemberInfo from "./components/member-info";
import CompanyInfo from "./components/company-info";
import API from "../api";

export default {
  components: { ChequeDonationInfo, ChequeInfo, MemberInfo, CompanyInfo },
  data() {
    return {
      step: "1",
      bwbcChequeDonate: {
        donatorTypeCode: null, // PERSON自然人捐款 CORPORATION法人捐款
        paymentToolCode: "E", // 捐款模式: E單次捐款 R定期定額
        isForeign: null, // 國籍
        amount: null, // 捐款金額
        receiptTypeCode: null, // 收據開立方式: 1.BY_TIME單筆 2.UNWANTTED不需寄發
        donatorName: null, // 收據抬頭
        address: null, // 收據寄送地址
        memo1: null, // 支票末五碼
        memo2: null, // 開票人
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
        companyAddress: null, // 公司聯絡地址
        donaUseCode: "Z",
        donaItemCode: "W11",
        from: "cheque",
        imgData: null,
      },
      region: null, // 居住地
      phone_country_code: null,
      useridType: null, // 身分證選填全碼或末四碼
      donaDate: null,
      dialog: {
        title: "",
        content: "",
        isShow: false,
      },
      loading: false,
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
        this.bwbcChequeDonate.sinLast4 = this.bwbcChequeDonate.sin.substr(6, 4);
      } else {
        this.bwbcChequeDonate.sin = null;
      }
      if (this.bwbcChequeDonate.receiptTypeCode == "UNWANTTED") {
        this.bwbcChequeDonate.donatorName = this.bwbcChequeDonate.name;
        if (this.region !== null) {
          this.bwbcChequeDonate.address = {
            addressType: "TAIWAN",
            city: this.region,
          };
        }
      }
      API.donate.wpDonateCheck(this.bwbcChequeDonate).then((res) => {
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
    setChequeDonationInfo(chequeDonationInfo) {
      this.bwbcChequeDonate.donatorTypeCode =
        chequeDonationInfo.donatorTypeCode;
      this.bwbcChequeDonate.amount = chequeDonationInfo.amount;
      this.bwbcChequeDonate.isForeign = chequeDonationInfo.isForeign;
      this.step = chequeDonationInfo.step;
      console.log(
        this.bwbcChequeDonate.donatorTypeCode +
          " / " +
          this.bwbcChequeDonate.amount +
          " / " +
          this.step
      );
    },
    setChequeInfo(chequeInfo) {
      this.bwbcChequeDonate.memo1 = chequeInfo.memo1;
      this.bwbcChequeDonate.memo2 = chequeInfo.memo2;
      this.bwbcChequeDonate.imgData = chequeInfo.imgData;

      this.step = chequeInfo.step;
    },
    setMemberInfo(memberInfo) {
      this.bwbcChequeDonate.name = memberInfo.name;
      this.bwbcChequeDonate.genderTypeCode = memberInfo.genderTypeCode;
      this.bwbcChequeDonate.payerTypeCode = memberInfo.payerTypeCode;
      this.useridType = memberInfo.useridType;
      this.bwbcChequeDonate.sin = memberInfo.sin;
      this.bwbcChequeDonate.sinLast4 = memberInfo.sinLast4;
      this.bwbcChequeDonate.cellPhone = memberInfo.cellPhone;
      this.phone_country_code = memberInfo.phone_country_code;
      this.bwbcChequeDonate.homePhone = memberInfo.homePhone;
      this.bwbcChequeDonate.email = memberInfo.email;
      this.bwbcChequeDonate.notifyTypeCode = "NONE";
      this.region = memberInfo.region;
      this.bwbcChequeDonate.receiptTypeCode = memberInfo.receiptTypeCode;
      this.bwbcChequeDonate.address = memberInfo.address;
      this.bwbcChequeDonate.donatorName = memberInfo.donatorName;
      if (memberInfo.step == "4") {
        this.donate();
      } else {
        this.step = memberInfo.step;
      }
    },
    setCorporationInfo(companyInfo) {
      this.bwbcChequeDonate.companyName = companyInfo.name;
      this.bwbcChequeDonate.sinCompany = companyInfo.sinCompany;
      this.bwbcChequeDonate.companyAddress = companyInfo.companyAddress;
      this.bwbcChequeDonate.name = companyInfo.contactName;
      this.bwbcChequeDonate.genderTypeCode = "MALE";
      this.bwbcChequeDonate.payerTypeCode = "NOT_HEARD";
      this.bwbcChequeDonate.sin = null;
      this.bwbcChequeDonate.sinLast4 = "0000";
      this.bwbcChequeDonate.cellPhone = companyInfo.contactPhone;
      this.phone_country_code = null;
      this.bwbcChequeDonate.homePhone = null;
      this.bwbcChequeDonate.email = companyInfo.contactEmail;
      this.region = null;
      this.useridType = "末四碼";
      this.bwbcChequeDonate.notifyTypeCode = "NONE";
      this.bwbcChequeDonate.address = companyInfo.address;
      this.bwbcChequeDonate.donatorName = companyInfo.donatorName;
      this.bwbcChequeDonate.receiptTypeCode = companyInfo.receiptTypeCode;
      this.step = companyInfo.step;
      if (companyInfo.step == "4") {
        this.donate();
      } else {
        this.step = companyInfo.step;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "node_modules/bootstrap/scss/bootstrap";
@import "node_modules/bootstrap-vue/src/index.scss";
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