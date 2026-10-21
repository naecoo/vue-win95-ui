<script setup lang="ts">
import { computed } from "vue";
import { useId } from "../../composables/useId";
import { cn } from "../../utils/cn";
import { FormCtx, FormFieldCtx } from "./context";

const props = withDefaults(
  defineProps<{
    label?: string;
    /** 校验错误；有值时会通过 aria-describedby 关联到控件 */
    error?: string;
    hint?: string;
    required?: boolean;
    for?: string;
    class?: string;
  }>(),
  { label: "", error: undefined, hint: undefined, required: false, for: undefined }
);

const autoId = useId("w95-field");
const fieldId = computed(() => props.for ?? autoId.value);
const errorId = computed(() => `${fieldId.value}-error`);
const hintId = computed(() => `${fieldId.value}-hint`);
const describedBy = computed(() =>
  props.error ? errorId.value : props.hint ? hintId.value : undefined
);

const form = FormCtx.inject();

FormFieldCtx.provide(
  computed(() => ({
    id: fieldId.value,
    describedBy: describedBy.value,
    invalid: Boolean(props.error),
    required: props.required,
  }))
);

const labelStyle = computed(() => ({
  width: form?.value.labelWidth ?? "80px",
}));

const classes = computed(() => cn("flex items-start gap-2", props.class));
</script>

<template>
  <div :class="classes">
    <label
      v-if="label"
      :for="fieldId"
      class="shrink-0 pt-[3px] text-w95-text select-none"
      :style="labelStyle"
    >
      {{ label }}
      <span v-if="required" aria-hidden="true" class="text-w95-error">*</span>
    </label>
    <div class="flex-1 min-w-0">
      <slot :id="fieldId" :invalid="Boolean(error)" :described-by="describedBy" />
      <p v-if="error" :id="errorId" class="mt-0.5 text-w95-error">{{ error }}</p>
      <p v-else-if="hint" :id="hintId" class="mt-0.5 text-w95-shadow">{{ hint }}</p>
    </div>
  </div>
</template>
