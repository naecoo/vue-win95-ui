<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../utils/cn";

const props = withDefaults(
  defineProps<{
    value?: number;
    max?: number;
    segmented?: boolean;
    label?: string;
    class?: string;
  }>(),
  {
    value: 0,
    max: 100,
    segmented: false,
    label: "Progress",
  }
);

const pct = computed(() => {
  const p = (props.value / props.max) * 100;
  return Math.max(0, Math.min(100, p));
});

const rootClasses = computed(() =>
  cn(
    "relative box-border h-w95-progress px-1 py-1",
    "bg-transparent shadow-w95-progress-inner border-0",
    props.class
  )
);

const barStyle = computed(() => {
  if (props.segmented) {
    return {
      width: `${pct.value}%`,
      backgroundImage:
        "linear-gradient(90deg, #000080 0 16px, transparent 0 18px)",
      backgroundRepeat: "repeat",
      backgroundSize: "18px 100%",
    };
  }
  return { width: `${pct.value}%` };
});
</script>

<template>
  <div
    :class="rootClasses"
    role="progressbar"
    :aria-label="label"
    :aria-valuenow="value"
    aria-valuemin="0"
    :aria-valuemax="max"
  >
    <div
      class="h-full"
      :class="segmented ? '' : 'bg-w95-blue'"
      :style="barStyle"
    />
  </div>
</template>
