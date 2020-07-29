<template>
  <div id="component-body">
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
        <el-input type="text" placeholder="請輸入電子信箱"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <span>有效期限</span>
        <span class="required-mark">*</span>
        <span>:</span>
      </el-col>
      <el-col>
        <el-select v-model="cardMonth" placeholder="月">
          <el-option v-for="m in 12" :key="m" :label="m" :value="m"></el-option>
        </el-select>
        <el-select v-model="cardYear" placeholder="年">
          <el-option v-for="y in 10" :key="y" :label="y" :value="y"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <span>安全碼</span>
        <span class="required-mark">*</span>
        <span>(CVC):</span>
      </el-col>
      <el-col>
        <el-input type="number" v-model="cvc" placeholder="卡背三碼"></el-input>
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
              <input type="checkbox" v-model="checked" />
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
        <el-button type="warning" plain>送出</el-button>
        <el-button type="warning" plain>上一步</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cardMonth: null,
      cardYear: null,
      year: null,
      cvc: null,
      isAcceptPdpa: false,
      years: [],
    };
  },
  mounted() {
    var today = new Date();
    this.year = parseInt(today.getFullYear().toString().substr(-2), 10);
    console.log(typeof year + year);
  },
};
</script>

<style lang="css">
#component-body {
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
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
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
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
</style>