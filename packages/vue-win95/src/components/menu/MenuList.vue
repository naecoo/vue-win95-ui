<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../utils/cn";

const props = withDefaults(
  defineProps<{
    class?: string;
  }>(),
  {}
);

const classes = computed(() =>
  cn(
    "list-none m-0 p-0.5 min-w-[120px]",
    "bg-w95-surface font-w95 text-w95 text-w95-text",
    "shadow-w95-raised",
    props.class
  )
);
</script>

<template>
  <ul role="menu" :class="classes">
    <slot />
  </ul>
</template>
