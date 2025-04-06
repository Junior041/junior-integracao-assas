<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Pessoa {
  idPessoa: string
  nome: string
  cpfCnpj: string
  createdAt: string
}

const pessoas = ref<Pessoa[]>([])
const pessoaAtual = ref<Pessoa | null>(null)
const isEditando = ref(false)

const showModalCadastro = ref(false)
const showModalEdicao = ref(false)
const showModalExcluir = ref(false)

const buscarPessoas = async () => {
  try {
    const data = await $fetch<{ pessoas: Pessoa[] }>('/api/pessoa/get-all')
    pessoas.value = data.pessoas
  } catch (error) {
    console.error('Erro ao buscar pessoas:', error)
  }
}

onMounted(buscarPessoas)

const abrirModalCadastro = () => {
  pessoaAtual.value = { idPessoa: '', nome: '', cpfCnpj: '', createdAt: '' }
  isEditando.value = false
  showModalCadastro.value = true
}

const abrirModalEdicao = (pessoa: Pessoa) => {
  pessoaAtual.value = { ...pessoa }
  isEditando.value = true
  showModalEdicao.value = true
}

const abrirModalExcluir = (pessoa: Pessoa) => {
  pessoaAtual.value = { ...pessoa }
  showModalExcluir.value = true
}

const salvarPessoa = async () => {
  if (!pessoaAtual.value) return

  try {
    if (isEditando.value) {
      if (!pessoaAtual.value.idPessoa) {
        console.error('Erro: ID da pessoa está indefinido!')
        return
      }
      await $fetch(`/api/pessoa/${pessoaAtual.value.idPessoa}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pessoaAtual.value),
      })
    } else {
      await $fetch('/api/pessoa/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pessoaAtual.value),
      })
    }
    showModalCadastro.value = false
    showModalEdicao.value = false
    await buscarPessoas()
  } catch (error) {
    console.error('Erro ao salvar pessoa:', error)
  }
}

const excluirPessoa = async () => {
  if (!pessoaAtual.value) return

  try {
    await $fetch(`/api/pessoa/${pessoaAtual.value.idPessoa}`, {
      method: 'DELETE',
    })
    showModalExcluir.value = false
    await buscarPessoas()
  } catch (error) {
    console.error('Erro ao excluir pessoa:', error)
  }
}

const headers = [
  { title: 'Nome', key: 'nome' },
  { title: 'CPF/CNPJ', key: 'cpfCnpj' },
  { title: 'Ações', key: 'actions', sortable: false },
]
</script>

<template>
  <v-container>
    <v-card class="pa-4 mx-auto" elevation="2" max-width="800px">
      <v-card-title>Gerenciamento de Pessoas</v-card-title>
      <v-btn color="primary" class="mb-4" @click="abrirModalCadastro">Cadastrar Nova Pessoa</v-btn>

      <v-data-table :items="pessoas" :headers="headers">
        <template #[`item.actions`]="{ item }">
          <v-btn icon @click="abrirModalEdicao(item)">
            <v-icon color="blue">mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon @click="abrirModalExcluir(item)">
            <v-icon color="red">mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>

    <!-- Modal de Cadastro/Edição -->
    <v-dialog v-model="showModalCadastro" max-width="500px">
      <v-card>
        <v-card-title>{{ isEditando ? 'Editar Pessoa' : 'Cadastrar Pessoa' }}</v-card-title>
        <v-card-text>
          <v-text-field v-model="pessoaAtual!.nome" label="Nome" required />
          <v-text-field v-model="pessoaAtual!.cpfCnpj" label="CPF/CNPJ" required />
        </v-card-text>
        <v-card-actions>
          <v-btn color="grey" @click="showModalCadastro = false">Cancelar</v-btn>
          <v-btn color="green" @click="salvarPessoa">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Modal de Exclusão -->
    <v-dialog v-model="showModalExcluir" max-width="400px">
      <v-card>
        <v-card-title>Confirmar Exclusão</v-card-title>
        <v-card-text>Tem certeza que deseja excluir {{ pessoaAtual?.nome }}?</v-card-text>
        <v-card-actions>
          <v-btn color="grey" @click="showModalExcluir = false">Cancelar</v-btn>
          <v-btn color="red" @click="excluirPessoa">Excluir</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Modal de Edição -->
    <v-dialog v-model="showModalEdicao" max-width="500px">
      <v-card>
        <v-card-title>Editar Pessoa</v-card-title>
        <v-card-text>
          <v-text-field v-model="pessoaAtual!.nome" label="Nome" required />
          <v-text-field v-model="pessoaAtual!.cpfCnpj" label="CPF/CNPJ" required />
        </v-card-text>
        <v-card-actions>
          <v-btn color="grey" @click="showModalEdicao = false">Cancelar</v-btn>
          <v-btn color="green" @click="salvarPessoa">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
