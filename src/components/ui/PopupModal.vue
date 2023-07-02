<script setup lang="ts">
defineProps<{
  show: boolean;
}>();
const emit = defineEmits<{ 'update:show': [show: boolean] }>();
</script>

<template>
  <Transition>
    <div
      v-show="show"
      class="fixed z-50 inset-0 flex items-center justify-center transition-all backdrop-blur-md bg-slate-900 bg-opacity-50 opacity-100 v-transit-to:opacity-0 v-transit-to:backdrop-blur-0"
    >
      <div class="absolute inset-0 -z-10" @click="emit('update:show', false)"></div>
      <div class="bg-slate-800 bg-opacity-75 backdrop-blur-lg rounded-xl shadow-lg m-16">
        <slot />
      </div>
    </div>
  </Transition>
</template>
