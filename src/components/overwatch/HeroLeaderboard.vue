<script setup lang="ts">
import type { HeroInfo, HeroValue } from '@/owProfile';
import { computed, inject } from 'vue';

const props = withDefaults(
  defineProps<{
    data: HeroValue[];
    title: string;
    formatter?: (val: number) => string;
  }>(),
  { formatter: (val: number) => val.toString() }
);

const heroes = inject<HeroInfo[]>('heroes')!;

const maxValue = computed(() =>
  props.data.reduce((prev, curr) => Math.max(prev, curr.value), Number.NEGATIVE_INFINITY)
);
</script>

<template>
  <div class="flex flex-col gap-4 max-h-[calc(100vh-20rem)] min-w-[500px]">
    <span class="text-3xl text-slate-400">{{ title }}</span>
    <div class="flex-1 overflow-y-scroll pr-4">
      <div class="flex flex-col gap-2">
        <div
          v-for="{ hero, value, heroInfo = heroes.find(h => h.key === hero) } in (data as (HeroValue & { heroInfo: HeroInfo })[])"
          :key="hero"
          class="flex gap-4"
        >
          <img :src="heroInfo?.portrait" class="w-10 rounded-lg shadow-sm" />
          <div class="flex flex-col gap-1 flex-1">
            <div>
              <span class="text-slate-200">{{ heroInfo?.name }}</span>
              <span class="text-slate-400"> - {{ formatter(value) }}</span>
            </div>
            <div class="rounded-full h-2 bg-blue-300" :style="{ width: `${(value / maxValue) * 100}%` }"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
