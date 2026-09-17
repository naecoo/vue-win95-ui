import { onBeforeUnmount, onMounted, type Ref, watch } from "vue";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled]):not([type='hidden'])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(", ");

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (el) => el.offsetParent !== null || el === document.activeElement
  );
}

/**
 * Trap focus inside a container element (for Dialog / Modal)
 */
export function useFocusTrap(
  containerRef: Ref<HTMLElement | null>,
  active: Ref<boolean> | (() => boolean)
) {
  let previouslyFocused: HTMLElement | null = null;

  const isActive = () => (typeof active === "function" ? active() : active.value);

  function trap(e: KeyboardEvent) {
    if (e.key !== "Tab" || !isActive()) return;
    const container = containerRef.value;
    if (!container) return;

    const focusable = getFocusableElements(container);
    if (focusable.length === 0) {
      e.preventDefault();
      return;
    }

    const first = focusable[0]!;
    const last = focusable[focusable.length - 1]!;

    if (e.shiftKey) {
      if (document.activeElement === first || !container.contains(document.activeElement)) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last || !container.contains(document.activeElement)) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  function activate() {
    previouslyFocused = document.activeElement as HTMLElement | null;
    const container = containerRef.value;
    if (!container) return;
    const focusable = getFocusableElements(container);
    (focusable[0] ?? container).focus();
  }

  function deactivate() {
    previouslyFocused?.focus?.();
    previouslyFocused = null;
  }

  onMounted(() => {
    document.addEventListener("keydown", trap);
    watch(
      () => isActive(),
      (val) => {
        if (val) activate();
        else deactivate();
      },
      { immediate: true }
    );
  });

  onBeforeUnmount(() => {
    document.removeEventListener("keydown", trap);
  });

  return { activate, deactivate };
}
