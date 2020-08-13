<template>
  <!-- 捐款人資訊(共用畫面) -->
  <div id="component-body">
    <el-form :model="memberInfo" :rules="rules" ref="memberInfo">
      <el-row class="step">
        <el-steps :active="2" finish-status="success">
          <el-step title="步驟１" icon="el-icon-s-order"></el-step>
          <el-step title="步驟２" icon="el-icon-s-custom"></el-step>
          <el-step title="步驟３" icon="el-icon-bank-card"></el-step>
        </el-steps>
      </el-row>
      <p style="color:#9c8044; font-weight:500; font-size:24px;">個人資訊</p>
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
              <el-radio label="全碼" style="margin-bottom:0;">全碼</el-radio>
              <el-radio label="末四碼" style="margin-bottom:0;">末四碼</el-radio>
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
      <el-row v-if="donationInfo.receiptTypeCode == 'UNWANTTED'">
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
      <el-row
        style="background-color: #d8ba5f33; padding: 8px 16px 0; border-radius: 4px; border: solid 1px #decb93;"
      >
        <el-col :span="2">
          <el-form-item prop="acceptDeclaration">
            <el-checkbox v-model="acceptDeclaration"></el-checkbox>
          </el-form-item>
        </el-col>
        <el-col :span="22">
          <span>
            請詳閱
            <a @click="declaration = true" style="color:blue; text-decoration:none;">《個資聲明》</a>
            ，進行下一步即表示同意個資聲明。
          </span>
        </el-col>
      </el-row>
      <el-row>
        <el-col style="text-align:center; margin:16px 0;">
          <el-button @click="previous()">上一步</el-button>
          <el-button @click="submitForm('memberInfo')">下一步</el-button>
        </el-col>
      </el-row>
    </el-form>
    <!-- 提示視窗 -->
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
    <!-- 個資視窗 -->
    <el-dialog
      title="個人資料處理暨使用同意書"
      :visible.sync="declaration"
      width="80%"
      custom-class="dialog-message-box"
    >
      <el-container>
        <el-main>
          <div
            class="infinite-list"
            v-infinite-scroll="load"
            style="overflow:auto; height:40vh; background-color:whitesmoke; padding:16px;"
          >
            <p
              style="font-size:16px;"
            >立同意書人{{memberInfo.name}}，茲同意福智佛教學院籌備處 (以下簡稱「籌備處」)及福智傳心(以下簡稱「傳心」)，因辦理與其設立宗旨相關之業務(以下稱「相關業務」)，需蒐集、處理及使用本人之個人資料，本人充分瞭解並同意以下為籌備處及傳心蒐集、處理、使用及保護本人個人資訊之方式:</p>
            <span>一、個人資料適用範圍:</span>
            <p
              style="font-size:16px;"
            >籌備處及傳心為辦理相關業務，得於必要範圍內取得本人之個人資料，使用的範圍包括但不限於上課點名、學員登錄及驗證、服務及活動訊息通知、活動報名等用途，及籌備處及傳心其他隱私權保護政策所規範之使用方式。</p>
            <span>二、個人資料之蒐集及使用:</span>
            <p>(一) 依前項所述，本人同意提供予籌備處及傳心以下個人資料:姓名、身分字號、出生年月日、學經歷、服務單位/就讀學校、職稱、聯絡方式(電話、通訊/戶籍地址及e-mail)、背景介紹等及其他可以直接或間接方式識別個人之資料。</p>
            <p>(二) 本人瞭解得依本人意願決定是否提供籌備處及傳心相關個人資料，惟本人所提供之個人資料不完整時，籌備處及傳心得拒絕提供必要之服務。</p>
            <p>(三) 本人所提供之資料，僅在法令許可之範圍下，及相關業務範圍內暨本人及第三條所定之期間，以電子檔或紙本形式存於籌備處及傳心，提供予籌備處及傳心使用。及因上述目的之作業所需要時，得由籌備處及傳心委託之第三方於上述條件下作為處理及使用。</p>
            <p>
              (四) 籌備處及傳心依個人資料保護法第八條第二項規定，有下列情事者，於蒐集及使用本人之個人資料時，得免告知本人:
              1. 依法律規定得免告知。
              2. 個人資料之蒐集係公務機關執行法定職務或非公務機關履行法定義務所必要。
              3. 告知將妨害公務機關執行法定職務。
              4. 告知將妨害第三人之重大利益。
              5. 當事人明知應告知之內容。
            </p>
            <span>三、個人資料使用期間、地區、對象及利用方式:</span>
            <p>(一) 使用期限:本人同意籌備處及傳心得使用本人所提供之個人資料之期間自本同意書簽署之當日起，至特定目的消失後十五年為止。</p>
            <p>(二) 使用地區:本人之個人資料將於台灣、金門、澎湖、馬祖地區及國際間作利用。</p>
            <p>(三) 使用對象:本人所提供之個人資料，限於籌備處及傳心及其所屬福智團體之相關法人，於相關必要之服務範圍內，非以營利目的之利用，福智寺並應採取適當之安全措施予以保護。</p>
            <p>(四) 使用方式:本人之個人資料僅在法令許可及本人同意使用之範圍，及同意使用之期間內，於特定目的範圍內，非以營利目的之處理與使用。</p>
            <span>四、本人之權益事項:</span>
            <p>
              籌備處及傳心於使用本人之個人資料時，本人得依據個人資料保護法第三條，向籌備處及傳心就本人之資料作以下請求:
              (一) 查詢或請求閱覽。
              (二) 製給複製本。
              (三) 補充或更正。
              (四) 停止蒐集、處理及利用。
              (五) 刪除。
            </p>
          </div>
        </el-main>
        <el-footer style="height:fit-content;">
          <el-row style="margin:0;">
            <el-col :span="2">
              <el-checkbox v-model="acceptDeclaration"></el-checkbox>
            </el-col>
            <el-col :span="22">
              <p>
                本人已確實詳閱並瞭解上述之內容，同意本籌備處及傳心以上述方式蒐集、處理及非以營利目的之利用本人個人資料並將本人個人資料建檔。
                <b
                  style="color:red;"
                >請勾選才能進行下一步</b>
              </p>
            </el-col>
          </el-row>
          <el-button @click="declaration = false">取消</el-button>
          <el-button @click="next()" :disabled="!acceptDeclaration">下一步</el-button>
        </el-footer>
      </el-container>
    </el-dialog>
  </div>
</template>

<script>
import { CheckFunctions } from "../../utils/CheckFunctions.js";
export default {
  name: "MemberInfo",
  props: {
    donationInfo: Object,
  },
  data() {
    // 身分證全碼驗證
    var checkSinValidator = (rule, value, callback) => {
      if (!value && this.memberInfo.useridType == "全碼") {
        return callback(new Error("身分證全碼不能為空"));
      } else if (!value) {
        return callback();
      }
      if (!CheckFunctions.checkSin(value)) {
        return callback(new Error("請輸入正確身分證"));
      } else {
        return callback();
      }
    };
    // 身分證末四碼驗證
    var checkSinLast4Validator = (rule, value, callback) => {
      let reg = new RegExp(/^\d{4}$/);
      if (!value) {
        return callback(new Error("身分證後四碼不能為空"));
      } else if (!reg.test(value)) {
        return callback(new Error("請輸入正確身分證後四碼"));
      } else {
        return callback();
      }
    };
    // 手機號碼驗證
    var checkCellPhoneValidator = (rule, value, callback) => {
      if (!CheckFunctions.checkCellPhone(value)) {
        return callback(new Error("手機格式錯誤"));
      } else {
        return callback();
      }
    };
    // 電子信箱驗證
    var checkEmailValidator = (rule, value, callback) => {
      if (!CheckFunctions.checkEmail(value)) {
        return callback(new Error("信箱格式錯誤"));
      } else {
        return callback();
      }
    };
    // 個資聲明勾選驗證
    var checkAcceptDeclarationValidator = (rule, value, callback) => {
      if (!this.acceptDeclaration) {
        return callback(new Error("請勾選"));
      } else {
        return callback();
      }
    };
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
      declaration: false, // 個資聲明顯示
      acceptDeclaration: false, // 接受個資聲明
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
        sin: [{ validator: checkSinValidator, trigger: "blur" }],
        sinLast4: [
          { required: true, message: "請輸入身分證末四碼", trigger: "blur" },
          { min: 4, max: 4, message: "長度為4", trigger: "blur" },
          { validator: checkSinLast4Validator, trigger: "blur" },
        ],
        cellPhone: [
          { required: true, message: "請輸入行動電話", trigger: "blur" },
          { validator: checkCellPhoneValidator, trigger: "blur" },
        ],
        email: [
          { required: true, message: "請輸入電子信箱", trigger: "blur" },
          { validator: checkEmailValidator, trigger: "blur" },
        ],
        acceptDeclaration: [
          { validator: checkAcceptDeclarationValidator, trigger: "change" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.next();
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
      this.memberInfo.step = "1";
      this.$emit("nextStep", this.memberInfo);
      console.log("上一步");
    },
    next() {
      this.$emit("nextStep", this.memberInfo);
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
/deep/ .el-dialog__body {
  padding: 0 20px 30px;
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
.el-radio /deep/ .el-radio__label {
  font-size: 16px;
}
</style>