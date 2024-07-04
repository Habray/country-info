<script setup>
import { computed } from 'vue'
const props = defineProps({
  data: Array
})

const countryCode = computed(() => {
  return String(getAllDetails(props.data[0].name.nativeName)[0].code)
})
function getAllDetails(data) {
  const detailData = data
  const details = []

  for (const code in detailData) {
    if (detailData.hasOwnProperty(code)) {
      const dataDetails = { code }

      for (const prop in detailData[code]) {
        if (detailData[code].hasOwnProperty(prop)) {
          dataDetails[prop] = detailData[code][prop]
        }
      }

      details.push(dataDetails)
    }
  }

  return details
}
</script>

<template>
  <div class="detail-container">
    <div class="img-container">
      <img :src="data[0].flags.png" class="flag-img" />
      <img :src="data[0].coatOfArms.png" class="coatOfArms-img" />
    </div>
    <div class="content-container">
      <h1>
        {{ data[0].name.common }}
        ( {{ getAllDetails(data[0].name.nativeName)[0].common }} )
      </h1>
      <p>
        <b>Currency:</b> {{ getAllDetails(data[0].currencies)[0].name }} ({{
          getAllDetails(data[0].currencies)[0].symbol
        }})
      </p>
      <p><b>Capital:</b> {{ data[0].capital[0] }}</p>
      <p><b>Region:</b> {{ data[0].region }}</p>
      <p><b>Language:</b> {{ data[0].languages[`${countryCode}`] }}</p>
      <p><b>Area:</b> {{ data[0].area }}</p>
      <p><b>Population:</b> {{ data[0].population }}</p>
      <p>
        <b>Map:</b>
        <a :href="data[0].maps.googleMaps" target="_blank">View on Google Map</a>
      </p>
    </div>
  </div>
</template>

<style scoped>
.detail-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.img-container {
  display: grid;
  grid-template-columns: 2fr 2fr;
  align-items: end;
  gap: 3rem;
}
.flag-img {
  height: auto;
  width: 100%;
  max-width: 20rem;
}
.coatOfArms-img {
  height: auto;
  width: 100%;
  max-width: 10rem;
}
</style>
