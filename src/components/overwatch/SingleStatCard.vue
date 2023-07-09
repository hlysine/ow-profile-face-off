<script setup lang="ts">
import CustomButton from '../ui/CustomButton.vue';
defineProps<{
  title: string;
  stat: string;
}>();
const emit = defineEmits<{
  click: [payload: MouseEvent];
}>();
</script>

<template>
  <CustomButton
    type="raised"
    class="flex flex-col w-1bw h-1bh rounded-sm bg-slate-800 bg-opacity-50 backdrop-blur !p-4 shadow"
    @click="e => emit('click', e)"
  >
    <div class="flex items-center">
      <span class="flex-1 uppercase text-slate-400">{{ title }}</span>
      <slot name="icon" />
    </div>
    <span class="flex w-full flex-1 items-center justify-center text-blue-400 text-5xl truncate">{{ stat }}</span>
  </CustomButton>
</template>
