import DEmpty from '@/components/Empty'
export default (serviceHandle) => ({
  components: { DEmpty },
  data: () => ({
    items: [],
    loading: false,
    loaderr: false,
    refreshing: false,
    isFetching: false
  }),
  created() {
    this.onRefresh()
  },
  methods: {
    async fetch() {
      this.loaderr = false
      this.loading = true

      const params = { ...this.implementationGetParams() }
      const [data, err, response] = await serviceHandle({ ...params })
      this.loading = false
      if (err) {
        this.loaderr = true
        return
      }
      this.loading = false
      this.refreshing = false
      this.items = data
      this.isFetching = true
      this.implementationFetched(response)
    },
    onRefresh() {
      this.refreshing = true
      this.isFetching = false
      this.fetch()
    },
    implementationGetParams() {
      return {}
    },
    implementationFetched(response) {

    }
  }
})
