const getters = {
  token: state => state.user.token,
  mode: state => state.app.mode,
  language: state => state.app.language,
  prompt: state => state.user.prompt,
  info: state => state.user.info,
  tenantCode: state => state.user.info.tenantCode,
  name: state => state.user.info && state.user.info.nickname || '',
  mMatchType: state => state.match.mMatchType,
  memberId: state => state.user.info.memberId || '',
  liveData: state => state.match.liveData,
  matchListTab: state => state.match.tab || '',
  cancelMatch: state => state.match.cancelMatch || '',
  instantMatchList: state => state.match.instantList || [],
  recommends: state => state.match.recommends || [],
  forecastMatchType: state => state.forecast.params.matchType,
  forecastFilter: state => state.forecast.params || {}

}
export default getters
