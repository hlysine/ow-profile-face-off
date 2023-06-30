<script setup lang="ts" generic="T">
import CustomButton from './CustomButton.vue';
import { computed } from 'vue';

const props = defineProps<{ choices: { [id: string]: T }; modelValue: T }>();
const emit = defineEmits<{
  'update:modelValue': [selectedId: T];
}>();
const selection = computed({
  get() {
    return props.modelValue;
  },
  set(val: T) {
    emit('update:modelValue', val);
  },
});
</script>

<template>
  <div class="flex gap-1 bg-slate-900 p-1 rounded">
    <CustomButton
      v-for="[text, id] in Object.entries(choices)"
      :key="text"
      :type="selection === id ? 'raised' : 'flat'"
      class="rounded-sm"
      @click="selection = id"
    >
      {{ text }}
    </CustomButton>
  </div>
</template>
