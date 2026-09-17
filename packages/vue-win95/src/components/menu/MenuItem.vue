<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../utils/cn";

const props = withDefaults(
  defineProps<{
    disabled?: boolean;
    class?: string;
  }>(),
  { disabled: false }
);

const emit = defineEmits<{ click: [] }>();

const classes = computed(() =>
  cn(
    "list-none m-0 px-2 py-0.5 border-0 rounded-none",
    "bg-transparent font-w95 text-w95 text-w95-text",
    "cursor-default select-none",
    "hover:bg-w95-blue hover:text-w95-highlight",
    "focus:outline-none focus:bg-w95-blue focus:text-w95-highlight",
    props.disabled &&
      "text-w95-shadow pointer-events-none [text-shadow:1px_1px_0_var(--w95-button-highlight)]",
    props.class
  )
);
</script>

<template>
  <li
    role="menuitem"
    :class="classes"
    :aria-disabled="disabled || undefined"
    :tabindex="disabled ? -1 : 0"
    @click="!disabled && emit('click')"
  >
    <slot />
  </li>
</template>
