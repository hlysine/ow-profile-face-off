<script setup lang="ts">
import useImperativeFetch from '@/composables/useImperativeFetch';
import { fetchProfileById } from '@/owProfile';
import { watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const { result, fetch } = useImperativeFetch(fetchProfileById, 0);
watch(
  () => route.params.playerId,
  id => fetch(Array.isArray(id) ? id[0] : id),
  { immediate: true }
);
</script>

<template>
  <div v-if="!!result && 'error' in result" class="w-full h-full flex items-center justify-center">
    {{ result.error }}
  </div>
  <div v-else-if="!!result" class="w-full h-full flex flex-col">
    <div class="relative bg-cover h-[200px]" :style="{ backgroundImage: `url('${result.summary.namecard}')` }">
      <div class="w-full h-full bg-gradient-to-r from-blue-800 to-transparent"></div>
      <div class="absolute -bottom-8 m-16 mb-0 flex gap-10">
        <img :src="result.summary.avatar" class="border-4 rounded" />
        <span class="text-6xl italic mt-4">{{ result.summary.username }}</span>
        <img class="w-[96px] h-[96px]" :src="result.summary.endorsement.frame" />
      </div>
    </div>
  </div>
</template>
