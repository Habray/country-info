import { defineStore } from 'pinia'

export let useCountryStore = defineStore('country', {
  state() {
    return {
      cname: 'nepal',
      flag: '',
      cdata: []
    }
  },
  actions: {
    async fetchData() {
      const res = await fetch(`https://restcountries.com/v3.1/name/${this.cname}`)
      let data = await res.json()
      let flag_src = await data[0].flags.png
      this.$patch({
        cdata: data,
        flag: flag_src
      })
    }
  }
})
