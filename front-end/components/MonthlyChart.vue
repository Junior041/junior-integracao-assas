<script setup lang="ts">
import { Chart, registerables } from 'chart.js'
import { Line } from 'vue-chartjs'
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
      display: true,
      text: 'Total por Mês',
      font: {
        size: 18,
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 1,
      },
    },
  },
}
</script>

<template>
  <Line
    :options="chartOptions"
    :data="{
      labels,
      datasets: [
        {
          label: 'Total',
          borderColor: '#4F46E5',
          backgroundColor: '#6366F1',
          data,
          tension: 0.3,
          fill: true,
        },
      ],
    }"
  />
</template>
