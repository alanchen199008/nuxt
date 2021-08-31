import { getNewsTypeList } from '@/api/home'
export default {
  data() {
    return {
      hot: {
        objectId: '',
        typeName: '热门',
        hotMatch: 1,
        sortby: null,
        tenantCode: 'TYCC',
        createTime: Date.now(),
        position: 0,
        updateTime: Date.now(),
        color: null
      }
    }
  },
  methods: {
    getBaseData() {
      return new Promise((resolve) => {
        getNewsTypeList({ currentPage: 1, pageSize: 50 }).then(([data, err]) => {
          if (!err) {
            data.unshift(this.hot)
            data = data.map((o, i) => ({ ...o, hotMatch: i + 1 }))
            sessionStorage.setItem('news-type-list', JSON.stringify(data))
            resolve(data)
          }
        })
      })
    }
  }
}
