<template>
  <div id="component-body">
    <el-form :model="card" :rules="rules" ref="creditCardInfo">
      <el-row class="step">
        <el-steps :active="3" finish-status="success">
          <el-step title="步驟１"></el-step>
          <el-step title="步驟２"></el-step>
          <el-step title="步驟３"></el-step>
        </el-steps>
      </el-row>
      <p>信用卡資訊</p>
      <el-row>
        <el-col>
          <span>信用卡卡號</span>
          <span class="required-mark">*</span>
          <span>:</span>
        </el-col>
        <el-col>
          <el-form-item prop="cardNumber">
            <el-input type="text" placeholder="請輸入信用卡卡號" v-model="card.number"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <span>有效期限</span>
          <span class="required-mark">*</span>
          <span>:</span>
        </el-col>
        <el-col  style="width:fit-content;">
          <el-form-item prop="cardMonth">
            <el-select v-model="card.cardMonth" placeholder="月">
              <el-option v-for="m in monthList" :key="m.value" :label="m.label" :value="m.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col  style="width:fit-content;">
          <el-form-item prop="cardYear">
            <el-select v-model="card.cardYear" placeholder="年">
              <el-option v-for="y in yearList" :key="y.value" :label="y.label" :value="y.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <span>安全碼</span>
          <span class="required-mark">*</span>
          <span>(CVC):</span>
        </el-col>
        <el-col>
          <el-form-item prop="cardCvc">
            <el-input type="text" v-model="card.cvc" placeholder="卡背三碼" maxlength="3" minlength="3"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <span class="reminder">捐款金額：</span>
          <span class="reminder">xxx</span>
          <span class="reminder">(定期定額)</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
              <span>捐款注意事項</span>
            </div>
            <el-row>
              <el-col :span="2">
                <el-form-item prop="isAcceptPdpa">
                  <input type="checkbox" v-model="isAcceptPdpa" required />
                </el-form-item>
              </el-col>
              <el-col :span="22">
                <label class="notice">
                  我同意遵守本網站個人
                  <a
                    href="https://bwbc.blisswisdom.org/%e3%80%90%e6%8d%90%e6%ac%be%e6%b3%a8%e6%84%8f%e4%ba%8b%e9%a0%85%e3%80%91/"
                    target="_blank"
                    style="color:#2B63E0;"
                  >捐款注意事項</a>及其他有關著作權、版權、商標專用權、網路智慧財產權等之法律規定。
                </label>
              </el-col>
            </el-row>
            <el-row style="background-color:#F0F0F0;">
              <el-col>
                <label class="notice" style="margin:16px;">
                  依財團法人法第25條規定，除捐贈者事先書面表示反對外，各財團法人均需主動公開捐贈者之「姓名」及「捐款金額」，詳見
                  <a
                    href="https://www.blisswisdom.org/donate/qanda#q2"
                    target="_blank"
                    style="color:#2B63E0;"
                  >捐款徵信說明</a>
                </label>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
      <el-row>
        <el-col style="text-align:center; margin:16px 0;">
          <el-button type="warning" plain>上一步</el-button>
          <el-button type="warning" plain @click="submitForm('creditCardInfo')">送出</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CreditCardInfo",
  data() {
    return {
      card: {
        number: null, // 信用卡號碼
        cardMonth: null, // 有效月
        cardYear: null, // 有效年
        cvc: null, // 安全碼
      },
      //   year: null,
      monthList: null,
      yearList: null,
      isAcceptPdpa: false, // 同意遵守捐款注意事項
      rules: {
        cardNumber: [
          { required: true, message: "請輸入卡號", trigger: "blur" },
        ],
        cardMonth: [
          { required: true, message: "請選擇有效月", trigger: "change" },
        ],
        cardYear: [
          { required: true, message: "請選擇有效年", trigger: "change" },
        ],
        cardCvc: [{ required: true, message: "請輸入安全碼", trigger: "blur" }],
        isAcceptPdpa: [
          {
            type: "array",
            required: true,
            message: "請勾選",
            trigger: "change",
          },
        ],
      },
    };
  },
  created() {
    //年份清單
    var moment = require("moment");
    let y = moment().format("YY") - 1;
    console.log(typeof y + y);
    this.yearList = [];
    console.log("y:" + y);
    for (let i = 0; i < 10; i++) {
      this.yearList.push({ value: `${y++}`, label: `${y}` });
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

<style lang="css" scoped>
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
}
.el-select-dropdown__item {
  /* font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif; */
}
</style>