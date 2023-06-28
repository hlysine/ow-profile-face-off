<script setup lang="ts">
import sample from '@/assets/sample1.json';
import RankedPlayerCard from '@/components/RankedPlayerCard.vue';
import type { ProfileSummary } from '@/owProfile';
</script>

<template>
  <main>Placeholder main page</main>
  <RankedPlayerCard class="m-4 shadow-lg" :profile="(sample.summary as ProfileSummary)" />
</template>
