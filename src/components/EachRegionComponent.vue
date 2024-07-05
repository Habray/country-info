<script setup>
const props = defineProps({
  regionData: Array
})
</script>

<template>
  <div class="each-region-container">
    <div v-for="eachRegion in regionData" class="each-region">
      <div class="flags-container">
        <img :src="eachRegion.flags.png" />
      </div>
      <div class="detail-container">
        <h4>{{ eachRegion.name.common }}</h4>
        <p>{{ eachRegion.capital ? eachRegion.capital[0] : '' }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.each-region-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2rem;
}
.each-region {
  display: flex;
  gap: 1rem;
  padding: 1rem 2rem;
  box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.2);
  transition: transform 200ms ease-in-out;
}
.each-region:hover {
  transform: translateY(-1rem);
}
.flags-container img {
  height: 3.5rem;
  width: 6rem;
}
.detail-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.detail-container h4 {
  margin: 0;
}
.detail-container p {
  margin: 0.5rem 0 0;
}
</style>
