<template>
  <div id="component-body">
    <el-form :model="card" :rules="rules" ref="creditCardInfo">
      <el-row class="step">
        <el-steps :active="2" finish-status="success">
          <el-step title="金額" icon="el-icon-s-order"></el-step>
          <el-step title="卡號" icon="el-icon-bank-card"></el-step>
          <el-step title="收據" icon="el-icon-s-custom"></el-step>
        </el-steps>
      </el-row>
      <p style="color:#9c8044; font-weight:500; font-size:24px;">信用卡資訊</p>
      <el-row>
        <el-col>
          <span class="sub-title">信用卡卡號</span>
          <span class="required-mark">*</span>
          <span class="sub-title">:</span>
        </el-col>
        <el-col>
          <el-form-item prop="cardNumber">
            <el-input
              type="text"
              name="cardnumber"
              autocompletetype="cc-number"
              placeholder="請輸入信用卡卡號"
              v-model="card.cardNumber"
              maxlength="16"
              minlength="16"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <span class="sub-title">有效期限</span>
          <span class="required-mark">*</span>
          <span class="sub-title">:</span>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="cardMonth">
            <el-select v-model="card.cardMonth" placeholder="月">
              <el-option v-for="m in monthList" :key="m.value" :label="m.label" :value="m.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="cardYear">
            <el-select v-model="card.cardYear" placeholder="年">
              <el-option v-for="y in yearList" :key="y.value" :label="y.label" :value="y.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <span class="sub-title">安全碼</span>
          <span class="required-mark">*</span>
          <span class="sub-title">(CVC):</span>
        </el-col>
        <el-col>
          <el-form-item prop="cvc">
            <el-input type="text" v-model="card.cvc" placeholder="卡背三碼" maxlength="3" minlength="3"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <span class="reminder">捐款金額：</span>
          <span class="reminder" v-if="donationInfo.paymentToolCode == 'R'">每月</span>
          <span class="reminder">{{donationInfo.amount}}</span>
          <span class="reminder">元</span>
        </el-col>
      </el-row>
      <!-- <el-row>
        <el-col>
          <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix" style="text-align:center;">
              <span style="color:white;" class="sub-title">捐款注意事項</span>
            </div>
            <el-row>
              <el-col :span="2">
                <el-form-item prop="isAcceptPdpa">
                  <el-checkbox v-model="isAcceptPdpa"></el-checkbox>
                </el-form-item>
              </el-col>
              <el-col :span="22" style="padding-top:6px;">
                <label class="notice">
                  我同意遵守本網站個人
                  <a
                    href="https://bwbc.blisswisdom.org/%e3%80%90%e6%8d%90%e6%ac%be%e6%b3%a8%e6%84%8f%e4%ba%8b%e9%a0%85%e3%80%91/"
                    target="_blank"
                    style="color:#2B63E0; text-decoration:none;"
                  >《捐款注意事項》</a>及其他有關著作權、版權、商標專用權、網路智慧財產權等之法律規定。
                </label>
              </el-col>
            </el-row>
            <el-row style="background-color:#F0F0F0; margin-top:20px;">
              <el-col style="padding: 16px;">
                <label class="notice">
                  依財團法人法第25條規定，除捐贈者事先書面表示反對外，各財團法人均需主動公開捐贈者之「姓名」及「捐款金額」，詳見
                  <a
                    href="https://www.blisswisdom.org/donate/qanda#q2"
                    target="_blank"
                    style="color:#2B63E0; text-decoration:none;"
                  >《捐款徵信說明》</a>
                </label>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row> -->
      <el-row>
        <el-col style="text-align:center; margin:16px 0;">
          <el-button @click="previous()" v-scroll-to="'#step-one'">上一步</el-button>
          <el-button @click="submitForm('creditCardInfo')" v-scroll-to="'#step-three'">下一步</el-button>
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
export default {
  name: "CreditCardInfo",
  props: {
    donationInfo: Object,
  },
  data() {
    var checkIsAcceptPdpaValidator = (rule, value, callback) => {
      if (!this.isAcceptPdpa) {
        return callback(new Error("請勾選"));
      } else {
        return callback();
      }
    };
    return {
      card: {
        cardNumber: null, // 信用卡號碼
        cardMonth: null, // 有效月
        cardYear: null, // 有效年
        cvc: null, // 安全碼
        step: null,
      },
      dialog: {
        title: "",
        content: "",
        isShow: false,
      },
      monthList: null,
      yearList: null,
      isAcceptPdpa: false, // 同意遵守捐款注意事項
      rules: {
        cardNumber: [
          { required: true, message: "請輸入卡號", trigger: "blur" },
          { min: 16, max: 16, message: "卡號有16碼", trigger: "blur" },
        ],
        cardMonth: [
          { required: true, message: "請選擇有效月", trigger: "change" },
        ],
        cardYear: [
          { required: true, message: "請選擇有效年", trigger: "change" },
        ],
        cvc: [{ required: true, message: "請輸入安全碼", trigger: "blur" }],
        isAcceptPdpa: [
          { validator: checkIsAcceptPdpaValidator, trigger: "change" },
        ],
      },
    };
  },
  created() {
    //年份清單
    var moment = require("moment");
    let y = moment().format("YY");
    this.yearList = [];
    for (let i = 0; i < 10; i++) {
      this.yearList.push({ value: `${y}`, label: `${y}` });
      y++;
    }

    //月份清單
    this.monthList = [];
    for (let i = 1; i < 13; i++) {
      if (i < 10) {
        this.monthList.push({ value: `0${i}`, label: `${i}` });
      } else {
        this.monthList.push({ value: `${i}`, label: `${i}` });
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.card.step = "3";
          console.log("step:" + this.card.step);
          this.$emit("nextStep", this.card);
        } else {
          console.log("error submit!!");
          this.showMessageBox("提示", "無輸入必填欄位或格式不符！");
          return false;
        }
      });
    },
    previous() {
      this.card.step = "1";
      console.log("step:" + this.card.step);
      this.$emit("nextStep", this.card);
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
.required-mark {
  color: red;
}
.el-row {
  margin: 16px 0;
}
.step {
  line-height: 0%;
}
.notice {
  font-size: 14px;
  font-weight: 400;
}
.el-card__header {
  padding: 3px 20px;
  background-color: #bda268;
  color: white;
  text-align: center;
}
.reminder {
  font-size: 20px;
  color: #424242;
}
.el-select-dropdown__item {
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}
/deep/ .el-card__header {
  background-color: #bda268;
}
.el-form-item {
  margin: 0%;
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
/deep/ .el-step__title {
  padding-left: 2px;
}
.sub-title {
  color: #424242;
  font-size: 16px;
  font-weight: bold;
}
/deep/.el-input__inner {
  background-color: #fff;
}
</style>