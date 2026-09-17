<script setup lang="ts">
import { computed, provide } from "vue";
import { useId } from "../../composables/useId";
import { cn } from "../../utils/cn";

const props = withDefaults(
  defineProps<{
    modelValue?: string | number | boolean;
    legend?: string;
    name?: string;
    disabled?: boolean;
    class?: string;
  }>(),
  {
    modelValue: undefined,
    legend: "",
    name: undefined,
    disabled: false,
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: string | number | boolean];
}>();

const autoName = useId("w95-rg");
const groupName = computed(() => props.name ?? autoName.value);

provide(
  "w95-radio-group",
  computed(() => ({
    name: groupName.value,
    modelValue: props.modelValue,
    disabled: props.disabled,
    setValue: (v: string | number | boolean) => emit("update:modelValue", v),
  }))
);

const rootClasses = computed(() =>
  cn(
    "border-0 m-0 p-0 font-w95 text-w95",
    props.legend ? "pt-0" : "",
    props.class
  )
);
</script>

<template>
  <fieldset :class="rootClasses" :disabled="disabled || undefined" role="radiogroup">
    <legend v-if="legend" class="bg-w95-surface px-1 text-w95-text font-w95 text-w95">
      {{ legend }}
    </legend>
    <div class="flex flex-col gap-1.5">
      <slot />
    </div>
  </fieldset>
</template>
