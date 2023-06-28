<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  modelValue: string;
  placeholder?: string;
  isValid?: boolean;
}>();
const emit = defineEmits<{
  'update:modelValue': [text: string];
}>();
const text = computed({
  get() {
    return props.modelValue;
  },
  set(val: string) {
    emit('update:modelValue', val);
  },
});
</script>

<template>
  <input
    v-model="text"
    :placeholder="placeholder"
    v-bind="$attrs"
    class="bg-slate-800 p-3 rounded-md shadow-md text-slate-100 border focus:outline-none focus:border-slate-700 focus:shadow-lg placeholder:text-slate-500 transition-shadow"
    :class="{ 'border-red-800 shadow-red-950 focus:shadow-red-950': !isValid, 'border-slate-800': isValid }"
  />
</template>
