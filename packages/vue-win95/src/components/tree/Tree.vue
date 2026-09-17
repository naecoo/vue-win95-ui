<script setup lang="ts">
import { computed, provide } from "vue";
import { cn } from "../../utils/cn";

const props = withDefaults(
  defineProps<{
    modelValue?: string | number | null;
    class?: string;
  }>(),
  { modelValue: null }
);

const emit = defineEmits<{
  "update:modelValue": [value: string | number | null];
}>();

provide(
  "w95-tree",
  computed(() => ({
    selected: props.modelValue,
    select: (v: string | number | null) => emit("update:modelValue", v),
  }))
);

const classes = computed(() =>
  cn(
    "list-none m-0 p-1.5",
    "bg-w95-highlight font-w95 text-w95 text-w95-text",
    "shadow-w95-field",
    props.class
  )
);
</script>

<template>
  <ul role="tree" :class="classes" class="[&>li]:list-none [&_ul]:ml-4 [&_ul]:pl-4 [&_ul]:border-l [&_ul]:border-dotted [&_ul]:border-w95-shadow [&_ul]:list-none">
    <slot />
  </ul>
</template>
