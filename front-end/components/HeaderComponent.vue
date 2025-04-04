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
        <a href="#" class="hover:text-secondary transition">Usuarios</a>
        <NuxtLink class="hover:text-secondary transition" to="/pessoas">Pessoas</NuxtLink>
      </nav>

      <!-- Menu Mobile -->
      <v-btn icon class="md:hidden" @click="menuOpen = !menuOpen">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <!--
      <v-navigation-drawer v-model="menuOpen" temporary location="right">
        <v-list>
          <v-list-item link title="Início" />
          <v-list-item link title="Sobre" />
          <v-list-item link title="Contato" />
        </v-list>
      </v-navigation-drawer>
      -->
    </v-container>
  </header>
</template>
