<script setup lang="ts">
import VueFeather from 'vue-feather';

const props = withDefaults(defineProps<{ size?: number; text?: string }>(), { size: 48 });
</script>

<template>
  <div class="w-full h-full flex flex-col items-center justify-center gap-4">
    <VueFeather type="loader" :size="props.size" class="text-blue-400 animate-spin" />
    <span class="text-slate-300">{{ text }}</span>
  </div>
</template>
