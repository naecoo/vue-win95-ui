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
    name?: string;
    value?: string | number;
    class?: string;
  }>(),
  {
    modelValue: false,
    label: "",
    disabled: false,
    id: undefined,
    name: undefined,
    value: undefined,
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  change: [value: boolean];
}>();

const autoId = useId("w95-checkbox");
const inputId = computed(() => props.id ?? autoId.value);

const inputClasses = computed(() =>
  cn(
    "appearance-none relative shrink-0 m-0",
    "w-[13px] h-[13px] border-0 rounded-none",
    "bg-w95-highlight shadow-w95-field cursor-default",
    "active:bg-w95-surface",
    "checked:bg-w95-highlight",
    props.modelValue && "w95-check",
    "disabled:bg-w95-surface disabled:cursor-not-allowed",
    "focus:outline focus:outline-1 focus:outline-dotted focus:outline-w95-text",
    props.class
  )
);

function onChange(e: Event) {
  const checked = (e.target as HTMLInputElement).checked;
  emit("update:modelValue", checked);
  emit("change", checked);
}
</script>

<template>
  <div class="flex items-center font-w95 text-w95">
    <input
      :id="inputId"
      type="checkbox"
      :class="inputClasses"
      :checked="modelValue"
      :disabled="disabled"
      :name="name"
      :value="value"
      @change="onChange"
    />
    <label
      v-if="label"
      :for="inputId"
      class="ml-1.5 select-none leading-[13px] cursor-default"
      :class="disabled ? 'text-w95-shadow [text-shadow:1px_1px_0_var(--w95-button-highlight)]' : 'text-w95-text'"
    >
      {{ label }}
    </label>
    <slot v-else />
  </div>
</template>
