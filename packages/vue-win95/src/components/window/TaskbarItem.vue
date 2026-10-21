<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../utils/cn";

const props = withDefaults(
  defineProps<{
    title?: string;
    /** 当前窗口是否为活动窗口 */
    active?: boolean;
    /** 窗口处于最小化（点击恢复） */
    minimized?: boolean;
    class?: string;
  }>(),
  { title: "", active: false, minimized: false }
);

const emit = defineEmits<{ click: [] }>();

const classes = computed(() =>
  cn(
    "box-border border-0 rounded-none cursor-default select-none",
    "h-[22px] min-w-[120px] max-w-[180px] px-2",
    "font-w95 text-w95 text-left truncate",
    "bg-w95-surface",
    "text-transparent [text-shadow:0_0_var(--w95-text)]",
    props.active && !props.minimized ? "shadow-w95-sunken" : "shadow-w95-raised",
    "w95-focus",
    props.class
  )
);
</script>

<template>
  <button
    type="button"
    :class="classes"
    :aria-pressed="props.active && !props.minimized"
    @click="emit('click')"
  >
    {{ title }}
  </button>
</template>
