<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../utils/cn";

const props = withDefaults(
  defineProps<{
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    default?: boolean;
    block?: boolean;
    class?: string;
  }>(),
  {
    type: "button",
    disabled: false,
    default: false,
    block: false,
  }
);

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const classes = computed(() =>
  cn(
    "box-border border-0 rounded-none cursor-default select-none",
    "font-w95 text-w95 w95-btn-motion",
    "min-w-w95-btn min-h-w95-btn px-3",
    "bg-w95-surface",
    // raised → sunken on active
    props.default ? "shadow-w95-default-btn" : "shadow-w95-raised",
    "active:shadow-w95-sunken active:pt-0.5 active:pl-[14px] active:pr-2.5 active:pb-0",
    "hover:shadow-w95-sunken hover:pt-0.5 hover:pl-[14px] hover:pr-2.5 hover:pb-0",
    "w95-focus",
    "disabled:text-w95-shadow disabled:cursor-not-allowed",
    "disabled:hover:shadow-w95-raised disabled:hover:pt-0 disabled:hover:pl-3 disabled:hover:pr-3 disabled:hover:pb-0",
    "text-w95-text",
    "disabled:active:pt-0 disabled:active:pl-3 disabled:active:pr-3 disabled:active:pb-0",
    props.block && "w-full block",
    props.class
  )
);

function onClick(e: MouseEvent) {
  if (!props.disabled) emit("click", e);
}
</script>

<template>
  <button :type="type" :class="classes" :disabled="disabled" @click="onClick">
    <slot />
  </button>
</template>
