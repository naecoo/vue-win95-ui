<script setup lang="ts">
import { computed } from "vue";
import { useId } from "../../composables/useId";
import { cn } from "../../utils/cn";

const props = withDefaults(
  defineProps<{
    modelValue?: number;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    label?: string;
    id?: string;
    class?: string;
  }>(),
  {
    modelValue: 0,
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
    label: "",
    id: undefined,
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: number];
  change: [value: number];
}>();

const autoId = useId("w95-slider");
const inputId = computed(() => props.id ?? autoId.value);

const inputClasses = computed(() => cn("w95-slider", props.disabled && "opacity-70", props.class));

function onInput(e: Event) {
  emit("update:modelValue", Number((e.target as HTMLInputElement).value));
}
function onChange(e: Event) {
  emit("change", Number((e.target as HTMLInputElement).value));
}
</script>

<template>
  <div class="flex items-center font-w95 text-w95 gap-w95-md w-full">
    <label v-if="label" :for="inputId" class="select-none text-w95-text shrink-0">
      {{ label }}
    </label>
    <input
      :id="inputId"
      type="range"
      :class="inputClasses"
      :min="min"
      :max="max"
      :step="step"
      :value="modelValue"
      :disabled="disabled"
      @input="onInput"
      @change="onChange"
    />
  </div>
</template>
