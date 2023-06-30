<script setup lang="ts">
export type ButtonType = 'flat' | 'raised' | 'primary';
defineProps<{ type: ButtonType }>();
const emit = defineEmits<{
  click: [payload: MouseEvent];
}>();
</script>

<template>
  <button
    @click="e => emit('click', e)"
    v-bind="$attrs"
    :class="
      (() => {
        switch (type) {
          case 'flat':
            return 'bg-slate-300 bg-opacity-0 hover:bg-opacity-10 text-blue-300 px-4 py-2 rounded-md overflow-hidden transition-all active:bg-opacity-20';
          case 'raised':
            return 'bg-slate-200 filter-none hover:brightness-110 text-blue-900 px-4 py-2 rounded-md overflow-hidden transition-all active:brightness-90 shadow hover:shadow-md active:shadow-sm';
          case 'primary':
            return 'bg-blue-700 filter-none hover:brightness-110 text-blue-100 px-4 py-2 rounded-md overflow-hidden transition-all active:brightness-90 shadow hover:shadow-md active:shadow-sm';
        }
        return '';
      })()
    "
  >
    <slot />
  </button>
</template>
