<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { cn } from "../../utils/cn";
import { TreeCtx, type TreeNode } from "./context";
import TreeItem from "./TreeItem.vue";

const props = withDefaults(
  defineProps<{
    modelValue?: string | number | null;
    /** 数据驱动模式：给 items 就不用手写 TreeItem */
    items?: TreeNode[];
    /** 默认展开的节点 */
    expanded?: (string | number)[];
    label?: string;
    class?: string;
  }>(),
  {
    modelValue: null,
    items: undefined,
    expanded: () => [],
    label: undefined,
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: string | number | null];
  "update:expanded": [value: (string | number)[]];
}>();

const openSet = ref(new Set<string | number>(props.expanded));
watch(
  () => props.expanded,
  (next) => {
    openSet.value = new Set(next);
  }
);

TreeCtx.provide(
  computed(() => ({
    selected: props.modelValue,
    select: (value: string | number) => emit("update:modelValue", value),
    isOpen: (value: string | number) => openSet.value.has(value),
    toggle: (value: string | number) => {
      const next = new Set(openSet.value);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      openSet.value = next;
      emit("update:expanded", [...next]);
    },
  }))
);

const classes = computed(() =>
  cn(
    "list-none m-0 p-1.5",
    "bg-w95-highlight font-w95 text-w95 text-w95-text",
    "shadow-w95-field",
    "w95-tree [&>li]:list-none",
    props.class
  )
);
</script>

<template>
  <ul role="tree" :aria-label="label" :class="classes">
    <template v-if="items?.length">
      <TreeItem
        v-for="node in items"
        :key="String(node.value)"
        :value="node.value"
        :label="node.label"
        :disabled="node.disabled"
        :children="node.children"
      />
    </template>
    <slot v-else />
  </ul>
</template>
