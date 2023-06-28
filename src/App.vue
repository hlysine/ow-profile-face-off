<script setup lang="ts">
import { RouterView } from 'vue-router';
import BannerSmall from './components/overwatch/BannerSmall.vue';
</script>

<template>
  <header>
    <div class="flex flex-col w-full items-center p-4 box-border">
      <BannerSmall />
    </div>
  </header>

  <RouterView />
</template>
