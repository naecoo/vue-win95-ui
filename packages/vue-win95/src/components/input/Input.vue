<script setup lang="ts">
import { computed } from "vue";
import { useId } from "../../composables/useId";
import { cn } from "../../utils/cn";

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    type?: "text" | "password" | "email" | "number" | "search" | "tel" | "url";
    disabled?: boolean;
    readonly?: boolean;
    placeholder?: string;
    label?: string;
    id?: string;
    class?: string;
  }>(),
  {
    type: "text",
    disabled: false,
    readonly: false,
    placeholder: "",
    label: "",
    id: undefined,
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const autoId = useId("w95-input");
const inputId = computed(() => props.id ?? autoId.value);

const inputClasses = computed(() =>
  cn(
    "box-border border-0 rounded-none",
    "font-w95 text-w95 h-w95-input min-w-[120px] px-1 py-[3px]",
    "shadow-w95-field bg-w95-highlight text-w95-text",
    "transition-[box-shadow] duration-75",
    "focus:outline-none focus:shadow-w95-field-focus",
    "disabled:bg-w95-surface disabled:text-w95-shadow",
    "read-only:bg-w95-surface read-only:text-w95-shadow",
    props.class
  )
);

function onInput(e: Event) {
  emit("update:modelValue", (e.target as HTMLInputElement).value);
}
</script>

<template>
  <div class="flex items-center font-w95 text-w95 gap-w95-md">
    <label v-if="label" :for="inputId" class="select-none text-w95-text">{{ label }}</label>
    <input
      :id="inputId"
      :type="type"
      :class="inputClasses"
      :disabled="disabled"
      :readonly="readonly"
      :placeholder="placeholder"
      :value="modelValue"
      @input="onInput"
    />
  </div>
</template>
