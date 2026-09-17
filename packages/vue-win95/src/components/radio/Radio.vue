<script setup lang="ts">
import { computed, inject, type ComputedRef } from "vue";
import { useId } from "../../composables/useId";
import { cn } from "../../utils/cn";

interface RadioGroupCtx {
  name: string;
  modelValue: string | number | boolean | undefined;
  disabled: boolean;
  setValue: (v: string | number | boolean) => void;
}

const props = withDefaults(
  defineProps<{
    modelValue?: string | number | boolean;
    value: string | number | boolean;
    label?: string;
    disabled?: boolean;
    name?: string;
    id?: string;
    class?: string;
  }>(),
  {
    label: "",
    disabled: false,
    name: undefined,
    id: undefined,
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: string | number | boolean];
  change: [value: string | number | boolean];
}>();

const group = inject<ComputedRef<RadioGroupCtx> | null>("w95-radio-group", null);

const autoId = useId("w95-radio");
const inputId = computed(() => props.id ?? autoId.value);

const effectiveName = computed(() => props.name ?? group?.value?.name);
const effectiveDisabled = computed(
  () => props.disabled || group?.value?.disabled === true
);
const currentModel = computed(
  () => props.modelValue ?? group?.value?.modelValue
);
const isChecked = computed(() => currentModel.value === props.value);

const inputClasses = computed(() =>
  cn(
    "appearance-none relative shrink-0 m-0",
    "w-w95-radio h-w95-radio border-0 rounded-full",
    "bg-w95-highlight shadow-w95-field cursor-default",
    isChecked.value && "w95-radio-dot",
    "disabled:bg-w95-surface disabled:cursor-not-allowed",
    "focus:outline focus:outline-1 focus:outline-dotted focus:outline-w95-text",
    props.class
  )
);

function onChange() {
  if (effectiveDisabled.value) return;
  if (group?.value) {
    group.value.setValue(props.value);
  } else {
    emit("update:modelValue", props.value);
  }
  emit("change", props.value);
}
</script>

<template>
  <div class="flex items-center font-w95 text-w95">
    <input
      :id="inputId"
      type="radio"
      :class="inputClasses"
      :checked="isChecked"
      :disabled="effectiveDisabled"
      :name="effectiveName"
      :value="value"
      @change="onChange"
    />
    <label
      v-if="label"
      :for="inputId"
      class="ml-1.5 select-none leading-[13px] cursor-default"
      :class="
        effectiveDisabled
          ? 'text-w95-shadow [text-shadow:1px_1px_0_var(--w95-button-highlight)]'
          : 'text-w95-text'
      "
    >
      {{ label }}
    </label>
    <slot v-else />
  </div>
</template>
