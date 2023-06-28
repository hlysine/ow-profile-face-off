<script setup lang="ts">
import type { Rank } from '@/owProfile';

defineProps<{ rank: Rank | null }>();
</script>

<template>
  <div class="w-16 h-[80px] flex items-center justify-center">
    <div v-if="!!rank" class="flex flex-col gap-2 items-center">
      <img class="w-4 opacity-70" :src="rank.role_icon" />
      <img class="h-[52px]" :src="rank.rank_icon" />
    </div>
    <div v-else>-</div>
  </div>
</template>
