/* eslint-disable */
// 时间格式化
Date.prototype.format = function(date) {
  const o = {
    'M+': this.getMonth() + 1, // 月份
    'd+': this.getDate(), // 日
    'h+': this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, // 小时
    'H+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    S: this.getMilliseconds() // 毫秒
  }
  const week = {
    '0': '/u65e5',
    '1': '/u4e00',
    '2': '/u4e8c',
    '3': '/u4e09',
    '4': '/u56db',
    '5': '/u4e94',
    '6': '/u516d'
  }
  if (/(y+)/.test(date)) {
    date = date.replace(
      RegExp.$1,
      (this.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  if (/(E+)/.test(date)) {
    date = date.replace(
      RegExp.$1,
      (RegExp.$1.length > 1
        ? RegExp.$1.length > 2
          ? '/u661f/u671f'
          : '/u5468'
        : '') + week[this.getDay() + '']
    )
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(date)) {
      date = date.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
    }
  }
  return date
}

// Date.prototype.getTargetDate = function(number) {
//   const date = new Date()
//   const timeStamp = date.getTime() + 1000 * 60 * 60 * 24 * number
//   date.setTime(timeStamp)
//   const YYYY = date.getFullYear().toString()
//   const mm = date.getMonth() + 1
//   const dd = date.getDate()
//   const MM = mm > 9 ? mm.toString() : '0' + mm.toString()
//   const DD = dd > 9 ? dd.toString() : '0' + dd.toString()
//   return YYYY + '-' + MM + '-' + DD
// }
