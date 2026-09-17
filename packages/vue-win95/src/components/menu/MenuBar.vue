<script setup lang="ts">
import { computed, ref } from "vue";
import { useRovingFocus } from "../../composables/useRovingFocus";
import { cn } from "../../utils/cn";

const props = withDefaults(
  defineProps<{
    class?: string;
  }>(),
  {}
);

const listRef = ref<HTMLElement | null>(null);
const { onKeydown, syncTabIndexes } = useRovingFocus(listRef, {
  orientation: "horizontal",
  loop: true,
  selector: '[role="menuitem"]:not([disabled]), button:not([disabled])',
});

import { onMounted } from "vue";
onMounted(() => syncTabIndexes());

const classes = computed(() =>
  cn(
    "flex items-stretch list-none m-0 p-0",
    "bg-w95-surface font-w95 text-w95 text-w95-text",
    "shadow-w95-raised",
    props.class
  )
);
</script>

<template>
  <ul ref="listRef" role="menubar" :class="classes" @keydown="onKeydown">
    <slot />
  </ul>
</template>
