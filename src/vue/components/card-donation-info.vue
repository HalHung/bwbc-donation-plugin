<template>
  <!-- 信用卡捐款資訊(信用卡捐款流程1) -->
  <div id="component-body">
    <el-form :model="cardDonation" :rules="rules" ref="cardDonation">
      <el-row class="step">
        <el-steps :active="1" finish-status="success">
          <el-step title="金額" icon="el-icon-s-order"></el-step>
          <el-step title="卡號" icon="el-icon-bank-card"></el-step>
          <el-step title="收據" icon="el-icon-s-custom"></el-step>
        </el-steps>
      </el-row>
      <p style="color: #9c8044; font-weight: 500; font-size: 24px">捐款資訊</p>
      <el-row>
        <el-col>
          <span class="sub-title">捐款項目：福智佛教學院</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <span class="sub-title">捐款方式</span>
          <span class="required-mark">*</span>
          <span class="sub-title">:&nbsp;</span>
        </el-col>
        <el-col>
          <el-form-item prop="paymentToolCode">
            <el-radio-group v-model="cardDonation.paymentToolCode">
              <el-radio label="E">單次捐款</el-radio>
              <el-radio label="R">定期定額捐款</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <span class="sub-title">捐款金額</span>
          <span class="required-mark">*</span>
          <span class="sub-title">:</span>
        </el-col>
        <el-col v-show="cardDonation.paymentToolCode == 'E'">
          <el-button @click="cardDonation.amount1 = 100" size="mini"
            >100</el-button
          >
          <el-button @click="cardDonation.amount1 = 500" size="mini"
            >500</el-button
          >
          <el-button @click="cardDonation.amount1 = 1000" size="mini"
            >1000</el-button
          >
          <el-button @click="cardDonation.amount1 = 3000" size="mini"
            >3000</el-button
          >
          <el-button @click="cardDonation.amount1 = 5000" size="mini"
            >5000</el-button
          >
        </el-col>
        <el-col v-show="cardDonation.paymentToolCode == 'R'">
          <el-button @click="cardDonation.amount2 = 99" size="mini"
            >99</el-button
          >
          <el-button @click="cardDonation.amount2 = 199" size="mini"
            >199</el-button
          >
          <el-button @click="cardDonation.amount2 = 399" size="mini"
            >399</el-button
          >
          <el-button @click="cardDonation.amount2 = 599" size="mini"
            >599</el-button
          >
          <el-button @click="cardDonation.amount2 = 999" size="mini"
            >999</el-button
          >
        </el-col>
        <el-col style="width: fit-content; margin-top: 8px">
          <el-form-item
            prop="amount1"
            v-if="cardDonation.paymentToolCode == 'E'"
          >
            <el-input-number
              v-model="cardDonation.amount1"
              :min="100"
              :max="100000"
              placeholder="請輸入金額"
              :step="100"
            ></el-input-number>
          </el-form-item>
          <el-form-item prop="amount2" v-else>
            <el-input-number
              v-model="cardDonation.amount2"
              :min="99"
              :max="100000"
              placeholder="請輸入金額"
              :step="100"
            ></el-input-number>
          </el-form-item>
        </el-col>
        <el-col style="width: fit-content; margin-top: 14px">
          <span class="sub-title">&nbsp;元</span>
          <span v-show="cardDonation.paymentToolCode == 'R'" class="sub-title"
            >/&nbsp;每月</span
          >
        </el-col>
      </el-row>
      <el-row>
        <el-col v-show="cardDonation.paymentToolCode == 'E'" style="color: gray"
          >最低金額 NT$100</el-col
        >
        <el-col v-show="cardDonation.paymentToolCode == 'R'" style="color: gray"
          >最低金額 NT$99</el-col
        >
      </el-row>
      <el-row>
        <el-col style="text-align: center; margin: 16px 0">
          <el-button
            @click="submitForm('cardDonation')"
            v-scroll-to="'#step-two'"
            >下一步</el-button
          >
        </el-col>
      </el-row>
    </el-form>
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
export default {
  name: "CardDonation",
  data() {
    return {
      cardDonation: {
        paymentToolCode: "E", // 捐款模式: E單次捐款 R定期定額
        amount: null, // 捐款金額
        amount1: null,
        amount2: 99,
        step: null,
      },
      dialog: {
        title: "",
        content: "",
        isShow: false,
      },
      rules: {
        paymentToolCode: [
          { required: true, message: "請選擇捐款方式", trigger: "change" },
        ],
        amount1: [{ required: true, message: "請輸入金額", trigger: "blur" }],
        amount2: [{ required: true, message: "請輸入金額", trigger: "blur" }],
      },
    };
  },
  watch: {
    "cardDonation.paymentToolCode"() {
      if (this.cardDonation.paymentToolCode == "E") {
        this.cardDonation.amount = this.cardDonation.amount1;
        console.log("單筆捐款:" + this.cardDonation.amount);
      } else {
        this.cardDonation.amount = this.cardDonation.amount2;
        console.log("定期定額:" + this.cardDonation.amount);
      }
    },
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.nextStep();
        } else {
          console.log(valid);
          console.log("error submit!!");
          this.showMessageBox("提示", "無輸入必填欄位或格式不符！");
          return false;
        }
      });
    },
    showMessageBox(title, content) {
      this.dialog.title = title;
      this.dialog.content = content;
      this.dialog.isShow = true;
    },
    nextStep() {
      this.cardDonation.step = "2";
      if (this.cardDonation.paymentToolCode == "E") {
        this.cardDonation.amount = this.cardDonation.amount1;
        console.log("單筆捐款:" + this.cardDonation.amount);
      } else {
        this.cardDonation.amount = this.cardDonation.amount2;
        console.log("定期定額:" + this.cardDonation.amount);
      }
      this.$emit("nextStep", this.cardDonation);
      console.log("捐款金額:" + this.cardDonation.amount);
    },
  },
};
</script>

<style lang="scss" scoped>
.sub-title {
  color: #424242;
  font-size: 16px;
  font-weight: bold;
}
.required-mark {
  color: red;
}
.el-row {
  margin: 16px 0;
}
.step {
  line-height: 0%;
}
/deep/ .el-button {
  color: #9c8044 !important;
  border-color: #9c8044;
  background-color: #fff9ee;
  &:hover {
    color: white !important;
    background-color: #9c8044;
    border-color: #9c8044;
  }
}
.el-form-item {
  margin: 0%;
}
/deep/ .dialog-message-box {
  min-width: 300px;
}
.el-radio /deep/ .el-radio__label {
  font-size: 16px;
}
// build 後被押上的樣式把它改掉
.el-button + .el-button {
  margin: 0;
}
/deep/ .el-step__title {
  padding-left: 2px;
}
</style>