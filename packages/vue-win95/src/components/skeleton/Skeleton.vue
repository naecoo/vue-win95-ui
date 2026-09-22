<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../utils/cn";

const props = withDefaults(
  defineProps<{
    width?: string | number;
    height?: string | number;
    lines?: number;
    class?: string;
  }>(),
  { width: "100%", height: 14, lines: 1 }
);

const blockStyle = computed(() => ({
  width: typeof props.width === "number" ? `${props.width}px` : props.width,
  height: typeof props.height === "number" ? `${props.height}px` : props.height,
}));

const bar = cn(
  "bg-w95-surface shadow-w95-field my-1",
  "animate-pulse motion-reduce:animate-none"
);
</script>

<template>
  <div
    :class="cn('font-w95 text-w95', props.class)"
    role="status"
    aria-live="polite"
    aria-busy="true"
    aria-label="Loading"
  >
    <div v-for="i in lines" :key="i" :class="bar" :style="blockStyle" />
  </div>
</template>
