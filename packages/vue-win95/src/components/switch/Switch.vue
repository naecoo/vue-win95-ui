<script setup lang="ts">
import { computed } from "vue";
import { useId } from "../../composables/useId";
import { cn } from "../../utils/cn";

const props = withDefaults(
  defineProps<{
    modelValue?: boolean;
    label?: string;
    disabled?: boolean;
    id?: string;
    class?: string;
  }>(),
  { modelValue: false, label: "", disabled: false, id: undefined }
);

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  change: [value: boolean];
}>();

const autoId = useId("w95-switch");
const inputId = computed(() => props.id ?? autoId.value);

// Win95-style ON/OFF toggle: sunken track + raised thumb
const trackCls = computed(() =>
  cn(
    "relative inline-flex items-center",
    "w-[40px] h-[20px] box-border rounded-none",
    "shadow-w95-field cursor-default select-none",
    "transition-colors duration-75",
    props.modelValue ? "bg-w95-blue" : "bg-w95-surface",
    props.disabled && "opacity-60 cursor-not-allowed",
    props.class
  )
);

const thumbCls = computed(() =>
  cn(
    "absolute top-[2px] w-[16px] h-[16px]",
    "bg-w95-surface shadow-w95-raised",
    "transition-[left,right] duration-75",
    props.modelValue ? "right-[2px]" : "left-[2px]"
  )
);

function toggle() {
  if (props.disabled) return;
  emit("update:modelValue", !props.modelValue);
  emit("change", !props.modelValue);
}
</script>

<template>
  <div class="inline-flex items-center font-w95 text-w95 gap-w95-md">
    <button
      :id="inputId"
      type="button"
      role="switch"
      :class="trackCls"
      :aria-checked="modelValue"
      :aria-label="label || undefined"
      :disabled="disabled"
      @click="toggle"
    >
      <span :class="thumbCls" aria-hidden="true" />
    </button>
    <label
      v-if="label"
      :for="inputId"
      class="select-none cursor-default"
      :class="
        disabled
          ? 'text-w95-shadow [text-shadow:1px_1px_0_#fff]'
          : 'text-w95-text'
      "
    >
      {{ label }}
    </label>
  </div>
</template>
