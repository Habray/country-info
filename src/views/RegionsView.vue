<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRegionsStore } from '@/stores/RegionsStore'
import EachRegionComponent from '@/components/EachRegionComponent.vue'

const itemsPerPage = 6

const regions = ['Africa', 'Americas', 'Asia', 'Europe']
const regionsStore = useRegionsStore()
const isLoadingData = computed(() => regionsStore.isLoading)
onMounted(() => {
  regionsStore.fetchRegions(regions)
})

const currentPage = ref(
  regions.reduce((acc, region) => {
    acc[region] = 0
    return acc
  }, {})
)

const regionsData = computed(() => {
  return regions.map((region) => ({
    name: region,
    data: regionsStore.regionsData[region] || []
  }))
})

const paginatedRegionsData = computed(() => {
  return regionsData.value.map((region) => ({
    name: region.name,
    data: region.data.slice(
      currentPage.value[region.name] * itemsPerPage,
      (currentPage.value[region.name] + 1) * itemsPerPage
    )
  }))
})

const nextPage = (region) => {
  currentPage.value[region]++
}

const prevPage = (region) => {
  if (currentPage.value[region] > 0) {
    currentPage.value[region]--
  }
}
</script>

<template>
  <section class="regions-container">
    <div class="region" v-for="region in paginatedRegionsData" :key="region.name">
      <h2>{{ region.name }}</h2>
      <p v-if="isLoadingData">Loading...</p>
      <EachRegionComponent v-else :regionData="region.data" />
      <div class="pagination">
        <button @click="prevPage(region.name)" :disabled="currentPage === 0">Previous</button>
        <button @click="nextPage(region.name)">Next</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.regions-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
}
.region h2,
.region p {
  text-align: center;
}
@media screen and (max-width: 1600px) {
  .regions-container {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}
</style>
