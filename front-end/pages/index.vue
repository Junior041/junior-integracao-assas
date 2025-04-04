<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import PeopleChart from '@/components/PeopleChart.vue'
definePageMeta({
  middleware: 'auth',
});
const pessoas = ref<any[]>([])
const labels = ref<string[]>([])
const chartData = ref<number[]>([])

onMounted(async () => {
  const res = await axios.get('http://localhost:3333/pessoa/get-all?order=asc')
  pessoas.value = res.data.pessoas
  
  const agrupado: Record<string, number> = {}
  pessoas.value.forEach(p => {
    const dia = new Date(p.createdAt).toLocaleDateString()
    agrupado[dia] = (agrupado[dia] || 0) + 1
  })

  labels.value = Object.keys(agrupado)
  chartData.value = Object.values(agrupado)
})
</script>

<template>
  <v-container class="flex flex-wrap justify-evenly ">
    <v-card class="pa-4" elevation="2">
      <PeopleChart :labels="labels" :data="chartData" />
    </v-card>
    <v-card class="pa-4" elevation="2">
      <PeopleChart :labels="labels" :data="chartData" />
    </v-card>
  </v-container>
</template>
