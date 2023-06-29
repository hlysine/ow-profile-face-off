<script setup lang="ts">
import { RouterView } from 'vue-router';
import BannerSmall from './components/overwatch/BannerSmall.vue';
import { fetchAllHeroes, fetchAllRoles } from './owProfile';
import { provide, ref } from 'vue';

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
  <div class="w-screen h-screen grid grid-rows-[min-content_1fr]">
    <header>
      <div class="flex flex-col w-full items-center p-4 box-border">
        <BannerSmall />
      </div>
    </header>

    <p v-if="!!errorMsg">{{ errorMsg }}</p>
    <RouterView v-else v-slot="{ Component }">
      <template v-if="Component">
        <Transition mode="out-in">
          <KeepAlive>
            <Suspense>
              <!-- main content -->
              <component :is="Component"></component>

              <!-- loading state -->
              <template #fallback> Loading... </template>
            </Suspense>
          </KeepAlive>
        </Transition>
      </template>
    </RouterView>
  </div>
</template>
