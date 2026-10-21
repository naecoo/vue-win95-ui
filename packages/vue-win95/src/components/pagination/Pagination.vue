<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../utils/cn";
import { useLocale } from "../../locale";

const props = withDefaults(
  defineProps<{
    modelValue?: number;
    total?: number;
    pageSize?: number;
    /** 当前页左右各显示多少个页码 */
    siblingCount?: number;
    /** 显示总数，如 "共 128 条" */
    showTotal?: boolean;
    disabled?: boolean;
    label?: string;
    class?: string;
  }>(),
  {
    modelValue: 1,
    total: 0,
    pageSize: 10,
    siblingCount: 1,
    showTotal: false,
    disabled: false,
    label: undefined,
  }
);

const emit = defineEmits<{
  "update:modelValue": [page: number];
  change: [page: number];
}>();

const { t } = useLocale();

const pageCount = computed(() =>
  Math.max(1, Math.ceil(Math.max(0, props.total) / Math.max(1, props.pageSize)))
);

type Item = number | "gap-left" | "gap-right";

/** 只渲染当前页附近的页码 + 首尾，避免 1000 页铺 1000 个按钮 */
const items = computed<Item[]>(() => {
  const count = pageCount.value;
  const current = Math.min(Math.max(1, props.modelValue), count);
  const span = Math.max(0, props.siblingCount);
  const windowSize = span * 2 + 5;

  if (count <= windowSize) {
    return Array.from({ length: count }, (_, i) => i + 1);
  }

  const left = Math.max(2, current - span);
  const right = Math.min(count - 1, current + span);
  const list: Item[] = [1];

  if (left > 2) list.push("gap-left");
  for (let p = left; p <= right; p += 1) list.push(p);
  if (right < count - 1) list.push("gap-right");
  list.push(count);

  return list;
});

function go(page: number) {
  if (props.disabled) return;
  const next = Math.min(pageCount.value, Math.max(1, page));
  if (next === props.modelValue) return;
  emit("update:modelValue", next);
  emit("change", next);
}

const btnCls = (active: boolean) =>
  cn(
    "min-w-[24px] h-w95-btn px-1.5 box-border border-0 rounded-none",
    "font-w95 text-w95 cursor-default select-none",
    "bg-w95-surface text-transparent [text-shadow:0_0_var(--w95-text)]",
    active ? "shadow-w95-sunken" : "shadow-w95-raised",
    "active:shadow-w95-sunken",
    "w95-focus",
    "disabled:text-w95-shadow disabled:[text-shadow:1px_1px_0_#fff]",
    props.disabled && "pointer-events-none"
  );

const classes = computed(() =>
  cn("flex items-center gap-1 font-w95 text-w95", props.class)
);

const totalLabel = computed(() => t("pagination.total", { total: props.total }));
</script>

<template>
  <nav :class="classes" :aria-label="label ?? t('pagination.label')">
    <button
      type="button"
      :class="btnCls(false)"
      :disabled="disabled || modelValue <= 1"
      :aria-label="t('pagination.prev')"
      @click="go(modelValue - 1)"
    >
      ‹
    </button>
    <template v-for="(item, i) in items" :key="`${item}-${i}`">
      <span v-if="typeof item === 'string'" class="px-1 text-w95-shadow" aria-hidden="true">…</span>
      <button
        v-else
        type="button"
        :class="btnCls(item === modelValue)"
        :aria-current="item === modelValue ? 'page' : undefined"
        :aria-label="`Page ${item}`"
        :disabled="disabled"
        @click="go(item)"
      >
        {{ item }}
      </button>
    </template>
    <button
      type="button"
      :class="btnCls(false)"
      :disabled="disabled || modelValue >= pageCount"
      :aria-label="t('pagination.next')"
      @click="go(modelValue + 1)"
    >
      ›
    </button>
    <span v-if="showTotal" class="ml-1 text-w95-text">{{ totalLabel }}</span>
  </nav>
</template>
