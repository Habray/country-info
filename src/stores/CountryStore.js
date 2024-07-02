import { defineStore } from 'pinia'

export const useCountryStore = defineStore('country', {
  state: () => ({
    cname: 'nepal',
    cdata: [],
    ndata: []
  }),
  actions: {
    async fetchData(cname) {
      try {
        const res = await fetch(`https://restcountries.com/v3.1/name/${cname}?fullText=true`)
        let data = await res.json()
        if (data && data.length > 0) {
          this.$patch({ cdata: data })

          const borders = data[0].borders
          if (borders && borders.length > 0) {
            const bordersCountry = borders[0]
            const fetchBordersCountry = await fetch(
              `https://restcountries.com/v3.1/alpha/${bordersCountry}`
            )
            let borderData = await fetchBordersCountry.json()
            this.$patch({ ndata: borderData })
          } else {
            this.$patch({ ndata: [] })
          }
        } else {
          this.$patch({ cdata: [], ndata: [] })
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        this.$patch({ cdata: [], ndata: [] })
      }
    },
    async searchWithCountry(countryName) {
      await this.fetchData(countryName)
    }
  }
})
