<template>
  <div>
    <lineChart />
    <barChart />
    <pieChart />
    <van-back-top right="15vw" bottom="10vh" />
  </div>
</template>

<script setup lang="ts">
import lineChart from './lineChart.vue'
import barChart from './barChart.vue'
import pieChart from './pieChart.vue'
</script>

<style scoped></style>
