<script setup lang="ts">
import App from './App.vue';
import LoadSpinner from './components/ui/LoadSpinner.vue';
</script>

<template>
  <Suspense>
    <App />
    <template #fallback>
      <div class="h-screen w-screen">
        <LoadSpinner :size="64" />
      </div>
    </template>
  </Suspense>
</template>
