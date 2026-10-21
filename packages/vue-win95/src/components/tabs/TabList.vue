<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useRovingFocus } from "../../composables/useRovingFocus";
import { cn } from "../../utils/cn";
import { TabsCtx } from "./context";

const props = withDefaults(
  defineProps<{ class?: string; multirow?: boolean; label?: string }>(),
  { multirow: false, label: undefined }
);

const ctx = TabsCtx.inject();
const listRef = ref<HTMLElement | null>(null);

const { onKeydown, getItems, setActiveIndex } = useRovingFocus(listRef, {
  orientation: "horizontal",
  loop: true,
  selector: '[role="tab"]:not([aria-disabled="true"])',
});

const activeIdx = computed(() => {
  if (!ctx) return 0;
  const items = getItems();
  const i = items.findIndex(
    (el) => el.id === `${ctx.value.uid}-tab-${ctx.value.active}`
  );
  return i >= 0 ? i : 0;
});

// 只同步 tabindex，不抢焦点：程序化选中不应把用户光标拽走
onMounted(() => setActiveIndex(activeIdx.value));
watch(activeIdx, (i) => setActiveIndex(i));

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
    :aria-label="label"
    @keydown="onKeydown"
  >
    <slot />
  </ul>
</template>
