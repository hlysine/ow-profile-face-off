<script setup lang="ts">
defineProps<{
  title: string;
  stat: string;
}>();
</script>

<template>
  <div class="flex flex-col w-1bw h-1bh rounded-sm bg-slate-800 p-4">
    <div class="flex items-center">
      <span class="flex-1 uppercase text-slate-400">{{ title }}</span>
      <slot name="icon" />
    </div>
    <span class="flex w-full flex-1 items-center justify-center text-blue-400 text-5xl truncate">{{ stat }}</span>
  </div>
</template>
