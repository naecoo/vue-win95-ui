<script setup lang="ts">
import { computed, inject, type ComputedRef } from "vue";
import { useId } from "../../composables/useId";
import { cn } from "../../utils/cn";

interface TabsCtx {
  uid: string;
  active: string | number | undefined;
  select: (id: string | number) => void;
}

const props = withDefaults(
  defineProps<{
    value: string | number;
    disabled?: boolean;
    class?: string;
  }>(),
  { disabled: false }
);

const ctx = inject<ComputedRef<TabsCtx> | null>("w95-tabs", null);
const autoId = useId("w95-tab");
const tabId = computed(() => `${ctx?.value.uid ?? autoId.value}-tab-${props.value}`);
const panelId = computed(() => `${ctx?.value.uid ?? autoId.value}-panel-${props.value}`);
const isSelected = computed(() => ctx?.value.active === props.value);

const classes = computed(() =>
  cn(
    "relative z-[1] m-0 list-none",
    "box-border border-0 rounded-none",
    "px-1.5 pt-1.5 pb-1.5 -mb-[2px]",
    "bg-w95-surface font-w95 text-w95 text-w95-text",
    "cursor-default select-none",
    "[box-shadow:inset_-1px_0_#0a0a0a,inset_1px_1px_#c0c0c0,inset_-2px_0_#808080,inset_2px_2px_#ffffff]",
    isSelected.value
      ? "z-[8] pt-[7px] pb-[9px] -mt-[2px] ml-0"
      : "mt-0",
    "focus:outline focus:outline-1 focus:outline-dotted focus:outline-w95-text",
    props.disabled && "text-w95-shadow cursor-not-allowed",
    props.class
  )
);

function onClick() {
  if (!props.disabled) ctx?.value.select(props.value);
}
</script>

<template>
  <li
    role="tab"
    :id="tabId"
    :class="classes"
    :aria-selected="isSelected"
    :aria-controls="panelId"
    :tabindex="isSelected ? 0 : -1"
    :aria-disabled="disabled || undefined"
    @click="onClick"
  >
    <slot />
  </li>
</template>
