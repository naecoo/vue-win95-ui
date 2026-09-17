<script setup lang="ts">
import { computed, inject, type ComputedRef } from "vue";
import { cn } from "../../utils/cn";

interface TabsCtx {
  uid: string;
  active: string | number | undefined;
}

const props = withDefaults(
  defineProps<{
    value: string | number;
    class?: string;
  }>(),
  {}
);

const ctx = inject<ComputedRef<TabsCtx> | null>("w95-tabs", null);
const panelId = computed(() => `${ctx?.value.uid ?? "w95"}-panel-${props.value}`);
const tabId = computed(() => `${ctx?.value.uid ?? "w95"}-tab-${props.value}`);
const isActive = computed(() => ctx?.value.active === props.value);

const classes = computed(() =>
  cn(
    "w95-tabpanel relative z-[2] box-border",
    "p-w95",
    "bg-w95-surface font-w95 text-w95 text-w95-text",
    "[box-shadow:inset_-1px_-1px_#0a0a0a,inset_1px_1px_#dfdfdf,inset_-2px_-2px_#808080,inset_2px_2px_#ffffff]",
    props.class
  )
);
</script>

<template>
  <div
    v-show="isActive"
    :id="panelId"
    role="tabpanel"
    :aria-labelledby="tabId"
    :class="classes"
  >
    <slot />
  </div>
</template>
