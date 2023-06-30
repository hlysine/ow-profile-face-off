<script setup lang="ts">
import type { SelectedType } from '@/components/overwatch/RoleHeroSelector.vue';
import RoleHeroSelector from '@/components/overwatch/RoleHeroSelector.vue';
import PopupModal from '@/components/ui/PopupModal.vue';
import { ref, type Ref } from 'vue';

const type: Ref<SelectedType> = ref('all-hero');
const key = ref('');
</script>

<template>
  <div>
    <p class="m-16 text-xl text-center">This is the work-in-progress statistics view.</p>
    <PopupModal :show="true">
      <RoleHeroSelector v-model:selected-type="type" v-model:selected-key="key" class="p-8" />
    </PopupModal>
  </div>
</template>
