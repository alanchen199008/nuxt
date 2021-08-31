
import request from '@/plugins/axios'

export const getNewsInfo = params => {
  return request({
    url: '/WOS-NOTICE/noauth/wosannouncement/xs',
    method: 'get',
    params
  })
}

export const getBanner = params => {
  return request({
    url: '/WOS-NOTICE/noauth/woscpad/list',
    method: 'get',
    params
  })
}

export const getNewsList = data => {
  return request({
    url: '/WOS-NEWS/noauth/news/getNewsList',
    method: 'get',
    data: data
  })
}

export const getExpertList = data => {
  return request({
    url: '/WOS-PREDICTION/noauth/getHomeExpertList',
    method: 'post',
    data: data
  })
}

export const getNewsTypeList = data => {
  return request({
    url: '/WOS-NEWS/noauth/news/getNewsTypeList',
    method: 'post',
    data: data
  })
}

export const getMatchList = data => {
  return request({
    url: 'WOS-DATA-CENTER/noauth/football/match/hot/list',
    method: 'get'
  })
}
