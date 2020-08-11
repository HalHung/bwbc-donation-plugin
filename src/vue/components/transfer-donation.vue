<template>
  <!-- 固定帳號捐款資訊(固定帳號捐款流程1) -->
  <div>
    <el-form :model="transferDonation" :rules="rules" ref="transferDonation">
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
          <span>捐款金額</span>
          <span class="required-mark">*</span>
          <span>:</span>
        </el-col>
        <el-col style="width:fit-content; margin-top:8px;">
          <el-form-item prop="amount">
            <el-input-number
              v-model="transferDonation.amount"
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
            <el-radio-group v-model="transferDonation.receipt">
              <el-radio label="BY_TIME">單筆開立</el-radio>
              <el-radio label="ANNUAL">年開</el-radio>
              <el-radio label="UNWANTTED">不需寄發</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="transferDonation.receipt != 'UNWANTTED'">
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
              v-model="transferDonation.donatorName"
              :validate-event="true"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="transferDonation.receipt != 'UNWANTTED'">
        <el-col>
          <span>聯絡地址</span>
          <span class="required-mark">*</span>
          <span>(收據寄送地址):</span>
        </el-col>
        <el-col>
          <AddressEdit ref="addressEdit" :oAddress="transferDonation.address"></AddressEdit>
        </el-col>
      </el-row>
      <el-row>
        <el-col style="text-align:center; margin:16px 0;">
          <el-button type="warning" plain @click="submitForm('transferDonation')">下一步</el-button>
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
  name: "TransferDonation",
  components: { AddressEdit },
  data() {
    return {
      transferDonation: {
        amount: null, // 捐款金額
        receipt: "UNWANTTED", // 收據開立方式
        donatorName: null, // 收據抬頭
        address: null, // 地址
        step: "2", // 回傳通知父組件切換到第二步
      },
      dialog: {
        title: "",
        content: "",
        isShow: false,
      },
      rules: {
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
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.transferDonation.receipt != "UNWANTTED") {
            this.adderssValidate();
          } else {
            this.nextStep();
          }
        } else {
          console.log("error submit!!");
          this.showMessageBox("提示", "無輸入必填欄位或格式不符！");
          return false;
        }
      });
    },
    adderssValidate() {
      if (this.transferDonation.receipt != "UNWANTTED") {
        console.log("地址驗證");
        this.$refs["addressEdit"].$refs["address"].validate((valid) => {
          console.log(`address v:${valid}`);
          if (valid) {
            this.transferDonation.address = this.$refs["addressEdit"].address;
            // this.toEndSave();
            this.nextStep();
          }
        });
      } else {
        this.transferDonation.address = undefined;
        // this.toEndSave();
      }
    },
    showMessageBox(title, content) {
      this.dialog.title = title;
      this.dialog.content = content;
      this.dialog.isShow = true;
    },
    nextStep() {
      this.$emit("nextStep", this.transferDonation);
    },
  },
};
</script>

<style lang="scss" scoped>
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
.step {
  line-height: 0%;
}
.el-button + .el-button {
  margin: 0%;
}
.el-form-item {
  margin: 0%;
}
/deep/ .dialog-message-box {
  min-width: 300px;
}
</style>