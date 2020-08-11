<template>
  <!-- 捐款人資訊(共用畫面) -->
  <div id="component-body">
    <el-form :model="memberInfo" :rules="rules" ref="memberInfo">
      <el-row class="step">
        <el-steps :active="2" finish-status="success">
          <el-step title="步驟１"></el-step>
          <el-step title="步驟２"></el-step>
          <el-step title="步驟３"></el-step>
        </el-steps>
      </el-row>
      <p>個人資訊</p>
      <el-row>
        <el-col>
          <span>姓名</span>
          <span class="required-mark">*</span>
          <span>:</span>
        </el-col>
        <el-col>
          <el-form-item prop="name">
            <el-input type="text" placeholder="請輸入姓名(僅限填寫一位)" v-model="memberInfo.name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <span>性別</span>
          <span class="required-mark">*</span>
          <span>:&nbsp;</span>
        </el-col>
        <el-col>
          <el-form-item prop="genderTypeCode">
            <el-radio-group v-model="memberInfo.genderTypeCode">
              <el-radio label="MALE">男</el-radio>
              <el-radio label="FEMALE">女</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <span>是否參加福智廣論研討班</span>
          <span class="required-mark">*</span>
          <span>:&nbsp;</span>
        </el-col>
        <el-col>
          <el-form-item prop="payerTypeCode">
            <el-radio-group v-model="memberInfo.payerTypeCode">
              <el-radio label="YES">正在參加</el-radio>
              <el-radio label="EVER">曾經參加過</el-radio>
              <el-radio label="NO">沒有</el-radio>
              <el-radio label="NOT_HEARD">沒聽過</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <span>身分證字號</span>
          <span class="required-mark">*</span>
          <span>:&nbsp;</span>
        </el-col>
        <el-col>
          <el-form-item prop="useridType">
            <el-radio-group v-model="memberInfo.useridType">
              <el-radio label="全碼">全碼</el-radio>
              <el-radio label="末四碼">末四碼</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col v-if="memberInfo.useridType == '全碼'">
          <el-form-item prop="sin">
            <el-input
              type="text"
              placeholder="請輸入身分證字號"
              v-model="memberInfo.sin"
              maxlength="10"
              minlength="10"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col v-else>
          <el-form-item prop="sinLast4">
            <el-input
              type="text"
              placeholder="請輸入身分證字號末4碼"
              v-model="memberInfo.sinLast4"
              maxlength="4"
              minlength="4"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <span>手機號碼</span>
          <span class="required-mark">*</span>
          <span>:</span>
        </el-col>
        <el-col>
          <el-form-item prop="cellPhone">
            <el-input
              type="text"
              placeholder="範例：0987654321( 不需 - )"
              v-model="memberInfo.cellPhone"
              maxlength="10"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <span>住家電話</span>
          <span>:</span>
        </el-col>
        <el-col>
          <el-form-item>
            <el-input
              type="text"
              placeholder="範例：0212345678( 不需 - )"
              v-model="memberInfo.homePhone"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <span>電子信箱</span>
          <span class="required-mark">*</span>
          <span>:</span>
        </el-col>
        <el-col>
          <el-form-item prop="email">
            <el-input type="email" placeholder="請輸入電子信箱" v-model="memberInfo.email"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <span>居住地(區域性活動通知用)：</span>
          <el-select v-model="memberInfo.region" placeholder="請選擇">
            <el-option
              v-for="item in regions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <span>
            <a href>個資聲明</a>
          </span>
        </el-col>
      </el-row>
      <el-row>
        <el-col style="text-align:center; margin:16px 0;">
          <el-button type="warning" plain @click="previous()">上一步</el-button>
          <el-button type="warning" plain @click="submitForm('memberInfo')">下一步</el-button>
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
export default {
  name: "MemberInfo",
  data() {
    return {
      memberInfo: {
        name: null, // 姓名
        genderTypeCode: "MALE", // 性別
        payerTypeCode: "YES", // 是否參加福智廣論研討班
        useridType: "全碼", // 身分證選填全碼或末四碼
        sin: null, // 身分證字號
        sinLast4: null, // 身分證字號末四碼
        cellPhone: null, // 手機號碼
        homePhone: null, // 住家電話
        email: null, // 電子信箱
        region: null, // 居住地
        step: "3", // 回傳通知父組件切換到第三步
      },
      dialog: {
        title: "",
        content: "",
        isShow: false,
      },
      region: "",
      regions: [
        {
          value: "基隆市",
          label: "基隆市",
        },
        {
          value: "台北市",
          label: "台北市",
        },
        {
          value: "新北市",
          label: "新北市",
        },
        {
          value: "桃園縣",
          label: "桃園縣",
        },
        {
          value: "新竹市",
          label: "新竹市",
        },
        {
          value: "新竹縣",
          label: "新竹縣",
        },
        {
          value: "苗栗縣",
          label: "苗栗縣",
        },
        {
          value: "台中市",
          label: "台中市",
        },
        {
          value: "彰化縣",
          label: "彰化縣",
        },
        {
          value: "南投縣",
          label: "南投縣",
        },
        {
          value: "雲林縣",
          label: "雲林縣",
        },
        {
          value: "嘉義市",
          label: "嘉義市",
        },
        {
          value: "嘉義縣",
          label: "嘉義縣",
        },
        {
          value: "台南市",
          label: "台南市",
        },
        {
          value: "高雄市",
          label: "高雄市",
        },
        {
          value: "屏東縣",
          label: "屏東縣",
        },
        {
          value: "台東縣",
          label: "台東縣",
        },
        {
          value: "花蓮縣",
          label: "花蓮縣",
        },
        {
          value: "宜蘭縣",
          label: "宜蘭縣",
        },
        {
          value: "澎湖縣",
          label: "澎湖縣",
        },
        {
          value: "金門縣",
          label: "金門縣",
        },
        {
          value: "連江縣",
          label: "連江縣",
        },
      ],
      rules: {
        name: [{ required: true, message: "請輸入姓名", trigger: "blur" }],
        genderTypeCode: [
          { required: true, message: "請選擇性別", trigger: "change" },
        ],
        payerTypeCode: [
          {
            required: true,
            message: "請選擇",
            trigger: "change",
          },
        ],
        useridType: [
          {
            required: true,
            message: "請選擇身份證填寫方式",
            trigger: "change",
          },
        ],
        sin: [
          { required: true, message: "請確認身份證輸入無誤", trigger: "blur" },
          { min: 10, max: 10, message: "身分證全碼有10碼", trigger: "blur" },
        ],
        sinLast4: [
          {
            required: true,
            message: "請確認身份證末4碼輸入無誤",
            trigger: "blur",
          },
          { min: 4, max: 4, message: "請輸入4碼", trigger: "blur" },
        ],
        cellPhone: [
          { required: true, message: "請輸入行動電話", trigger: "blur" },
          { min: 10, max: 10, message: "請確認號碼", trigger: "blur" },
        ],
        email: [{ required: true, message: "請輸入電子信箱", trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit("nextStep", this.memberInfo);
        } else {
          console.log("error submit!!");
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
      // this.memberInfo.name = null;
      // this.memberInfo.genderTypeCode = null;
      // this.memberInfo.payerTypeCode = null;
      // this.memberInfo.useridType = null;
      // this.memberInfo.sin = null;
      // this.memberInfo.sinLast4 = null;
      // this.memberInfo.cellPhone = null;
      // this.memberInfo.homePhone = null;
      // this.memberInfo.email = null;
      // this.memberInfo.region = null;
      this.memberInfo.step = "1";
      this.$emit("nextStep", this.memberInfo);
      console.log("上一步");
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
.el-select-dropdown__item {
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}
.el-form-item {
  margin: 0%;
}
/deep/ .dialog-message-box {
  min-width: 300px;
}
</style>