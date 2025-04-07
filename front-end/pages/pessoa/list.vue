<script setup lang="ts">
import { ref, onMounted } from 'vue'
definePageMeta({
  middleware: 'auth',
});
interface Pessoa {
  idPessoa: string
  nome: string;
  cpfCnpj: string;
  telefone: string;
  email: string;
  dataNascimento: Date;
  createdAt: string
}

const pessoas = ref<Pessoa[]>([])
const pessoaAtual = ref<Pessoa | null>(null)
const isEditando = ref(false)
const erroMensagem = ref('')
const showErroSnackbar = ref(false)

const showModalCadastro = ref(false)
const showModalEdicao = ref(false)
const showModalExcluir = ref(false)

const token = ref<string | null>(null)


const mostrarErro = (mensagem: string) => {
  erroMensagem.value = mensagem
  showErroSnackbar.value = true
}

const formatarData = (iso: string) => {
  const data = new Date(iso)
  return data.toLocaleDateString('pt-BR')
}

const buscarPessoas = async () => {
  try {
    const data = await $fetch<{ pessoas: Pessoa[] }>('/api/pessoa/get-all', {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })
    pessoas.value = data.pessoas
  } catch (error) {
    console.error('Erro ao buscar pessoas:', error)
  }
}

onMounted(async () => {
  token.value = localStorage.getItem('auth_token')
  await buscarPessoas()
})

const abrirModalCadastro = () => {
  pessoaAtual.value = {
    idPessoa: "",
    nome: "",
    cpfCnpj: "",
    telefone: "",
    email: "",
    dataNascimento: new Date(),
    createdAt: "",
  }
  isEditando.value = false
  showModalCadastro.value = true
}


const abrirModalExcluir = (pessoa: Pessoa) => {
  pessoaAtual.value = { ...pessoa }
  showModalExcluir.value = true
}
const router = useRouter()
const irParaEdicao = (idPessoa: string) => {
  router.push(`/pessoa/${idPessoa}/editar`)
}
const salvarPessoa = async () => {
  if (!pessoaAtual.value) return

  try {
    await $fetch('/api/pessoa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.value}`,
        },
        body: JSON.stringify(pessoaAtual.value),
      })

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
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })
    showModalExcluir.value = false
    await buscarPessoas()
  } catch (error: any) {
    const err = error as { data?: { message?: string } }
    const mensagem = err.data?.message || 'Erro ao excluir pessoa.'
    mostrarErro(mensagem)
  }
}

const headers = [
  { title: "Nome", key: 'nome' },
  { title: "Email", key: 'email' },
  { title: "Data de Nascimento", key: 'dataNascimento' },
  { title: 'Ações', key: 'actions', sortable: false },

]
</script>

<template>
  <v-container class="py-8">
    <v-snackbar v-model="showErroSnackbar" :timeout="5000" color="error" top right>
      {{ erroMensagem }}
    </v-snackbar>

    <v-card class="mx-auto pa-6 rounded-xl shadow-lg" elevation="3" max-width="1200px">
      <v-card-title class="text-h5 font-weight-bold d-flex justify-space-between">
        <span>👥 Gerenciamento de Pessoas</span>
        <v-btn color="primary" prepend-icon="mdi-plus" rounded="lg" @click="abrirModalCadastro">
          Nova Pessoa
        </v-btn>
      </v-card-title>

      <v-data-table :items="pessoas" :headers="headers" class="mt-4 rounded-xl">
        <template #[`item.nome`]="{ item }">
          <span class="text-primary font-weight-medium cursor-pointer" @click="irParaEdicao(item.idPessoa)">
            {{ item.nome }}
          </span>
        </template>

        <template #[`item.dataNascimento`]="{ item }">
          {{ formatarData(String(item.dataNascimento)) }}
        </template>

        <template #[`item.actions`]="{ item }">
          <v-btn icon color="error" @click="abrirModalExcluir(item)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="showModalCadastro" max-width="600px">
      <v-card class="pa-4 rounded-xl">
        <v-card-title class="text-h6 font-weight-bold">Cadastrar Pessoa</v-card-title>
        <v-card-text>
          <v-row dense>
            <v-col cols="12" md="6">
              <v-text-field v-model="pessoaAtual!.nome" label="Nome" required />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="pessoaAtual!.cpfCnpj" label="CPF/CNPJ" required />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="pessoaAtual!.telefone" label="Telefone" required />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="pessoaAtual!.email" label="Email" required />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="pessoaAtual!.dataNascimento" label="Data de Nascimento" type="date" required />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="d-flex justify-end">
          <v-btn variant="text" color="grey" @click="showModalCadastro = false">Cancelar</v-btn>
          <v-btn color="primary" @click="salvarPessoa">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="showModalExcluir" max-width="400px">
      <v-card class="pa-4 rounded-xl">
        <v-card-title class="text-h6 font-weight-bold">Confirmar Exclusão</v-card-title>
        <v-card-text>Tem certeza que deseja excluir <strong>{{ pessoaAtual?.nome }}</strong>?</v-card-text>
        <v-card-actions class="d-flex justify-end">
          <v-btn variant="text" color="grey" @click="showModalExcluir = false">Cancelar</v-btn>
          <v-btn color="red" @click="excluirPessoa">Excluir</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>