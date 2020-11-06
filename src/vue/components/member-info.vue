<template>
  <!-- 捐款人資訊(共用畫面) -->
  <div id="component-body">
    <el-form :model="memberInfo" :rules="rules" ref="memberInfo">
      <el-row class="step">
        <el-steps :active="3" finish-status="success">
          <el-step title="金額" icon="el-icon-s-order"></el-step>
          <el-step
            title="卡號"
            icon="el-icon-bank-card"
            v-if="donationInfo.from == 'card'"
          ></el-step>
          <el-step
            title="匯款"
            icon="el-icon-bank-card"
            v-else-if="donationInfo.from == 'transfer'"
          ></el-step>
          <el-step title="支票" icon="el-icon-bank-card" v-else></el-step>
          <el-step title="收據" icon="el-icon-s-custom"></el-step>
        </el-steps>
      </el-row>
      <p style="color: #9c8044; font-weight: 500; font-size: 24px">
        捐款人資訊
      </p>
      <el-row>
        <el-col>
          <span class="sub-title">姓名</span>
          <span class="required-mark">*</span>
          <span class="sub-title">:</span>
        </el-col>
        <el-col>
          <el-form-item prop="name">
            <el-input
              type="text"
              placeholder="請輸入姓名(僅限填寫一位)"
              v-model="memberInfo.name"
              maxlength="30"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="!donationInfo.from == 'cheque'">
        <el-col>
          <span class="sub-title">身份</span>
          <span class="required-mark">*</span>
          <span class="sub-title">:&nbsp;</span>
        </el-col>
        <el-col>
          <el-form-item prop="isForeign">
            <el-radio-group v-model="memberInfo.isForeign">
              <el-radio :label="false">本國籍人士</el-radio>
              <el-radio :label="true">非本國籍人士</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="memberInfo.isForeign == false">
        <el-col>
          <span class="sub-title">身分證字號</span>
          <span class="required-mark">*</span>
          <span class="sub-title">:&nbsp;</span>
        </el-col>
        <el-col>
          <el-form-item prop="useridType">
            <el-radio-group v-model="memberInfo.useridType">
              <el-radio label="全碼" style="margin-bottom: 0">全碼</el-radio>
              <el-radio label="末四碼" style="margin-bottom: 0"
                >末四碼</el-radio
              >
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
      <el-row v-if="memberInfo.isForeign == false">
        <el-col>
          <span class="sub-title">手機號碼</span>
          <span class="required-mark">*</span>
          <span class="sub-title">:</span>
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
      <el-row v-if="memberInfo.isForeign == true">
        <el-col>
          <span class="sub-title">手機號碼</span>
          <span class="required-mark">*</span>
          <span class="sub-title">:</span>
        </el-col>
        <el-col>
          <el-form-item prop="cellPhone">
            <vue-tel-input
              placeholder="請輸入手機號碼"
              name="phoneNumber"
              v-bind="bindProps"
              @input="onPhoneInput"
              v-model="memberInfo.cellPhone"
            ></vue-tel-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <span class="sub-title">電子信箱</span>
          <span class="required-mark">*</span>
          <span class="sub-title">:</span>
        </el-col>
        <el-col>
          <el-form-item prop="email">
            <el-input
              type="email"
              placeholder="請輸入電子信箱"
              v-model="memberInfo.email"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="!donationInfo.from == 'cheque'">
        <el-col>
          <span class="sub-title">捐款成功通知方式</span>
          <span class="required-mark">*</span>
          <span class="sub-title">:&nbsp;</span>
        </el-col>
        <el-col>
          <el-form-item prop="notifyTypeCode">
            <el-radio-group v-model="memberInfo.notifyTypeCode">
              <el-radio label="SMS" v-if="memberInfo.isForeign == false"
                >簡訊</el-radio
              >
              <el-radio label="EMAIL">Email</el-radio>
              <el-radio label="NONE">不通知</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <span class="sub-title">性別</span>
          <span class="required-mark">*</span>
          <span class="sub-title">:&nbsp;</span>
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
          <span class="sub-title">是否參加福智廣論研討班</span>
          <span class="required-mark">*</span>
          <span class="sub-title">:&nbsp;</span>
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
      <!-- 收據 -->
      <div v-if="memberInfo.isForeign == false">
        <el-row>
          <el-col>
            <span class="sub-title">收據開立方式</span>
            <span class="required-mark">*</span>
            <span class="sub-title">(收據寄送資訊):&nbsp;</span>
          </el-col>
          <el-col>
            <el-form-item prop="receiptTypeCode">
              <el-radio-group v-model="memberInfo.receiptTypeCode">
                <el-radio
                  label="BY_TIME"
                  v-if="donationInfo.paymentToolCode == 'E'"
                  >單筆</el-radio
                >
                <el-radio label="ANNUAL" v-if="donationInfo.from == 'card'"
                  >年開</el-radio
                >
                <el-radio label="UNWANTTED">不需寄發</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="memberInfo.receiptTypeCode != 'UNWANTTED'">
          <el-col>
            <span class="sub-title">收據抬頭</span>
            <span class="required-mark">*</span>
            <span class="sub-title">:</span>
          </el-col>
          <el-col>
            <el-form-item prop="donatorName">
              <el-input
                type="text"
                placeholder="請輸入姓名(僅限填寫一位)"
                v-model="memberInfo.donatorName"
                :validate-event="true"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="memberInfo.receiptTypeCode != 'UNWANTTED'">
          <el-col>
            <span class="sub-title">寄送地址</span>
            <span class="required-mark">*</span>
            <span class="sub-title">:</span>
          </el-col>
          <el-col>
            <AddressEdit
              ref="addressEdit"
              :oAddress="memberInfo.address"
            ></AddressEdit>
          </el-col>
        </el-row>
      </div>
      <!-- 收據 -->
      <!-- <div v-if="memberInfo.isForeign == false">
        <el-row
          v-if="memberInfo.receiptTypeCode == 'UNWANTTED'"
          style="margin: 16px 0px"
        >
          <el-col>
            <span class="sub-title">居住地(區域性活動通知用)：</span>
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
      </div> -->
      <el-row>
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
      </el-row>
      <el-row
        style="
          background-color: #d8ba5f33;
          padding: 8px 16px 0;
          border-radius: 4px;
          border: solid 1px #decb93;
          margin-top: 24px;
        "
      >
        <el-col :span="2">
          <el-form-item prop="acceptDeclaration">
            <el-checkbox v-model="acceptDeclaration"></el-checkbox>
          </el-form-item>
        </el-col>
        <el-col :span="22" style="padding-top: 4px">
          <span class="sub-title">
            請詳閱
            <a
              @click="declaration = true"
              style="color: blue; text-decoration: none"
              >《個資聲明》</a
            >
            ，進行下一步即表示同意個資聲明。
          </span>
        </el-col>
      </el-row>
      <el-row>
        <el-col style="text-align: center; margin: 16px 0">
          <el-button @click="previous()" v-scroll-to="'#step-two'"
            >上一步</el-button
          >
          <el-button @click="submitForm('memberInfo')" v-scroll-to="'#step-one'"
            >送出</el-button
          >
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
            <el-button @click="dialog.isShow = false" class="primary-color"
              >我知道了</el-button
            >
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
            style="
              overflow: auto;
              height: 40vh;
              background-color: whitesmoke;
              padding: 16px;
            "
          >
            <p>
              立同意書人{{ memberInfo.name }}，茲同意福智佛教學院籌備處
              (以下簡稱「籌備處」)及福智傳心(財團法人高雄市橋頭區福智寺，以下簡稱傳心)，因辦理與其設立宗旨相關之業務(以下稱「相關業務」)，需蒐集、處理及使用本人之個人資料，本人充分瞭解並同意以下為籌備處及傳心蒐集、處理、使用及保護本人個人資訊之方式:
            </p>
            <span>一、個人資料適用範圍:</span>
            <p>
              籌備處及傳心為辦理相關業務，得於必要範圍內取得本人之個人資料，使用的範圍包括但不限於上課點名、學員登錄及驗證、服務及活動訊息通知、活動報名等用途，及籌備處及傳心其他隱私權保護政策所規範之使用方式。
            </p>
            <span>二、個人資料之蒐集及使用:</span>
            <p>
              (一)
              依前項所述，本人同意提供予籌備處及傳心以下個人資料:姓名、性別、身分證字號、出生年月日、學經歷、服務單位/就讀學校、職稱、聯絡方式(電話、通訊/戶籍地址及e-mail)、背景介紹等及其他可以直接或間接方式識別個人之資料。
            </p>
            <p>
              (二)
              本人瞭解得依本人意願決定是否提供籌備處及傳心相關個人資料，惟本人所提供之個人資料不完整時，籌備處及傳心得拒絕提供必要之服務。
            </p>
            <p>
              (三)
              本人所提供之資料，僅在法令許可之範圍下，及相關業務範圍內暨本人及第三條所定之期間，以電子檔或紙本形式存於籌備處及傳心，提供予籌備處及傳心使用。及因上述目的之作業所需要時，得由籌備處及傳心委託之第三方於上述條件下作為處理及使用。
            </p>
            <p>
              (四)
              籌備處及傳心依個人資料保護法第八條第二項規定，有下列情事者，於蒐集及使用本人之個人資料時，得免告知本人:
              1. 依法律規定得免告知。 2.
              個人資料之蒐集係公務機關執行法定職務或非公務機關履行法定義務所必要。
              3. 告知將妨害公務機關執行法定職務。 4.
              告知將妨害第三人之重大利益。 5. 當事人明知應告知之內容。
            </p>
            <span>三、個人資料使用期間、地區、對象及利用方式:</span>
            <p>
              (一)
              使用期限:本人同意籌備處及傳心得使用本人所提供之個人資料之期間自本同意書簽署之當日起，至特定目的消失後十五年為止。
            </p>
            <p>
              (二)
              使用地區:本人之個人資料將於台灣、金門、澎湖、馬祖地區及國際間作利用。
            </p>
            <p>
              (三)
              使用對象:本人所提供之個人資料，限於籌備處及傳心及其所屬福智團體之相關法人，於相關必要之服務範圍內，非以營利目的之利用，福智寺並應採取適當之安全措施予以保護。
            </p>
            <p>
              (四)
              使用方式:本人之個人資料僅在法令許可及本人同意使用之範圍，及同意使用之期間內，於特定目的範圍內，非以營利目的之處理與使用。
            </p>
            <span>四、本人之權益事項:</span>
            <p>
              籌備處及傳心於使用本人之個人資料時，本人得依據個人資料保護法第三條，向籌備處及傳心就本人之資料作以下請求:
              (一) 查詢或請求閱覽。 (二) 製給複製本。 (三) 補充或更正。 (四)
              停止蒐集、處理及利用。 (五) 刪除。
            </p>
          </div>
        </el-main>
        <el-footer style="height: fit-content">
          <el-row style="margin: 0">
            <el-col :span="2">
              <el-checkbox v-model="acceptDeclaration"></el-checkbox>
            </el-col>
            <el-col :span="22">
              <p>
                本人已確實詳閱並瞭解上述之內容，同意本籌備處及傳心以上述方式蒐集、處理及非以營利目的之利用本人個人資料並將本人個人資料建檔。
                <b style="color: red">請勾選才能進行下一步</b>
              </p>
            </el-col>
          </el-row>
          <el-button @click="declaration = false">取消</el-button>
          <el-button
            @click="submitForm('memberInfo')"
            :disabled="!acceptDeclaration"
            v-scroll-to="'#card'"
            >送出</el-button
          >
        </el-footer>
      </el-container>
    </el-dialog>
  </div>
</template>

<script>
import { CheckFunctions } from "../../utils/CheckFunctions.js";
import AddressEdit from "../components/AddressEdit";
export default {
  name: "MemberInfo",
  components: { AddressEdit },
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
    // 國內手機號碼驗證
    var checkDomesticPhoneValidator = (rule, value, callback) => {
      console.log(
        typeof this.memberInfo.isForeign + ", " + this.memberInfo.isForeign
      );
      if (this.memberInfo.isForeign) {
        console.log("foreigner");
        return callback();
      } else {
        if (!CheckFunctions.checkCellPhone(value)) {
          return callback(new Error("手機格式錯誤"));
        } else {
          return callback();
        }
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
    // 捐款注意事項驗證
    var checkIsAcceptPdpaValidator = (rule, value, callback) => {
      if (!this.isAcceptPdpa) {
        console.log(this.isAcceptPdpa);
        return callback(new Error("請勾選"));
      } else return callback();
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
      bindProps: {
        preferredCountries: [
          "TW",
          "CA",
          "CN",
          "US",
          "JP",
          "KR",
          "HK",
          "SG",
          "MY",
          "IN",
          "VN",
        ],
      },
      memberInfo: {
        name: null, // 姓名
        genderTypeCode: "MALE", // 性別
        payerTypeCode: "YES", // 是否參加福智廣論研討班
        useridType: "全碼", // 身分證選填全碼或末四碼
        sin: null, // 身分證字號
        sinLast4: null, // 身分證字號末四碼
        cellPhone: null, // 手機號碼
        phone_country_code: null,
        homePhone: null, // 住家電話
        email: null, // 電子信箱
        region: null, // 居住地
        step: null, // 回傳通知父組件切換
        notifyTypeCode: "NONE", // 通知方式 1.SMS簡訊 2.EMAIL電子信件 3.NONE不通知
        isForeign: false, // 國籍
        receiptTypeCode: "UNWANTTED", // 收據開立方式: 1.BY_TIME單筆 2.ANNUAL年開 3.UNWANTTED不需寄發
        donatorName: null, // 收據抬頭
        address: null, // 地址
      },
      dialog: {
        title: "",
        content: "",
        isShow: false,
      },
      declaration: false, // 個資聲明顯示
      acceptDeclaration: false, // 接受個資聲明
      isAcceptPdpa: false, // 同意遵守捐款注意事項
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
        isForeign: [
          { required: true, message: "請選擇身份", trigger: "change" },
        ],
        donatorName: [
          { required: true, message: "請輸入收據抬頭", trigger: "blur" },
        ],
        receiptTypeCode: [
          { required: true, message: "請選擇收據開立方式", trigger: "change" },
        ],
        name: [{ required: true, message: "請輸入姓名", trigger: "blur" }],
        genderTypeCode: [
          { required: true, message: "請選擇性別", trigger: "change" },
        ],
        notifyTypeCode: [
          { required: true, message: "請選擇通知方式", trigger: "change" },
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
          { validator: checkDomesticPhoneValidator, trigger: "blur" },
        ],
        email: [
          { required: true, message: "請輸入電子信箱", trigger: "blur" },
          { validator: checkEmailValidator, trigger: "blur" },
        ],
        isAcceptPdpa: [
          { validator: checkIsAcceptPdpaValidator, trigger: "change" },
        ],
        acceptDeclaration: [
          { validator: checkAcceptDeclarationValidator, trigger: "change" },
        ],
      },
    };
  },
  watch: {
    "memberInfo.isForeign"() {
      this.memberInfo.notifyTypeCode = "NONE";
      this.memberInfo.receiptTypeCode = "UNWANTTED";
    },
    "memberInfo.name"() {
      this.memberInfo.donatorName = this.memberInfo.name;
      console.log(`set donatorName`);
    },
  },
  methods: {
    onPhoneInput(phone, value) {
      this.memberInfo.cellPhone = value.number.e164;
      this.memberInfo.phone_country_code = value.country.iso2.toLowerCase();
    },
    submitForm(formName) {
      this.declaration = false;
      if (this.memberInfo.isForeign) {
        this.memberInfo.useridType = "末四碼";
        this.memberInfo.sinLast4 = "9999";
        this.region = null;
        console.log(
          this.memberInfo.useridType + ", " + this.memberInfo.sinLast4
        );
      }
      this.$refs[formName].validate((valid) => {
        console.log(`valid:${valid}`);
        if (valid) {
          if (this.memberInfo.receiptTypeCode != "UNWANTTED") {
            this.adderssValidate();
          } else {
            this.memberInfo.address = undefined;
            this.next();
          }
        } else {
          console.log("error submit member info!!");
          this.showMessageBox("提示", "無輸入必填欄位或格式不符！");
          return false;
        }
      });
    },
    adderssValidate() {
      if (this.memberInfo.receiptTypeCode != "UNWANTTED") {
        this.$refs["addressEdit"].$refs["address"].validate((valid) => {
          console.log(`address v:${valid}`);
          if (valid) {
            this.memberInfo.address = this.$refs["addressEdit"].address;
            this.next();
          } else {
            this.showMessageBox("提示", "地址欄無輸入必填欄位或資料不完整！");
          }
        });
      } else {
        this.memberInfo.address = undefined;
      }
    },
    showMessageBox(title, content) {
      this.dialog.title = title;
      this.dialog.content = content;
      this.dialog.isShow = true;
    },
    previous() {
      this.memberInfo.step = "2";
      console.log("step:" + this.memberInfo.step);
      this.$emit("nextStep", this.memberInfo);
    },
    next() {
      this.memberInfo.step = "4";
      console.log("step:" + this.memberInfo.step);
      this.$emit("nextStep", this.memberInfo);
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
/deep/ .vue-tel-input {
  border-radius: 0%;
  border-color: #cccccc;

  .vti__input {
    border: none;
    border-left: solid 1px #cccccc;
  }
  ::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #cccccc;
  }
  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #cccccc;
  }
  ::-ms-input-placeholder {
    /* Microsoft Edge */
    color: #cccccc;
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
/deep/.el-card__header {
  padding: 3px 20px;
  background-color: #bda268;
  color: white;
  text-align: center;
}
</style>