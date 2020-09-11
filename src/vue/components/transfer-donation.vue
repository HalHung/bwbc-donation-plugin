<template>
  <div>
    <el-form :model="transferDonation" :rules="rules" ref="transferDonation">
      <el-row class="step">
        <el-steps :active="1" finish-status="success">
          <el-step title="步驟１" icon="el-icon-tickets"></el-step>
          <el-step title="步驟２" icon="el-icon-s-order"></el-step>
          <el-step title="步驟３" icon="el-icon-s-custom"></el-step>
        </el-steps>
      </el-row>
      <p style="color:#9c8044; font-weight:500; font-size:24px;">捐款資訊</p>
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
          <el-form-item prop="donatorTypeCode">
            <el-radio-group v-model="transferDonation.donatorTypeCode">
              <el-radio label="PERSON">自然人捐款</el-radio>
              <el-radio label="CORPORATION">法人捐款</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="transferDonation.donatorTypeCode == 'PERSON'">
        <el-col>
          <span>身份</span>
          <span class="required-mark">*</span>
          <span>:&nbsp;</span>
        </el-col>
        <el-col>
          <el-form-item prop="isForeign">
            <el-radio-group v-model="transferDonation.isForeign">
              <el-radio :label="false">本國籍人士</el-radio>
              <el-radio :label="true">非本國籍人士</el-radio>
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
        <el-col style="width:fit-content; margin-top:8px;">
          <el-form-item prop="amount">
            <el-input-number
              v-model="transferDonation.amount"
              controls-position="right"
              :min="100"
              :max="10000000"
              placeholder="請輸入金額"
              :step="100"
            ></el-input-number>
          </el-form-item>
        </el-col>
        <el-col style="width:fit-content; margin-top:6px;">
          <span>&nbsp;元</span>
        </el-col>
      </el-row>
      <div v-if="transferDonation.isForeign == false">
        <el-row>
          <el-col>
            <span>收據開立方式</span>
            <span class="required-mark">*</span>
            <span>(收據寄送資訊):&nbsp;</span>
          </el-col>
          <el-col>
            <el-form-item prop="receipt">
              <el-radio-group v-model="transferDonation.receipt">
                <el-radio label="BY_TIME">單筆</el-radio>
                <el-radio label="UNWANTTED">不需寄發</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="transferDonation.receipt == 'BY_TIME' ">
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
        <el-row v-if="transferDonation.receipt == 'BY_TIME' ">
          <el-col>
            <span>聯絡地址</span>
            <span class="required-mark">*</span>
            <span>(收據寄送地址):</span>
          </el-col>
          <el-col>
            <!-- <el-input type="text" placeholder="請輸入地址"></el-input> -->
            <AddressEdit ref="addressEdit" :oAddress="transferDonation.address"></AddressEdit>
          </el-col>
        </el-row>
      </div>
      <el-row>
        <el-col style="text-align:center; margin:16px 0;">
          <el-button @click="submitForm('transferDonation')" v-scroll-to="'#step-two'">下一步</el-button>
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
        donatorTypeCode: "PERSON", // PERSON自然人捐款 CORPORATION法人捐款
        isForeign: false, // 國籍: T台灣人 F外國人
        amount: null, // 捐款金額
        receipt: "UNWANTTED", // 收據開立方式: 1.BY_TIME單筆 2.UNWANTTED不需寄發
        donatorName: null, // 收據抬頭
        address: null, // 地址
        step: null,
      },
      dialog: {
        title: "",
        content: "",
        isShow: false,
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
    };
  },
  watch: {
    "transferDonation.donatorTypeCode"() {
      if (this.transferDonation.donatorTypeCode == "CORPORATION") {
        this.transferDonation.isForeign = false;
      }
    },
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
          console.log(valid);
          console.log("error submit transfer dona!!");
          this.showMessageBox("提示", "無輸入必填欄位或格式不符！");
          return false;
        }
      });
    },
    adderssValidate() {
      if (this.transferDonation.receipt != "UNWANTTED") {
        this.$refs["addressEdit"].$refs["address"].validate((valid) => {
          console.log(`address v:${valid}`);
          if (valid) {
            this.transferDonation.address = this.$refs["addressEdit"].address;
            this.nextStep();
          } else {
            this.showMessageBox("提示", "地址欄無輸入必填欄位或資料不完整！");
          }
        });
      } else {
        this.transferDonation.address = undefined;
      }
    },
    showMessageBox(title, content) {
      this.dialog.title = title;
      this.dialog.content = content;
      this.dialog.isShow = true;
    },
    nextStep() {
      this.transferDonation.step = "2";
      console.log("step:" + this.transferDonation.step);
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