<script setup lang="ts">
export type ButtonType = 'flat' | 'raised' | 'primary';
const props = withDefaults(
  defineProps<{
    type: ButtonType;
    clickable?: boolean;
  }>(),
  { clickable: true }
);
const emit = defineEmits<{
  click: [payload: MouseEvent];
}>();
</script>

<template>
  <button
    @click="
      e => {
        if (props.clickable) emit('click', e);
      }
    "
    v-bind="$attrs"
    :class="
      (() => {
        switch (props.type) {
          case 'flat':
            return (
              'bg-slate-300 bg-opacity-0 text-blue-300 px-4 py-2 rounded-md overflow-hidden transition-all' +
              (props.clickable ? ' hover:bg-opacity-10 active:bg-opacity-20' : ' cursor-default')
            );
          case 'raised':
            return (
              'bg-slate-200 filter-none text-blue-900 px-4 py-2 rounded-md overflow-hidden transition-all shadow' +
              (props.clickable
                ? '  hover:brightness-110 active:brightness-90 hover:shadow-md active:shadow-sm'
                : ' cursor-default')
            );
          case 'primary':
            return (
              'bg-blue-700 filter-none text-blue-100 px-4 py-2 rounded-md overflow-hidden transition-all shadow' +
              (props.clickable
                ? ' hover:brightness-110 active:brightness-90 hover:shadow-md active:shadow-sm'
                : ' cursor-default')
            );
        }
        return '';
      })()
    "
  >
    <slot />
  </button>
</template>
