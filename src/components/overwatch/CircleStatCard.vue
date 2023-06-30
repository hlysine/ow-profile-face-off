<script setup lang="ts">
defineProps<{
  title: string;
  stat: string;
  ratio: number;
}>();
</script>

<template>
  <div class="relative w-1bw h-1bh rounded-sm bg-slate-800 overflow-hidden">
    <div
      class="absolute top-2 bottom-2 aspect-square rounded-full left-1/2 -translate-x-1/2"
      :style="{
        background: `conic-gradient(
          rgb(96 165 250 / var(--tw-bg-opacity)) 0,
          rgb(96 165 250 / var(--tw-bg-opacity)) ${ratio * 100}%,
          rgb(71 85 105 / var(--tw-bg-opacity)) 0,
          rgb(71 85 105 / var(--tw-bg-opacity)) 100%
        )`,
      }"
    ></div>
    <div class="absolute top-3 bottom-3 bg-slate-800 aspect-square rounded-full left-1/2 -translate-x-1/2"></div>
    <div class="flex flex-col absolute inset-0 p-4 items-center justify-center">
      <slot name="icon" />
      <span class="uppercase text-slate-400 text-sm mt-1">{{ title }}</span>
      <span class="text-blue-400 text-4xl truncate">{{ stat }}</span>
    </div>
  </div>
</template>
