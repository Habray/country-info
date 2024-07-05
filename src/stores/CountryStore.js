import { defineStore } from 'pinia'

export const useCountryStore = defineStore('country', {
  state: () => ({
    isLoading: true,
    cdata: [],
    ndata: []
  }),
  actions: {
    async fetchData(cname) {
      try {
        const res = await fetch(`https://restcountries.com/v3.1/name/${cname}`)
        let data = await res.json()
        if (data && data.length > 0) {
          this.$patch({ cdata: data })
          this.isLoading = false

          const borders = data[0].borders
          if (borders && borders.length > 0) {
            const bordersCountry = borders[0]
            const fetchBordersCountry = await fetch(
              `https://restcountries.com/v3.1/alpha/${bordersCountry}`
            )
            let borderData = await fetchBordersCountry.json()
            this.$patch({ ndata: borderData })
            this.isLoading = false
          } else {
            this.$patch({ ndata: [] })
            this.isLoading = false
          }
        } else {
          this.$patch({ cdata: [], ndata: [] })
          this.isLoading = false
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        this.$patch({ cdata: [], ndata: [] })
        this.isLoading = false
      }
    },
    async searchWithCountry(countryName) {
      await this.fetchData(countryName)
    }
  }
})
