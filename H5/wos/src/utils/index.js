/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, ' ') +
      '"}'
  )
}

export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (!time) return null
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000
  if (diff < 3600) {
    return Math.floor(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.floor(diff / 3600) + '小时前'
  } else {
    return Math.floor(diff / 3600 / 24) + '天前'
  }
  // if (option) {
  //   return parseTime(time, option)
  // } else {
  //   return (
  //     d.getMonth() +
  //     1 +
  //     '月' +
  //     d.getDate() +
  //     '日' +
  //     d.getHours() +
  //     '时' +
  //     d.getMinutes() +
  //     '分'
  //   )
  // }
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatDate(time) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000
  if (diff < 3600) {
    return Math.floor(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.floor(diff / 3600) + '小时前'
  } else {
    return Math.floor(diff / 3600 / 24) + '天前'
  }
  // if (option) {
  //   return parseTime(time, option)
  // } else {
  //   return (
  //     d.getMonth() +
  //     1 +
  //     '月' +
  //     d.getDate() +
  //     '日' +
  //     d.getHours() +
  //     '时' +
  //     d.getMinutes() +
  //     '分'
  //   )
  // }
}

export function parseDate(time) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()
  const diff = (now - d) / 1000
  if (diff < 30) {
    return '刚刚'
  } else if (diff > 30 && diff < 60) {
    return diff + '秒以前'
  } else if (diff < 3600) {
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else {
    const date = new Date(time)
    const yyyy = date.getFullYear().toString()
    const mm = date.getMonth() + 1
    const dd = date.getDate()
    const hh = date.getHours()
    const ii = date.getMinutes()
    const ss = date.getSeconds()
    let MM, DD, HH, II, SS
    MM = mm < 9 ? '0' + mm.toString() : mm.toString()
    DD = dd < 9 ? '0' + dd.toString() : dd.toString()
    HH = hh < 9 ? '0' + hh.toString() : hh.toString()
    II = ii < 9 ? '0' + ii.toString() : ii.toString()
    SS = ss < 9 ? '0' + ss.toString() : ss.toString()
    return yyyy + '-' + MM + '-' + DD + ' ' + HH + ':' + II + ':' + SS
  }
}

export function parseDateFormatRecommend(time, cFormat) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()
  const diff = (now - d) / 1000
  if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else {
    return parseTime(time, cFormat)
  }
}

export function parseDateFormatNews(time) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()
  const diff = (now - d) / 1000
  if (diff < 3600) {
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (d.getFullYear() === new Date().getFullYear()) {
    return parseTime(time, '{m}-{d} {h}:{i}')
  } else {
    return parseTime(time, '{y}-{m}-{d} {h}:{i}')
  }
}

export function exportFormData(data) {
  const params = new FormData()
  for (const key in data) {
    if (data[key] !== null) {
      params.append(key, data[key])
    }
  }
  return params
}

export function rateFormat(data, type) {
  let result
  if (data) {
    if (!type) {
      result = Math.round(Number(data) * 100 * 1000) / 1000 + '%'
    } else {
      result = Math.round(Number(data) * 100 * 1000) / 1000
    }
  }
  return result
}

export function getUUID() {
  var s = []
  var hexDigits = '0123456789abcdef'
  for (var i = 0; i < 32; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  return s.join('')
}

export function parsePhone(phone) {
  return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}

export function getUrlKey(name, string) {
  return (
    decodeURIComponent(
      (new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(string) || [, ''])[1].replace(/\+/g, '%20')
    ) || null
  )
}
