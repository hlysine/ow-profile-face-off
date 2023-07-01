<script setup lang="ts">
import { toRef } from 'vue';
import PlayerCard from './PlayerCard.vue';
import { type ProfileSummary, Platform } from '@/owProfile';
import RoleRank from './RoleRank.vue';
import useCompetitiveSummary from '@/composables/useCompetitiveSummary';

const props = withDefaults(
  defineProps<{
    profile: ProfileSummary;
    clickable?: boolean;
  }>(),
  { clickable: false }
);

const emit = defineEmits<{
  click: [payload: MouseEvent];
}>();

const { platform, competitive } = useCompetitiveSummary(toRef(() => props.profile.competitive));
</script>

<template>
  <div
    class="relative flex flex-col w-min bg-slate-800 rounded-sm overflow-hidden shadow"
    :class="{ 'hover:shadow-lg': clickable }"
  >
    <PlayerCard :player="profile" class="rounded-b-none" />
    <div v-if="!!competitive" class="flex flex-col items-center gap-2 m-2">
      <span class="text-sm text-gray-400">
        Season {{ competitive.season }} · {{ platform === Platform.PC ? 'PC' : 'Console' }}
      </span>
      <div class="flex">
        <RoleRank :rank="competitive.tank" />
        <RoleRank :rank="competitive.damage" />
        <RoleRank :rank="competitive.support" />
      </div>
    </div>
    <div v-else class="flex-1 w-full flex items-center justify-center text-gray-400 min-h-[108px] m-2">
      No rank data.
    </div>
    <div
      v-if="clickable"
      @click="e => emit('click', e)"
      class="absolute inset-0 bg-white opacity-0 hover:opacity-5 transition-opacity active:opacity-10 cursor-pointer"
    ></div>
  </div>
</template>
