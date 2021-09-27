import request from '@/plugins/axios'
// 专题赛事：联赛轮次信息
export const getLMRoundInfo = params => {
  return request({
    url: 'WOS-DATA-CENTER/noauth/hot/competition/round/info',
    method: 'get',
    params
  })
}

// 专题赛事：首页指定轮次的5场比赛
export const getLMRoundFiveMatch = params => {
  return request({
    url: 'WOS-DATA-CENTER/noauth/hot/competition/five/match',
    method: 'get',
    params
  })
}


// 专题赛事：指定轮次的完整比赛
export const getLMRoundMatch = params => {
  return request({
    url: 'WOS-DATA-CENTER/noauth/hot/competition/round/match',
    method: 'get',
    params
  })
}

// 专题赛事：联赛积分排名
export const getLMRoundScoreRank = params => {
  return request({
    url: 'WOS-DATA-CENTER/noauth/hot/competition/score/rank',
    method: 'get',
    params
  })
}
// 专题赛事：联赛射手排名
export const getLMRoundShoterRank = params => {
  return request({
    url: 'WOS-DATA-CENTER/noauth/hot/competition/shot/rank',
    method: 'get',
    params
  })
}

export const getNewsList = data => {
  return request({
    url: '/WOS-NEWS/noauth/news/getNewsList',
    method: 'post',
    data: data
  })
}

export const getExpertRecommendList = data => {
  return request({
    url: '/WOS-PREDICTION/noauth/pageExpertRecommendList',
    method: 'post',
    data: data
  })
}
