<template>
<!-- 信用卡捐款 -->
  <div id="credit-card">
    <CardDonationInfo></CardDonationInfo>
    <MemberInfo></MemberInfo>
    <CreditCardInfo></CreditCardInfo>
  </div>
</template>

<script>
import CardDonationInfo from "./components/card-donation-info";
import MemberInfo from "./components/member-info";
import CreditCardInfo from "./components/credit-card-info";

export default {
  components: { CardDonationInfo, MemberInfo, CreditCardInfo },
};
</script>

<style lang="scss" scoped>
#credit-card {
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}
input {
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}
.el-select-dropdown__item {
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}
</style>