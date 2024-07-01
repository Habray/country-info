<script setup>
import { onMounted, ref } from 'vue'
import { useCountryStore } from '@/stores/CountryStore'

const country = useCountryStore()
let countryData = ref(country.cdata)
let flag_src = ref(country.flag)
onMounted(() => {
  country.fetchData().then(() => {
    countryData.value = country.cdata
    flag_src.value = country.flag
  })
})
</script>

<template>
  <main>
    <div class="search-container">
      <!-- <form action="" method="get">
        <input type="text" name="" id="" />
        <button type="submit">Search</button>
      </form> -->
    </div>
    <div class="content-container">
      <div class="card">
        <img :src="flag_src" alt="" />
        <!-- {{ countryData }} -->
      </div>
    </div>
  </main>
</template>
