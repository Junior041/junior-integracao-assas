<script setup lang="ts">
import HeaderComponent from '@/components/HeaderComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
</script>

<template>
  <v-app>
    <HeaderComponent />
    <v-main>
      <slot />
    </v-main>
    <FooterComponent />
  </v-app>
</template>
