<script setup lang="ts">
import ButtonGroup from '@/components/ui/ButtonGroup.vue';
import { type Ref, ref, watchEffect } from 'vue';
import { Gamemode, Platform, fetchStatsSummaryById } from '@/owProfile';
import useImperativeFetch from '@/composables/useImperativeFetch';
import usePlayerId from '@/composables/usePlayerId';
import StatsSummaryPanel from '@/components/overwatch/StatsSummaryPanel.vue';
import LoadSpinner from '@/components/ui/LoadSpinner.vue';

const playerId = usePlayerId();
const platform: Ref<Platform | undefined> = ref(undefined);
const gamemode: Ref<Gamemode | undefined> = ref(undefined);

const { fetching, result, fetch } = useImperativeFetch(fetchStatsSummaryById, 500);

watchEffect(() => {
  fetch(playerId.value, { gamemode: gamemode.value, platform: platform.value });
});
</script>

<template>
  <LoadSpinner v-if="!result" />
  <div v-else class="flex flex-col w-full px-16 py-4" :class="{ 'animate-pulse': fetching }">
    <div class="flex flex-wrap ml-[148px] gap-2">
      <ButtonGroup :choices="{ All: undefined, PC: Platform.PC, Console: Platform.Console }" v-model="platform" />
      <ButtonGroup
        :choices="{ All: undefined, 'Quick Play': Gamemode.QuickPlay, Competitive: Gamemode.Competitive }"
        v-model="gamemode"
      />
    </div>
    <p v-if="'error' in result" class="m-16 text-xl text-center">{{ result.error }}</p>
    <div v-else class="flex-1 pt-4 overflow-y-scroll">
      <StatsSummaryPanel :stats="result" />
    </div>
  </div>
</template>
