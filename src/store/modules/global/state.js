/* ============
 * State of the auth module
 * ============
 *
 * The initial state of the global module.
 */

export default {
    token: '',
    /**
     * 捐款者資訊
     * 
     * name: 姓名
     * genderTypeCode: 性別
     * payerTypeCode: 是否為廣論學員
     * useridType: 身分證選填全碼或末四碼
     * sin: 身分證字號
     * sinLast4: 身分證字號末四碼
     * cellPhone: 手機號碼
     * homePhone: 住家電話
     * email: 電子信箱
     */
    member: null,
    /**
     * 信用卡捐款
     * 
     * 
     *  */
    cardDonation: null,
};  