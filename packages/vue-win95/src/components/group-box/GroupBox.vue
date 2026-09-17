<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../utils/cn";

const props = withDefaults(
  defineProps<{
    legend?: string;
    class?: string;
  }>(),
  {
    legend: "",
  }
);

// GroupBox uses classic engraved double border via inset shadows
const rootClasses = computed(() =>
  cn(
    "relative m-0 box-border",
    "pt-3 px-3 pb-3",
    "bg-w95-surface font-w95 text-w95 text-w95-text",
    "[box-shadow:inset_1px_1px_#ffffff,inset_-1px_-1px_#808080,inset_2px_2px_#c0c0c0,inset_-2px_-2px_#0a0a0a]",
    props.class
  )
);
</script>

<template>
  <fieldset :class="rootClasses">
    <legend
      v-if="legend"
      class="absolute -top-[1px] left-2 bg-w95-surface px-1 text-w95-text font-w95 text-w95 leading-none"
    >
      {{ legend }}
    </legend>
    <slot />
  </fieldset>
</template>
