<script setup lang="ts">
import { computed, inject, type ComputedRef } from "vue";
import { cn } from "../../utils/cn";

interface AccCtx {
  uid: string;
  openId: string | number | null;
  toggle: (id: string | number) => void;
}

const props = withDefaults(
  defineProps<{
    value: string | number;
    title?: string;
    class?: string;
  }>(),
  { title: "" }
);

const ctx = inject<ComputedRef<AccCtx> | null>("w95-accordion", null);
const isOpen = computed(() => ctx?.value.openId === props.value);
const headerId = computed(() => `${ctx?.value.uid ?? "acc"}-h-${props.value}`);
const panelId = computed(() => `${ctx?.value.uid ?? "acc"}-p-${props.value}`);

const btnClasses = computed(() =>
  cn(
    "w-full text-left box-border border-0 rounded-none",
    "font-w95 text-w95 px-1.5 py-1",
    "bg-w95-surface shadow-w95-raised text-w95-text",
    "cursor-default select-none",
    "focus:outline focus:outline-1 focus:outline-dotted focus:outline-black focus:outline-offset-[-4px]",
    props.class
  )
);
</script>

<template>
  <div class="bg-w95-surface">
    <button
      type="button"
      :class="btnClasses"
      :id="headerId"
      :aria-expanded="isOpen"
      :aria-controls="panelId"
      @click="ctx?.toggle(value)"
    >
      <span class="mr-1 inline-block w-3">{{ isOpen ? "−" : "+" }}</span>
      <slot name="title">{{ title }}</slot>
    </button>
    <div
      v-show="isOpen"
      :id="panelId"
      role="region"
      :aria-labelledby="headerId"
      class="px-2 py-1.5 font-w95 text-w95 text-w95-text shadow-w95-field bg-w95-highlight m-px"
    >
      <slot />
    </div>
  </div>
</template>
