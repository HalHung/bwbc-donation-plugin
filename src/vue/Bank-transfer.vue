<template>
  <!-- 固定帳號匯款 -->
  <div id="body">
    <TransferInfo></TransferInfo>
    <MemberInfo></MemberInfo>
  </div>
</template>

<script>
import MemberInfo from "./components/member-info";
import TransferInfo from "./components/transfer-info";
export default {
  components: {
    MemberInfo,
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