import assets from '@/assets/ow-assets.json';

export interface OWProfile {
  summary: ProfileSummary;
  stats: PerPlatform<PerGamemode<ProfileStats>>;
}

export type PerPlatform<T> = {
  [key in Platform]: T | null;
};

export type PerGamemode<T> = {
  [key in Gamemode]: T | null;
};

export type PerRole<T> = {
  [key in Role]: T | null;
};

export interface PerHero<T> {
  [hero: string]: T | null | undefined;
}

export interface ProfileStats {
  heroes_comparisons: HeroesComparisons;
  career_stats: PerHero<CareerStat[]>;
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
  competitive: PerPlatform<CompetitiveSummary> | null;
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

export interface PlayerSearchItem {
  player_id: string;
  name: string;
  privacy: string;
  career_url: string;
}

export interface PlayerSearchResult {
  total: number;
  results: PlayerSearchItem[];
}

export interface HeroInfo {
  key: string;
  name: string;
  portrait: string;
  role: Role;
}

export interface RoleInfo {
  key: Role;
  name: string;
  icon: string;
  description: string;
}

export interface StatsSummary {
  general: GameStats;
  roles: PerRole<GameStats>;
  heroes: PerHero<GameStats>;
}

export interface GameStats {
  games_played: number;
  games_won: number;
  games_lost: number;
  time_played: number;
  winrate: number;
  kda: number;
  total: BasicStats;
  average: BasicStats;
}

export interface BasicStats {
  eliminations: number;
  assists: number;
  deaths: number;
  damage: number;
  healing: number;
}

export enum Gamemode {
  QuickPlay = 'quickplay',
  Competitive = 'competitive',
}

export enum Platform {
  PC = 'pc',
  Console = 'console',
}

export enum Role {
  Tank = 'tank',
  Damage = 'damage',
  Support = 'support',
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

export interface APIError {
  error: string;
}

export type APIResponse<T> = T | APIError;

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

export const owAssets = assets;

async function fetchViaProxy(url: string) {
  const res = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
  return JSON.parse((await res.json()).contents);
}

export async function fetchAllHeroes(): Promise<APIResponse<HeroInfo[]>> {
  return await fetchViaProxy(`https://overfast-api.tekrop.fr/heroes`);
}

export async function fetchAllRoles(): Promise<APIResponse<RoleInfo[]>> {
  return await fetchViaProxy(`https://overfast-api.tekrop.fr/roles`);
}

export async function searchPlayerByName(playerName: string): Promise<APIResponse<PlayerSearchResult>> {
  return await fetchViaProxy(`https://overfast-api.tekrop.fr/players?name=${encodeURIComponent(playerName)}&limit=100`);
}

export async function fetchSummaryById(playerId: string): Promise<APIResponse<ProfileSummary>> {
  playerId = playerId.replace('#', '-');
  return await fetchViaProxy(`https://overfast-api.tekrop.fr/players/${playerId}/summary`);
}

interface StatsSummaryFetchOptions {
  gamemode?: Gamemode;
  platform?: Platform;
}

export async function fetchStatsSummaryById(
  playerId: string,
  { gamemode = undefined, platform = undefined }: StatsSummaryFetchOptions = {}
): Promise<APIResponse<StatsSummary>> {
  playerId = playerId.replace('#', '-');
  const queries = [];
  if (gamemode) queries.push(['gamemode', gamemode]);
  if (platform) queries.push(['platform', platform]);
  const queryString = queries.length === 0 ? '' : `?${queries.map(q => q.join('=')).join('&')}`;
  const response = await fetchViaProxy(
    `https://overfast-api.tekrop.fr/players/${playerId}/stats/summary${queryString}`
  );
  if (!('error' in response) && !('general' in response)) {
    return { error: 'No data' };
  }
  return response;
}

export async function fetchProfileById(playerId: string): Promise<APIResponse<OWProfile>> {
  playerId = playerId.replace('#', '-');
  return await fetchViaProxy(`https://overfast-api.tekrop.fr/players/${playerId}`);
}

export function fillSummary(searchItem: PlayerSearchItem): ProfileSummary {
  return {
    username: searchItem.player_id.split('-')[0],
    avatar: '',
    title: '',
    namecard: '',
    privacy: searchItem.privacy,
    endorsement: {
      level: 0,
      frame: '',
    },
    competitive: null,
  };
}
