import { nextTick, onBeforeUnmount, ref, watch, type Ref } from "vue";

export type Placement =
  | "bottom-start"
  | "bottom"
  | "bottom-end"
  | "top-start"
  | "top"
  | "top-end"
  | "right-start"
  | "left-start";

export interface FloatingOptions {
  placement?: Placement;
  /** 与锚点的间距 */
  offset?: number;
  /** 面板宽度跟随锚点（下拉列表常用） */
  matchWidth?: boolean;
  /** 视口安全边距 */
  viewportMargin?: number;
}

/** 无锚点的浮层（右键菜单）用坐标定位 */
export interface FloatingPoint {
  x: number;
  y: number;
}

export interface FloatingPosition {
  left: number;
  top: number;
  width: number | undefined;
  /** 实际生效的方位（可能因为翻转与请求的不同） */
  placement: Placement;
}

type Side = "bottom" | "top" | "right" | "left";
type Align = "start" | "center" | "end";

function splitPlacement(placement: Placement): [Side, Align] {
  const [side, align] = placement.split("-") as [Side, Align | undefined];
  return [side, align ?? "center"];
}

function flip(side: Side): Side {
  return side === "bottom" ? "top" : side === "top" ? "bottom" : side === "right" ? "left" : "right";
}

/**
 * 锚定浮层定位：计算、翻转、夹进视口。
 * 六个浮层组件原先各自内联一套绝对定位，这里收成一处。
 */
export function useFloating(
  anchor: Ref<HTMLElement | null | undefined>,
  floating: Ref<HTMLElement | null | undefined>,
  open: Ref<boolean>,
  options: FloatingOptions = {},
  point: Ref<FloatingPoint | null> = ref(null)
) {
  const offset = options.offset ?? 1;
  const margin = options.viewportMargin ?? 4;
  const requested = options.placement ?? "bottom-start";

  const position = ref<FloatingPosition>({
    left: 0,
    top: 0,
    width: undefined,
    placement: requested,
  });

  function measure(): DOMRect | null {
    const at = point.value;
    if (at) {
      return {
        left: at.x,
        top: at.y,
        right: at.x,
        bottom: at.y,
        width: 0,
        height: 0,
        x: at.x,
        y: at.y,
        toJSON: () => ({}),
      } as DOMRect;
    }
    const el = anchor.value;
    if (!el) return null;
    return el.getBoundingClientRect();
  }

  function compute() {
    const panel = floating.value;
    const anchorRect = measure();
    if (!panel || !anchorRect) return;

    const width = panel.offsetWidth;
    const height = panel.offsetHeight;
    const viewportW = window.innerWidth;
    const viewportH = window.innerHeight;

    let [side, align] = splitPlacement(requested);

    // 空间不够就翻到对侧
    const space = {
      bottom: viewportH - anchorRect.bottom,
      top: anchorRect.top,
      right: viewportW - anchorRect.right,
      left: anchorRect.left,
    };
    const needs = { bottom: height + offset, top: height + offset, right: width + offset, left: width + offset };
    if (space[side] < needs[side]) {
      const opposite = flip(side);
      if (space[opposite] >= needs[opposite]) side = opposite;
    }

    let left = 0;
    let top = 0;
    if (side === "bottom" || side === "top") {
      top = side === "bottom" ? anchorRect.bottom + offset : anchorRect.top - height - offset;
      if (align === "start") left = anchorRect.left;
      else if (align === "end") left = anchorRect.right - width;
      else left = anchorRect.left + (anchorRect.width - width) / 2;
    } else {
      left = side === "right" ? anchorRect.right + offset : anchorRect.left - width - offset;
      if (align === "start") top = anchorRect.top;
      else if (align === "end") top = anchorRect.bottom - height;
      else top = anchorRect.top + (anchorRect.height - height) / 2;
    }

    left = Math.min(Math.max(margin, left), Math.max(margin, viewportW - width - margin));
    top = Math.min(Math.max(margin, top), Math.max(margin, viewportH - height - margin));

    position.value = {
      left: Math.round(left),
      top: Math.round(top),
      width: options.matchWidth ? Math.round(anchorRect.width) : undefined,
      placement: (align === "center" ? side : `${side}-${align}`) as Placement,
    };
  }

  let frame = 0;
  function schedule() {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      compute();
    });
  }

  function bind() {
    window.addEventListener("scroll", schedule, true);
    window.addEventListener("resize", schedule);
    compute();
  }

  function unbind() {
    window.removeEventListener("scroll", schedule, true);
    window.removeEventListener("resize", schedule);
    if (frame) {
      cancelAnimationFrame(frame);
      frame = 0;
    }
  }

  watch(open, async (value) => {
    if (value) {
      await nextTick();
      bind();
    } else {
      unbind();
    }
  });

  watch(floating, (el) => {
    if (el && open.value) compute();
  });

  watch(point, () => {
    if (open.value) compute();
  });

  onBeforeUnmount(unbind);

  return { position, update: compute, schedule };
}
