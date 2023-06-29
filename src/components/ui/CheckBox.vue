<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    modelValue?: boolean;
    label?: string;
  }>(),
  { modelValue: false }
);
const emit = defineEmits<{
  'update:modelValue': [checked: boolean];
}>();
const checked = computed({
  get() {
    return props.modelValue;
  },
  set(val: boolean) {
    emit('update:modelValue', val);
  },
});
</script>

<template>
  <div @click="checked = !checked" class="flex gap-2 items-center cursor-pointer" v-bind="$attrs">
    <div class="w-4 h-4 relative">
      <input
        type="checkbox"
        v-model="checked"
        class="shadow appearance-none box-content w-full h-full bg-slate-700 border border-slate-600 rounded cursor-pointer checked:bg-blue-600 checked:border-blue-600"
      />
      <div class="checkmark"></div>
    </div>
    <span class="select-none">{{ label }}</span>
  </div>
</template>

<style scoped lang="postcss">
.checkmark {
  @apply absolute top-0 bottom-0 left-0 right-0 bg-white m-0.5 translate-y-[0.0625rem] translate-x-[0.0625rem] opacity-0 transition-all;
  transform-origin: bottom left;
  clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
}
:checked + .checkmark {
  @apply opacity-100;
}
</style>
