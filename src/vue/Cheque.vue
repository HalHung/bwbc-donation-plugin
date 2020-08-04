<template>
  <!-- 支票捐款 -->
  <div id="body">
    <ChequeDonationInfo></ChequeDonationInfo>
    <MemberInfo></MemberInfo>
    <ChequeInfo></ChequeInfo>
  </div>
</template>

<script>
import MemberInfo from "./components/member-info";
import ChequeDonationInfo from "./components/cheque-donation-info";
import ChequeInfo from "./components/cheque-info";
export default {
  components: {
    MemberInfo,
    ChequeDonationInfo,
    ChequeInfo,
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