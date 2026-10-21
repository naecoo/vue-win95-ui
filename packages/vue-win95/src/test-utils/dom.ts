/**
 * 测试助手：浮层会被 Teleport 到 body，
 * 断言必须查 document，而不是组件子树。
 */
export const $ = <T extends Element = HTMLElement>(selector: string) =>
  document.querySelector<T>(selector);

export const $$ = <T extends Element = HTMLElement>(selector: string) =>
  Array.from(document.querySelectorAll<T>(selector));

/** 清掉残留的浮层节点，避免用例之间互相污染 */
export function cleanupOverlays() {
  document
    .querySelectorAll(
      '[role="menu"],[role="listbox"],[role="tooltip"],[role="dialog"],[role="alertdialog"]'
    )
    .forEach((el) => el.remove());
}
