<script setup lang="ts">
import { computed, ref } from "vue";
import { useId } from "../../composables/useId";
import { cn } from "../../utils/cn";

export interface W95UploadFile {
  name: string;
  size: number;
  file: File;
}

const props = withDefaults(
  defineProps<{
    modelValue?: W95UploadFile[];
    accept?: string;
    multiple?: boolean;
    disabled?: boolean;
    label?: string;
    class?: string;
  }>(),
  {
    modelValue: () => [],
    accept: undefined,
    multiple: false,
    disabled: false,
    label: "Choose File…",
  }
);

const emit = defineEmits<{
  "update:modelValue": [files: W95UploadFile[]];
  change: [files: W95UploadFile[]];
}>();

const inputId = useId("w95-upload");
const inputRef = ref<HTMLInputElement | null>(null);

function onPick(e: Event) {
  const list = (e.target as HTMLInputElement).files;
  if (!list) return;
  const files = Array.from(list).map((file) => ({
    name: file.name,
    size: file.size,
    file,
  }));
  emit("update:modelValue", props.multiple ? [...props.modelValue, ...files] : files);
  emit("change", props.multiple ? [...props.modelValue, ...files] : files);
}

function remove(index: number) {
  const next = props.modelValue.filter((_, i) => i !== index);
  emit("update:modelValue", next);
  emit("change", next);
}

const btnCls = computed(() =>
  cn(
    "box-border border-0 rounded-none cursor-default",
    "font-w95 text-w95 min-w-w95-btn min-h-w95-btn px-3",
    "bg-w95-surface shadow-w95-raised",
    "text-transparent [text-shadow:0_0_var(--w95-text)] w95-focus",
    props.disabled && "text-w95-shadow pointer-events-none"
  )
);
</script>

<template>
  <div class="font-w95 text-w95 text-w95-text">
    <input
      :id="inputId"
      ref="inputRef"
      type="file"
      class="sr-only"
      :accept="accept"
      :multiple="multiple"
      :disabled="disabled"
      @change="onPick"
    />
    <button
      type="button"
      :class="btnCls"
      :disabled="disabled"
      @click="inputRef?.click()"
    >
      {{ label }}
    </button>
    <ul v-if="modelValue.length" class="mt-1.5 list-none p-0 m-0">
      <li
        v-for="(f, i) in modelValue"
        :key="f.name + i"
        class="flex items-center gap-2 text-[12px] py-0.5"
      >
        <span class="flex-1 truncate">{{ f.name }} ({{ f.size }} B)</span>
        <button
          type="button"
          class="w95-focus bg-w95-surface shadow-w95-raised border-0 min-w-[22px] h-[18px] cursor-default text-w95-text"
          :aria-label="`Remove ${f.name}`"
          @click="remove(i)"
        >
          ×
        </button>
      </li>
    </ul>
  </div>
</template>
