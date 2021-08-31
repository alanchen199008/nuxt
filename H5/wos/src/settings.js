module.exports = {
  title: 'FBAPPH',
  vconsole: false,
  needPageTrans: true,
  passKey: 'ruanjie2018@jlj34ij34lkj?d30RJcaipiao',
  captchaId: '78129f96b0574886a3628472b95f6620', // '3ab80e979e5a40a3964e5e4681a2712b',
  customUrl: '//im-h5.theclzb.net/',
  /**
   * @type {object}
   * @param {number} forecast.sort - 排序：1,2,3,4
   * @description 预测-筛选
   */

  forecast: {
    sort: 1
  },
  export: {
    filter: {
      articleSchedules: '0',
      isCharge: '0',
      ruleType: '0',
      competitionIdList: '',
      rateSort: '1'
    }
  }
}
