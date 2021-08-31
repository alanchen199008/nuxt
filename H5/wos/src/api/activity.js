import request from '@/plugins/axios'

export const getActivityInfo = params => {
  return request({
    url: '/WOS-ACTIVITY/noauth/getWosActivityConfDetail',
    method: 'get',
    params
  })
}
