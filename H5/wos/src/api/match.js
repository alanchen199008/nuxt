import request from '@/plugins/axios'

export const getCompetitionList = params => { // 赛事筛选
  return request({
    url: 'WOS-DATA-CENTER/noauth/football/competition/filter',
    method: 'get',
    params
  })
}

export const getFilterMatchCount = data => {
  return request({
    url: 'WOS-DATA-CENTER/noauth/football/match/count',
    method: 'post',
    data: data
  })
}

export const getMatchRingtoneWithFootball = () => { // 查询玩家的铃声设置信息
  return request({
    url: 'WOS-DATA-CENTER/football/ringtone/info',
    method: 'get'
  })
}

export const updateMatchRingtoneWithFootball = data => { // 修改玩家铃声设置
  return request({
    url: 'WOS-DATA-CENTER/football/ringtone/update',
    method: 'post',
    data
  })
}

export const updateMatchFocus = data => { // 新增或取消关注的比赛
  return request({
    url: 'WOS-DATA-CENTER/football/focus/match/update',
    method: 'post',
    data
  })
}

export const getInstantMatchListForFootball = data => {
  return request({
    url: 'WOS-DATA-CENTER/noauth/football/instant/match/list',
    method: 'post',
    data
  })
}

export const getOverMatchListForFootball = data => {
  return request({
    url: 'WOS-DATA-CENTER/noauth/football/over/match/list',
    method: 'post',
    data
  })
}

export const getFocusMatchListForFootball = params => {
  return request({
    url: 'WOS-DATA-CENTER/football/focus/match/list',
    method: 'get',
    params
  })
}

export const getScheduleMatchListForFootball = data => {
  return request({
    url: 'WOS-DATA-CENTER/noauth/football/schedule/match/list',
    method: 'post',
    data
  })
}

export const getMatchData = matchId => { // 足球-获取正在进行的比赛数据
  return request({
    url: 'WOS-DATA-CENTER/noauth/football/match/data/stats',
    method: 'get',
    params: { matchId }
  })
}

export const getMatchLiveMessage = matchId => { // 足球-直播页面的数据
  return request({
    url: 'WOS-DATA-CENTER/noauth/football/live/message',
    method: 'get',
    params: { matchId }
  })
}

export const getMatchCompanyOdds = matchId => { // 各个公司开出的比赛指数信息
  return request({
    url: 'WOS-DATA-CENTER/noauth/football/company/odds/list',
    method: 'get',
    params: { matchId }
  })
}

export const getMatchOddsStatus = matchId => { // 足球比赛欧赔的总体统计：下降家数,上升家数,平均变化
  return request({
    url: 'WOS-DATA-CENTER/noauth/football/change/odds/stats',
    method: 'get',
    params: { matchId }
  })
}

export const getMatchOddsChangeList = params => { // 足球指数指数变化
  return request({
    url: 'WOS-DATA-CENTER/noauth/football/odds/change/list',
    method: 'get',
    params
  })
}

export const getMatchBaseFaceFuture = params => { // 基本面：赛程
  return request({
    url: 'WOS-DATA-CENTER/noauth/football/baseFace/future/match',
    method: 'get',
    params
  })
}

export const getMatchBaseFaceLineup = matchId => { // 基本面：阵容
  return request({
    url: 'WOS-DATA-CENTER/noauth/football/baseFace/lineup/detail',
    method: 'get',
    params: { matchId }
  })
}

export const getMatchBaseFaceRecord = data => { // 基本面：战绩
  return request({
    url: 'WOS-DATA-CENTER/noauth/football/baseFace/match/record',
    method: 'post',
    data
  })
}

export const getMatchBaseRank = params => { // 基本面：排名
  return request({
    url: 'WOS-DATA-CENTER/noauth/football/baseFace/team/rank',
    method: 'get',
    params
  })
}

export const getMatchBaseCompetitionRank = params => { // 基本面：指定联赛的所有球队排名信息
  return request({
    url: 'WOS-DATA-CENTER/noauth/football/baseFace/competition/rank',
    method: 'get',
    params
  })
}

export const getMatchHistoryRank = params => { // 基本面：往季排名
  return request({
    url: 'WOS-DATA-CENTER/noauth/football/baseFace/history/rank',
    method: 'get',
    params
  })
}

export const getMatchSeason = params => { // 基本面：本赛季赛程
  return request({
    url: 'WOS-DATA-CENTER/noauth/football/baseFace/season/match',
    method: 'get',
    params
  })
}

export const getFavorableInfo = params => {
  return request({
    url: 'WOS-PREDICTION/noauth/prediction/intelligence',
    method: 'get',
    params
  })
}

export const getListItemsRecommendCount = params => {
  return request({
    url: 'WOS-PREDICTION/noauth/match/recommend/count',
    method: 'get',
    params
  })
}

export const getCompetitionRuleInfo = params => {
  return request({
    url: 'WOS-DATA-CENTER/noauth/football/competition/rule/info',
    method: 'get',
    params
  })
}