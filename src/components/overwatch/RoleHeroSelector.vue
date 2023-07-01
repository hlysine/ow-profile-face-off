<script setup lang="ts">
import { computed, inject } from 'vue';
import CustomButton from '../ui/CustomButton.vue';
import { type HeroInfo, type RoleInfo } from '@/owProfile';

export type SelectionType = 'role' | 'hero' | 'role-hero' | 'all-or-one' | 'all-or-role' | 'everything';
export type SelectedType = 'role' | 'hero' | 'all-hero';

const props = withDefaults(
  defineProps<{
    selectionType?: SelectionType;
    selectedType: SelectedType;
    selectedKey: string;
  }>(),
  { selectionType: 'everything' }
);
const emit = defineEmits<{
  'update:selectedType': [type: SelectedType];
  'update:selectedKey': [key: string];
}>();
const type = computed({
  get() {
    return props.selectedType;
  },
  set(val: SelectedType) {
    emit('update:selectedType', val);
  },
});
const key = computed({
  get() {
    return props.selectedKey;
  },
  set(val: string) {
    emit('update:selectedKey', val);
  },
});
const selectables = computed(() => ({
  allHeroes: ['all-or-one', 'all-or-role', 'everything'].includes(props.selectionType),
  heroes: ['hero', 'role-hero', 'all-or-one', 'everything'].includes(props.selectionType),
  roles: ['role', 'role-hero', 'all-or-role', 'everything'].includes(props.selectionType),
}));

const heroes = inject<HeroInfo[]>('heroes')!;
const roles = inject<RoleInfo[]>('roles')!;

function select(newType: SelectedType, newKey: string) {
  type.value = newType;
  key.value = newKey;
}
</script>

<template>
  <div class="w-full flex flex-col gap-4 items-start">
    <div class="flex w-full gap-4 items-center">
      <span class="text-3xl text-slate-400 flex-1">{{ selectables.heroes ? 'Hero' : 'Role' }} Selection</span>
      <CustomButton
        v-if="selectables.allHeroes"
        :type="type === 'all-hero' ? 'primary' : 'flat'"
        class="text-2xl"
        :clickable="selectables.allHeroes"
        @click="select('all-hero', '')"
        >All Heroes
      </CustomButton>
    </div>
    <div class="flex gap-4" :class="{ 'flex-col': selectables.heroes, 'justify-center w-full': !selectables.heroes }">
      <div v-for="role in roles" :key="role.key" class="flex gap-4 items-center">
        <CustomButton
          :type="type === 'role' && key === role.key ? 'primary' : 'flat'"
          class="shrink-0 !p-0 !shadow-blue-900 w-20"
          :class="{
            'scale-110 !bg-blue-600': type === 'role' && key === role.key,
          }"
          :clickable="selectables.roles"
          @click="select('role', role.key)"
        >
          <div class="flex flex-col items-center justify-center w-full h-full">
            <div class="flex items-center justify-center w-16 p-2">
              <img :src="role.icon" class="w-full" />
            </div>
            <span class="px-2">{{ role.name }}</span>
          </div>
        </CustomButton>
        <div v-if="selectables.heroes" class="shrink-0 w-[1px] h-20 mx-4 border border-slate-600"></div>
        <div v-if="selectables.heroes" class="flex flex-wrap gap-3 items-center">
          <CustomButton
            v-for="hero in heroes.filter(h => h.role === role.key)"
            :key="hero.key"
            :type="type === 'hero' && key === hero.key ? 'raised' : 'flat'"
            class="!p-0"
            :class="{
              'scale-110': type === 'hero' && key === hero.key,
            }"
            :clickable="selectables.heroes"
            @click="select('hero', hero.key)"
          >
            <div class="flex flex-col w-full items-center gap-1">
              <img :src="hero.portrait" class="w-24 border border-slate-700" />
              <span class="text-sm overflow-hidden mb-1">{{ hero.name }}</span>
            </div>
          </CustomButton>
        </div>
      </div>
    </div>
  </div>
</template>
