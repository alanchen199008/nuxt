import request from '@/plugins/axios'

export const getNewsList = data => {
  return request({
    url: '/WOS-NEWS/noauth/news/getNewsList',
    method: 'post',
    data: data
  })
}

export const getInstantMatch = (data) => {
  return request({
    url: 'WOS-DATA-CENTER/noauth/europe/cup/filter/match',
    method: 'post',
    data
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

export const getAssistTops = params => {
  return request({
    url: 'WOS-DATA-CENTER/noauth/europe/cup/assist/rank',
    method: 'get',
    params
  })
}

