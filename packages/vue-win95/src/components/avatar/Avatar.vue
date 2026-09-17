<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../utils/cn";

const props = withDefaults(
  defineProps<{
    src?: string;
    alt?: string;
    initials?: string;
    size?: "sm" | "md" | "lg";
    class?: string;
  }>(),
  { src: undefined, alt: "", initials: "?", size: "md" }
);

const sizeCls = {
  sm: "w-6 h-6 text-[9px]",
  md: "w-8 h-8 text-[11px]",
  lg: "w-12 h-12 text-[14px]",
}[props.size];

const classes = computed(() =>
  cn(
    "inline-flex items-center justify-center shrink-0",
    "bg-w95-highlight shadow-w95-field font-w95 text-w95 text-w95-text",
    "overflow-hidden select-none",
    sizeCls,
    props.class
  )
);
</script>

<template>
  <span :class="classes" :title="alt || initials">
    <img v-if="src" :src="src" :alt="alt" class="w-full h-full object-cover" />
    <span v-else aria-hidden="true">{{ initials }}</span>
  </span>
</template>
