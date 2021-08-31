import request from '@/plugins/axios'

export const getEuroCCAllInstant = params => {
  return request({
    url: 'WOS-DATA-CENTER/noauth/europe/champion/list/stage',
    method: 'get',
    params
  })
}

export const getEuroCCInstant = params => {
  return request({
    url: 'WOS-DATA-CENTER/noauth/europe/champion/stage/match',
    method: 'get',
    params
  })
}

export const getGroupTops = params => {
  return request({
    url: 'WOS-DATA-CENTER/noauth/europe/cup/group/rank',
    method: 'get',
    params
  })
}

export const getShooterTops = params => {
  return request({
    url: 'WOS-DATA-CENTER/noauth/europe/cup/shot/rank',
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
