<script setup>
const props = defineProps({
  className: {
    type: String,
    default: ''
  },
  cflag: String,
  cName: String,
  cCapital: String,
  cArea: Number,
  cPopulation: Number
})
</script>

<template>
  <div class="card" :class="className">
    <h4>Searched Country</h4>
    <img :src="cflag" />
    <div class="details">
      <h1>{{ cName }}</h1>
      <p>Capital: {{ cCapital }}</p>
      <p>Area: {{ cArea }}</p>
      <p>Population: {{ cPopulation }}</p>
    </div>
  </div>
</template>

<style scoped>
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
.details {
  text-align: left;
}
.details h1 {
  font-size: 2.2rem;
  margin: 0 0 1rem;
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
.neighbour h1 {
  font-size: 1.8rem;
  margin: 0 0 1rem;
}
</style>
