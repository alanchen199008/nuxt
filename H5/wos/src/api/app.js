import request from '@/plugins/axios'
import { exportFormData } from '@/utils'

export function uploadFile(data) {
  return request({
    url: '/WOS-FILESERVER/oss/uploadFile',
    method: 'post',
    data: exportFormData(data),
    inserHeaders: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const getMenus = () => {
  return request({
    url: '/WOS-PREDICTION/noauth/queryHome',
    method: 'get'
  })
}
