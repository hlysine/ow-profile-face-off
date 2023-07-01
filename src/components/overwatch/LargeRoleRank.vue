<script setup lang="ts">
import type { RoleInfo, Rank, Role } from '@/owProfile';
import { inject } from 'vue';

const props = defineProps<{ role: Role; rank: Rank | null | undefined }>();

const roles = inject<RoleInfo[]>('roles')!;
const roleInfo = roles.find(r => r.key === props.role);
</script>

<template>
  <div class="w-20 flex flex-col gap-4 items-center justify-center">
    <img class="w-12 opacity-70" :src="roleInfo?.icon" />
    <span class="uppercase text-slate-400">{{ roleInfo?.name }}</span>
    <img v-if="!!rank" class="h-12" :src="rank.rank_icon" />
    <div v-else class="h-12 flex items-center">-</div>
  </div>
</template>
