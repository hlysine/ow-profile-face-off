<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import BannerSmall from './components/BannerSmall.vue';
</script>

<template>
  <header>
    <div class="flex flex-col w-full items-center p-4 box-border">
      <BannerSmall />

      <nav class="flex gap-4">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
