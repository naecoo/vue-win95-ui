import { computed, onBeforeUnmount, ref } from "vue";

/** Edge-resize a panel; emits new width/height */
export function useResize(
  box: { width: number; height: number },
  opts: {
    minW?: number;
    minH?: number;
    maxW?: number;
    maxH?: number;
    edges?: Array<"e" | "s" | "se">;
  } = {}
) {
  const width = ref(box.width);
  const height = ref(box.height);
  const dragging = ref<null | "e" | "s" | "se">(null);
  const start = { x: 0, y: 0, w: 0, h: 0 };

  const minW = opts.minW ?? 120;
  const minH = opts.minH ?? 80;
  const maxW = opts.maxW ?? 4000;
  const maxH = opts.maxH ?? 4000;

  function onDown(edge: "e" | "s" | "se", e: PointerEvent) {
    dragging.value = edge;
    start.x = e.clientX;
    start.y = e.clientY;
    start.w = width.value;
    start.h = height.value;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }

  function onMove(e: PointerEvent) {
    if (!dragging.value) return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    if (dragging.value === "e" || dragging.value === "se") {
      width.value = Math.min(maxW, Math.max(minW, start.w + dx));
    }
    if (dragging.value === "s" || dragging.value === "se") {
      height.value = Math.min(maxH, Math.max(minH, start.h + dy));
    }
  }

  function onUp() {
    dragging.value = null;
  }

  onBeforeUnmount(onUp);

  const style = computed(() => ({
    width: `${width.value}px`,
    height: `${height.value}px`,
  }));

  return { width, height, dragging, onDown, onMove, onUp, style };
}
