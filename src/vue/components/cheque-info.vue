<template>
  <div id="component-body">
    <el-form :model="chequeInfo" :rules="rules" ref="chequeInfo">
      <el-row class="step">
        <el-steps :active="2" finish-status="success">
          <el-step title="金額" icon="el-icon-tickets"></el-step>
          <el-step title="支票" icon="el-icon-s-order"></el-step>
          <el-step title="收據" icon="el-icon-s-custom"></el-step>
        </el-steps>
      </el-row>
      <p style="color:#9c8044; font-weight:500; font-size:24px;">支票資訊</p>
      <el-row>
        <el-col>
          <span class="sub-title">支票號碼末五碼</span>
          <span class="required-mark">*</span>
          <span class="sub-title">:</span>
        </el-col>
        <el-col>
          <el-form-item prop="memo1">
            <el-input
              type="text"
              placeholder="請輸入支票號碼末五碼"
              v-model="chequeInfo.memo1"
              maxlength="5"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <span class="sub-title">開票人：</span>
        </el-col>
        <el-col>
          <el-form-item>
            <el-input type="text" placeholder="請輸入開票人姓名" v-model="chequeInfo.memo2"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <span class="sub-title">支票照片:</span>
        </el-col>
        <el-col :span="8">
          <el-form-item>
            <input
              id="upFile"
              type="file"
              @change="selectFile"
              accept="image/*"
            />
          </el-form-item>
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
                  <input type="checkbox" v-model="isAcceptPdpa" required />
                </el-form-item>
              </el-col>
              <el-col :span="22" style="margin-top:8px;">
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
            <el-row style="background-color:#F0F0F0; margin-top:20px;">
              <el-col style="padding: 16px;">
                <label class="notice">
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
      </el-row> -->
      <el-row>
        <el-col style="text-align:center; margin:16px 0;">
          <el-button type="warning" plain @click="previous()" v-scroll-to="'#step-one'">上一步</el-button>
          <el-button type="warning" plain @click="submitForm('chequeInfo')" v-scroll-to="'#step-three'">下一步</el-button>
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
  name: "ChequeInfo",
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
      chequeInfo: {
        memo1: null, // 支票末五碼
        memo2: null, // 開票人
        imgData: null,
        step: null,
      },
      isAcceptPdpa: false, // 同意遵守捐款注意事項
      rules: {
        memo1: [
          { required: true, message: "請確認支票號碼末五碼", trigger: "blur" },
          { min: 5, max: 5, message: "長度為5", trigger: "blur" },
        ],
        isAcceptPdpa: [
          { validator: checkIsAcceptPdpaValidator, trigger: "change" },
        ],
      },
      dialog: {
        title: "",
        content: "",
        isShow: false,
      },
    };
  },
  created() {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.chequeInfo.step = "3";
          console.log("step:" + this.chequeInfo.step);
          this.$emit("nextStep", this.chequeInfo);
        } else {
          console.log("error submit!!");
          this.showMessageBox("提示", "無輸入必填欄位或格式不符！");
          return false;
        }
      });
    },
    previous() {
      this.chequeInfo.step = "1";
      console.log("step:" + this.chequeInfo.step);
      this.$emit("nextStep", this.chequeInfo);
    },
    showMessageBox(title, content) {
      this.dialog.title = title;
      this.dialog.content = content;
      this.dialog.isShow = true;
    },
    selectFile(e) {
      var temp = e.target.files[0];
      console.log(`selectFile size:${temp.size}`);
      this.chequeInfo.imgData = {
          mimnType: null,
          name: null,
          content:null
        },
      this.chequeInfo.imgData.mimnType = temp.type;
      this.chequeInfo.imgData.name = temp.name;
      let reader = new FileReader();   //html5讀檔案
      reader.readAsDataURL(temp); //轉BASE64 
      reader.onload = (e) => {
        this.chequeInfo.imgData.content = e.target.result.substr(e.target.result.indexOf('base64,')+7);
      }
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