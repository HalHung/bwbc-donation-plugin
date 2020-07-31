export const RoadFunctions = {
    //取得縣市
    getCity: function() {
      let cities = [
        // {
        //   value: undefined,
        //   text: "請選擇"
        // }
      ];
      let temp = [];
      const roads = require("../assets/roads");
      for (let i = 0; i < roads.length; i++) {
        if (temp.length < 1) {
          temp.push(roads[i].city);
          cities.push({
            value: roads[i].city,
            text: roads[i].city
          });
        } else {
          if (String(temp).indexOf(String(roads[i].city)) === -1) {
            temp.push(roads[i].city);
            cities.push({
              value: roads[i].city,
              text: roads[i].city
            });
          }
        }
      }
      return cities;
    },
    //取得鄉鎮市區
    getDistrict: function(city) {
      let temp = [];
      let districts = [
        // {
        //   value: undefined,
        //   text: "請選擇"
        // }
      ];
      const roads = require("../assets/roads");
      for (let i = 0; i < roads.length; i++) {
        if (roads[i].city == city) {
          if (temp.length < 1) {
            temp.push(roads[i].city + ":" + roads[i].district);
            districts.push({
              value: roads[i].district,
              text: roads[i].district
            });
          } else {
            if (
              String(temp).indexOf(
                String(roads[i].city + ":" + roads[i].district)
              ) === -1
            ) {
              temp.push(roads[i].city + ":" + roads[i].district);
              districts.push({
                value: roads[i].district,
                text: roads[i].district
              });
            }
          }
        }
      }
      return districts;
    },
    //取得路街村里名
    getRoadList: function(city, district) {
      let temp = [];
      let roadList = [
        // {
        //   value: undefined,
        //   text: "請選擇"
        // }
      ];
      let cityAnddistrict = city + ":" + district;
      const roads = require("../assets/roads");
      for (let i = 0; i < roads.length; i++) {
        if (
          String(roads[i].city + ":" + roads[i].district) ===
          String(cityAnddistrict)
        ) {
          if (temp.length < 1) {
            temp.push(
              roads[i].city +
                ":" +
                roads[i].district +
                ":" +
                roads[i].road +
                ":" +
                roads[i].zipCode
            );
            roadList.push({
              value: roads[i].road,
              text: roads[i].road
            });
          } else {
            if (
              String(temp).indexOf(
                String(
                  roads[i].city +
                    ":" +
                    roads[i].district +
                    ":" +
                    roads[i].road +
                    ":" +
                    roads[i].zipCode
                )
              ) === -1
            ) {
              temp.push(
                roads[i].city +
                  ":" +
                  roads[i].district +
                  ":" +
                  roads[i].road +
                  ":" +
                  roads[i].zipCode
              );
              roadList.push({
                value: roads[i].road,
                text: roads[i].road
              });
            }
          }
        }
      }
      return roadList;
    },
    //選擇 路街村里名 取得zipCode
    getRoadZipCode: function(city, district, road) {
      let cityAnddistrictAndRoad = city + ":" + district + ":" + road;
      let zipCode = undefined;
      const roads = require("../assets/roads");
      for (let i = 0; i < roads.length; i++) {
        if (
          String(
            roads[i].city + ":" + roads[i].district + ":" + roads[i].road
          ) === String(cityAnddistrictAndRoad)
        )
          zipCode = roads[i].zipCode;
      }
      return zipCode;
    }
  };
  