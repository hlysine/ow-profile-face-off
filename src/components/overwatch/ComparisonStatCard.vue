<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  leftTitle: string;
  leftStat: string;
  rightTitle: string;
  rightStat: string;
  ratio: number;
}>();

const growRatio = computed(() => props.ratio / (1 - props.ratio));
</script>

<template>
  <div class="relative w-2bw h-1bh rounded-sm bg-slate-800 overflow-hidden">
    <div class="h-full w-full flex items-stretch">
      <div
        class="opacity-50 bg-gradient-to-t from-blue-700 via-transparent via-75% to-transparent basis-0 transition-all"
        :style="{ 'flex-grow': isFinite(growRatio) ? growRatio : 1 }"
      />
      <div
        class="opacity-50 bg-gradient-to-t from-red-700 via-transparent via-75% to-transparent basis-0 transition-all"
        :style="{ 'flex-grow': isFinite(growRatio) ? 1 : isFinite(ratio) ? 0 : 1 }"
      />
    </div>
    <div class="absolute inset-0 flex flex-col p-4">
      <div class="flex items-center">
        <span class="flex-1 uppercase text-slate-400">{{ leftTitle }}</span>
        <slot name="icon" />
        <span class="flex-1 uppercase text-slate-400 text-right">{{ rightTitle }}</span>
      </div>
      <div class="flex flex-1 items-center">
        <span class="flex-1 text-blue-400 text-5xl truncate">{{ leftStat }}</span>
        <span class="flex-1 text-red-400 text-5xl truncate text-right">{{ rightStat }}</span>
      </div>
    </div>
  </div>
</template>
