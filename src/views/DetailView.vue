<script setup>
import { computed } from 'vue'
import { useCountryStore } from '@/stores/CountryStore'
import { useRoute } from 'vue-router'
import DetailCardComponent from '@/components/DetailCardComponent.vue'

const route = useRoute()
const country = useCountryStore()

const cType = route.params.CType

const countryData = computed(() => country.cdata)
const borderData = computed(() => country.ndata)
</script>

<template>
  <section class="detail-section">
    <DetailCardComponent :data="countryData" v-if="cType === 'main'" />

    <DetailCardComponent :data="borderData" v-else />
  </section>
</template>

<style scoped>
.detail-section {
  display: flex;
  justify-content: center;
}
</style>
