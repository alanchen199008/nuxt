import { sha256 } from 'js-sha256'

export function GenerateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0; var v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

export function GenerateSign(TenantCode, date) {
  let sign
  var hash = sha256.create()
  hash.update(TenantCode + ',' + date)
  sign = hash.hex()
  return sign
}

