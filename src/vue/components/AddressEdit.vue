<template>
<!-- 地址選填 -->
  <div>
    <el-form ref="address" :model="address" :rules="rules">
      <el-form-item label="地區" prop="addressType">
        <b-form-select v-model="address.addressType" v-on:change="changeAddressType">
          <b-form-select-option value="TAIWAN">台灣</b-form-select-option>
          <b-form-select-option value="OTHERS">其它</b-form-select-option>
        </b-form-select>
      </el-form-item>
      <div v-if="address.addressType == 'TAIWAN'">
        <el-form-item label="縣市" prop="city" class="star" ref="city">
          <b-form-select v-model="address.city" :options="cityOptions" v-on:change="getDistrict">
            <template v-slot:first>
              <b-form-select-option :value="undefined" disabled>-- 請選擇 --</b-form-select-option>
            </template>
          </b-form-select>
        </el-form-item>
        <el-form-item label="鄉鎮市區" prop="district" class="star" ref="district">
          <b-form-select
            v-model="address.district"
            :options="districtOptions"
            v-on:change="getRoadList"
          >
            <template v-slot:first>
              <b-form-select-option :value="undefined" disabled>-- 請選擇 --</b-form-select-option>
            </template>
          </b-form-select>
        </el-form-item>
        <el-form-item label="路街村里" prop="road" class="star" ref="road">
          <b-form-select v-model="address.road" :options="roadOptions" v-on:change="getRoadZipCode">
            <template v-slot:first>
              <b-form-select-option :value="undefined" disabled>-- 請選擇 --</b-form-select-option>
            </template>
          </b-form-select>
        </el-form-item>
        <el-row type="flex" align="middle" style="margin-bottom:0px;">
          <el-col class="font-size-title">郵遞區號</el-col>
        </el-row>
        <el-row style="margin-top:0px;">
          <el-col>
            <el-tag
              type="warning"
              size="medium"
              effect="plain"
              :hit="false"
              v-if="address.zipCode"
            >{{ address.zipCode }}</el-tag>
          </el-col>
        </el-row>
        <!-- <el-form-item label="郵遞區號" class="mb-0">{{ address.zipCode }}</el-form-item> -->
        <el-row>
          <el-col :xs="12" :sm="4">
            <el-form-item>
              <el-col class="ad-small-input">
                <el-input v-model="address.lane" class="small-input" maxlength="20"></el-input>
              </el-col>
              <el-col class="ad-small-label">巷</el-col>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="4">
            <el-form-item>
              <el-col class="ad-small-input">
                <el-input v-model="address.alley" maxlength="20"></el-input>
              </el-col>
              <el-col class="ad-small-label">弄</el-col>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="4">
            <el-form-item>
              <el-col class="ad-small-input">
                <el-input v-model="address.subAlley" maxlength="20"></el-input>
              </el-col>
              <el-col class="ad-small-label">衖</el-col>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="4">
            <el-form-item>
              <el-col class="ad-small-input">
                <el-input v-model="address.number" maxlength="20"></el-input>
              </el-col>
              <el-col class="ad-small-label">號</el-col>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="4">
            <el-form-item class="mb-0">
              <el-col class="ad-small-input">
                <el-input v-model="address.floor" maxlength="20"></el-input>
              </el-col>
              <el-col class="ad-small-label">樓</el-col>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="4">
            <el-form-item class="mb-0">
              <el-col class="ad-small-input">
                <el-input v-model="address.room" maxlength="20"></el-input>
              </el-col>
              <el-col class="ad-small-label">室</el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <label style="font-size:16px; font-weight:500;">備註：請含有○○之○的巷、弄、號地址，以○○-○方式輸入</label>
        <label style="font-size:16px; font-weight:500;">如：88之10號→88-10號</label>
      </div>
      <div v-else>
        <el-form-item prop="other">
          <el-input v-model="address.other" maxlength="100" placeholder="請輸入地址"></el-input>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import { RoadFunctions } from "../../utils/RoadFunctions";
import { isNullOrUndefined } from "util";

export default {
  name: "AddressEdit",
  props: {
    oAddress: Object,
  },
  data() {
    var checkSelectValidator = (rule, value, callback) => {
      // console.log(`checkSelectValidator:${value}`);
      if (this.address.addressType != "TAIWAN") {
        return callback();
      } else if (!value) {
        return callback(new Error("此欄位必填"));
      } else {
        return callback();
      }
    };
    var checkOtherValidator = (rule, value, callback) => {
      // console.log(`checkOtherValidator`);
      if (this.address.addressType != "OTHERS") {
        return callback();
      } else if (!value || value.trim() == "") {
        return callback(new Error("此欄位必填"));
      } else {
        return callback();
      }
    };
    return {
      address: {
        addressType: "TAIWAN",
        city: undefined,
        district: undefined,
        road: undefined,
        lane: undefined, // 巷
        alley: undefined, // 弄
        subAlley: undefined, //衖
        number: undefined, //號
        floor: undefined, //樓
        room: undefined, //室
        zipCode: "", //郵遞區號
        other: undefined,
      },
      cityOptions: [],
      districtOptions: [],
      roadOptions: [],
      rules: {
        addressType: [
          { required: true, message: "請選擇地區", trigger: "blur" },
        ],
        city: [{ validator: checkSelectValidator, trigger: "blur" }],
        district: [{ validator: checkSelectValidator, trigger: "blur" }],
        road: [{ validator: checkSelectValidator, trigger: "blur" }],
        other: [{ validator: checkOtherValidator, trigger: "blur" }],
      },
    };
  },
  watch: {
    oAddress() {
      if (
        this.oAddress != undefined &&
        this.oAddress.addressType != undefined
      ) {
        this.address = this.oAddress;
        this.districtOptions = RoadFunctions.getDistrict(this.address.city);
        this.roadOptions = RoadFunctions.getRoadList(
          this.address.city,
          this.address.district
        );
      }
    },
  },
  created() {
    if (this.oAddress != undefined && this.oAddress.addressType != undefined) {
      this.address = this.oAddress;
      this.districtOptions = RoadFunctions.getDistrict(this.address.city);
      this.roadOptions = RoadFunctions.getRoadList(
        this.address.city,
        this.address.district
      );
    }
    this.cityOptions = RoadFunctions.getCity(); //取得縣市
  },
  methods: {
    changeAddressType() {
      if (this.address.addressType == "TAIWAN") {
        this.address.other = undefined;
      } else {
        this.address.city = undefined;
        this.address.district = undefined;
        this.address.road = undefined;
        this.address.lane = undefined; // 巷
        this.address.alley = undefined; // 弄
        this.address.subAlley = undefined; //衖
        this.address.number = undefined; //號
        this.address.floor = undefined; //樓
        this.address.room = undefined; //室
        this.address.zipCode = ""; //郵遞區號
      }
    },
    //取得鄉鎮市區
    getDistrict() {
      console.log(`getDistrict`);
      if (isNullOrUndefined(this.address.city)) {
        this.districtOptions = undefined;
        this.address.district = undefined;
        this.roadOptions = undefined;
        this.address.road = undefined;
        this.address.zipCode = undefined;
        return;
      }
      this.$nextTick(() => {
        this.districtOptions = RoadFunctions.getDistrict(this.address.city);
        this.address.district = undefined;
        this.roadOptions = undefined;
        this.address.road = undefined;
        this.address.zipCode = undefined;
        //
        let tmp = this.address.city;
        this.$refs["city"].resetField();
        this.address.city = tmp;
      });
    },
    //取得路街村里名
    getRoadList() {
      if (
        isNullOrUndefined(this.address.city) ||
        isNullOrUndefined(this.address.district)
      ) {
        this.roadOptions = undefined;
        this.address.road = undefined;
        this.address.zipCode = undefined;
        return;
      }
      this.$nextTick(() => {
        this.roadOptions = RoadFunctions.getRoadList(
          this.address.city,
          this.address.district
        );
        this.address.road = undefined;
        this.address.zipCode = undefined;
        //
        let tmp = this.address.district;
        this.$refs["district"].resetField();
        this.address.district = tmp;
      });
    },
    //選擇 路街村里名
    getRoadZipCode(value) {
      console.log("value : " + value);
      if (isNullOrUndefined(value)) {
        this.address.zipCode = undefined;
        return;
      }
      this.$nextTick(() => {
        this.address.zipCode = RoadFunctions.getRoadZipCode(
          this.address.city,
          this.address.district,
          this.address.road
        );
        //
        let tmp = this.address.road;
        this.$refs["road"].resetField();
        this.address.road = tmp;
      });
    },
    ok() {
      this.$emit("finishAddress", this.address);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.star {
  .el-form-item__label:before {
    content: "*";
    color: red;
    margin-right: 4px;
  }
}
.ad-small-label {
  width: 20px !important;
}

.ad-small-input {
  width: 100px !important;
  input {
    width: 90px !important;
  }
}

.font-size-title {
  font-size: 16px;
  color: #606266;
}

.custom-select {
  font-size: 16px;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  border-radius: 0%;
}
.el-form-item {
  margin-bottom: 8px;
}
.el-form-item__label {
  margin: 0%;
}
</style>