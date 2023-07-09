<script setup lang="ts">
import HeroLeaderboard from '@/components/overwatch/HeroLeaderboard.vue';
import type { OWProfile } from '@/owProfile';
import { type Ref, inject, computed } from 'vue';

const playerProfile = inject<Ref<OWProfile>>('player-profile')!;

const data = computed(() => playerProfile.value.stats.pc!.quickplay!.heroes_comparisons.time_played.values);
</script>

<template>
  <div>
    <p class="m-16 text-xl text-center">This is the work-in-progress statistics view.</p>
    <HeroLeaderboard :data="data" :title="playerProfile.stats.pc!.quickplay!.heroes_comparisons.time_played.label" />
  </div>
</template>
