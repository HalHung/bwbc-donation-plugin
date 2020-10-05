<template>
  <div>
    <el-form :model="companyInfo" :rules="rules" ref="companyInfo">
      <el-row class="step">
        <el-steps :active="3" finish-status="success">
          <el-step title="步驟１" icon="el-icon-s-order"></el-step>
          <el-step title="步驟２" icon="el-icon-bank-card"></el-step>
          <el-step title="步驟３" icon="el-icon-s-custom"></el-step>
        </el-steps>
      </el-row>
      <p style="color:#9c8044; font-weight:500; font-size:24px;">公司資訊</p>
      <el-row>
        <el-col>
          <span>公司名稱</span>
          <span class="required-mark">*</span>
          <span>:</span>
        </el-col>
        <el-col>
          <el-form-item prop="name">
            <el-input type="text" placeholder="請輸入公司名稱" v-model="companyInfo.name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <span>統一編號</span>
          <span class="required-mark">*</span>
          <span>:</span>
        </el-col>
        <el-col>
          <el-form-item prop="sinCompany">
            <el-input
              type="text"
              placeholder="請輸入統一編號"
              v-model="companyInfo.sinCompany"
              maxlength="8"
              minlength="8"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <p style="color:#9c8044; font-weight:500; font-size:24px;">聯絡人資訊</p>
      <el-row>
        <el-col>
          <span>姓名</span>
          <span class="required-mark">*</span>
          <span>:</span>
        </el-col>
        <el-col>
          <el-form-item prop="contactName">
            <el-input type="text" placeholder="請輸入聯絡人姓名" v-model="companyInfo.contactName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <span>聯絡電話</span>
          <span class="required-mark">*</span>
          <span>:</span>
        </el-col>
        <el-col>
          <el-form-item prop="contactPhone">
            <el-input type="text" v-model="companyInfo.contactPhone"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <span>公司聯絡電子信箱</span>
          <span class="required-mark">*</span>
          <span>:</span>
        </el-col>
        <el-col>
          <el-form-item prop="contactEmail">
            <el-input type="email" placeholder="請輸入電子信箱" v-model="companyInfo.contactEmail"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
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
                v-model="companyInfo.donatorName"
                :validate-event="true"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      <el-row>
        <el-col>
          <span>公司聯絡地址</span>
          <span class="required-mark">*</span>
          <span>(收據寄送地址):</span>
        </el-col>
      </el-row>
      <AddressEdit ref="addressEdit" :oAddress="companyInfo.companyAddress"></AddressEdit>
      <!-- 收據 -->
      <!-- <div>
        <el-row>
          <el-col>
            <span>收據開立方式</span>
            <span class="required-mark">*</span>
            <span>(收據寄送資訊):&nbsp;</span>
          </el-col>
          <el-col>
            <el-form-item prop="receiptTypeCode">
              <el-radio-group v-model="companyInfo.receiptTypeCode">
                <el-radio label="BY_TIME">單筆</el-radio>
                <el-radio label="UNWANTTED">不需寄發</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="companyInfo.receiptTypeCode != 'UNWANTTED' " id="center">
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
                v-model="companyInfo.donatorName"
                :validate-event="true"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="companyInfo.receiptTypeCode != 'UNWANTTED'">
          <el-col>
            <span>寄送地址</span>
            <span class="required-mark">*</span>
            <span>:</span>
          </el-col>
          <el-col>
            <el-radio-group v-model="receiptAddress">
              <el-radio label="SAME">同聯絡地址</el-radio>
              <el-radio label="NEW">新增地址</el-radio>
            </el-radio-group>
          </el-col>
          <el-col v-if="receiptAddress == 'NEW'">
            <AddressEdit ref="addressEdit" :oAddress="companyInfo.address"></AddressEdit>
          </el-col>
        </el-row>
      </div> -->
      <!-- 收據 -->
      <el-row
        style="background-color: #d8ba5f33; padding: 8px 16px 0; border-radius: 4px; border: solid 1px #decb93; margin-top:24px;"
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
          <el-button @click="previous()" v-scroll-to="'#step-two'">上一步</el-button>
          <el-button @click="submitForm('companyInfo')" v-scroll-to="'#step-one'">送出</el-button>
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
            <el-button @click="dialog.isShow = false" class="primary-color">我知道了</el-button>
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
            >立同意書人{{companyInfo.contactName}}，茲同意福智佛教學院籌備處 (以下簡稱「籌備處」)及福智傳心(以下簡稱「傳心」)，因辦理與其設立宗旨相關之業務(以下稱「相關業務」)，需蒐集、處理及使用本人之個人資料，本人充分瞭解並同意以下為籌備處及傳心蒐集、處理、使用及保護本人個人資訊之方式:</p>
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
          <el-button
            @click="submitForm('memberInfo')"
            :disabled="!acceptDeclaration"
            v-scroll-to="'#card'"
          >送出</el-button>
        </el-footer>
      </el-container>
    </el-dialog>
  </div>
</template>

<script>
import { CheckFunctions } from "../../utils/CheckFunctions.js";
import AddressEdit from "../components/AddressEdit";
export default {
  name: "CompanyInfo",
  components: { AddressEdit },
  props: {
    donationInfo: Object,
  },
  data() {
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
    // 電話驗證
    var checkContactPhoneValidator = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("請確認號碼"));
      } else {
        return callback();
      }
    };
    return {
      companyInfo: {
        name: null, // 公司名稱
        sinCompany: null, // 公司統編
        contactName: null, // 聯絡人姓名
        contactPhone: null, // 聯絡手機或電話
        contactEmail: null, // 聯絡電子信箱
        companyAddress: null, // 聯絡地址
        step: null,
        receiptTypeCode: "BY_TIME", // 收據開立方式: 1.BY_TIME單筆 2.UNWANTTED不需寄發
        donatorName: null, // 收據抬頭
        address: null, // 地址
      },
      receiptAddress: "SAME",
      dialog: {
        title: "",
        content: "",
        isShow: false,
      },
      declaration: false, // 個資聲明顯示
      acceptDeclaration: false, // 接受個資聲明
      rules: {
        donatorName: [
          { required: true, message: "請輸入收據抬頭", trigger: "blur" },
        ],
        name: [{ required: true, message: "請輸入公司名稱", trigger: "blur" }],
        sinCompany: [
          { required: true, message: "請輸入統一編號", trigger: "blur" },
          { min: 8, max: 8, message: "請檢查統一編號", trigger: "blur" },
        ],
        contactName: [
          { required: true, message: "請輸入姓名", trigger: "blur" },
        ],
        contactPhone: [
          //   { required: true, message: "請輸入號碼", trigger: "blur" },
          { validator: checkContactPhoneValidator, trigger: "blur" },
        ],
        contactEmail: [
          { required: true, message: "請輸入電子信箱", trigger: "blur" },
          { validator: checkEmailValidator, trigger: "blur" },
        ],
        acceptDeclaration: [
          { validator: checkAcceptDeclarationValidator, trigger: "change" },
        ],
      },
    };
  },
  watch: {
    receiptAddress() {
      if (this.receiptAddress == "SAME") {
        this.companyInfo.address = this.companyInfo.companyAddress;
        console.log("address:" + this.companyInfo.address);
      }
    },
    "companyInfo.name"() {
      this.companyInfo.donatorName = this.companyInfo.name;
      console.log(`set donatorName`);
    }
  },
  methods: {
    submitForm(formName) {
      this.declaration = false;
      this.adderssValidate();
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
    previous() {
      this.companyInfo.step = "2";
      console.log("step:" + this.companyInfo.step);
      this.$emit("nextStep", this.companyInfo);
    },
    next() {
      this.companyInfo.step = "4";
      this.companyInfo.address = this.companyInfo.companyAddress;
      this.companyInfo.companyAddress = this.getAddressString(
        this.companyInfo.companyAddress
      );
      console.log("step:" + this.companyInfo.step);
      this.$emit("nextStep", this.companyInfo);
    },
    showMessageBox(title, content) {
      this.dialog.title = title;
      this.dialog.content = content;
      this.dialog.isShow = true;
    },
    getAddressString(address) {
      if(address==null) return null;
      if (address.zipCode == undefined || address.zipCode == null) return null;
      let result = address.addressType + address.zipCode;
      if (address.city != undefined) {
        result += address.city;
      }
      if (address.district != undefined) {
        result += address.district;
      }
      if (address.road != undefined) {
        result += address.road;
      }
      if (address.lane != undefined) {
        result += address.lane + "巷";
      }
      if (address.alley != undefined) {
        result += address.alley + "弄";
      }
      if (address.subAlley != undefined) {
        result += address.subAlley + "衖";
      }
      if (address.number != undefined) {
        result += address.number + "號";
      }
      if (address.floor != undefined) {
        result += address.floor + "樓";
      }
      if (address.room != undefined) {
        result += address.room + "室";
      }
      if (address.other != undefined) {
        result += address;
      }
      return result;
    },
    adderssValidate() {
      this.$refs["addressEdit"].$refs["address"].validate((valid) => {
        console.log(`address v:${valid}`);
        if (valid) {
          this.companyAddress = this.$refs["addressEdit"].address;
          // this.nextStep();
        } else {
          this.showMessageBox("提示", "地址欄無輸入必填欄位或資料不完整！");
        }
      });
    },
  },
};
</script>

<style lang="scss">
.required-mark {
  color: red;
}
/deep/ .el-step__title {
  padding-left: 2px;
}
.sub-title {
  color: #424242;
  font-size: 16px;
  font-weight: bold;
}
</style>