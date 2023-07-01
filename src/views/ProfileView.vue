<script setup lang="ts">
import useImperativeFetch from '@/composables/useImperativeFetch';
import { fetchProfileById } from '@/owProfile';
import { computed, provide, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import LoadSpinner from '@/components/ui/LoadSpinner.vue';
import ButtonGroup from '@/components/ui/ButtonGroup.vue';
import usePlayerId from '@/composables/usePlayerId';

const route = useRoute();
const router = useRouter();

const playerId = usePlayerId();
const { result, fetch } = useImperativeFetch(fetchProfileById, 0);
watch(playerId, id => fetch(id), { immediate: true });
const subpage = computed({
  get() {
    return route.name ?? 'profile';
  },
  set(name: string | symbol) {
    router.push({
      name,
      params: route.params,
    });
  },
});

provide('player-profile', result);
</script>

<template>
  <div v-if="!!result && 'error' in result" class="m-16 text-xl text-center">
    {{ result.error }}
  </div>
  <LoadSpinner v-else-if="!result" />
  <div v-else class="w-full h-full flex flex-col items-center">
    <div
      class="relative bg-cover bg-center h-[200px] w-full flex-shrink-0"
      :style="{ backgroundImage: `url('${result.summary.namecard}')` }"
    >
      <div class="w-full h-full bg-gradient-to-r from-blue-800 to-transparent"></div>
      <ButtonGroup
        class="absolute top-0 left-0 mx-16 my-8 text-xl"
        :choices="{ Overview: 'profile-overview', Statistics: 'profile-stats' }"
        v-model="subpage"
      />
      <div class="absolute bottom-0 m-16 mb-0 flex gap-10">
        <img :src="result.summary.avatar" class="relative -mb-10 border-4 rounded z-20" />
        <span class="text-6xl italic mt-4">{{ result.summary.username }}</span>
        <img class="w-[96px] h-[96px]" :src="result.summary.endorsement.frame" />
      </div>
    </div>
    <div class="flex-1 w-full overflow-y-scroll">
      <RouterView v-slot="{ Component }">
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
  </div>
</template>
