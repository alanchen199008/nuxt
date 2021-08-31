import request from '@/plugins/axios'

// 充值

export function getPaymentWay(vipLevel) { // 充值支付方式接口
  return request({
    url: '/WOS-PAYMENT/getPaymentWay',
    method: 'get',
    params: { vipLevel }
  })
}

export function savePayOrder(data) { // 线下充值接口
  return request({
    url: '/WOS-PAYMENT/savePayOrder',
    method: 'post',
    data
  })
}

export function getArticles(data) {
  return request({
    url: '/WOS-PREDICTION/expert/pageArticles',
    method: 'post',
    data: data
  })
}

// 球币明细
export function pageAccountChange(data) {
  return request({
    url: '/WOS-ACCOUNT/pageAccountChange',
    method: 'post',
    data
  })
}

export function pageExpertIncomeChange(data) {
  return request({
    url: '/WOS-ACCOUNT/pageExpertIncomeChange',
    method: 'post',
    data
  })
}

export function getAnnouncementList(params) {
  return request({
    url: '/WOS-NOTICE/noauth/wosannouncement/pageList',
    method: 'get',
    params
  })
}

export function getAnnouncementDetail(params) {
  return request({
    url: '/WOS-NOTICE/wosannouncement/detail'
  })
}

export function getMessages(params) {
  return request({
    url: '/WOS-NOTICE/wosstationletter/list',
    method: 'get',
    params
  })
}

export function getMessagesDetail(params) {
  return request({
    url: '/WOS-NOTICE/wosstationletter/detail',
    method: 'get',
    params
  })
}

export function getActivityList(params) {
  return request({
    url: '/WOS-NOTICE/wosad/jump/activity/list',
    method: 'get',
    params
  })
}

export function getFansList(data) {
  return request({
    url: '/WOS-PREDICTION/expert/fansList',
    method: 'post',
    data: data
  })
}

export function doCancelRecommend(params) {
  return request({
    url: '/WOS-PREDICTION/member/editeExpertArticle',
    method: 'get',
    params
  })
}

