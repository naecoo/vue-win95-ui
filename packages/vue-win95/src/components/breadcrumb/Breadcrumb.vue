<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../utils/cn";

export interface W95Crumb {
  label: string;
  href?: string;
  click?: () => void;
}

const props = withDefaults(
  defineProps<{
    items?: W95Crumb[];
    separator?: string;
    class?: string;
  }>(),
  { items: () => [], separator: ">" }
);

const classes = computed(() =>
  cn(
    "flex flex-wrap items-center gap-1 m-0 p-0 list-none",
    "font-w95 text-w95 text-w95-text",
    props.class
  )
);

const linkCls =
  "text-w95-link cursor-default bg-transparent border-0 p-0 font-w95 text-w95 underline-offset-2 hover:underline focus:outline focus:outline-1 focus:outline-dotted focus:outline-w95-link";
</script>

<template>
  <nav :class="classes" aria-label="Breadcrumb">
    <ol class="flex flex-wrap items-center gap-1 m-0 p-0 list-none">
      <template v-for="(item, i) in items" :key="i">
        <li class="flex items-center gap-1 list-none">
          <button
            v-if="i < items.length - 1"
            type="button"
            :class="linkCls"
            @click="item.click"
          >
            {{ item.label }}
          </button>
          <span v-else class="text-w95-text" aria-current="page">
            {{ item.label }}
          </span>
          <span v-if="i < items.length - 1" class="text-w95-shadow" aria-hidden="true">
            {{ separator }}
          </span>
        </li>
      </template>
    </ol>
  </nav>
</template>
