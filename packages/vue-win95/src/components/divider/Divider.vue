<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../utils/cn";

const props = withDefaults(
  defineProps<{
    vertical?: boolean;
    class?: string;
  }>(),
  {
    vertical: false,
  }
);

const rootClasses = computed(() =>
  cn(
    "bg-transparent border-0 p-0 shrink-0",
    props.vertical
      ? "w-[2px] self-stretch [box-shadow:inset_1px_0_#808080,inset_-1px_0_#ffffff]"
      : "h-[2px] w-full [box-shadow:inset_0_1px_#808080,inset_0_-1px_#ffffff]",
    props.class
  )
);
</script>

<template>
  <div :class="rootClasses" role="separator" :aria-orientation="vertical ? 'vertical' : 'horizontal'" />
</template>
