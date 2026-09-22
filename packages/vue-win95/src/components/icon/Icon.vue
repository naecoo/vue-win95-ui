<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../utils/cn";

const props = withDefaults(
  defineProps<{
    name: string;
    size?: number;
    label?: string;
    class?: string;
  }>(),
  { size: 16, label: "" }
);

/** Built-in pixel glyphs */
const glyphs: Record<string, string> = {
  folder: "📁",
  computer: "💻",
  help: "?",
  warning: "!",
  error: "✕",
  info: "i",
  ok: "✓",
  search: "🔍",
  star: "★",
  file: "📄",
  close: "✕",
  minimize: "▁",
  maximize: "□",
};

const text = computed(() => glyphs[props.name] ?? props.name.slice(0, 2));

const classes = computed(() =>
  cn(
    "inline-flex items-center justify-center shrink-0 select-none",
    "bg-transparent border-0 p-0 font-w95 leading-none",
    props.class
  )
);

const style = computed(() => ({
  width: `${props.size}px`,
  height: `${props.size}px`,
  fontSize: `${Math.max(10, props.size - 4)}px`,
}));
</script>

<template>
  <span
    :class="classes"
    :style="style"
    :role="label ? 'img' : undefined"
    :aria-label="label || undefined"
    :aria-hidden="label ? undefined : true"
    :title="label || undefined"
  >
    {{ text }}
  </span>
</template>
