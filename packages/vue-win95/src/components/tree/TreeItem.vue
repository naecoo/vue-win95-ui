<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useId } from "../../composables/useId";
import { cn } from "../../utils/cn";
import { TreeCtx, type TreeNode } from "./context";
import { useLocale } from "../../locale";

const props = withDefaults(
  defineProps<{
    value: string | number;
    label?: string;
    disabled?: boolean;
    /** 手写模式：子节点走默认插槽 */
    hasChildren?: boolean;
    /** 数据驱动模式：直接给子节点 */
    children?: TreeNode[];
    class?: string;
  }>(),
  {
    label: "",
    disabled: false,
    hasChildren: false,
    children: undefined,
  }
);

const ctx = TreeCtx.inject();
const { t } = useLocale();
const uid = useId("w95-tree-item");
const itemEl = ref<HTMLElement | null>(null);
const isFirstItem = ref(false);

const isBranch = computed(
  () => props.hasChildren || Boolean(props.children && props.children.length > 0)
);
const isSelected = computed(() => ctx?.value.selected === props.value);
const isOpen = computed(() => (ctx ? ctx.value.isOpen(props.value) : false));
const hasSelection = computed(() => ctx?.value.selected != null);

// 没有任何选中项时，树整体必须有一个可 Tab 进入的项，否则键盘无法触达
const tabindex = computed(() =>
  isSelected.value || (!hasSelection.value && isFirstItem.value) ? 0 : -1
);

onMounted(() => {
  const root = itemEl.value?.closest('[role="tree"]');
  isFirstItem.value = root?.querySelector('[role="treeitem"]') === itemEl.value;
});

function toggle() {
  ctx?.value.toggle(props.value);
}

function onClick() {
  if (props.disabled) return;
  ctx?.value.select(props.value);
}

function visibleItems(): HTMLElement[] {
  const root = itemEl.value?.closest('[role="tree"]');
  if (!root) return [];
  return Array.from(root.querySelectorAll<HTMLElement>('[role="treeitem"]'));
}

function focusItem(el: HTMLElement | undefined | null) {
  el?.focus();
}

function onKeydownItem(e: KeyboardEvent) {
  if (props.disabled) return;
  const items = visibleItems();
  const index = items.indexOf(itemEl.value as HTMLElement);

  switch (e.key) {
    case "ArrowDown":
      e.preventDefault();
      focusItem(items[index + 1]);
      return;
    case "ArrowUp":
      e.preventDefault();
      focusItem(items[index - 1]);
      return;
    case "Home":
      e.preventDefault();
      focusItem(items[0]);
      return;
    case "End":
      e.preventDefault();
      focusItem(items[items.length - 1]);
      return;
    case "ArrowRight":
      e.preventDefault();
      if (isBranch.value && !isOpen.value) toggle();
      else if (isBranch.value) focusItem(items[index + 1]);
      return;
    case "ArrowLeft": {
      e.preventDefault();
      if (isBranch.value && isOpen.value) {
        toggle();
        return;
      }
      const parent = itemEl.value?.parentElement?.closest<HTMLElement>('[role="treeitem"]');
      focusItem(parent);
      return;
    }
    case "Enter":
    case " ":
      e.preventDefault();
      onClick();
      return;
    default:
      break;
  }

  if (e.key.length === 1 && /\S/.test(e.key)) {
    const match = items.find((el) =>
      el.textContent?.trim().toLowerCase().startsWith(e.key.toLowerCase())
    );
    focusItem(match);
  }
}

const rowClasses = computed(() =>
  cn(
    "inline-flex items-center gap-[5px] w95-focus",
    isSelected.value ? "bg-w95-blue text-w95-highlight" : "text-w95-text",
    props.disabled && "text-w95-shadow"
  )
);

const itemClasses = computed(() =>
  cn("list-none m-0 mt-[3px] relative font-w95 text-w95", props.class)
);

const toggleClasses =
  "inline-flex items-center justify-center shrink-0 " +
  "w-[10px] h-[10px] leading-none text-[9px] " +
  "border border-w95-shadow bg-w95-highlight text-w95-text " +
  "align-middle cursor-default select-none";
</script>

<template>
  <li
    ref="itemEl"
    role="treeitem"
    :id="uid"
    :class="itemClasses"
    :aria-selected="isSelected"
    :aria-expanded="isBranch ? isOpen : undefined"
    :aria-disabled="disabled || undefined"
    :tabindex="tabindex"
    @keydown="onKeydownItem"
  >
    <div data-tree-row :class="rowClasses" @click="onClick">
      <button
        v-if="isBranch"
        type="button"
        :class="toggleClasses"
        :aria-label="isOpen ? t('tree.collapse') : t('tree.expand')"
        tabindex="-1"
        @click.stop="toggle"
      >
        {{ isOpen ? "−" : "+" }}
      </button>
      <span v-else class="inline-block w-[10px]" aria-hidden="true" />
      <span>{{ label }}</span>
    </div>
    <ul
      v-if="isBranch && isOpen"
      role="group"
      class="list-none m-0 ml-4 pl-4 border-l border-dotted border-w95-shadow"
    >
      <template v-if="children?.length">
        <TreeItem
          v-for="child in children"
          :key="String(child.value)"
          :value="child.value"
          :label="child.label"
          :disabled="child.disabled"
          :children="child.children"
        />
      </template>
      <slot v-else />
    </ul>
  </li>
</template>
