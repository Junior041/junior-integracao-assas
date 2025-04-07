<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

defineProps<{
  labels: string[]
  data: number[]
}>()
</script>

<template>
  <Bar
    :data="{
      labels,
      datasets: [
        {
          label: 'Renda total (R$)',
          backgroundColor: '#4ade80',
          borderRadius: 8,
          data,
        },
      ],
    }"
    :options="{
      responsive: true,
      plugins: {
        legend: {
          display: true,
        },
        title: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: (value) => `R$ ${value}`,
          },
        },
      },
    }"
  />
</template>
