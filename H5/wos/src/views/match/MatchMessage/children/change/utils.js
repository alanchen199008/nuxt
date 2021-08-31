export const columns = {
  'eu': {
    label: '胜平负指数变化',
    columns: [
      { title: '公司', prop: 'companyName' },
      { title: '主胜', prop: 'homeWin' },
      { title: '平局', prop: 'draw' },
      { title: '客胜', prop: 'awayWin' },
      { title: '变盘时间', prop: 'changeTime' }
    ]
  },
  'asia': {
    label: '让球指数变化',
    columns: [
      { title: '公司', prop: 'companyName' },
      { title: '主队', prop: 'homeWin' },
      { title: '盘口', prop: 'draw' },
      { title: '客队', prop: 'awayWin' },
      { title: '变盘时间', prop: 'changeTime' }
    ]
  },
  'bs': {
    label: '大小指数变化',
    columns: [
      { title: '公司', prop: 'companyName' },
      { title: '大球', prop: 'homeWin' },
      { title: '盘口', prop: 'draw' },
      { title: '小球', prop: 'awayWin' },
      { title: '变盘时间', prop: 'changeTime' }
    ]
  }
}

const changeType = {
  homeWin: {
    number: '',
    color: ''
  },
  draw: {
    number: '',
    color: ''
  },
  awayWin: {
    number: '',
    color: ''
  }
}

const getDiffColor = (c, n) => c > n ? 'color-red-regular' : c < n ? 'color-green-regular' : ''

export function getChangeTypeWithItems(items) {
  let array = items.reverse()
  return array.map((item, i) => {
    let tmp = { ...item }
    let next = null
    if (i < items.length - 1) {
      next = items[i + 1]
      for (const key in changeType) {
        tmp[key] = {
          number: tmp[key],
          color: getDiffColor(parseFloat(tmp[key]), parseFloat(next[key]))
        }
      }
    } else {
      for (const key in changeType) {
        tmp[key] = {
          number: tmp[key],
          color: ''
        }
      }
    }
    return tmp
  })
}
