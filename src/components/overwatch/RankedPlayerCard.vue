<script setup lang="ts">
import { computed } from 'vue';
import PlayerCard from './PlayerCard.vue';
import { rankToIndex, type ProfileSummary, type PerPlatform } from '@/owProfile';
import RoleRank from './RoleRank.vue';

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

const platform = computed<keyof PerPlatform<any>>(() => {
  if (!props.profile.competitive) return 'pc';
  const { pc, console } = props.profile.competitive;
  const pcRank = pc
    ? Math.max(
        pc.tank ? rankToIndex(pc.tank) : 0,
        pc.damage ? rankToIndex(pc.damage) : 0,
        pc.support ? rankToIndex(pc.support) : 0
      )
    : 0;
  const consoleRank = console
    ? Math.max(
        console.tank ? rankToIndex(console.tank) : 0,
        console.damage ? rankToIndex(console.damage) : 0,
        console.support ? rankToIndex(console.support) : 0
      )
    : 0;
  if (pcRank >= consoleRank) {
    return 'pc';
  } else {
    return 'console';
  }
});
const competitive = computed(() => props.profile.competitive?.[platform.value]);
</script>

<template>
  <div
    class="relative flex flex-col w-min bg-slate-800 rounded-sm overflow-hidden shadow"
    :class="{ 'hover:shadow-lg': clickable }"
  >
    <PlayerCard :player="profile" class="rounded-b-none" />
    <div v-if="!!competitive" class="flex flex-col items-center gap-2 m-2">
      <span class="text-sm text-gray-400">
        Season {{ competitive.season }} · {{ platform === 'pc' ? 'PC' : 'Console' }}
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
      class="absolute top-0 bottom-0 left-0 right-0 bg-white opacity-0 hover:opacity-5 transition-opacity active:opacity-10 cursor-pointer"
    ></div>
  </div>
</template>
