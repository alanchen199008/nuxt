import request from '@/plugins/axios'

export const getForecastList = data => {
  return request({
    url: '/WOS-PREDICTION/noauth/prediction/matchList',
    method: 'post',
    data
  })
}

export const getForecastDetail = data => {
  return request({
    url: '/WOS-PREDICTION/noauth/prediction/matchDetail',
    method: 'post',
    data: data
  })
}
