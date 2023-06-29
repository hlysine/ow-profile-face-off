import { type Ref, ref } from 'vue';
import debounce from 'lodash/debounce';

interface QueueEntry {
  task: () => Promise<any>;
  resolver: (payload: any) => void;
}

const taskQueue: QueueEntry[] = [];

setInterval(async () => {
  const entry = taskQueue.shift();
  if (entry) {
    entry.resolver(await entry.task());
  }
}, 1000);

/**
 * Create a fetch function with refs and debouncing.
 * @param fetchFunc An async function that fetch data.
 * @param debounceMs Debounce delay. Set to 0 to disable debouncing, set to negative to trigger on leading edge instead of trailing edge.
 */
export default function useImperativeFetch<TResult, TArgs extends unknown[]>(
  fetchFunc: (...args: TArgs) => Promise<TResult>,
  debounceMs: number
) {
  const fetching = ref(false);
  const result: Ref<TResult | null> = ref(null);
  let fetch: (...args: TArgs) => Promise<void> | undefined = async (...args: TArgs) => {
    fetching.value = true;
    result.value = await new Promise(resolve => {
      taskQueue.push({
        task: () => fetchFunc(...args),
        resolver: resolve,
      });
    });
    fetching.value = false;
  };
  if (debounceMs !== 0) {
    fetch = debounce(fetch, Math.abs(debounceMs), { leading: debounceMs < 0, trailing: debounceMs > 0 });
  }
  return {
    fetching,
    result,
    fetch,
  };
}
