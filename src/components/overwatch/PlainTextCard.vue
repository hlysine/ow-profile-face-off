<script setup lang="ts">
defineProps<{
  text: string;
}>();
</script>

<template>
  <div
    class="flex flex-col items-center justify-center gap-2 w-1bw h-1bh rounded-sm bg-slate-800 bg-opacity-50 backdrop-blur p-4 shadow"
  >
    <slot name="icon" />
    <span class="uppercase text-slate-400">{{ text }}</span>
  </div>
</template>
