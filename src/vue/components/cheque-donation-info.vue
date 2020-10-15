<template>
  <div>
    <el-form :model="chequeDonation" :rules="rules" ref="chequeDonation">
      <el-row class="step">
        <el-steps :active="1" finish-status="success">
          <el-step title="金額" icon="el-icon-tickets"></el-step>
          <el-step title="支票" icon="el-icon-s-order"></el-step>
          <el-step title="收據" icon="el-icon-s-custom"></el-step>
        </el-steps>
      </el-row>
      <p style="color:#9c8044; font-weight:500; font-size:24px;">捐款資訊</p>
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
          <el-form-item prop="donatorTypeCode">
            <el-radio-group v-model="chequeDonation.donatorTypeCode">
              <el-radio label="PERSON">自然人捐款</el-radio>
              <el-radio label="CORPORATION">法人捐款</el-radio>
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
        <el-col style="width:fit-content; margin-top:8px;">
          <el-form-item prop="amount">
            <el-input-number
              v-model="chequeDonation.amount"
              :min="100"
              :max="10000000"
              placeholder="請輸入金額"
              :step="100"
            ></el-input-number>
          </el-form-item>
        </el-col>
        <el-col style="width:fit-content; margin-top:13px;">
          <span class="sub-title">&nbsp;元</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col style="text-align:center; margin:16px 0;">
          <el-button @click="submitForm('chequeDonation')" v-scroll-to="'#step-two'">下一步</el-button>
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
            <el-button @click="dialog.isShow = false" class="primary-color">我知道了</el-button>
          </el-col>
        </el-row>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import AddressEdit from "../components/AddressEdit";
export default {
  name: "ChequeDonationInfo",
  components: { AddressEdit },
  data() {
    return {
      chequeDonation: {
        donatorTypeCode: "PERSON", // PERSON自然人捐款 CORPORATION法人捐款
        isForeign: false, // 國籍: T台灣人 F外國人
        amount: 10000, // 捐款金額
        donatorName: null, // 收據抬頭
        address: null, // 地址
        step: null,
      },
      rules: {
        donatorTypeCode: [
          { required: true, message: "請選擇捐款方式", trigger: "change" },
        ],
        isForeign: [
          { required: true, message: "請選擇身份", trigger: "change" },
        ],
        amount: [{ required: true, message: "請輸入金額", trigger: "blur" }],
        receipt: [
          { required: true, message: "請選擇收據開立方式", trigger: "change" },
        ],
        donatorName: [
          { required: true, message: "請輸入收據抬頭", trigger: "blur" },
        ],
      },
      dialog: {
        title: "",
        content: "",
        isShow: false,
      },
    };
  },
  watch: {
    "chequeDonation.donatorTypeCode"() {
      if (this.chequeDonation.donatorTypeCode == "CORPORATION") {
        this.chequeDonation.isForeign = false;
        console.log("isForeign:"+this.chequeDonation.isForeign);
      }
    },
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.chequeDonation.receipt != "UNWANTTED") {
            this.adderssValidate();
          } else {
            this.chequeDonation.address = undefined;
            this.nextStep();
          }
        } else {
          console.log(valid);
          console.log("error submit!!");
          this.showMessageBox("提示", "無輸入必填欄位或格式不符！");
          return false;
        }
      });
    },
    adderssValidate() {
      if (this.chequeDonation.receipt != "UNWANTTED") {
        this.nextStep();
      } else {
        this.chequeDonation.address = undefined;
      }
    },
    showMessageBox(title, content) {
      this.dialog.title = title;
      this.dialog.content = content;
      this.dialog.isShow = true;
    },
    nextStep() {
      this.chequeDonation.step = "2";
      console.log("step:" + this.chequeDonation.step);
      this.$emit("nextStep", this.chequeDonation);
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
</style>