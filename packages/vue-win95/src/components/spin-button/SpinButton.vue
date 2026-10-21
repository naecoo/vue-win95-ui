<script setup lang="ts">
import { computed, ref } from "vue";
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
    max: 99,
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

const autoId = useId("w95-spin");
const inputId = computed(() => props.id ?? autoId.value);
const inputRef = ref<HTMLInputElement | null>(null);

function clamp(n: number) {
  return Math.min(props.max, Math.max(props.min, n));
}

/** 输入框显示必须跟模型一致：clamp 之后要把框里的值写回去，否则会看到越界的残值 */
function syncInput(value: number) {
  const el = inputRef.value;
  if (el && el.value !== String(value)) el.value = String(value);
}

function setValue(n: number) {
  if (props.disabled) return;
  const v = clamp(n);
  syncInput(v);
  if (v !== props.modelValue) {
    emit("update:modelValue", v);
    emit("change", v);
  }
}

function onInput(e: Event) {
  const raw = Number((e.target as HTMLInputElement).value);
  if (Number.isNaN(raw)) {
    syncInput(props.modelValue);
    return;
  }
  setValue(raw);
}

function onBlur() {
  syncInput(props.modelValue);
}

function inc() {
  setValue(props.modelValue + props.step);
}
function dec() {
  setValue(props.modelValue - props.step);
}

const inputClasses = computed(() =>
  cn(
    "box-border border-0 rounded-none w-[42px] h-[22px] text-center",
    "font-w95 text-w95",
    "shadow-w95-field bg-w95-highlight text-w95-text",
    "w95-focus",
    props.disabled && "bg-w95-surface text-w95-shadow",
    props.class
  )
);

const btnClasses =
  "w-4 h-[11px] min-w-0 p-0 border-0 rounded-none " +
  "bg-w95-surface shadow-w95-raised cursor-default " +
  "flex items-center justify-center leading-none " +
  "font-w95 text-[8px] text-w95-text " +
  "disabled:cursor-not-allowed " +
  "active:shadow-w95-sunken active:pt-px";
</script>

<template>
  <div class="inline-flex items-center font-w95 text-w95 gap-w95-sm">
    <label v-if="label" :for="inputId" class="select-none text-w95-text">
      {{ label }}
    </label>
    <input
      :id="inputId"
      ref="inputRef"
      type="number"
      role="spinbutton"
      :class="inputClasses"
      :value="modelValue"
      :min="min"
      :max="max"
      :step="step"
      :disabled="disabled"
      :aria-valuenow="modelValue"
      :aria-valuemin="min"
      :aria-valuemax="max"
      @input="onInput"
      @change="onInput"
      @blur="onBlur"
      @keydown.up.prevent="inc"
      @keydown.down.prevent="dec"
    />
    <div class="flex flex-col shadow-w95-field">
      <button
        type="button"
        :class="btnClasses"
        :disabled="disabled || modelValue >= max"
        aria-label="Increase"
        tabindex="-1"
        @click="inc"
      >
        ▲
      </button>
      <button
        type="button"
        :class="btnClasses"
        :disabled="disabled || modelValue <= min"
        aria-label="Decrease"
        tabindex="-1"
        @click="dec"
      >
        ▼
      </button>
    </div>
  </div>
</template>
