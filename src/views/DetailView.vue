<script setup>
import { computed } from 'vue'
import { useCountryStore } from '@/stores/CountryStore'
import { useRoute } from 'vue-router'

const route = useRoute()
const country = useCountryStore()

const cType = route.params.CType

const countryData = computed(() => country.cdata)
const borderData = computed(() => country.ndata)
</script>

<template>
  <section class="main-container">
    <div v-if="cType === 'main'">
      {{ countryData }}
    </div>
    <div v-else>
      {{ borderData }}
    </div>
  </section>
</template>

<style scoped></style>
