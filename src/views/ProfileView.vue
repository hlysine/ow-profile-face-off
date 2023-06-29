<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
  <div class="">
    <h1>This is the profile page for {{ route.params.playerId }}</h1>
  </div>
</template>
