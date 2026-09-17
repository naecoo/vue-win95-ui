<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../utils/cn";

const props = withDefaults(
  defineProps<{
    grow?: boolean;
    class?: string;
  }>(),
  {
    grow: true,
  }
);

const rootClasses = computed(() =>
  cn(
    "m-0 px-[3px] py-0.5 shadow-w95-status font-w95 text-w95 text-w95-text",
    props.grow ? "flex-1" : "",
    props.class
  )
);
</script>

<template>
  <p :class="rootClasses">
    <slot />
  </p>
</template>
