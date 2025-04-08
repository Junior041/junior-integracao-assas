<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')
const errorMessage = ref<string | null>(null)
const config = useRuntimeConfig()

const login = async () => {
  try {
    const response = await $fetch(`${config.public.apiUrl}/usuario/auth/login`, {
      method: 'POST',
      body: {
        email: email.value,
        senha: password.value,
      },
    })

    const token = response?.accessToken
    
    if (token) {
      localStorage.setItem('auth_token', token)
      router.push('/')
    } else {
      errorMessage.value = 'Login falhou, tente novamente.'
    }
  } catch (err: any) {
    errorMessage.value = 'Usuário ou senha inválidos!'
    console.error(err)
  }
}

definePageMeta({
  layout: 'empty'
})
</script>

<template>
  <v-container fluid class="d-flex align-center justify-center fill-height bg-primary" style="min-height: 100vh;">
    <v-card class="pa-6 rounded-xl shadow-xl bg-white" max-width="400" width="90%">
      <v-card-title class="text-center text-h5 font-bold text-primary-dark">
        Bem-vindo!
      </v-card-title>
      <v-card-subtitle class="text-center text-secondary-light">
        Faça login para continuar
      </v-card-subtitle>

      <v-form class="mt-4" @submit.prevent="login">
        <v-text-field
v-model="email" label="E-mail" type="email" prepend-inner-icon="mdi-email" variant="outlined"
          density="comfortable" hide-details class="mb-4" />
        <v-text-field
v-model="password" label="Senha" type="password" prepend-inner-icon="mdi-lock" variant="outlined"
          density="comfortable" hide-details class="mb-2" />

        <v-alert v-if="errorMessage" variant="tonal" density="compact" class="mb-2 text-caption text-center">
          {{ errorMessage }}
        </v-alert>

        <v-btn type="submit" class="bg-primary hover:bg-primary-dark w-full" size="large" elevation="2">
          Entrar
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>
