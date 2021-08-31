import request from '@/plugins/axios'

export const getMemberAttentionList = data => {
  return request({
    url: '/WOS-PREDICTION/member/pageAttentionExpert',
    method: 'post',
    data: data
  })
}

export const getMemberAttentionRecommendList = data => {
  return request({
    url: '/WOS-PREDICTION/member/pageExpertRecommendArticle',
    method: 'post',
    data
  })
}

export const getExpertList = data => {
  return request({
    url: '/WOS-PREDICTION/noauth/pageExpert',
    method: 'post',
    data
  })
}

export const getExpertRankList = data => {
  return request({
    url: '/WOS-PREDICTION/noauth/pageRankExpert',
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

export const doExpertAttention = data => {
  return request({
    url: '/WOS-PREDICTION/member/doExpertAttention',
    method: 'post',
    data
  })
}

export const getExpertDetail = data => {
  return request({
    url: '/WOS-PREDICTION/noauth/member/getExpertDetail',
    method: 'post',
    data: data
  })
}
export const getExpertArticleDetail = data => {
  return request({
    url: '/WOS-PREDICTION/noauth/member/getExpertArticleDetailById',
    method: 'post',
    data: data
  })
}

export const getAttentionExpertRecommendArticle = data => {
  return request({
    url: '/WOS-PREDICTION/member/pageExpertRecommendArticle',
    method: 'post',
    data: data
  })
}

export const getMemberRecommendList = data => {
  return request({
    url: '/WOS-PREDICTION/noauth/member/pageExpertArticleById',
    method: 'post',
    data: data
  })
}
export const getLiveCompetitonList = params => {
  return request({
    url: '/WOS-DATA-CENTER/noauth/prediction/competition/recommend/list',
    method: 'get',
    params
  })
}
export const getCompetitonList = data => {
  return request({
    url: '/WOS-DATA-CENTER/noauth/prediction/competition/config/list',
    method: 'POST',
    data: data
  })
}

export const getExpertIsSend = () => {
  return request({
    url: '/WOS-PREDICTION/expert/doExpertIsSend',
    method: 'post'
  })
}

export const doSaveExpertArticle = data => {
  return request({
    url: '/WOS-PREDICTION/expert/doSaveExpertArticle',
    method: 'post',
    data
  })
}

export const setExpertGreatGame = data => {
  return request({
    url: '/WOS-PREDICTION/expert/doExpertGreatGames',
    method: 'post',
    data
  })
}

export const getMatchAttr = data => {
  return request({
    url: '/WOS-PREDICTION/expert/footBallAttr',
    method: 'post',
    data
  })
}

export const getCompetitonMatchList = data => {
  return request({
    url: '/WOS-PREDICTION/expert/getCompetitonMatchList',
    method: 'post',
    data
  })
}

export const getMatchRuleList = data => {
  return request({
    url: '/WOS-PREDICTION/expert/getBallRuleList',
    method: 'post',
    data
  })
}

export const buyArticle = data => {
  return request({
    url: '/WOS-PREDICTION/member/buyArticle',
    method: 'post',
    data
  })
}

export const getMatchIdArticle = data => {
  return request({
    url: '/WOS-PREDICTION/noauth/expert/matchIdArticle',
    method: 'post',
    data
  })
}

export const doExpertRemind = data => {
  return request({
    url: '/WOS-PREDICTION/member/doExpertRemind',
    method: 'post',
    data: data
  })
}
