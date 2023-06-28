import assets from '@/assets/ow-assets.json';

export interface OWProfile {
  summary: ProfileSummary;
  stats: PerPlatform<PerGamemode<ProfileStats>>;
}

export interface PerPlatform<T> {
  pc: T | null;
  console: T | null;
}

export interface PerGamemode<T> {
  quickplay: T | null;
  competitive: T | null;
}

export interface PerRole<T> {
  tank: T | null;
  damage: T | null;
  support: T | null;
}

export interface ProfileStats {
  heroes_comparisons: HeroesComparisons;
  career_stats: { [key: string]: CareerStat[] | null };
}

export interface CareerStat {
  category: Category;
  label: string;
  stats: LabeledStat[];
}

export interface LabeledStat {
  key: string;
  label: string;
  value: number;
}

export interface HeroesComparisons {
  time_played: HeroesValueList;
  games_won: HeroesValueList;
  weapon_accuracy: HeroesValueList;
  win_percentage: HeroesValueList | null;
  eliminations_per_life: HeroesValueList;
  critical_hit_accuracy: HeroesValueList;
  multikill_best: HeroesValueList;
  objective_kills: HeroesValueList;
}

export interface HeroesValueList {
  label: string;
  values: HeroValue[];
}

export interface HeroValue {
  hero: string;
  value: number;
}

export interface PlayerSummary {
  username: string;
  avatar: string;
  namecard: string;
  title: string;
  endorsement: Endorsement;
  privacy: string;
}

export interface ProfileSummary extends PlayerSummary {
  competitive: PerPlatform<CompetitiveSummary>;
}

export interface CompetitiveSummary extends PerRole<Rank> {
  season: number;
}

export interface Rank {
  division: RankDivision;
  tier: number;
  role_icon: string;
  rank_icon: string;
}

export interface Endorsement {
  level: number;
  frame: string;
}

export enum Category {
  Assists = 'assists',
  Average = 'average',
  Best = 'best',
  Combat = 'combat',
  Game = 'game',
  HeroSpecific = 'hero_specific',
  MatchAwards = 'match_awards',
}

export enum RankDivision {
  Bronze = 'bronze',
  Silver = 'silver',
  Gold = 'gold',
  Platinum = 'platinum',
  Diamond = 'diamond',
  Master = 'master',
  Grandmaster = 'grandmaster',
}

export function rankDivisionIndex(division: RankDivision): number {
  switch (division) {
    case RankDivision.Bronze:
      return 0;
    case RankDivision.Silver:
      return 1;
    case RankDivision.Gold:
      return 2;
    case RankDivision.Platinum:
      return 3;
    case RankDivision.Diamond:
      return 4;
    case RankDivision.Master:
      return 5;
    case RankDivision.Grandmaster:
      return 6;
  }
}

export function rankToIndex(rank: Rank): number {
  return rankDivisionIndex(rank.division) * 10 + 6 - rank.tier;
}

export interface OWAssets {
  heroes: {
    [name: string]: string;
  };
}

export const owAssets: OWAssets = assets;
