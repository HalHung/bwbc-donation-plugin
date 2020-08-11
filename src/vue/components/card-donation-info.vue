<template>
  <!-- 信用卡捐款資訊(信用卡捐款流程1) -->
  <div id="component-body">
    <el-form :model="cardDonation" :rules="rules" ref="cardDonation">
      <el-row class="step">
        <el-steps :active="1" finish-status="success">
          <el-step title="步驟１"></el-step>
          <el-step title="步驟２"></el-step>
          <el-step title="步驟３"></el-step>
        </el-steps>
      </el-row>
      <p>捐款資訊</p>
      <el-row>
        <el-col>
          <span class="title">捐款項目：福智佛教學院</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <span>捐款方式</span>
          <span class="required-mark">*</span>
          <span>:&nbsp;</span>
        </el-col>
        <el-col>
          <el-form-item prop="paymentToolCode">
            <el-radio-group v-model="cardDonation.paymentToolCode">
              <el-radio label="E">單次捐款</el-radio>
              <el-radio label="R" @click="changeReceipt()">定期定額捐款</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <span>捐款金額</span>
          <span class="required-mark">*</span>
          <span>:</span>
        </el-col>
        <el-col v-show="cardDonation.paymentToolCode == 'R'">
          <el-button type="warning" plain @click="cardDonation.amount = 199" size="mini">199</el-button>
          <el-button type="warning" plain @click="cardDonation.amount = 299" size="mini">299</el-button>
          <el-button type="warning" plain @click="cardDonation.amount = 599" size="mini">599</el-button>
          <el-button type="warning" plain @click="cardDonation.amount = 799" size="mini">799</el-button>
          <el-button type="warning" plain @click="cardDonation.amount = 999" size="mini">999</el-button>
        </el-col>
        <el-col style="width:fit-content; margin-top:8px;">
          <el-form-item prop="amount">
            <el-input-number
              v-model="cardDonation.amount"
              controls-position="right"
              :min="1"
              :max="100000"
              placeholder="請輸入金額"
              :step="100"
            ></el-input-number>
          </el-form-item>
        </el-col>
        <el-col style="width:fit-content;">
          <span>&nbsp;元</span>
          <span v-show="cardDonation.paymentToolCode == 'R'">/&nbsp;每月</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <span>收據開立方式</span>
          <span class="required-mark">*</span>
          <span>(收據寄送資訊):&nbsp;</span>
        </el-col>
        <el-col>
          <el-form-item prop="receipt">
            <el-radio-group v-model="cardDonation.receipt">
              <el-radio label="BY_TIME" v-if="cardDonation.paymentToolCode == 'E'">單筆</el-radio>
              <el-radio label="ANNUAL">年開</el-radio>
              <el-radio label="UNWANTTED">不需寄發</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="cardDonation.receipt != 'UNWANTTED'">
        <el-col>
          <span>收據抬頭</span>
          <span class="required-mark">*</span>
          <span>:</span>
        </el-col>
        <el-col>
          <el-form-item prop="donatorName">
            <el-input
              type="text"
              placeholder="請輸入姓名(僅限填寫一位)"
              v-model="cardDonation.donatorName"
              :validate-event="true"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="cardDonation.receipt != 'UNWANTTED'">
        <el-col>
          <span>聯絡地址</span>
          <span class="required-mark">*</span>
          <span>(收據寄送地址):</span>
        </el-col>
        <el-col>
          <!-- <el-input type="text" placeholder="請輸入地址"></el-input> -->
          <AddressEdit ref="addressEdit" :oAddress="cardDonation.address"></AddressEdit>
        </el-col>
      </el-row>
      <el-row>
        <el-col style="text-align:center; margin:16px 0;">
          <el-button type="warning" plain @click="submitForm('cardDonation')">下一步</el-button>
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
            <el-button @click="dialog.isShow = false" class="primary-color">好喔</el-button>
          </el-col>
        </el-row>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import AddressEdit from "../components/AddressEdit";
export default {
  name: "CardDonation",
  components: { AddressEdit },
  data() {
    return {
      cardDonation: {
        paymentToolCode: "E", // 捐款模式: E單次捐款 R定期定額
        amount: null, // 捐款金額
        receipt: "UNWANTTED", // 收據開立方式: 1.BY_TIME單筆 2.ANNUAL年開 3.UNWANTTED不需寄發
        donatorName: null, // 收據抬頭
        address: null, // 地址
        step: "2", // 步驟切換
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
        amount: [{ required: true, message: "請輸入金額", trigger: "blur" }],
        receipt: [
          { required: true, message: "請選擇收據開立方式", trigger: "change" },
        ],
        donatorName: [
          { required: true, message: "請輸入收據抬頭", trigger: "blur" },
        ],
      },
    };
  },
  watch: {
    "cardDonation.paymentToolCode"() {
      if (this.cardDonation.paymentToolCode == "R") {
        this.cardDonation.receipt = "UNWANTTED";
      }
    },
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.cardDonation.receipt != "UNWANTTED") {
            this.adderssValidate();
            console.log("驗證完成");
          } else {
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
      if (this.cardDonation.receipt != "UNWANTTED") {
        console.log("地址驗證");
        this.$refs["addressEdit"].$refs["address"].validate((valid) => {
          console.log(`address v:${valid}`);
          if (valid) {
            this.cardDonation.address = this.$refs["addressEdit"].address;
            // this.toEndSave();
            this.nextStep();
          }
        });
      } else {
        this.cardDonation.address = undefined;
        // this.toEndSave();
      }
    },
    showMessageBox(title, content) {
      this.dialog.title = title;
      this.dialog.content = content;
      this.dialog.isShow = true;
    },
    nextStep() {
      this.$emit("nextStep", this.cardDonation);
    },
  },
};
</script>

<style lang="scss" scoped>
#component-body {
  /* font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif; */
}
span {
  font-size: 16px;
  font-weight: bold;
}
.required-mark {
  color: red;
}
.el-row {
  margin: 16px 0;
}
.el-input__inner {
  /* font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif; */
}
.step {
  line-height: 0%;
}
.el-button + .el-button {
  margin: 0%;
}
.el-form-item {
  margin: 0%;
}
.el-select-dropdown__item {
  /* font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif; */
}
/deep/ .dialog-message-box {
  min-width: 300px;
}
</style>