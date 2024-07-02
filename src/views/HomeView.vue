<script setup>
import { onMounted, ref, watch } from 'vue'
import { useCountryStore } from '@/stores/CountryStore'

const country = useCountryStore()
const countryData = ref(country.cdata)
const borderData = ref(country.ndata)
const flag_src = ref('')
const countryName = ref('')
const countryCapital = ref('')
const countryArea = ref('')
const countryPopulation = ref('')

const n_flag_src = ref('')
const n_countryName = ref('')
const n_countryCapital = ref('')
const n_countryArea = ref('')
const n_countryPopulation = ref('')

const searchText = ref('')

onMounted(async () => {
  await country.fetchData(country.cname)
  updateCountryData()

  if (borderData.value.length > 0) {
    updateBorderData()
  }
})

watch(
  () => country.cdata,
  () => {
    updateCountryData()
  }
)

watch(
  () => country.ndata,
  () => {
    updateBorderData()
  }
)

function updateCountryData() {
  countryData.value = country.cdata
  if (countryData.value.length > 0) {
    flag_src.value = countryData.value[0].flags.png
    countryName.value = countryData.value[0].name.common
    countryCapital.value = countryData.value[0].capital[0]
    countryArea.value = countryData.value[0].area
    countryPopulation.value = countryData.value[0].population
  }
}

function updateBorderData() {
  borderData.value = country.ndata
  if (borderData.value.length > 0) {
    n_flag_src.value = borderData.value[0].flags.png
    n_countryName.value = borderData.value[0].name.common
    n_countryCapital.value = borderData.value[0].capital[0]
    n_countryArea.value = borderData.value[0].area
    n_countryPopulation.value = borderData.value[0].population
  }
}

async function searchCountry() {
  await country.searchWithCountry(searchText.value)
  updateCountryData()
  if (country.cdata.length > 0 && country.cdata[0].borders.length > 0) {
    await country.fetchData(country.cdata[0].borders[0])
    updateBorderData()
  }
}
</script>

<template>
  <main class="main-container">
    <div class="search-container">
      <form @submit.prevent="searchCountry" method="get">
        <input type="text" v-model="searchText" />
        <button type="submit">Search</button>
      </form>
    </div>
    <div class="content-container">
      <div class="card" v-if="flag_src">
        <h4>Searched Country</h4>
        <img :src="flag_src" alt="Country Flag" />
        <div class="details">
          <h1>{{ countryName }}</h1>
          <p>Capital: {{ countryCapital }}</p>
          <p>Area: {{ countryArea }}</p>
          <p>Population: {{ countryPopulation }}</p>
        </div>
      </div>

      <div class="card neighbour" v-if="n_flag_src">
        <h4>Neighbour Country</h4>
        <img :src="n_flag_src" alt="Border Country Flag" />
        <div class="details">
          <h1>{{ n_countryName }}</h1>
          <p>Capital: {{ n_countryCapital }}</p>
          <p>Area: {{ n_countryArea }}</p>
          <p>Population: {{ n_countryPopulation }}</p>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.main-container {
  text-align: center;
}
.content-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
}
.card {
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 5px 5px 20px 0 rgba(0, 0, 0, 0.2);
  transition: transform 200ms ease-in-out;
  height: fit-content;
}
.card:hover {
  transform: translateY(-1rem);
}
.card h4 {
  font-size: 2rem;
  margin: 0 0 1rem;
}
.card img {
  height: auto;
  width: 100%;
  max-width: 15rem;
}
.neighbour img {
  height: auto;
  width: 100%;
  max-width: 10rem;
}
.neighbour h4 {
  font-size: 1.5rem;
  margin: 0 0 1rem;
}
.details {
  text-align: left;
}
.details h1 {
  font-size: 2.2rem;
  margin: 0 0 1rem;
}
.neighbour h1 {
  font-size: 1.8rem;
  margin: 0 0 1rem;
}
</style>
