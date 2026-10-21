import { onBeforeUnmount, onMounted } from "vue";

export interface DismissOptions {
  /** 只在打开时响应 */
  active: () => boolean;
  /** 这些元素内部不算"外部点击"（锚点、浮层自身） */
  ignore?: () => Array<HTMLElement | null | undefined>;
  onDismissOutside?: () => void;
  onDismissEscape?: () => void;
}

/**
 * 浮层的统一关闭策略。
 * 关键点：pointerdown 命中浮层内部时必须放过，
 * 否则面板会在 mouseup/click 之前被卸载，里面的按钮永远点不到。
 */
export function useDismiss(options: DismissOptions) {
  const { active } = options;

  function onPointerDown(event: PointerEvent) {
    if (!active() || !options.onDismissOutside) return;
    const target = event.target as Node | null;
    if (!target) return;
    const inside = (options.ignore?.() ?? []).some((el) => el?.contains(target));
    if (inside) return;
    options.onDismissOutside();
  }

  function onKeydown(event: KeyboardEvent) {
    if (event.key !== "Escape" || !active() || !options.onDismissEscape) return;
    event.stopPropagation();
    options.onDismissEscape();
  }

  onMounted(() => {
    document.addEventListener("pointerdown", onPointerDown, true);
    document.addEventListener("keydown", onKeydown, true);
  });

  onBeforeUnmount(() => {
    document.removeEventListener("pointerdown", onPointerDown, true);
    document.removeEventListener("keydown", onKeydown, true);
  });

  return { onPointerDown, onKeydown };
}
