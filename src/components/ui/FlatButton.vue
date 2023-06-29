<script setup lang="ts">
const emit = defineEmits<{
  click: [payload: MouseEvent];
}>();
</script>

<template>
  <button
    @click="e => emit('click', e)"
    v-bind="$attrs"
    class="bg-slate-300 bg-opacity-0 hover:bg-opacity-10 text-blue-300 px-4 py-2 rounded-md transition-all active:bg-opacity-20"
  >
    <slot />
  </button>
</template>
