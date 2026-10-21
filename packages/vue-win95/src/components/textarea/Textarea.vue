<script setup lang="ts">
import { computed } from "vue";
import { useId } from "../../composables/useId";
import { cn } from "../../utils/cn";
import { FormFieldCtx } from "../form/context";

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    label?: string;
    id?: string;
    placeholder?: string;
    rows?: number;
    disabled?: boolean;
    readonly?: boolean;
    invalid?: boolean;
    describedBy?: string;
    class?: string;
  }>(),
  {
    modelValue: "",
    label: "",
    id: undefined,
    placeholder: "",
    rows: 4,
    disabled: false,
    readonly: false,
    invalid: false,
    describedBy: undefined,
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: string];
  change: [value: string];
}>();

const autoId = useId("w95-textarea");
const field = FormFieldCtx.inject();
const inputId = computed(() => props.id ?? field?.value.id ?? autoId.value);

function onInput(e: Event) {
  const value = (e.target as HTMLTextAreaElement).value;
  emit("update:modelValue", value);
  emit("change", value);
}

const classes = computed(() =>
  cn(
    "box-border border-0 rounded-none block w-full px-1 py-[3px]",
    "font-w95 text-w95 leading-[1.4] resize",
    "shadow-w95-field bg-w95-highlight text-w95-text",
    "w95-focus",
    "disabled:bg-w95-surface disabled:text-w95-shadow",
    "read-only:bg-w95-surface",
    props.invalid && "outline outline-1 outline-dotted outline-w95-error",
    props.class
  )
);
</script>

<template>
  <div class="flex flex-col gap-1 font-w95 text-w95">
    <label v-if="label" :for="inputId" class="select-none text-w95-text">{{ label }}</label>
    <textarea
      :id="inputId"
      :class="classes"
      :rows="rows"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :aria-invalid="invalid || field?.invalid || undefined"
      :aria-describedby="describedBy ?? field?.describedBy"
      @input="onInput"
    />
  </div>
</template>
