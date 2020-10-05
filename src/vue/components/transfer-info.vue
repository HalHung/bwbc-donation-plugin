<template>
  <!-- 固定帳號匯款資訊(固定帳號捐款流程3) -->
  <div id="component-body">
    <el-form :model="transferInfo" :rules="rules" ref="transferInfo">
      <el-row class="step">
        <el-steps :active="2" finish-status="success">
          <el-step title="步驟１" icon="el-icon-tickets"></el-step>
          <el-step title="步驟２" icon="el-icon-s-order"></el-step>
          <el-step title="步驟３" icon="el-icon-s-custom"></el-step>
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
          <el-form-item prop="memo1">
            <el-input
              type="text"
              placeholder="請輸入匯款帳號末五碼"
              v-model="transferInfo.memo1"
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
            <el-input type="text" placeholder="請輸入匯款人姓名" v-model="transferInfo.memo2"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <span>匯款日期</span>
          <span>:</span>
        </el-col>
        <el-col :span="8">
          <el-form-item>
            <!-- <el-input type="date" placeholder="yyyy-mm-dd" v-model="transferInfo.date1"></el-input> -->
            <el-date-picker v-model="transferInfo.date1" type="date" placeholder="請選擇匯款日期"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <span>匯款單照片</span>
           <span class="required-mark">*</span>
          <span>:</span>
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
      <el-row>
        <el-col>
          <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
              <span style="color:white;">捐款注意事項</span>
            </div>
            <el-row>
              <el-col :span="2">
                <el-form-item prop="isAcceptPdpa">
                  <el-checkbox v-model="isAcceptPdpa"></el-checkbox>
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
          <el-button type="warning" plain @click="previous()" v-scroll-to="'#step-one'">上一步</el-button>
          <el-button type="warning" plain @click="submitForm('transferInfo')" v-scroll-to="'#step-three'">下一步</el-button>
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
  name: "TransferInfo",
  data() {
    var checkIsAcceptPdpaValidator = (rule, value, callback) => {
      if (!this.isAcceptPdpa) {
        console.log(this.isAcceptPdpa);
        return callback(new Error("請勾選"));
      }
      else
        return callback()
    };
    return {
      transferInfo: {
        memo1: null, // 匯款帳號末五碼
        memo2: null, // 匯款人
        date1: null, // 匯款日期
        imgData: null,
        step: "3",
      },
      dialog: {
        title: "",
        content: "",
        isShow: false,
      },
      isAcceptPdpa: false, // 同意遵守捐款注意事項
      rules: {
        memo1: [
          { required: true, message: "請輸入匯款帳號末五碼", trigger: "blur" },
          { min: 5, max: 5, message: "請輸入五碼", trigger: "blur" },
        ],
        isAcceptPdpa: [
          { validator: checkIsAcceptPdpaValidator, trigger: "change" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log("下一步");
          if(this.transferInfo.imgData == null){
              this.showMessageBox("提示", "請上傳匯款圖片！");
              return false;
          }
          this.nextStep();
        } else {
          console.log("error submit transferInfo!!");
          this.showMessageBox("提示", "無輸入必填欄位或格式不符！");
          return false;
        }
      });
    },
    showMessageBox(title, content) {
      this.dialog.title = title;
      this.dialog.content = content;
      this.dialog.isShow = true;
    },
    previous() {
      this.transferInfo.step = "1";
      this.$emit("nextStep", this.transferInfo);
      console.log("上一步");
    },
    nextStep() {
      this.transferInfo.step = "3";
      this.$emit("nextStep", this.transferInfo);
      console.log("下一步");
    },
    selectFile(e) {
      var temp = e.target.files[0];
      console.log(`selectFile size:${temp.size}`);
      this.transferInfo.imgData = {
          mimnType: null,
          name: null,
          content:null
        },
      this.transferInfo.imgData.mimnType = temp.type;
      this.transferInfo.imgData.name = temp.name;
      let reader = new FileReader();   //html5讀檔案
      reader.readAsDataURL(temp); //轉BASE64 
      reader.onload = (e) => {
        this.transferInfo.imgData.content = e.target.result.substr(e.target.result.indexOf('base64,')+7);
        // console.log(`img:${JSON.stringify(this.transferInfo.imgData)}`)
      }
    },
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
.el-picker-panel__body {
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}
.el-picker-panel__icon-btn {
  padding: 4px;

  &:hover {
    color: #409eff;
    background-color: #fff;
  }
}
th {
  text-align: center;
}
</style>