<script setup lang="ts">
import { ref } from 'vue'

const menuOpen = ref(false)
</script>

<template>
  <header class="bg-primary text-white shadow-md">
    <v-container class="flex justify-between items-center py-4">
      <!-- Logo -->
      <div class="text-xl font-bold">Ismael Junior</div>

      <!-- Menu Desktop -->
      <nav class="hidden md:flex gap-6">
        <NuxtLink class="hover:text-secondary transition" to="/">Home</NuxtLink>
        <NuxtLink class="hover:text-secondary transition" to="/usuarios/list">Usuarios</NuxtLink>
        <NuxtLink class="hover:text-secondary transition" to="/pessoa/list">Pessoas</NuxtLink>
      </nav>
  </v-container>
  </header>
</template>
