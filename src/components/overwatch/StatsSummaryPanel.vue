<script setup lang="ts">
import type { BasicStats, GameStats, Role, StatsSummary } from '@/owProfile';
import SingleStatCard from './SingleStatCard.vue';
import CircleStatCard from './CircleStatCard.vue';
import { toShortDurationString } from '@/helper';
import VueFeather from 'vue-feather';
import ComparisonStatCard from './ComparisonStatCard.vue';
import HeroSelectorCard from './HeroSelectorCard.vue';
import { computed, inject, reactive } from 'vue';
import type { SelectedType } from './RoleHeroSelector.vue';
import PlainTextCard from './PlainTextCard.vue';
import TableStatCard from './TableStatCard.vue';
import get from 'lodash/get';
import PopupModal from '../ui/PopupModal.vue';
import HeroLeaderboard from './HeroLeaderboard.vue';

const props = defineProps<{ stats: StatsSummary }>();

const heroSelection =
  inject<{
    type: SelectedType;
    key: string;
  }>('hero-selection') ??
  reactive({
    type: 'all-hero' as SelectedType,
    key: '',
  });

const gameStats = computed(() => {
  if (heroSelection.type === 'all-hero') return props.stats.general;
  else if (heroSelection.type === 'role') return props.stats.roles[heroSelection.key as Role];
  else if (heroSelection.type === 'hero') return props.stats.heroes[heroSelection.key];
  else return undefined;
});

type PrimitiveKeys<T> = keyof {
  [K in keyof T as T[K] extends number | string ? K : never]: T[K];
};
const leaderboard = reactive<{
  key:
    | PrimitiveKeys<GameStats>
    | `${Exclude<keyof GameStats, PrimitiveKeys<GameStats>>}.${keyof BasicStats}`
    | undefined;
  title: string;
  formatter: undefined | ((val: number) => string);
}>({
  key: undefined,
  title: '',
  formatter: undefined,
});

const leaderboardData = computed(() => {
  const selected = leaderboard.key;
  if (!selected) return undefined;
  return Object.entries(props.stats.heroes)
    .map(([hero, heroStats]) => ({
      hero,
      value: heroStats ? get(heroStats, selected) : Number.NaN,
    }))
    .sort((a, b) => b.value - a.value);
});
</script>

<template>
  <div class="flex flex-wrap align-center justify-center gap-4 max-w-3bw">
    <HeroSelectorCard
      selection-type="everything"
      v-model:selected-type="heroSelection.type"
      v-model:selected-key="heroSelection.key"
    ></HeroSelectorCard>
    <PlainTextCard v-if="!gameStats" text="No data">
      <template #icon> <VueFeather type="cloud-off" class="text-slate-400" :size="30" /> </template
    ></PlainTextCard>
    <template v-if="!!gameStats">
      <SingleStatCard
        title="Time Played"
        :stat="toShortDurationString(gameStats.time_played)"
        @click="
          () => {
            leaderboard.key = 'time_played';
            leaderboard.title = 'Time Played';
            leaderboard.formatter = toShortDurationString;
          }
        "
      >
        <template #icon>
          <VueFeather type="clock" class="text-slate-400" :size="30" />
        </template>
      </SingleStatCard>
      <SingleStatCard
        title="Games Played"
        :stat="gameStats.games_played.toString()"
        @click="
          () => {
            leaderboard.key = 'games_played';
            leaderboard.title = 'Games Played';
            leaderboard.formatter = undefined;
          }
        "
      >
        <template #icon>
          <VueFeather type="zap" class="text-slate-400" :size="30" />
        </template>
      </SingleStatCard>
      <ComparisonStatCard
        left-title="Games Won"
        :left-stat="gameStats.games_won.toString()"
        right-title="Games Lost"
        :right-stat="gameStats.games_lost.toString()"
        :ratio="gameStats.games_won / (gameStats.games_won + gameStats.games_lost)"
      >
        <template #icon>
          <VueFeather type="flag" class="text-slate-400" :size="30" />
        </template>
      </ComparisonStatCard>
      <CircleStatCard
        title="Win Rate"
        :stat="gameStats.winrate.toString() + '%'"
        :ratio="gameStats.winrate / 100"
        @click="
          () => {
            leaderboard.key = 'winrate';
            leaderboard.title = 'Win Rate';
            leaderboard.formatter = val => val + '%';
          }
        "
      >
        <template #icon>
          <VueFeather type="flag" class="text-slate-400" :size="30" />
        </template>
      </CircleStatCard>
      <ComparisonStatCard
        left-title="Eliminations/Assists"
        :left-stat="(gameStats.total.eliminations + gameStats.total.assists).toString()"
        right-title="Deaths"
        :right-stat="gameStats.total.deaths.toString()"
        :ratio="
          (gameStats.total.eliminations + gameStats.total.assists) /
          (gameStats.total.eliminations + gameStats.total.assists + gameStats.total.deaths)
        "
      >
        <template #icon>
          <VueFeather type="crosshair" class="text-slate-400" :size="30" />
        </template>
      </ComparisonStatCard>
      <CircleStatCard
        title="KDA"
        :stat="gameStats.kda.toString()"
        :ratio="gameStats.kda / (gameStats.kda + 1)"
        @click="
          () => {
            leaderboard.key = 'kda';
            leaderboard.title = 'KDA';
            leaderboard.formatter = undefined;
          }
        "
      >
        <template #icon>
          <VueFeather type="crosshair" class="text-slate-400" :size="30" />
        </template>
      </CircleStatCard>
      <TableStatCard
        :row-labels="Object.keys(gameStats.total)"
        :columns="{ Total: gameStats.total, 'Average per 10': gameStats.average }"
      />
    </template>
    <PopupModal
      :show="!!leaderboard.key"
      @update:show="
        val => {
          if (!val) leaderboard.key = undefined;
        }
      "
    >
      <HeroLeaderboard
        v-if="!!leaderboardData"
        :data="leaderboardData"
        :title="leaderboard.title"
        :formatter="leaderboard.formatter ?? (val => val.toString())"
        class="m-8"
      />
    </PopupModal>
  </div>
</template>
