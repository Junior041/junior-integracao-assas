<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const props = defineProps<{
  labels: string[],
  data: number[]
}>()

const chartData = {
  labels: props.labels,
  datasets: [
    {
      label: 'Quantidade de Pessoas',
      backgroundColor: '#3b82f6',
      data: props.data
    }
  ]
}

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Distribuição de Pessoas'
    }
  }
}
</script>

<template>
  <Bar :data="chartData" :options="chartOptions" />
</template>
