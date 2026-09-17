<script setup lang="ts">
import { computed, ref } from "vue";
import { useRovingFocus } from "../../composables/useRovingFocus";
import { cn } from "../../utils/cn";

const props = withDefaults(defineProps<{ class?: string }>(), {});
const barRef = ref<HTMLElement | null>(null);
const { onKeydown, syncTabIndexes } = useRovingFocus(barRef, {
  orientation: "horizontal",
  loop: true,
  selector: "button:not([disabled])",
});

import { onMounted } from "vue";
onMounted(() => syncTabIndexes());

const classes = computed(() =>
  cn(
    "flex items-center gap-1 list-none m-0 p-1",
    "bg-w95-surface font-w95 text-w95",
    "shadow-w95-raised",
    props.class
  )
);
</script>

<template>
  <div
    ref="barRef"
    role="toolbar"
    :class="classes"
    aria-label="Toolbar"
    @keydown="onKeydown"
  >
    <slot />
  </div>
</template>
