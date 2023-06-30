<script setup lang="ts">
defineProps<{
  show: boolean;
}>();
const emit = defineEmits<{ 'update:show': [show: boolean] }>();
</script>

<template>
  <div
    class="fixed z-50 inset-0 flex items-center justify-center transition-all"
    :class="{
      'backdrop-blur-md bg-slate-900 bg-opacity-50 opacity-100': show,
      'hidden backdrop-blur-0 opacity-0': !show,
    }"
  >
    <div class="absolute inset-0 -z-10" @click="emit('update:show', false)"></div>
    <div class="bg-slate-800 rounded-xl shadow-lg m-16">
      <slot />
    </div>
  </div>
</template>
