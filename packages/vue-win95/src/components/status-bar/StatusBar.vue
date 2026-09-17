<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../utils/cn";

const props = withDefaults(
  defineProps<{
    class?: string;
  }>(),
  {}
);

const rootClasses = computed(() =>
  cn("flex gap-px mx-px mb-px font-w95 text-w95", props.class)
);
</script>

<template>
  <div :class="rootClasses" role="status">
    <slot />
  </div>
</template>
