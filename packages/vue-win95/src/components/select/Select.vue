<script setup lang="ts">
import { computed } from "vue";
import { useId } from "../../composables/useId";
import { cn } from "../../utils/cn";

export interface W95SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

const props = withDefaults(
  defineProps<{
    modelValue?: string | number;
    options?: W95SelectOption[];
    disabled?: boolean;
    label?: string;
    id?: string;
    class?: string;
  }>(),
  {
    modelValue: "",
    options: () => [],
    disabled: false,
    label: "",
    id: undefined,
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: string | number];
  change: [value: string | number];
}>();

const autoId = useId("w95-select");
const selectId = computed(() => props.id ?? autoId.value);

const selectClasses = computed(() =>
  cn(
    "box-border border-0 rounded-none appearance-none",
    "font-w95 text-w95 h-w95-input min-w-[120px]",
    "pl-1 pr-8 py-[3px]",
    "shadow-w95-field bg-w95-highlight text-w95-text",
    "bg-no-repeat bg-[right_2px_top_2px]",
    "focus:outline-none focus:bg-w95-blue focus:text-w95-highlight",
    "disabled:bg-w95-surface disabled:text-w95-shadow",
    props.class
  )
);

// dropdown arrow via inline SVG data-uri
const selectStyle = computed(() => ({
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='17' viewBox='0 0 16 17'%3E%3Cpath d='M11 6H4v1h1v1h1v1h1v1h1V9h1V8h1V7h1V6z' fill='%23222'/%3E%3Cpath d='M15 0H0v16h1V1h14V0z' fill='%23DFDFDF'/%3E%3Cpath d='M2 1H1v14h1V2h12V1H2z' fill='%23fff'/%3E%3Cpath d='M16 17H0v-1h15V0h1v17z' fill='%23000'/%3E%3Cpath d='M15 1h-1v14H1v1h14V1z' fill='gray'/%3E%3Cpath d='M2 2h12v13H2z' fill='silver'/%3E%3C/svg%3E")`,
}));

function onChange(e: Event) {
  const raw = (e.target as HTMLSelectElement).value;
  const matched = props.options.find((o) => String(o.value) === raw);
  const value = matched ? matched.value : raw;
  emit("update:modelValue", value);
  emit("change", value);
}
</script>

<template>
  <div class="flex items-center font-w95 text-w95 gap-w95-md">
    <label v-if="label" :for="selectId" class="select-none text-w95-text">
      {{ label }}
    </label>
    <select
      :id="selectId"
      :class="selectClasses"
      :style="selectStyle"
      :disabled="disabled"
      :value="modelValue"
      @change="onChange"
    >
      <option
        v-for="opt in options"
        :key="String(opt.value)"
        :value="opt.value"
        :disabled="opt.disabled"
      >
        {{ opt.label }}
      </option>
      <slot />
    </select>
  </div>
</template>
