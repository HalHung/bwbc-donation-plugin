<template>
  <!-- 固定帳號匯款 -->
  <div id="body">
    <div v-if="step == '1'">
      <TransferDonation ref="stepOne"></TransferDonation>
      <!-- <el-row>
        <el-col style="text-align:center; margin:16px 0;">
          <el-button type="warning" plain @click="next(1)">下一步</el-button>
        </el-col>
      </el-row> -->
    </div>
    <div v-if="step == '2'">
      <MemberInfo ref="stepTwo"></MemberInfo>
      <!-- <el-row>
        <el-col style="text-align:center; margin:16px 0;">
          <el-button type="warning" plain @click="next(2)">下一步</el-button>
        </el-col>
      </el-row> -->
    </div>
    <div v-if="step == '3'">
      <TransferInfo ref="stepThree"></TransferInfo>
      <!-- <el-row>
        <el-col style="text-align:center; margin:16px 0;">
          <el-button type="warning" plain @click="next(3)">下一步</el-button>
        </el-col>
      </el-row> -->
    </div>
  </div>
</template>

<script>
import MemberInfo from "./components/member-info";
import TransferDonation from "./components/transfer-donation";
import TransferInfo from "./components/transfer-info";
export default {
  components: {
    MemberInfo,
    TransferDonation,
    TransferInfo,
  },
  data() {
    return {
      step: "1",
    };
  },
  methods: {
    // next(item) {
    //   if (item == 1) {
    //     this.$refs.stepOne.submitForm(formName);
    //     this.step == "2";
    //   } else if (item == 2) {
    //     this.$refs.stepTwo.submitForm(formName);
    //     this.step == "3";
    //   } else {
    //     this.$refs.stepThree.submitForm(formName);
    //   }
    // },
  },
};
</script>

<style lang="scss" scoped>
#body {
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}
/deep/ .el-input__inner {
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}
.el-row {
  margin: 16px 0;
}
</style>