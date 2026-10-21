<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../utils/cn";
import { useLocale } from "../../locale";

const props = withDefaults(
  defineProps<{
    class?: string;
  }>(),
  {}
);

const { t } = useLocale();

const classes = computed(() =>
  cn(
    "flex items-stretch gap-px px-[2px] py-[2px]",
    "bg-w95-surface shadow-w95-raised font-w95 text-w95",
    props.class
  )
);
</script>

<template>
  <div :class="classes" role="toolbar" :aria-label="t('taskbar.label')">
    <slot />
  </div>
</template>
