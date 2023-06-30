<script setup lang="ts">
defineProps<{
  text: string;
}>();
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-2 w-1bw h-1bh rounded-sm bg-slate-800 p-4">
    <slot name="icon" />
    <span class="uppercase text-slate-400">{{ text }}</span>
  </div>
</template>
