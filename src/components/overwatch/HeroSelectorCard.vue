<script setup lang="ts">
import { computed, inject, ref } from 'vue';
import CustomButton from '../ui/CustomButton.vue';
import PopupModal from '../ui/PopupModal.vue';
import RoleHeroSelector, { type SelectedType, type SelectionType } from './RoleHeroSelector.vue';
import { type HeroInfo, type RoleInfo } from '@/owProfile';

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
const selecting = ref(false);

const roles = inject<RoleInfo[]>('roles')!;
const heroes = inject<HeroInfo[]>('heroes')!;

const name = computed(() => {
  if (type.value === 'all-hero') return undefined;
  else if (type.value === 'hero') return heroes.find(h => h.key === key.value)?.name;
  else if (type.value === 'role') return roles.find(h => h.key === key.value)?.name;
  else return undefined;
});
const icon = computed(() => {
  if (type.value === 'all-hero') return undefined;
  else if (type.value === 'hero') return heroes.find(h => h.key === key.value)?.portrait;
  else if (type.value === 'role') return roles.find(h => h.key === key.value)?.icon;
  else return undefined;
});
</script>

<template>
  <CustomButton v-bind="$attrs" type="flat" class="flex flex-col w-1bw h-1bh rounded-sm p-4" @click="selecting = true">
    <span class="uppercase text-sm text-slate-400">Showing data for</span>
    <div class="flex flex-1 flex-col items-center justify-center gap-2">
      <span v-if="type === 'all-hero'" class="text-3xl text-blue-400">All Heroes</span>
      <img
        v-if="type === 'hero' || type === 'role'"
        :src="icon"
        class="border border-slate-800 rounded w-24"
        :class="{ 'p-4': type === 'role' }"
      />
      <span v-if="type === 'hero' || type === 'role'" class="text-lg"> {{ name }}</span>
    </div>
  </CustomButton>
  <PopupModal v-model:show="selecting">
    <RoleHeroSelector
      class="p-8"
      :selection-type="props.selectionType"
      :selected-type="type"
      :selected-key="key"
      @update:selected-key="
        newKey => {
          key = newKey;
          selecting = false;
        }
      "
      @update:selected-type="
        newType => {
          type = newType;
          selecting = false;
        }
      "
    />
  </PopupModal>
</template>
