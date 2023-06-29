<script setup lang="ts">
import CustomButton from './CustomButton.vue';
import { computed } from 'vue';

const props = defineProps<{ choices: { [id: string]: string }; modelValue: string }>();
const emit = defineEmits<{
  'update:modelValue': [selectedId: string];
}>();
const selection = computed({
  get() {
    return props.modelValue;
  },
  set(val: string) {
    emit('update:modelValue', val);
  },
});
</script>

<template>
  <div class="flex gap-1 bg-slate-900 p-1 rounded">
    <CustomButton
      v-for="[key, value] in Object.entries(choices)"
      :key="key"
      :type="selection === key ? 'raised' : 'flat'"
      class="rounded-sm"
      @click="selection = key"
    >
      {{ value }}
    </CustomButton>
  </div>
</template>
