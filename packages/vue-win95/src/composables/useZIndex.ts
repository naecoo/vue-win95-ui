/**
 * 浮层层级分配器。
 * 唯一的真源：所有需要叠放的浮层都从这里取 z-index，
 * 而不是在组件里写 z-[1000] / z-[1100] / z-[1300] 这种魔法数字。
 */
const POPOVER_BASE = 1000;

let current = POPOVER_BASE;

/** 取下一个浮层层级（后打开的在上层） */
export function nextZIndex(): number {
  current += 1;
  return current;
}

/** 当前最高浮层层级，用于把已打开的浮层提到最前 */
export function currentZIndex(): number {
  return current;
}

/** 仅供测试使用：重置分配器 */
export function resetZIndex(): void {
  current = POPOVER_BASE;
}
