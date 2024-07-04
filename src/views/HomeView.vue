<script setup>
import { computed, onMounted, watch, ref } from 'vue'
import { useCountryStore } from '@/stores/CountryStore'
import { useRouter } from 'vue-router'
import SearchFormComponent from '@/components/SearchFormComponent.vue'
import CountryCardComponent from '@/components/CountryCardComponent.vue'

const router = useRouter()
const country = useCountryStore()
let countryStatus = ref(false)
let borderStatus = ref(false)
onMounted(() => {
  country.fetchData('nepal')
})

const countryData = computed(() => country.cdata)
const borderData = computed(() => country.ndata)

const flag_src = computed(() =>
  countryData.value.length > 0 ? countryData.value[0].flags.png : ''
)
const countryName = computed(() =>
  countryData.value.length > 0 ? countryData.value[0].name.common : ''
)
const countryCapital = computed(() =>
  countryData.value.length > 0 ? countryData.value[0].capital[0] : ''
)
const countryArea = computed(() => (countryData.value.length > 0 ? countryData.value[0].area : 0))
const countryPopulation = computed(() =>
  countryData.value.length > 0 ? countryData.value[0].population : 0
)

const n_flag_src = computed(() =>
  borderData.value.length > 0 ? borderData.value[0].flags.png : ''
)
const n_countryName = computed(() =>
  borderData.value.length > 0 ? borderData.value[0].name.common : ''
)
const n_countryCapital = computed(() =>
  borderData.value.length > 0 ? borderData.value[0].capital[0] : ''
)
const n_countryArea = computed(() => (borderData.value.length > 0 ? borderData.value[0].area : 0))
const n_countryPopulation = computed(() =>
  borderData.value.length > 0 ? borderData.value[0].population : 0
)

async function searchCountry(searchText) {
  await country.searchWithCountry(searchText)
}

function navigateToDetail(CType) {
  router.push({ name: 'CountryDetail', params: { CType } })
}

watch(countryData, () => {
  if (countryName.value) {
    countryStatus.value = true
  } else {
    countryStatus.value = false
  }
})

watch(borderData, () => {
  if (n_countryName.value) {
    borderStatus.value = true
  } else {
    borderStatus.value = false
  }
})
</script>

<template>
  <main class="main-container">
    <SearchFormComponent @search="searchCountry" />
    <div class="content-container">
      <CountryCardComponent
        v-if="countryStatus"
        :cflag="flag_src"
        :cName="countryName"
        :cCapital="countryCapital"
        :cArea="countryArea"
        :cPopulation="countryPopulation"
        @click="navigateToDetail('main')"
      />
      <CountryCardComponent
        v-if="borderStatus"
        :className="'neighbour'"
        :cflag="n_flag_src"
        :cName="n_countryName"
        :cCapital="n_countryCapital"
        :cArea="n_countryArea"
        :cPopulation="n_countryPopulation"
        @click="navigateToDetail('border')"
      />
      <p v-if="!countryStatus && !borderStatus">No Result Found.</p>
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
</style>
