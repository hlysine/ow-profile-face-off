<script setup lang="ts">
import RankedPlayerCard from '@/components/overwatch/RankedPlayerCard.vue';
import TextBox from '@/components/ui/TextBox.vue';
import type { OWProfile } from '@/owProfile';
import { computed, ref, watchEffect } from 'vue';
import debounce from 'lodash/debounce';

const battleTagRegex = /^[^#]+#\d+$/;

const battleTag = ref('');
const validationError = computed(() => {
  const tag = battleTag.value;
  if (tag.length === 0 || battleTagRegex.test(tag)) {
    return null;
  } else {
    return 'Invalid Battle Tag';
  }
});

const profile = ref<OWProfile | { error: string } | null>(null);
const fetching = ref(false);

async function fetchProfileRaw(player: string) {
  fetching.value = true;
  player = player.replace('#', '-');
  const res = await fetch(
    `https://api.allorigins.win/get?url=${encodeURIComponent(`https://overfast-api.tekrop.fr/players/${player}`)}`
  );
  const data: OWProfile | { error: string } = JSON.parse((await res.json()).contents);
  profile.value = data;
  fetching.value = false;
}

const fetchProfile = debounce(fetchProfileRaw, 500, {
  leading: false,
  trailing: true,
});

watchEffect(() => {
  if (validationError.value || battleTag.value === '') {
    profile.value = null;
  } else {
    fetchProfile(battleTag.value);
  }
});
</script>

<template>
  <div class="flex flex-col items-center">
    <TextBox
      v-model="battleTag"
      class="m-4 w-[320px] mb-1"
      :class="{ 'animate-pulse': fetching }"
      placeholder="Type in your Battle Tag"
      :is-valid="!validationError"
    />
    <span v-if="!!validationError" class="text-xs text-red-600">{{ validationError }}</span>
    <span v-else-if="!!profile && 'error' in profile" class="leading-10">{{ profile.error }}</span>
    <RankedPlayerCard v-else-if="!!profile" class="m-4 shadow-lg" :profile="profile.summary" />
  </div>
</template>
