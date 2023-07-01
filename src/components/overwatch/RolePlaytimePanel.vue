<script setup lang="ts">
import type { RoleInfo, OWProfile, StatsSummary, HeroInfo } from '@/owProfile';
import { inject, toRef, type Ref, computed } from 'vue';
import LargeRoleRank from './LargeRoleRank.vue';
import useCompetitiveSummary from '@/composables/useCompetitiveSummary';
import CustomButton from '../ui/CustomButton.vue';
import { toShortDurationString } from '@/helper';
import type { SelectedType } from './RoleHeroSelector.vue';

const props = defineProps<{ stats: StatsSummary }>();
const emit = defineEmits<{
  select: [type: SelectedType, key: string];
}>();

const playerProfile = inject<Ref<OWProfile>>('player-profile')!;
const roles = inject<RoleInfo[]>('roles')!;
const heroes = inject<HeroInfo[]>('heroes')!;
const { competitive } = useCompetitiveSummary(toRef(() => playerProfile.value.summary.competitive));
const mostPlayed = computed(() => {
  const heroStats = Object.entries(props.stats.heroes);
  return Object.fromEntries(
    roles.map(r => [
      r.key,
      heroStats
        .map(([key, value]) => [heroes.find(h => h.key === key)!, value] as const)
        .filter(([key, value]) => key.role === r.key && !!value)
        .sort(([, a], [, b]) => b!.time_played - a!.time_played)
        .slice(0, 3)
        .map(([key, value]) => ({ hero: key, stats: value! })),
    ])
  );
});
</script>

<template>
  <div class="flex flex-col gap-4 max-w-4bw">
    <div v-for="role in roles" :key="role.key" class="flex items-center gap-4 h-1bh">
      <CustomButton type="flat" :clickable="true" @click="emit('select', 'role', role.key)">
        <LargeRoleRank :role="role.key" :rank="competitive?.[role.key]" />
      </CustomButton>
      <div class="border border-slate-600 w-[1px] h-4/5 mx-4"></div>
      <CustomButton
        v-for="heroStats in mostPlayed[role.key]"
        :key="heroStats.hero.key"
        type="raised"
        class="!p-0 h-1bh w-32 bg-slate-800"
        :clickable="true"
        @click="emit('select', 'hero', heroStats.hero.key)"
      >
        <div class="flex flex-col w-full h-full items-center justify-start gap-1">
          <img :src="heroStats.hero.portrait" class="border-b-2 border-slate-600" />
          <span class="text-sm overflow-hidden text-slate-400">{{ heroStats.hero.name }}</span>
          <span class="text-2xl overflow-hidden text-blue-400">{{
            toShortDurationString(heroStats.stats.time_played)
          }}</span>
        </div>
      </CustomButton>
    </div>
  </div>
</template>
