<template>
  <div id="body">
    <span style="font-weight:500; font-size:20px;">感謝您進行了線上捐款</span>
    <p style="font-size:16px;">
      謝謝您認同我們的教育理念，更為了教育環境盡一份力！
      <br />若捐款有問題我們將主動跟您聯繫。
    </p>
    <!-- <div>
        <span style="font-size:18px;">以下是您的捐款資訊：</span>
        <p style="font-size:16px; margin:0;">捐款人：{{bwbcCardDonate.name}}</p>
        <p style="font-size:16px; margin:0;">手機號碼：{{bwbcCardDonate.cellPhone}}</p>
        <p style="font-size:16px; margin:0;">捐款項目：福智佛教學院</p>
        <p style="font-size:16px; margin:0;">捐款日期：{{donaDate}}</p>
        <p style="font-size:16px; margin:0;" v-if="bwbcCardDonate.paymentToolCode == 'R'">捐款方式：定期定額</p>
        <p style="font-size:16px; margin:0;" v-else>捐款方式：單筆捐款</p>
        <p style="font-size:16px; margin:0;">捐款金額：{{bwbcCardDonate.amount}}</p>
        <p style="font-size:16px; margin:0;" v-show="bwbcCardDonate.receiptTypeCode == 'BY_TIME'">收據開立方式：單筆開立</p>
        <p style="font-size:16px; margin:0;" v-show="bwbcCardDonate.receiptTypeCode == 'ANNUAL'">收據開立方式：年開</p>
        <p style="font-size:16px; margin:0;" v-show="bwbcCardDonate.receiptTypeCode == 'UNWANTTED'">收據開立方式：不需寄發</p>
        <p style="font-size:16px; margin:0;" v-if="bwbcCardDonate.receiptTypeCode != 'UNWANTTED'">收據抬頭：{{bwbcCardDonate.donatorName}}</p>
    </div> -->
    <p style="font-size:16px;">再次誠摯感謝您！</p>
    <p style="font-size:16px;">
      若您有疑惑，歡迎您透過以下方式聯繫我們：
      <br />捐款專線：05-582-8222 分機6085
      <br />福智佛教學院籌備處信箱：bwbc.po@blisswisdom.org
      <br />
    </p>
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
            <el-button @click="dialog.isShow = false" class="primary-color">好喔</el-button>
          </el-col>
        </el-row>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import API from "../api";

export default {
  data() {
    return {
      bwbcCardDonate: null,
      dialog: {
        title: "",
        content: "",
        isShow: false,
      },
    };
  },
  created(){
    let urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams.get('no'));
    // this.getDonationTxn(urlParams.get('no'));
  },
  methods:{
    getDonationTxn(donatxnNo){
      API.donate.wpDonationData(donatxnNo).then(res=>{
        if (res.data.status == 200) {
          this.bwbcCardDonate = res.data.data;
        } else {
          this.showMessageBox('提示',res.data.message);
        }
      }).catch(e=>{
        console.log("getDonationTxn:"+e)
      })
    },
    showMessageBox(title, content) {
      this.dialog.title = title;
      this.dialog.content = content;
      this.dialog.isShow = true;
    }
  }
};
</script>

<style lang="scss" scoped>
#body {
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}
</style>