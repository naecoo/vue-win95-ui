<script setup lang="ts">
import { computed, inject, ref, type ComputedRef } from "vue";
import { useRovingFocus } from "../../composables/useRovingFocus";
import { cn } from "../../utils/cn";

interface TabsCtx {
  uid: string;
  active: string | number | undefined;
  select: (id: string | number) => void;
}

const props = withDefaults(defineProps<{ class?: string; multirow?: boolean }>(), { multirow: false });
const ctx = inject<ComputedRef<TabsCtx> | null>("w95-tabs", null);
const listRef = ref<HTMLElement | null>(null);

const { onKeydown, focusIndex, getItems } = useRovingFocus(listRef, {
  orientation: "horizontal",
  loop: true,
  selector: '[role="tab"]:not([aria-disabled="true"])',
});

// sync active index when ctx active changes
const activeIdx = computed(() => {
  if (!ctx) return 0;
  const items = getItems();
  const i = items.findIndex(
    (el) => el.id === `${ctx.value.uid}-tab-${ctx.value.active}`
  );
  return i >= 0 ? i : 0;
});

// On mount and tab change, focus selected tab for keyboard
import { onMounted, watch } from "vue";
onMounted(() => {
  setTimeout(() => focusIndex(activeIdx.value), 0);
});
watch(activeIdx, (i) => focusIndex(i));

const listClasses = computed(() =>
  cn(
    "relative flex flex-wrap list-none m-0 p-0 pl-[3px]",
    "border-0 bg-transparent",
    props.multirow && "flex-wrap [&>li]:flex-1 [&>li]:text-center",
    props.class
  )
);
</script>

<template>
  <ul
    ref="listRef"
    role="tablist"
    :class="listClasses"
    :aria-label="ctx?.uid"
    @keydown="onKeydown"
  >
    <slot />
  </ul>
</template>
