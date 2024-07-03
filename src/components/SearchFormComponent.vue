<script setup>
import { ref } from 'vue'
const searchText = ref('')

const emit = defineEmits(['search'])

function searchCountry() {
  emit('search', searchText.value)
}
</script>

<template>
  <div class="search-container">
    <form @submit.prevent="searchCountry" method="get">
      <input type="text" v-model="searchText" />
      <button type="submit">Search</button>
    </form>
  </div>
</template>
