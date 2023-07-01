<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  rowLabels: string[];
  columns: Record<string, any>;
}>();

const columnEntries = computed(() => Object.entries(props.columns));
</script>

<template>
  <table class="w-3bw h-2bh rounded-sm bg-slate-800 overflow-hidden">
    <colgroup>
      <col class="w-[30%]" />
      <col class="w-[35%]" />
      <col class="w-[35%]" />
    </colgroup>
    <thead>
      <tr>
        <th></th>
        <th v-for="[header] in columnEntries" :key="header" class="uppercase font-normal text-blue-400">
          {{ header }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in rowLabels" :key="row" class="odd:bg-slate-900">
        <th class="uppercase font-normal text-left text-blue-400 pl-8">{{ row }}</th>
        <td v-for="[header, data] in columnEntries" :key="header" class="text-center font-light text-slate-200">
          {{ data[row] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
