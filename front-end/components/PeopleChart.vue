<script setup lang="ts">
import { Chart, registerables } from 'chart.js'
import { Bar } from 'vue-chartjs'
Chart.register(...registerables)

defineProps<{
  labels: string[]
  data: number[]
}>()

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
}
</script>

<template>
  <Bar
    :options="chartOptions"
    :data="{
      labels,
      datasets: [
        {
          label: 'Total de Pessoas',
          backgroundColor: '#3B82F6',
          borderRadius: 6,
          data,
        },
      ],
    }"
  />
</template>
