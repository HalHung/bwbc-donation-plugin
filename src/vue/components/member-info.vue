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
              <el-radio label="1">男</el-radio>
              <el-radio label="2">女</el-radio>
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
              <el-radio label="1">是</el-radio>
              <el-radio label="2">否</el-radio>
              <el-radio label="3">曾經</el-radio>
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
              <el-radio label="1">全碼</el-radio>
              <el-radio label="2">後四碼</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col v-if="memberInfo.useridType == '1'">
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
            <el-input type="text" placeholder="請輸入電子信箱" v-model="memberInfo.email"></el-input>
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
          <el-button type="warning" plain>上一步</el-button>
          <el-button type="warning" plain @click="submitForm('memberInfo')">下一步</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
    name: "MemberInfo",
  data() {
    return {
      memberInfo: {
        name: null, // 姓名
        genderTypeCode: "1", // 性別
        payerTypeCode: "1", // 是否參加福智廣論研討班
        useridType: "1", // 身分證選填全碼或末四碼
        sin: null, // 身分證字號
        sinLast4: null, // 身分證字號末四碼
        cellPhone: null, // 手機號碼
        homePhone: null, // 住家電話
        email: null, // 電子信箱
        region: "",
      },
      region: "",
      regions: [
        {
          value: "01",
          label: "基隆市",
        },
        {
          value: "02",
          label: "台北市",
        },
        {
          value: "03",
          label: "新北市",
        },
        {
          value: "04",
          label: "桃園縣",
        },
        {
          value: "05",
          label: "新竹市",
        },
        {
          value: "06",
          label: "新竹縣",
        },
        {
          value: "07",
          label: "苗栗縣",
        },
        {
          value: "08",
          label: "台中市",
        },
        {
          value: "09",
          label: "彰化縣",
        },
        {
          value: "10",
          label: "南投縣",
        },
        {
          value: "11",
          label: "雲林縣",
        },
        {
          value: "12",
          label: "嘉義市",
        },
        {
          value: "13",
          label: "嘉義縣",
        },
        {
          value: "14",
          label: "台南市",
        },
        {
          value: "15",
          label: "高雄市",
        },
        {
          value: "16",
          label: "屏東縣",
        },
        {
          value: "17",
          label: "台東縣",
        },
        {
          value: "18",
          label: "花蓮縣",
        },
        {
          value: "19",
          label: "宜蘭縣",
        },
        {
          value: "20",
          label: "澎湖縣",
        },
        {
          value: "21",
          label: "金門縣",
        },
        {
          value: "22",
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
        ],
        sinLast4: [
          {
            required: true,
            message: "請確認身份證末4碼輸入無誤",
            trigger: "blur",
          },
        ],
        cellPhone: [
          { required: true, message: "請輸入行動電話", trigger: "blur" },
        ],
        email: [{ required: true, message: "請輸入電子信箱", trigger: "blur" }],
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
.el-select-dropdown__item {
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}
.el-form-item {
  margin: 0%;
}
</style>