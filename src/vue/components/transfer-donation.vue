<template>
  <!-- 固定帳號捐款資訊(固定帳號捐款流程1) -->
  <div>
    <el-form :model="transferInfo" :rules="rules" ref="transferInfo">
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
              v-model="transferInfo.amount"
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
            <el-radio-group v-model="transferInfo.receipt">
              <el-radio label="1">單筆</el-radio>
              <el-radio label="2">年開</el-radio>
              <el-radio label="3">不需寄發</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="transferInfo.receipt != '3'">
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
              v-model="transferInfo.donatorName"
              :validate-event="true"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="transferInfo.receipt != '3'">
        <el-col>
          <span>聯絡地址</span>
          <span class="required-mark">*</span>
          <span>(收據寄送地址):</span>
        </el-col>
        <el-col>
          <AddressEdit ref="addressEdit"></AddressEdit>
        </el-col>
      </el-row>
      <el-row>
        <el-col style="text-align:center; margin:16px 0;">
          <el-button type="warning" plain @click="submitForm('transferInfo')">下一步</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import AddressEdit from "../components/AddressEdit";
export default {
  name: "TransferDonation",
  components: { AddressEdit },
  data() {
    return {
      transferInfo: {
        amount: null, // 捐款金額
        receipt: "3", // 收據開立方式
        donatorName: null, // 收據抬頭
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
          alert("submit!");
        } else {
          console.log("error submit!!");
          alert("請填寫必要資訊!");
          return false;
        }
      });
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
</style>