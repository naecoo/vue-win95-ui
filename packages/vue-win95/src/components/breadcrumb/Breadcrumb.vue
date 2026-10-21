<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../utils/cn";
import { useLocale } from "../../locale";

export interface W95Crumb {
  label: string;
  href?: string;
  click?: () => void;
}

const props = withDefaults(
  defineProps<{
    items?: W95Crumb[];
    separator?: string;
    label?: string;
    class?: string;
  }>(),
  { items: () => [], separator: ">", label: undefined }
);

const { t } = useLocale();

const classes = computed(() =>
  cn(
    "flex flex-wrap items-center gap-1 m-0 p-0 list-none",
    "font-w95 text-w95 text-w95-text",
    props.class
  )
);

const linkCls =
  "text-w95-link cursor-default bg-transparent border-0 p-0 font-w95 text-w95 underline-offset-2 hover:underline w95-focus-link";
</script>

<template>
  <nav :class="classes" :aria-label="label ?? t('breadcrumb.label')">
    <ol class="flex flex-wrap items-center gap-1 m-0 p-0 list-none">
      <template v-for="(item, i) in items" :key="i">
        <li class="flex items-center gap-1 list-none">
          <template v-if="i < items.length - 1">
            <a v-if="item.href" :href="item.href" :class="linkCls">{{ item.label }}</a>
            <button v-else type="button" :class="linkCls" @click="item.click">
              {{ item.label }}
            </button>
            <span class="text-w95-shadow" aria-hidden="true">{{ separator }}</span>
          </template>
          <span v-else class="text-w95-text" aria-current="page">{{ item.label }}</span>
        </li>
      </template>
    </ol>
  </nav>
</template>
