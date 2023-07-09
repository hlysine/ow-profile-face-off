<script setup lang="ts">
import { RouterView } from 'vue-router';
import { fetchAllHeroes, fetchAllRoles } from './owProfile';
import { provide, ref } from 'vue';
import LoadSpinner from './components/ui/LoadSpinner.vue';

const heroes = await fetchAllHeroes();
const roles = await fetchAllRoles();
const errorMsg = ref<string | null>(null);

if ('error' in heroes) {
  errorMsg.value = heroes.error;
} else if ('error' in roles) {
  errorMsg.value = roles.error;
} else {
  provide('heroes', heroes);
  provide('roles', roles);
}
</script>

<template>
  <div class="w-screen h-screen">
    <div class="absolute inset-0 -z-50 bg-[url(@/assets/poly.svg)] bg-cover bg-center opacity-25"></div>
    <p v-if="!!errorMsg">{{ errorMsg }}</p>
    <RouterView v-else v-slot="{ Component }">
      <template v-if="Component">
        <Transition mode="out-in">
          <KeepAlive>
            <Suspense>
              <!-- main content -->
              <component :is="Component" class="v-transit-to:opacity-0 v-transiting:transition-opacity" />

              <!-- loading state -->
              <template #fallback>
                <LoadSpinner :size="64" />
              </template>
            </Suspense>
          </KeepAlive>
        </Transition>
      </template>
    </RouterView>
  </div>
</template>
