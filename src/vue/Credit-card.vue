<template>
  <!-- 信用卡捐款 -->
  <div
    id="body"
    v-loading="loading"
    element-loading-text="努力傳送資料中..."
    class="wp"
  >
    <div v-show="step == '1'" id="step-one">
      <CardDonationInfo
        @nextStep="setCardDonationInfo($event)"
      ></CardDonationInfo>
    </div>
    <div v-show="step == '2'" id="step-two">
      <CreditCardInfo
        :donationInfo="bwbcCardDonate"
        @nextStep="setCreditCardInfo($event)"
      ></CreditCardInfo>
    </div>
    <div v-show="step == '3'" id="step-three">
      <MemberInfo
        :donationInfo="bwbcCardDonate"
        @nextStep="setMemberInfo($event)"
      ></MemberInfo>
    </div>
    <div v-show="step == '4'">
      <span style="font-weight:500; font-size:20px; color:#9c8044;">感謝您進行了線上捐款</span>
      <p style="font-size:16px;">
        謝謝您認同我們的教育理念，更為了教育環境盡一份力！
        <br />若捐款有問題我們將主動跟您聯繫。
      </p>
      <div>
        <span style="font-size:18px; color:#9c8044;">以下是您的捐款資訊：</span>
        <p style="font-size:16px; margin:0;">捐款編號：{{donationNo}}</p>
        <p style="font-size:16px; margin:0;">捐款人：{{bwbcCardDonate.name}}</p>
        <p style="font-size:16px; margin:0;">手機號碼：{{bwbcCardDonate.cellPhone}}</p>
        <p style="font-size:16px; margin:0;">捐款項目：福智佛教學院</p>
        <p style="font-size:16px; margin:0;">捐款日期：{{donaDate}}</p>
        <p style="font-size:16px; margin:0;" v-if="bwbcCardDonate.paymentToolCode == 'R'">捐款方式：定期定額</p>
        <p style="font-size:16px; margin:0;" v-else>捐款方式：單筆捐款</p>
        <p style="font-size:16px; margin:0;">捐款金額：{{bwbcCardDonate.amount}}</p>
        <p
          style="font-size:16px; margin:0;"
          v-show="bwbcCardDonate.receiptTypeCode == 'BY_TIME'"
        >收據開立方式：單筆開立</p>
        <p
          style="font-size:16px; margin:0;"
          v-show="bwbcCardDonate.receiptTypeCode == 'ANNUAL'"
        >收據開立方式：年開</p>
        <p
          style="font-size:16px; margin:0;"
          v-show="bwbcCardDonate.receiptTypeCode == 'UNWANTTED'"
        >收據開立方式：不需寄發</p>
        <p
          style="font-size:16px; margin:0;"
          v-if="bwbcCardDonate.receiptTypeCode != 'UNWANTTED'"
        >收據抬頭：{{bwbcCardDonate.donatorName}}</p>
      </div>
      <p style="font-size:16px;">再次誠摯感謝您！</p>
      <p style="font-size:16px;">
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
        isForeign: null, // 國籍
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
        phone_country_code: null,
        homePhone: null, // 住家電話
        email: null, // 電子信箱
        card: {
          number: null, // 信用卡號碼
          expMonth: null, // 有效月
          expYear: null, // 有效年
          cvc: null, // 安全碼
        },
        notifyTypeCode: "NONE", // 通知方式 1.SMS簡訊 2.EMAIL電子信件 3.NONE不通知
        donaUseCode: "Z", // 佛教學校
        donaItemCode: "", // 佛教學校
        from: "card",
        region: null, // 居住地
      },
      useridType: null, // 身分證選填全碼或末四碼
      donaDate: null,
      dialog: {
        title: "",
        content: "",
        isShow: false,
      },
      loading: false,
      donationNo: null,
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
        this.bwbcCardDonate.sinLast4 = this.bwbcCardDonate.sin.substr(6, 4);
      } else {
        this.bwbcCardDonate.sin = null;
      }
      if (this.bwbcCardDonate.receiptTypeCode == "UNWANTTED") {
        this.bwbcCardDonate.donatorName = this.bwbcCardDonate.name;
        if (this.region !== null) {
          this.bwbcCardDonate.address = {
            addressType: "TAIWAN",
            city: this.region,
          };
        }
      }
       if (this.bwbcCardDonate.paymentToolCode === "E") {
          this.bwbcCardDonate.donaItemCode = "W851";
        } else if (this.bwbcCardDonate.paymentToolCode === "R") {
          this.bwbcCardDonate.donaItemCode = "W852";
        }
      API.donate.wpDonateCard(this.bwbcCardDonate).then((res) => {
        let data = res.data;
        if (data.status == 200 && data.message == "成功取得3D HTML") {
          var body2 = data.data.Result;
          document.body.innerHTML = body2;
          document.forms[0].submit();
        } else if (data.status == 200) {
          this.donationNo = data.data;
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
    setCardDonationInfo(cardDonationInfo) {
      this.bwbcCardDonate.paymentToolCode = cardDonationInfo.paymentToolCode;
      this.bwbcCardDonate.amount = cardDonationInfo.amount;
      this.step = cardDonationInfo.step;
    },
    setMemberInfo(memberInfo) {
      console.log(`cc setMemberInfo`);
      this.bwbcCardDonate.name = memberInfo.name;
      this.bwbcCardDonate.genderTypeCode = memberInfo.genderTypeCode;
      this.bwbcCardDonate.payerTypeCode = memberInfo.payerTypeCode;
      this.useridType = memberInfo.useridType;
      this.bwbcCardDonate.sin = memberInfo.sin;
      this.bwbcCardDonate.sinLast4 = memberInfo.sinLast4;
      this.bwbcCardDonate.cellPhone = memberInfo.cellPhone;
      this.bwbcCardDonate.phone_country_code = memberInfo.phone_country_code;
      this.bwbcCardDonate.homePhone = memberInfo.homePhone;
      this.bwbcCardDonate.email = memberInfo.email;
      this.region = memberInfo.region;
      this.bwbcCardDonate.notifyTypeCode = memberInfo.notifyTypeCode;
      this.bwbcCardDonate.receiptTypeCode = memberInfo.receiptTypeCode;
      this.bwbcCardDonate.donatorName = memberInfo.donatorName;
      this.bwbcCardDonate.address = memberInfo.address;
      this.bwbcCardDonate.isForeign = memberInfo.isForeign;
      console.log(
        "phone_country_code:" +
          this.bwbcCardDonate.phone_country_code +
          " / " +
          this.bwbcCardDonate.notifyTypeCode +
          "。" +
          typeof this.bwbcCardDonate.isForeign +
          ", " +
          this.bwbcCardDonate.isForeign
      );
      if (memberInfo.step == "4") {
        this.donate();
      } else {
        this.step = memberInfo.step;
      }
    },
    setCreditCardInfo(creditCardInfo) {
      this.bwbcCardDonate.card.number = creditCardInfo.cardNumber;
      this.bwbcCardDonate.card.expMonth = creditCardInfo.cardMonth;
      this.bwbcCardDonate.card.expYear = creditCardInfo.cardYear;
      this.bwbcCardDonate.card.cvc = creditCardInfo.cvc;
      this.step = creditCardInfo.step;
    },
    showMessageBox(title, content) {
      this.dialog.title = title;
      this.dialog.content = content;
      this.dialog.isShow = true;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "node_modules/bootstrap/scss/bootstrap";
@import "node_modules/bootstrap-vue/src/index.scss";
</style>