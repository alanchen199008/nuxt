import DEmpty from '@/components/Empty'

export default (serviceHandle) => ({
  components: { DEmpty },
  data: () => ({
    items: [],
    loading: false,
    loaderr: false,
    finished: false,
    refreshing: false,
    isFetching: false,
    params: {
      currentPage: 0,
      pageSize: 10
    }
  }),
  methods: {
    async fetch(refreshType = 0) {
      this.loaderr = false
      this.loading = true

      const params = { ...this.params, ...this.implementationGetParams() }
      const [data, err, res] = await serviceHandle({ ...params })
      this.loading = false
      const items = data || []
      if (err) {
        this.loaderr = true
        this.finished = true
        this.refreshing = false
        return
      }
      if (items.length < params.pageSize) {
        this.finished = true
      }
      this.loading = false
      this.refreshing = false
      this.isFetching = true
      if (refreshType === 0) {
        this.items = items
      } else {
        this.items = this.items.concat(items)
      }
      this.implementationFetched(res.data, refreshType)
    },
    onLoad() {
      if (this.refreshing) {
        this.refreshing = false
        this.items = []
      }
      this.params.currentPage++
      this.fetch(1)
    },
    onRefresh() {
      this.implementationRefresh()
      this.params.currentPage = 1
      this.finished = false
      this.isFetching = false
      this.loading = true
      this.fetch(0)
    },
    implementationGetParams() {
      return {}
    },
    implementationRefresh() {
      //
    },
    implementationFetched(data, refreshType) {

    }
  }
})
