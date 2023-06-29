<script setup lang="ts">
import VueFeather from 'vue-feather';
import { owAssets, type PlayerSummary } from '@/owProfile';

defineProps<{ player: PlayerSummary }>();
</script>

<template>
  <div class="relative h-[60px] w-[320px] text-black bg-white rounded-sm overflow-hidden">
    <div
      class="absolute top-0 bottom-0 left-0 right-0 w-full h-full bg-cover bg-center bg-white"
      :style="{
        backgroundImage: `url('${player.namecard}')`,
      }"
    ></div>
    <div
      class="absolute top-0 bottom-0 left-0 right-0 flex flex-row items-center gap-2 bg-gradient-to-r from-white via-white via-40% to-transparent"
    >
      <div
        class="aspect-square h-full bg-cover bg-center"
        :style="{
          backgroundImage: `url('${player.avatar}'), url('${owAssets.player.defaultIcon}')`,
        }"
      ></div>
      <div class="flex flex-col">
        <div class="flex items-center gap-1">
          <VueFeather v-if="player.privacy !== 'public'" type="lock" size="16" class="align-middle" />
          <span class="text-lg font-medium leading-5">{{ player.username }}</span>
          <div
            class="inline-block w-8 aspect-square align-middle -m-4 ml-0"
            :style="{ backgroundImage: `url('${player.endorsement.frame}')` }"
          ></div>
        </div>
        <div class="text-sm text-gray-600 leading-5">{{ player.title }}</div>
      </div>
    </div>
  </div>
</template>
