export const CheckFunctions = {
  checkSin: function(idStr) {
    // 依照字母的編號排列，存入陣列備用。
    let letters = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "J",
      "K",
      "L",
      "M",
      "N",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "X",
      "Y",
      "W",
      "Z",
      "I",
      "O"
    ];
    // 儲存各個乘數
    let multiply = [1, 9, 8, 7, 6, 5, 4, 3, 2, 1];

    let nums = new Array(2);
    let firstChar;
    let firstNum;
    let lastNum;
    let total = 0;
    // 撰寫「正規表達式」。第一個字為英文字母，
    // 第二個字為1或2，後面跟著8個數字，不分大小寫。
    let regExpID = /^[a-z](1|2)\d{8}$/i;
    // 使用「正規表達式」檢驗格式
    if (idStr.search(regExpID) == -1) {
      // 基本格式錯誤
      // alert("身分證號碼寫錯誤！")
      return false;
    } else {
      // 取出第一個字元和最後一個數字。
      firstChar = idStr.charAt(0).toUpperCase();
      lastNum = parseInt(idStr.charAt(9), 10); // {{ string | number : fractionsize}};fractionsize: A number, specifying the number of decimals.
    }

    // 找出第一個字母對應的數字，並轉換成兩位數數字。
    for (let i = 0; i < 26; i++) {
      if (firstChar == letters[i]) {
        firstNum = i + 10;
        nums[0] = Math.floor(firstNum / 10);
        nums[1] = firstNum - nums[0] * 10;
        break;
      }
    }

    // 執行加總計算
    for (let i = 0; i < multiply.length; i++) {
      if (i < 2) {
        total += nums[i] * multiply[i];
      } else {
        total += parseInt(idStr.charAt(i - 1)) * multiply[i];
      }
    }

    //規則一餘數為零，且檢查碼需為零
    if (lastNum == 0 && total % 10 != lastNum) {
      // alert("身分證號碼寫錯誤！")
      return false;
    }
    //規則二餘數與檢查碼需相符
    if (lastNum != 0 && 10 - (total % 10) != lastNum) {
      // alert("身分證號碼寫錯誤！")
      return false;
    }
    return true;
  },
  //檢查手機號碼是否正確（可空值）
  checkCellPhone: function(contactPhone) {
    let reg = new RegExp(/^09\d{2}\d{3}\d{3}$/);
    if (!contactPhone) return true;
    else return reg.test(contactPhone);
  },

  //檢查市話格式是否正確（可空值）
  checkHomePhone: function(contactPhone) {
    let reg = new RegExp("0\\d{1,2}(\\d{6,8})(#\\d{1,5}){0,1}");
    if (!contactPhone) return true;
    else return reg.test(contactPhone);
  },

  //檢查信箱格式是否正確（可空值）
  checkEmail: function(contactEmail) {
    let reg = new RegExp(
      "^[_a-z0-9-]+([.][_a-z0-9-]+)*@[a-z0-9-]+([.][a-z0-9-]+)*$"
    );
    if (!contactEmail || reg.test(contactEmail)) return true;
    else return false;
  },

  isExistDate: function(dateStr) {
    var dateObj = dateStr.split("/"); // yyyy/mm/dd

    //列出12個月，每月最大日期限制
    var limitInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    var theYear = parseInt(dateObj[0]);
    var theMonth = parseInt(dateObj[1]);
    var theDay = parseInt(dateObj[2]);
    var isLeap = new Date(theYear, 1, 29).getDate() === 29; // 是否為閏年?

    if (isLeap) {
      // 若為閏年，最大日期限制改為 29
      limitInMonth[1] = 29;
    }

    // 比對該日是否超過每個月份最大日期限制
    return theDay <= limitInMonth[theMonth - 1];
  }
};
