<script setup lang="ts">
import { ref, onMounted } from 'vue'
import PeopleChart from '@/components/PeopleChart.vue'


definePageMeta({
  middleware: 'auth',
})

const pessoas = ref<{ faixa: string; total: number }[]>([])
const contas = ref<{ mes: string; total: number }[]>([])
const rendas = ref<{ mes: string; totalRenda: number }[]>([])

const faixaLabels = ref<string[]>([])
const faixaData = ref<number[]>([])

const mesLabels = ref<string[]>([])
const mesData = ref<number[]>([])

const rendaLabels = ref<string[]>([])
const rendaData = ref<number[]>([])

const token = ref<string | null>(null)

onMounted(async () => {
  token.value = localStorage.getItem('auth_token')
  if (token.value) {
    await Promise.all([
      buscarPessoasPorIdade(),
      buscarContasPorMes(),
      buscarRendaPorMes(),
    ])
  } else {
    console.warn('Token não encontrado.')
  }
})

const buscarPessoasPorIdade = async () => {
  try {
    const data = await $fetch<{ faixa: string; total: number }[]>(
      'http://localhost:3333/graficos/pessoas/por-idade',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      }
    )
    pessoas.value = data
    faixaLabels.value = data.map((p) => p.faixa)
    faixaData.value = data.map((p) => p.total)
  } catch (error) {
    console.error('Erro ao buscar pessoas:', error)
  }
}

const buscarContasPorMes = async () => {
  try {
    const data = await $fetch<{ mes: string; total: number }[]>(
      'http://localhost:3333/graficos/contas/por-mes',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      }
    )
    contas.value = data
    mesLabels.value = data.map((item) => {
      const [ano, mes] = item.mes.split('-')
      const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
      return `${meses[parseInt(mes) - 1]}/${ano}`
    })
    mesData.value = data.map((item) => item.total)
  } catch (error) {
    console.error('Erro ao buscar contas por mês:', error)
  }
}

const buscarRendaPorMes = async () => {
  try {
    const data = await $fetch<{ mes: string; totalRenda: number }[]>(
      'http://localhost:3333/graficos/contas/renda-total-por-mes',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      }
    )
    rendas.value = data
    rendaLabels.value = data.map((item) => {
      const [ano, mes] = item.mes.split('-')
      const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
      return `${meses[parseInt(mes) - 1]}/${ano}`
    })
    rendaData.value = data.map((item) => item.totalRenda)
  } catch (error) {
    console.error('Erro ao buscar renda por mês:', error)
  }
}
</script>

<template>
  <v-container class="py-10">
    <v-card class="pa-4 mx-auto mb-10" elevation="4" max-width="700">
      <h2 class="text-center text-xl font-semibold mb-4">Distribuição por Faixa Etária</h2>
      <PeopleChart :labels="faixaLabels" :data="faixaData" />
    </v-card>

    <v-card class="pa-4 mx-auto mb-10" elevation="4" max-width="700">
      <h2 class="text-center text-xl font-semibold mb-4">Contas Criadas por Mês</h2>
      <MonthlyChart :labels="mesLabels" :data="mesData" />
    </v-card>

    <v-card class="pa-4 mx-auto" elevation="4" max-width="700">
      <h2 class="text-center text-xl font-semibold mb-4">Total de Renda por Mês</h2>
      <IncomeChart :labels="rendaLabels" :data="rendaData" />
    </v-card>
  </v-container>
</template>

