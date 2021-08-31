import request from '@/plugins/axios'

export const getPaymentWay = params => {
  return request({
    url: '/WOS-PAYMENT/getPaymentWay',
    method: 'get',
    params
  })
}

export const getAmountList = data => {
  return request({
    url: '/WOS-PREDICTION/member/rechargeFix',
    method: 'post',
    data: data
  })
}

export const postPayment = data => {
  return request({
    url: '/WOS-PAYMENT/unify/online/pay',
    method: 'post',
    data: data
  })
}
