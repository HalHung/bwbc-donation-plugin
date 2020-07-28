<template>
  <div id="component-body">
    <el-row class="step">
      <el-steps :active="3" finish-status="success">
        <el-step title="步驟１"></el-step>
        <el-step title="步驟２"></el-step>
        <el-step title="步驟３"></el-step>
      </el-steps>
    </el-row>
    <p>信用卡資訊</p>
    <el-row>
      <el-col :span="4">
        <span>信用卡卡號</span>
        <span class="required-mark">*</span>
        <span>:</span>
      </el-col>
      <el-col :span="20">
        <el-input type="text" placeholder="請輸入電子信箱"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <span>有效期限</span>
        <span class="required-mark">*</span>
        <span>:</span>
      </el-col>
      <el-select v-model="cardMonth" placeholder="月">
        <el-option
          v-for="item in regions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-select v-model="region" placeholder="年">
        <el-option
          v-for="item in regions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-row>
  </div>
</template>

<script>
export default {};
</script>

<style lang="css">
#component-body {
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}
</style>