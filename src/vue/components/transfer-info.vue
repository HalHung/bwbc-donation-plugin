<template>
  <!-- 固定帳號匯款資訊(固定帳號捐款流程3) -->
  <div id="component-body">
    <el-form :model="transferInfo" :rules="rules" ref="transferInfo">
      <el-row class="step">
        <el-steps :active="3" finish-status="success">
          <el-step title="步驟１"></el-step>
          <el-step title="步驟２"></el-step>
          <el-step title="步驟３"></el-step>
        </el-steps>
      </el-row>
      <p>匯款資訊</p>
      <el-row>
        <el-col>
          <span>匯款帳號末五碼</span>
          <span class="required-mark">*</span>
          <span>:</span>
        </el-col>
        <el-col>
          <el-form-item prop="accountLast5">
            <el-input
              type="text"
              placeholder="請輸入匯款帳號末五碼"
              v-model="transferInfo.accountLast5"
              maxlength="5"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <span>匯款人</span>
          <span>:</span>
        </el-col>
        <el-col>
          <el-form-item>
            <el-input type="text" placeholder="請輸入匯款人姓名" v-model="transferInfo.name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <span>匯款日期</span>
          <span>:</span>
        </el-col>
        <el-col>
          <el-form-item>
            <el-input type="date" placeholder="請選擇匯款日期" v-model="transferInfo.donaDate"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
              <span style="color:white;">捐款注意事項</span>
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
          <el-button type="warning" plain @click="submitForm('chequeInfo')">送出</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "TransferInfo",
  data() {
    return {
      transferInfo: {
        accountLast5: null, // 匯款帳號末五碼
        name: null, // 匯款人
        donaDate: null, // 匯款日期
      },
      isAcceptPdpa: false,
      rules: {
        accountLast5: [
          { required: true, message: "請輸入匯款帳號末五碼", trigger: "blur" },
        ],
      },
    };
  },
};
</script>

<style lang="scss">
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
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}
/deep/ .el-card__header {
  background-color: #bda268;
}
.el-form-item {
  margin: 0%;
}
</style>