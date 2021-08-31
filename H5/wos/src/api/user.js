import request from '@/plugins/axios'
import { GenerateSign } from '@/utils/tools'
import tenants from '@/base/tenants.json'
let TenantCode = window.localStorage.getItem('tenant-code') // 从本地存储取
if (!TenantCode) {
  const domain = window.location.hostname
  const tenant = tenants.data
  tenant.forEach(item => {
    if (domain === item.domain) {
      TenantCode = item.code
      window.localStorage.setItem('tenant-code', item.code)
      return item
    }
  })
}

export function login(data) {
  return request({
    url: '/WOS-MEMBER/noauth/login',
    method: 'post',
    data
  })
}

export function register(data) {
  return request({
    url: '/WOS-MEMBER/noauth/register',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/WOS-MEMBER/exitSys',
    method: 'post'
  })
}

export function getAppMember() {
  return request({
    url: '/WOS-MEMBER/getAppMember',
    method: 'get'
  })
}

export function getSmsCode(data) {
  return request({
    url: '/WOS-MEMBER/noauth/getSmsCaptcha',
    method: 'post',
    data: data
  })
}

export function resetPassword(data) {
  return request({
    url: '/WOS-MEMBER/noauth/resetLoginPwd',
    method: 'post',
    data: data
  })
}

export function bindPhone(data) { // 绑定手机号
  return request({
    url: '/WOS-MEMBER/bindPhone',
    method: 'post',
    data
  })
}

export function updateLoginPwd(data) { // 修改登录密码
  return request({
    url: '/WOS-MEMBER/updateLoginPwd',
    method: 'post',
    data
  })
}

export function getExpertInfo() {
  return request({
    url: '/WOS-PREDICTION/member/expertBasic',
    method: 'post'
  })
}

export function getAccessCode(data) {
  return request({
    url: process.env.VUE_APP_WOS_IM_API + '/v1/app/kfAccess',
    method: 'post',
    headers: {
      sign: GenerateSign(TenantCode, new Date().format('yyyy-MM-dd')),
      time: new Date().format('yyyy-MM-dd')
    },
    data: data
  })
}

export function getPushAccess(data) {
  return request({
    url: process.env.VUE_APP_WOS_IM_API + '/v1/app/pushAccess',
    method: 'post',
    headers: {
      sign: GenerateSign(TenantCode, new Date().format('yyyy-MM-dd')),
      time: new Date().format('yyyy-MM-dd')
    },
    data: data
  })
}

export function getInvitationInfo(params) {
  return request({
    url: '/WOS-MEMBER/noauth/getInvitationInfo',
    method: 'get',
    params
  })
}

export function getInvitationRewardList(data) {
  return request({
    url: '/WOS-MEMBER/noauth/getInvitationRewardList',
    method: 'post',
    data: data
  })
}

export function getWosVersion(params) {
  return request({
    url: 'WOS-OPERATOR/noauth/version/getWosVersion',
    method: 'get',
    params
  })
}

export function getChatRoomAccess(data) {
  return request({
    url: process.env.VUE_APP_WE_IM_API + '/room/makePassToken',
    method: 'post',
    data: data
  })
}

export function updateBaseInfo(data) {
  return request({
    url: '/WOS-MEMBER/updateBaseInfo',
    method: 'post',
    data
  })
}

export function updateintroduction(data) {
  return request({
    url: '/WOS-PREDICTION/expert/introduction',
    method: 'post',
    data
  })
}

export const getMemberDetail = data => {
  return request({
    url: '/WOS-PREDICTION/member/memberDetail',
    method: 'post',
    data
  })
}

export const getNewMessage = params => {
  return request({
    url: '/WOS-NOTICE/wosstationletter/count',
    method: 'get',
    params
  })
}

// 地址配置查询

export function getAddress() {
  return request({
    url: '/WOS-OPERATOR/noauth/wos/queryAddress',
    method: 'get'
  })
}
