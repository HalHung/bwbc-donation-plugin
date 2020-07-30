<template>
  <div id="component-body">
    <el-row class="step">
      <el-steps :active="1" finish-status="success">
        <el-step title="步驟１"></el-step>
        <el-step title="步驟２"></el-step>
        <el-step title="步驟３"></el-step>
      </el-steps>
    </el-row>
    <p>捐款資訊</p>
    <el-row>
      <el-col>
        <span class="title">捐款項目：福智佛教學院</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <span>捐款方式</span>
        <span class="required-mark">*</span>
        <span>:&nbsp;</span>
      </el-col>
      <el-col>
        <el-radio v-model="donaMode" label="1">單次捐款</el-radio>
        <el-radio v-model="donaMode" label="2">定期定額捐款</el-radio>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <span>捐款金額</span>
        <span class="required-mark">*</span>
        <span>:</span>
      </el-col>
      <el-col v-show="donaMode == '2'">
        <el-button type="warning" plain @click="amounts = 199" size="mini">199</el-button>
        <el-button type="warning" plain @click="amounts = 299" size="mini">299</el-button>
        <el-button type="warning" plain @click="amounts = 599" size="mini">599</el-button>
        <el-button type="warning" plain @click="amounts = 799" size="mini">799</el-button>
        <el-button type="warning" plain @click="amounts = 999" size="mini">999</el-button>
      </el-col>
      <el-col :span="18">
        <el-input type="number" placeholder="請輸入金額" v-model="amount"></el-input>
      </el-col>
      <el-col :span="6">
        <span>&nbsp;元</span>
        <span v-show="donaMode == '2'">/&nbsp;每月</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <span>收據開立方式</span>
        <span class="required-mark">*</span>
        <span>(收據寄送資訊):&nbsp;</span>
      </el-col>
      <el-col>
        <el-radio v-model="receipt" label="1" v-show="donaMode == '1'">單筆</el-radio>
        <el-radio v-model="receipt" label="2">年開</el-radio>
        <el-radio v-model="receipt" label="3">不需寄發</el-radio>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <span>收據抬頭</span>
        <span class="required-mark">*</span>
        <span>:</span>
      </el-col>
      <el-col>
        <el-input type="text" placeholder="請輸入姓名(僅限填寫一位)" v-model="donatorName"></el-input>
      </el-col>
    </el-row>
    <el-row v-show="receipt != '3'">
      <el-col>
        <span>聯絡地址</span>
        <span class="required-mark">*</span>
        <span>(收據寄送地址):</span>
      </el-col>
      <el-col>
        <!-- <el-input type="text" placeholder="請輸入地址"></el-input> -->
        <AddressEdit ref="addressEdit"></AddressEdit>
      </el-col>
    </el-row>
    <el-row>
      <el-col style="text-align:center; margin:16px 0;">
        <el-button type="warning" plain>下一步</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import AddressEdit from "./components/AddressEdit";
export default {
  components: { AddressEdit },
  data() {
    return {
      donaMode: "1", // 捐款模式: 1單次捐款 2定期定額
      amount: null, // 捐款金額
      receipt: "1", // 收據開立方式: 1單筆 2年開 3不需寄發
      donatorName: null, // 收據抬頭
    };
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
.el-button + .el-button {
  margin: 0%;
}
</style>