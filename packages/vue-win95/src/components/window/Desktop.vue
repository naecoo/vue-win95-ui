<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../utils/cn";
import { useLocale } from "../../locale";

const props = withDefaults(
  defineProps<{
    /** 桌面背景色，默认 Win95 青绿 */
    background?: string;
    class?: string;
  }>(),
  { background: undefined }
);

const { t } = useLocale();

const classes = computed(() =>
  cn(
    "relative w-full h-full overflow-hidden font-w95",
    "bg-w95-desktop",
    props.class
  )
);

const style = computed(() => (props.background ? { background: props.background } : undefined));
</script>

<template>
  <div :class="classes" :style="style" role="application" :aria-label="t('desktop.label')">
    <slot />
  </div>
</template>
