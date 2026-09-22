<script setup lang="ts">
import { computed, inject, ref, type ComputedRef } from "vue";
import { useId } from "../../composables/useId";
import { cn } from "../../utils/cn";

interface TreeCtx {
  selected: string | number | null;
  select: (v: string | number | null) => void;
}

const props = withDefaults(
  defineProps<{
    value: string | number;
    label?: string;
    disabled?: boolean;
    hasChildren?: boolean;
    class?: string;
  }>(),
  {
    label: "",
    disabled: false,
    hasChildren: false,
  }
);

const ctx = inject<ComputedRef<TreeCtx> | null>("w95-tree", null);
const uid = useId("w95-tree-item");
const open = ref(false);
const isSelected = computed(() => ctx?.value.selected === props.value);

const itemClasses = computed(() =>
  cn(
    "list-none m-0 mt-[3px] relative",
    "font-w95 text-w95",
    isSelected.value
      ? "bg-w95-blue text-w95-highlight"
      : "text-w95-text",
    props.disabled && "text-w95-shadow",
    props.class
  )
);

const toggleClasses =
  "mr-[5px] inline-flex items-center justify-center " +
  "w-[10px] h-[10px] leading-none text-[9px] " +
  "border border-w95-shadow bg-w95-highlight text-w95-text " +
  "align-middle cursor-default select-none";

let typeBuf = "";
let typeTimer: ReturnType<typeof setTimeout> | null = null;

function onKeydownItem(e: KeyboardEvent) {
  if (e.key === "ArrowRight" && props.hasChildren) {
    e.preventDefault();
    open.value = true;
  } else if (e.key === "ArrowLeft" && props.hasChildren) {
    e.preventDefault();
    open.value = false;
  } else if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    onClick();
  } else if (e.key.length === 1 && /\S/.test(e.key)) {
    typeBuf += e.key.toLowerCase();
    if (typeTimer) clearTimeout(typeTimer);
    typeTimer = setTimeout(() => {
      typeBuf = "";
    }, 500);
    const rootEl = (e.currentTarget as HTMLElement).closest('[role="tree"]');
    const items = rootEl?.querySelectorAll('[role="treeitem"]');
    items?.forEach((node) => {
      const el = node as HTMLElement;
      if (el.textContent?.trim().toLowerCase().startsWith(typeBuf)) {
        el.focus();
      }
    });
  }
}

function onClick() {
  if (props.disabled) return;
  ctx?.value.select(props.value);
}
</script>

<template>
  <li
    role="treeitem"
    :id="uid"
    :class="itemClasses"
    :aria-selected="isSelected"
    :aria-expanded="hasChildren ? open : undefined"
    :aria-disabled="disabled || undefined"
    :tabindex="isSelected ? 0 : -1"
    @click="onClick"
    @keydown="onKeydownItem"
  >
    <button
      v-if="hasChildren"
      type="button"
      :class="toggleClasses"
      :aria-label="open ? 'Collapse' : 'Expand'"
      tabindex="-1"
      @click.stop="open = !open"
    >
      {{ open ? "−" : "+" }}
    </button>
    <span>{{ label }}</span>
    <ul v-if="hasChildren && open" role="group" class="list-none m-0 ml-4 pl-4 border-l border-dotted border-w95-shadow">
      <slot />
    </ul>
  </li>
</template>
