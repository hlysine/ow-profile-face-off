<script setup lang="ts">
import { fetchSummaryById, fillSummary, type PlayerSearchItem } from '@/owProfile';
import RankedPlayerCard from './RankedPlayerCard.vue';
import useImperativeFetch from '@/composables/useImperativeFetch';
import { computed } from 'vue';
import CustomButton from '@/components/ui/CustomButton.vue';
import { useRouter } from 'vue-router';

const props = defineProps<{ playerId: string; searchItem?: PlayerSearchItem }>();

const { fetching, result, fetch } = useImperativeFetch(fetchSummaryById, 0);

const displayResult = computed(() => {
  if (!!result.value && !('error' in result.value)) {
    return result.value;
  } else if (props.searchItem) {
    return fillSummary(props.searchItem);
  } else {
    return result.value;
  }
});

const router = useRouter();

function openProfile() {
  router.push({
    name: 'profile',
    params: {
      playerId: props.playerId,
    },
  });
}
</script>

<template>
  <p v-if="!!displayResult && 'error' in displayResult">{{ displayResult.error }}</p>
  <div v-else-if="!!displayResult" class="relative">
    <RankedPlayerCard
      :class="{ 'animate-pulse': fetching }"
      :profile="displayResult"
      :clickable="displayResult === result"
      @click="openProfile"
    />
    <div
      v-if="displayResult !== result"
      class="absolute top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center bg-gradient-to-t from-slate-950 via-slate-900 via-40% to-transparent border border-slate-800 box-border"
    >
      <CustomButton @click="e => fetch(props.playerId)" type="flat">Load Preview</CustomButton>
    </div>
  </div>
</template>
