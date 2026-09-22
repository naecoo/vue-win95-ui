<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../utils/cn";

const props = withDefaults(
  defineProps<{
    href?: string;
    disabled?: boolean;
    class?: string;
  }>(),
  { href: undefined, disabled: false }
);

const emit = defineEmits<{ click: [e: MouseEvent] }>();

const classes = computed(() =>
  cn(
    "font-w95 text-w95 w95-focus-link",
    "cursor-default select-none",
    "transition-colors duration-75",
    props.disabled
      ? "text-w95-shadow pointer-events-none [text-shadow:1px_1px_0_#fff] no-underline"
      : "text-w95-link underline-offset-2 hover:underline",
    props.class
  )
);
</script>

<template>
  <a
    :href="disabled ? undefined : href"
    :class="classes"
    :aria-disabled="disabled || undefined"
    :tabindex="disabled ? -1 : undefined"
    @click="!disabled && emit('click', $event)"
  >
    <slot />
  </a>
</template>
