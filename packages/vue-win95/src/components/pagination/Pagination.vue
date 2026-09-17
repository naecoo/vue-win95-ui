<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../utils/cn";

const props = withDefaults(
  defineProps<{
    modelValue?: number;
    total?: number;
    pageSize?: number;
    class?: string;
  }>(),
  { modelValue: 1, total: 0, pageSize: 10 }
);

const emit = defineEmits<{ "update:modelValue": [page: number] }>();

const pages = computed(() => {
  const n = Math.max(1, Math.ceil(props.total / props.pageSize));
  return Array.from({ length: n }, (_, i) => i + 1);
});

function go(p: number) {
  if (p < 1 || p > pages.value.length) return;
  emit("update:modelValue", p);
}

const btnCls = (active: boolean) =>
  cn(
    "min-w-[24px] h-w95-btn px-1.5 box-border border-0 rounded-none",
    "font-w95 text-w95 cursor-default select-none",
    "bg-w95-surface text-transparent [text-shadow:0_0_var(--w95-text)]",
    active ? "shadow-w95-sunken" : "shadow-w95-raised",
    "active:shadow-w95-sunken",
    "focus:outline focus:outline-1 focus:outline-dotted focus:outline-black focus:outline-offset-[-4px]",
    "disabled:text-w95-shadow disabled:[text-shadow:1px_1px_0_#fff]"
  );

const classes = computed(() =>
  cn("flex items-center gap-1 font-w95 text-w95", props.class)
);
</script>

<template>
  <nav :class="classes" aria-label="Pagination">
    <button type="button" :class="btnCls(false)" :disabled="modelValue <= 1" aria-label="Previous" @click="go(modelValue - 1)">
      ‹
    </button>
    <button
      v-for="p in pages"
      :key="p"
      type="button"
      :class="btnCls(p === modelValue)"
      :aria-current="p === modelValue ? 'page' : undefined"
      @click="go(p)"
    >
      {{ p }}
    </button>
    <button
      type="button"
      :class="btnCls(false)"
      :disabled="modelValue >= pages.length"
      aria-label="Next"
      @click="go(modelValue + 1)"
    >
      ›
    </button>
  </nav>
</template>
