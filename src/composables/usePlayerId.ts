import { computed } from 'vue';
import { useRoute } from 'vue-router';

export default function usePlayerId() {
  const route = useRoute();
  return computed(() => {
    const id = route.params.playerId;
    return Array.isArray(id) ? id[0] : id;
  });
}
