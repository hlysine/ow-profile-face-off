<script setup lang="ts">
import type { Role, StatsSummary } from '@/owProfile';
import SingleStatCard from './SingleStatCard.vue';
import CircleStatCard from './CircleStatCard.vue';
import { toShortDurationString } from '@/helper';
import VueFeather from 'vue-feather';
import ComparisonStatCard from './ComparisonStatCard.vue';
import HeroSelectorCard from './HeroSelectorCard.vue';
import { computed, reactive } from 'vue';
import type { SelectedType } from './RoleHeroSelector.vue';
import PlainTextCard from './PlainTextCard.vue';
import TableStatCard from './TableStatCard.vue';

const props = defineProps<{ stats: StatsSummary }>();

const heroSelection = reactive({
  type: 'all-hero' as SelectedType,
  key: '',
});

const gameStats = computed(() => {
  if (heroSelection.type === 'all-hero') return props.stats.general;
  else if (heroSelection.type === 'role') return props.stats.roles[heroSelection.key as Role];
  else if (heroSelection.type === 'hero') return props.stats.heroes[heroSelection.key];
  else return undefined;
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
      <SingleStatCard title="Time Played" :stat="toShortDurationString(gameStats.time_played)">
        <template #icon>
          <VueFeather type="clock" class="text-slate-400" :size="30" />
        </template>
      </SingleStatCard>
      <SingleStatCard title="Games Played" :stat="gameStats.games_played.toString()">
        <template #icon>
          <VueFeather type="zap" class="text-slate-400" :size="30" />
        </template>
      </SingleStatCard>
      <ComparisonStatCard
        left-title="Games Won"
        :left-stat="gameStats.games_won.toString()"
        right-title="Games Lost"
        :right-stat="gameStats.games_lost.toString()"
        :ratio="gameStats.winrate / 100"
      >
        <template #icon>
          <VueFeather type="flag" class="text-slate-400" :size="30" />
        </template>
      </ComparisonStatCard>
      <CircleStatCard title="Win Rate" :stat="gameStats.winrate.toString() + '%'" :ratio="gameStats.winrate / 100">
        <template #icon>
          <VueFeather type="flag" class="text-slate-400" :size="30" />
        </template>
      </CircleStatCard>
      <ComparisonStatCard
        left-title="Eliminations/Assists"
        :left-stat="(gameStats.total.eliminations + gameStats.total.assists).toString()"
        right-title="Deaths"
        :right-stat="gameStats.total.deaths.toString()"
        :ratio="gameStats.kda / 2"
      >
        <template #icon>
          <VueFeather type="crosshair" class="text-slate-400" :size="30" />
        </template>
      </ComparisonStatCard>
      <CircleStatCard title="KDA" :stat="gameStats.kda.toString()" :ratio="gameStats.kda / (gameStats.kda + 1)">
        <template #icon>
          <VueFeather type="crosshair" class="text-slate-400" :size="30" />
        </template>
      </CircleStatCard>
      <TableStatCard
        :row-labels="Object.keys(gameStats.total)"
        :columns="{ total: gameStats.total, 'Average per 10': gameStats.average }"
      />
    </template>
  </div>
</template>
