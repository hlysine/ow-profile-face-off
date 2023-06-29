<script setup lang="ts">
import VueFeather from 'vue-feather';

const props = withDefaults(defineProps<{ size?: number }>(), { size: 48 });
</script>

<template>
  <div class="w-full h-full flex items-center justify-center">
    <VueFeather type="loader" :size="props.size" class="text-blue-400 animate-spin" />
  </div>
</template>
