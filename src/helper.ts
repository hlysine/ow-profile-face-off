export function toShortDurationString(seconds: number) {
  if (seconds < 60) return seconds.toFixed(0) + 's';
  seconds /= 60;
  if (seconds < 60) return seconds.toFixed(0) + 'mins';
  seconds /= 60;
  return seconds.toFixed(0) + 'hrs';
}
