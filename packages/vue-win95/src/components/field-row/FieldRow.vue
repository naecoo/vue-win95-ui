<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../utils/cn";

const props = withDefaults(
  defineProps<{
    stacked?: boolean;
    class?: string;
  }>(),
  {
    stacked: false,
  }
);

const rootClasses = computed(() =>
  cn(
    "font-w95 text-w95 text-w95-text",
    props.stacked ? "flex flex-col gap-1.5" : "flex items-center gap-1.5",
    props.class
  )
);
</script>

<template>
  <div :class="rootClasses">
    <slot />
  </div>
</template>
