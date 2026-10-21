<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../utils/cn";
import { FormCtx } from "./context";

const props = withDefaults(
  defineProps<{
    labelWidth?: string | number;
    disabled?: boolean;
    class?: string;
  }>(),
  { labelWidth: 80, disabled: false }
);

const emit = defineEmits<{ submit: [event: Event] }>();

const width = computed(() =>
  typeof props.labelWidth === "number" ? `${props.labelWidth}px` : props.labelWidth
);

FormCtx.provide(
  computed(() => ({
    labelWidth: width.value,
    disabled: props.disabled,
  }))
);

function onSubmit(e: Event) {
  e.preventDefault();
  emit("submit", e);
}

const classes = computed(() => cn("flex flex-col gap-2 font-w95 text-w95", props.class));
</script>

<template>
  <form :class="classes" @submit="onSubmit">
    <slot />
  </form>
</template>
