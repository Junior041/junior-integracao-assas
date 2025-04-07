<template>
  <header class="bg-primary text-white shadow-lg">
    <v-container class="flex justify-between items-center py-4">
      <!-- Logo -->
      <div class="text-2xl font-extrabold tracking-wide">
        <NuxtLink to="/" class="hover:text-secondary transition-colors">IMOBIA</NuxtLink>
      </div>

      <!-- Menu Desktop -->
      <nav class="hidden md:flex gap-8 text-lg items-center">
        <NuxtLink to="/" class="flex items-center gap-2 hover:text-secondary transition-colors">
          <v-icon icon="mdi-home-map-marker" size="20" />
          Home
        </NuxtLink>
        <NuxtLink to="/pessoa/list" class="flex items-center gap-2 hover:text-secondary transition-colors">
          <v-icon icon="mdi-account-box-outline" size="20" />
          Pessoas
        </NuxtLink>
      </nav>
    </v-container>
  </header>
</template>
