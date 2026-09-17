import { onBeforeUnmount, onMounted, ref, type Ref } from "vue";

export type Orientation = "horizontal" | "vertical";

export interface RovingFocusOptions {
  orientation?: Orientation;
  loop?: boolean;
  selector?: string;
}

const DEFAULT_SELECTOR =
  '[role="tab"],[role="menuitem"],[role="treeitem"],[data-roving-item],[role="toolbar"] > button:not([disabled]),button:not([disabled])';

/**
 * Roving tabindex keyboard navigation (APG tabs / menu / toolbar / tree)
 */
export function useRovingFocus(
  containerRef: Ref<HTMLElement | null>,
  options: RovingFocusOptions = {}
) {
  const { orientation = "horizontal", loop = true, selector = DEFAULT_SELECTOR } = options;
  const activeIndex = ref(0);

  function getItems(): HTMLElement[] {
    const el = containerRef.value;
    if (!el) return [];
    return Array.from(el.querySelectorAll<HTMLElement>(selector)).filter(
      (node) => !node.hasAttribute("disabled") && node.getAttribute("aria-disabled") !== "true"
    );
  }

  function focusIndex(index: number) {
    const items = getItems();
    if (items.length === 0) return;
    const next = loop
      ? ((index % items.length) + items.length) % items.length
      : Math.max(0, Math.min(items.length - 1, index));
    activeIndex.value = next;
    items.forEach((item, i) => {
      item.tabIndex = i === next ? 0 : -1;
    });
    items[next]?.focus();
  }

  function syncTabIndexes() {
    const items = getItems();
    items.forEach((item, i) => {
      item.tabIndex = i === activeIndex.value ? 0 : -1;
    });
  }

  function onKeydown(e: KeyboardEvent) {
    const items = getItems();
    if (items.length === 0) return;
    const key = e.key;
    const nextKey = orientation === "horizontal" ? "ArrowRight" : "ArrowDown";
    const prevKey = orientation === "horizontal" ? "ArrowLeft" : "ArrowUp";

    let target = -1;
    if (key === nextKey) {
      e.preventDefault();
      target = activeIndex.value + 1;
    } else if (key === prevKey) {
      e.preventDefault();
      target = activeIndex.value - 1;
    } else if (key === "Home") {
      e.preventDefault();
      target = 0;
    } else if (key === "End") {
      e.preventDefault();
      target = items.length - 1;
    }

    if (target >= 0) focusIndex(target);
  }

  function onItemClick(index: number) {
    focusIndex(index);
  }

  function setActiveIndex(index: number) {
    activeIndex.value = index;
    syncTabIndexes();
  }

  onMounted(() => {
    syncTabIndexes();
  });

  onBeforeUnmount(() => {
    // no-op
  });

  return {
    activeIndex,
    getItems,
    focusIndex,
    syncTabIndexes,
    onKeydown,
    onItemClick,
    setActiveIndex,
  };
}
