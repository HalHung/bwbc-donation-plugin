<template>
<div>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="金鑰">
      <el-input v-model="api_key" placeholder="產品金鑰"></el-input>
    </el-form-item>
  </el-form>
</div>
</template>
<script>
import * as axios from 'axios';
import qs from 'qs';
export default {
  data() {
    return {
      api_key: ''
    }
  },
  created(){
    const self = this;
    axios.get(`wp-admin/admin-ajax.php?action=luciditv_get_api_key`)
      .then(function (response) {
        // handle success
        self.api_key = response.data.api_key;
      });
  }
};
</script>
<style lang="css" scoped>
</style>
