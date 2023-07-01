import { Platform, rankToIndex, type PerPlatform, type CompetitiveSummary } from '@/owProfile';
import { computed, type Ref } from 'vue';

export default function useCompetitiveSummary(competitiveSummary: Ref<PerPlatform<CompetitiveSummary> | null>) {
  const platform = computed<Platform>(() => {
    if (!competitiveSummary.value) return Platform.PC;
    const { pc, console } = competitiveSummary.value;
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
      return Platform.PC;
    } else {
      return Platform.Console;
    }
  });
  const competitive = computed(() => competitiveSummary.value?.[platform.value]);
  return { platform, competitive };
}
