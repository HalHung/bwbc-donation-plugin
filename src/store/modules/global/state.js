/* ============
 * State of the auth module
 * ============
 *
 * The initial state of the global module.
 */

export default {
    token: '',
    /**
     * 信用卡捐款
     * 
     * paymentToolCode: 捐款模式: E單次捐款 R定期定額
     * amount: 捐款金額
     * receiptTypeCode: 收據開立方式: 1.BY_TIME單筆 2.ANNUAL年開 3.UNWANTTED不需寄發
     * donatorName: 收據抬頭
     * address: 地址
     * name: 會員姓名
     * genderTypeCode: 性別
     * payerTypeCode: 是否參加福智廣論研討班
     * sin: 身分證字號
     * sinLast4: 身分證字號末四碼
     * cellPhone: 手機號碼
     * homePhone: 住家電話
     * email: 電子信箱
     * card: {
          cardNumber: null, // 信用卡號碼
          expMonth: null, // 有效月
          expYear: null, // 有效年
          cvc: null, // 安全碼
        },
     * donaUseCode: "Z",
     * donaItemCode: "W11",
     */
    bwbcCardDonate: null,
    
};  