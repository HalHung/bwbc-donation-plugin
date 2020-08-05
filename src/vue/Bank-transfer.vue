<template>
  <!-- 固定帳號匯款 -->
  <div id="body">
    <TransferDonation></TransferDonation>
    <MemberInfo></MemberInfo>
    <TransferInfo></TransferInfo>
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
</style>