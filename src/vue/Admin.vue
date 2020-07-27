<template>
<div>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="金鑰">
      <el-input v-model="api_key" placeholder="產品金鑰"></el-input>
    </el-form-item>
  <el-form-item>
  <el-button type="primary" @click="saveSetting">儲存</el-button>
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
    axios.get(`${window.ajaxurl}?action=luciditv_get_api_key`)
      .then(function (response) {
        // handle success
        self.api_key = response.data.api_key;
      });
  },
  methods:{
    saveSetting() {
      //axios.post(`${window.ajaxurl}`, {action:'submit_api_key', api_key: this.api_key})
      axios.post(`${window.ajaxurl}`,qs.stringify({
        'action': 'luciditv_submit_api_key',
			  'api_key': this.api_key
      })).then(function (response) {
        // handle success
        console.log(response.data);
      });
    }
  }
};
</script>
<style lang="css" scoped>
</style>
