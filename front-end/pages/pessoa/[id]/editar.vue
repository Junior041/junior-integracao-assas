<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

definePageMeta({
  middleware: 'auth',
})

const route = useRoute()
const router = useRouter()
const idPessoa = route.params.id as string
const token = ref<string | null>(null)

interface Pessoa {
  idPessoa: string
  nome: string
  cpfCnpj: string
  telefone: string
  email: string
  dataNascimento: string
  bankAccount?: ContaBancaria[]
  enderecos?: any[]
}

interface ContaBancaria {
  idBankAccount: string,
  idAccount: string,
  bank: string,
  fkPessoa: string,
  incomeValue: number,
  agency: string,
  account: string,
  accountDigit: string,
}

const pessoa = ref<Pessoa | null>(null)
const contaBancaria = ref<ContaBancaria | null>(null)

const erroMensagem = ref('')
const sucessoMensagem = ref('')
const showErroSnackbar = ref(false)
const showSucessoSnackbar = ref(false)
const showModalUsuario = ref(false)
const senhaUsuario = ref('')
const showModalConta = ref(false)

const novaConta = ref({
  bank: '',
  incomeValue: 0
})

const enderecos = ref<any[] | null>(null)
const showModalEndereco = ref(false)

const novoEndereco = ref({
  idEndereco: null,
  cep: '',
  rua: '',
  numero: '',
  complemento: '',
  bairro: '',
  cidade: '',
  estado: '',
  pais: ''
})

onMounted(() => {
  token.value = localStorage.getItem('auth_token')
  buscarPessoa()
})

const mostrarErro = (msg: string) => {
  erroMensagem.value = msg
  showErroSnackbar.value = true
}
const mostrarSucesso = (msg: string) => {
  sucessoMensagem.value = msg
  showSucessoSnackbar.value = true
}

const abrirModalEndereco = (endereco: any = novoEndereco.value) => {
  novoEndereco.value = { ...endereco }
  showModalEndereco.value = true
}

const salvarEndereco = async () => {
  const body = {
    ...novoEndereco.value,
    fkPessoa: idPessoa
  }

  try {
    await $fetch(`/api/endereco`, {
      method: enderecos.value?.length ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.value}`
      },
      body: JSON.stringify(body)
    })
    showModalEndereco.value = false
    await buscarPessoa()
  } catch (_: any) {
    mostrarErro('Erro ao salvar endereço.')
  }
}

const buscarPessoa = async () => {
  try {
    const res = await $fetch(`/api/pessoa/${idPessoa}`, {
      headers: { Authorization: `Bearer ${token.value}` }
    })

    const dados = res.pessoa

    if (dados.dataNascimento) {
      dados.dataNascimento = dados.dataNascimento.split('T')[0]
    }

    pessoa.value = dados
    enderecos.value = dados.enderecos || []
    contaBancaria.value = dados.bankAccount?.[0] || null

  } catch (_: any) {
    mostrarErro('Erro ao carregar dados da pessoa.')
  }
}

const camposObrigatoriosPreenchidos = () => {
  if (!pessoa.value) return false
  const { nome, cpfCnpj, telefone, email, dataNascimento } = pessoa.value
  return nome && cpfCnpj && telefone && email && dataNascimento
}

const salvar = async () => {
  if (!pessoa.value) return

  if (!camposObrigatoriosPreenchidos()) {
    mostrarErro('Preencha todos os campos obrigatórios.')
    return
  }

  try {
    await $fetch(`/api/pessoa/${idPessoa}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.value}`
      },
      body: JSON.stringify(pessoa.value)
    })
    buscarPessoa()
    mostrarSucesso("Salvo com sucesso.")
  } catch (_: any) {
    mostrarErro('Erro ao salvar.')
  }
}

const tornarUsuario = async () => {
  if (!senhaUsuario.value) {
    mostrarErro('Digite uma senha para criar o usuário.')
    return
  }

  try {
    await $fetch(`/api/usuario`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.value}`
      },
      body: JSON.stringify({
        fkPessoa: idPessoa,
        senha: senhaUsuario.value,
        ativo: true
      })
    })
    showModalUsuario.value = false
    senhaUsuario.value = ''
    mostrarSucesso('Usuário criado com sucesso.')
  } catch (_: any) {
    mostrarErro('Erro ao tornar pessoa um usuário.')
  }
}

const abrirModalConta = () => {
  novaConta.value.bank = 'ASSAS'
  novaConta.value.incomeValue = 0
  showModalConta.value = true
}

const criarConta = async () => {
  if (!novaConta.value.bank || !novaConta.value.incomeValue) {
    mostrarErro('Preencha os dados da conta.')
    return
  }

  try {
    await $fetch('http://localhost:3333/bank-acocunt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.value}`
      },
      body: {
        bank: novaConta.value.bank,
        incomeValue: novaConta.value.incomeValue,
        fkPessoa: idPessoa,
      }
    })

    showModalConta.value = false
    novaConta.value = { bank: '', incomeValue: 0 }
    buscarPessoa()
    mostrarSucesso('Conta bancária criada com sucesso.')
  } catch (error: any) {
    let msgErro = 'Erro ao criar conta bancária.'

    if (error?.data?.message) {
      msgErro = error.data.message
    } else if (error?.data?.errors?.length) {
      msgErro = error.data.errors.map((e: any) => e.description).join('; ')
    }

    mostrarErro(msgErro)
  }
}

const buscarPorCep = async () => {
  const cepLimpo = novoEndereco.value.cep.replace(/\D/g, '')
  if (cepLimpo.length !== 8) return

  try {
    const res = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`)
    const data = await res.json()

    if (data.erro) {
      mostrarErro('CEP não encontrado.')
      return
    }

    novoEndereco.value.rua = data.logradouro || ''
    novoEndereco.value.bairro = data.bairro || ''
    novoEndereco.value.cidade = data.localidade || ''
    novoEndereco.value.estado = data.uf || ''
  } catch (err) {
    mostrarErro('Erro ao buscar CEP.')
  }
}

const rendaFormatada = computed({
  get() {
    if (!novaConta.value.incomeValue) return ''
    return novaConta.value.incomeValue.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
  },
  set(valor: string) {
    const somenteNumeros = valor.replace(/\D/g, '')
    novaConta.value.incomeValue = Number(somenteNumeros) / 100
  }
})
</script>

<template>
  <v-container class="py-6">
    <!-- Snackbar de erro -->
    <v-snackbar v-model="showErroSnackbar" :timeout="5000" color="red" top right>
      {{ erroMensagem }}
    </v-snackbar>
    <v-snackbar v-model="showSucessoSnackbar" :timeout="5000" color="green" top right>
      {{ sucessoMensagem }}
    </v-snackbar>

    <!-- Seção Conta Bancária -->
    <v-card class="mx-auto pa-6 mt-8" max-width="700" elevation="3">
      <v-card-title class="text-h6 font-weight-bold d-flex align-center">
        <v-icon class="mr-2">mdi-bank</v-icon> Conta Bancária
      </v-card-title>
      <v-divider class="my-4" />
      <v-card-text v-if="contaBancaria">
        <p><strong>Banco: </strong>{{ contaBancaria.bank }}</p>
        <p><strong>Renda Mensal: </strong>{{ new Intl.NumberFormat("pt-BR", {
          style: "currency", currency: "BRL"
        }).format(
          contaBancaria.incomeValue,
          ) }}</p>
        <p><strong>Identificador: </strong>{{ contaBancaria.idAccount }}</p>
        <p><strong>Agência: </strong>{{ contaBancaria.agency }}</p>
        <p><strong>Conta: </strong>{{ contaBancaria.account }}</p>
        <p><strong>Dígito da conta: </strong>{{ contaBancaria.accountDigit }}</p>
      </v-card-text>
      <v-card-text v-else>
        <v-btn color="primary" variant="tonal" @click="abrirModalConta">Criar Conta Bancária</v-btn>
      </v-card-text>
    </v-card>

    <!-- Seção Editar Pessoa -->
    <v-card class="mx-auto pa-6 mt-8" max-width="700" elevation="3">
      <v-card-title class="text-h6 font-weight-bold d-flex align-center">
        <v-icon class="mr-2">mdi-account</v-icon> Editar Pessoa
      </v-card-title>
      <v-divider class="my-4" />
      <v-card-text v-if="pessoa">
        <v-text-field v-model="pessoa.nome" label="Nome" required />
        <v-text-field v-model="pessoa.cpfCnpj" label="CPF/CNPJ" required />
        <v-text-field v-model="pessoa.telefone" label="Telefone" required />
        <v-text-field v-model="pessoa.email" label="Email" required />
        <v-text-field v-model="pessoa.dataNascimento" label="Data de Nascimento" type="date" required />
      </v-card-text>

      <v-card-actions>
        <v-row class="w-100" justify="space-between">
          <v-col cols="auto">
            <v-btn color="indigo" variant="tonal" @click="showModalUsuario = true">
              <v-icon start>mdi-account-plus</v-icon> Tornar Usuário
            </v-btn>
          </v-col>
          <v-col cols="auto">
            <v-btn color="green" variant="elevated" @click="salvar">
              <v-icon start>mdi-content-save</v-icon> Salvar
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>

    <!-- Seção Endereço -->
    <v-card class="mx-auto pa-6 mt-8" max-width="700" elevation="3">
      <v-card-title class="text-h6 font-weight-bold d-flex align-center">
        <v-icon class="mr-2">mdi-home-map-marker</v-icon> Endereço
      </v-card-title>
      <v-divider class="my-4" />
      <v-card-text v-if="enderecos && enderecos.length">
        <div v-for="(endereco, index) in enderecos" :key="index" class="mb-6 pa-4 rounded border">
          <p><strong>CEP:</strong> {{ endereco.cep }}</p>
          <p><strong>Rua:</strong> {{ endereco.rua }}, {{ endereco.numero }}</p>
          <p><strong>Bairro:</strong> {{ endereco.bairro }}</p>
          <p><strong>Cidade:</strong> {{ endereco.cidade }} - {{ endereco.estado }}</p>
          <p><strong>País:</strong> {{ endereco.pais }}</p>
          <p><strong>Complemento:</strong> {{ endereco.complemento }}</p>
          <v-btn color="primary" variant="tonal" @click="abrirModalEndereco(endereco)">Editar Endereço</v-btn>
        </div>
      </v-card-text>
      <v-card-text v-else>
        <v-btn color="primary" variant="tonal" @click="abrirModalEndereco()">Cadastrar Endereço</v-btn>
      </v-card-text>
    </v-card>

    <!-- Modal Criar Usuário -->
    <v-dialog v-model="showModalUsuario" max-width="400px">
      <v-card>
        <v-card-title class="text-h6 font-weight-bold">Criar Usuário</v-card-title>
        <v-card-text>
          <v-text-field v-model="senhaUsuario" label="Senha" type="password" required />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="grey" variant="flat" @click="showModalUsuario = false">Cancelar</v-btn>
          <v-btn color="green" variant="elevated" @click="tornarUsuario">Confirmar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Modal Criar Conta Bancária -->
    <v-dialog v-model="showModalConta" max-width="400px">
      <v-card>
        <v-card-title class="text-h6 font-weight-bold">Criar Conta Bancária</v-card-title>
        <v-card-text>
          <v-text-field v-model="novaConta.bank" label="Banco" readonly />
          <v-text-field v-model="rendaFormatada" label="Renda Mensal" />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="grey" variant="flat" @click="showModalConta = false">Cancelar</v-btn>
          <v-btn color="green" variant="elevated" @click="criarConta">Criar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Modal Endereço -->
    <v-dialog v-model="showModalEndereco" max-width="500px">
      <v-card>
        <v-card-title class="text-h6 font-weight-bold">{{ enderecos?.length ? 'Editar' : 'Cadastrar' }}
          Endereço</v-card-title>
        <v-card-text>
          <v-text-field v-model="novoEndereco.cep" label="CEP" @blur="buscarPorCep" />
          <v-text-field v-model="novoEndereco.rua" label="Rua" />
          <v-text-field v-model="novoEndereco.bairro" label="Bairro" />
          <v-text-field v-model="novoEndereco.cidade" label="Cidade" />
          <v-text-field v-model="novoEndereco.estado" label="Estado" />
          <v-text-field v-model="novoEndereco.pais" label="País" />
          <v-text-field v-model="novoEndereco.numero" label="Número" />
          <v-text-field v-model="novoEndereco.complemento" label="Complemento" />
        </v-card-text>
        <v-card-actions>
          <v-btn color="grey" variant="flat" @click="showModalEndereco = false">Cancelar</v-btn>
          <v-btn color="green" variant="elevated" @click="salvarEndereco">Salvar</v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
