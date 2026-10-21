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

// Win95-style ON/OFF toggle: sunken track + raised thumb.
// 标签放在按钮内部，这样点文字也能切换（<label for> 指向 button 是无效关联）。
const rootCls = computed(() =>
  cn(
    "inline-flex items-center gap-w95-md font-w95 text-w95",
    "bg-transparent border-0 p-0 m-0 cursor-default select-none",
    "w95-focus",
    props.disabled && "cursor-not-allowed opacity-60",
    props.class
  )
);

const trackCls = computed(() =>
  cn(
    "relative inline-flex items-center shrink-0",
    "w-[40px] h-[20px] box-border rounded-none",
    "shadow-w95-field transition-colors duration-75",
    props.modelValue ? "bg-w95-blue" : "bg-w95-surface"
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

const labelCls = computed(() =>
  props.disabled ? "text-w95-shadow [text-shadow:1px_1px_0_#fff]" : "text-w95-text"
);

function toggle() {
  if (props.disabled) return;
  emit("update:modelValue", !props.modelValue);
  emit("change", !props.modelValue);
}
</script>

<template>
  <button
    :id="inputId"
    type="button"
    role="switch"
    :class="rootCls"
    :aria-checked="modelValue"
    :disabled="disabled"
    @click="toggle"
  >
    <span :class="trackCls">
      <span :class="thumbCls" aria-hidden="true" />
    </span>
    <span v-if="label || $slots.default" :class="labelCls">
      <slot>{{ label }}</slot>
    </span>
  </button>
</template>
