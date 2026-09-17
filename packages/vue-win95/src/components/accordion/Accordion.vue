<script setup lang="ts">
import { computed, provide } from "vue";
import { useId } from "../../composables/useId";
import { cn } from "../../utils/cn";

const props = withDefaults(
  defineProps<{
    modelValue?: string | number | null;
    class?: string;
  }>(),
  { modelValue: null }
);

const emit = defineEmits<{ "update:modelValue": [value: string | number | null] }>();
const uid = useId("w95-acc");

provide(
  "w95-accordion",
  computed(() => ({
    uid: uid.value,
    openId: props.modelValue,
    toggle: (id: string | number) =>
      emit("update:modelValue", props.modelValue === id ? null : id),
  }))
);

const classes = computed(() => cn("font-w95 text-w95 text-w95-text flex flex-col gap-px", props.class));
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
