import request from '@/plugins/axios'

export const getNewsList = data => {
  return request({
    url: '/WOS-NEWS/noauth/news/getNewsList',
    method: 'post',
    data: data
  })
}

export const getAppInfoDetails = data => {
  return request({
    url: '/WOS-NEWS/noauth/news/getAppInfoDetails',
    method: 'post',
    data: data
  })
}
