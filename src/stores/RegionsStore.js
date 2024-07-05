import { defineStore } from 'pinia'

export const useRegionsStore = defineStore('regions', {
  state: () => ({
    isLoading: true,
    regionsData: {}
  }),

  actions: {
    async fetchRegion(regionName) {
      try {
        const res = await fetch(`https://restcountries.com/v3.1/region/${regionName}`)
        let data = await res.json()
        if (data && data.length > 0) {
          this.isLoading = false
          this.$patch((state) => {
            state.regionsData[regionName] = data
          })
        } else {
          this.$patch((state) => {
            state.regionsData[regionName] = []
          })
        }
      } catch (error) {
        console.log('Error Fetching Data: ', error)
        this.$patch((state) => {
          state.regionsData[regionName] = []
        })
        this.isLoading = false
      }
    },

    async fetchRegions(regionNames) {
      this.isLoading = true
      const promises = regionNames.map((regionName) => this.fetchRegion(regionName))
      await Promise.all(promises)
      this.isLoading = false
    }
  }
})
