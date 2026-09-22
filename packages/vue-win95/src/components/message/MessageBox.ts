import { h, render, type VNode } from "vue";
import W95Dialog from "../dialog/Dialog.vue";
import W95Button from "../button/Button.vue";

export type W95MessageBoxType = "alert" | "confirm" | "prompt";

export interface W95MessageBoxOptions {
  title?: string;
  message: string;
  type?: W95MessageBoxType;
  confirmText?: string;
  cancelText?: string;
  width?: number;
}

function mountMessageBox(opts: W95MessageBoxOptions): Promise<boolean> {
  return new Promise((resolve) => {
    const host = document.createElement("div");
    document.body.appendChild(host);

    const type = opts.type ?? "alert";
    const showCancel = type !== "alert";

    let vnode: VNode | null = null;

    function destroy() {
      if (vnode) render(null, host);
      host.remove();
      vnode = null;
    }

    function done(value: boolean) {
      open.value = false;
      // wait leave transition
      setTimeout(destroy, 50);
      resolve(value);
    }

    const open = { value: true } as { value: boolean };
    // use a simple reactive-less wrapper via render function
    const Wrapper = {
      name: "W95MessageBox",
      setup() {
        return () =>
          h(
            W95Dialog,
            {
              modelValue: open.value,
              title: opts.title ?? "Confirm",
              width: opts.width ?? 480,
              "onUpdate:modelValue": (v: boolean) => {
                open.value = v;
                if (!v) done(false);
              },
              onClose: () => done(false),
            },
            {
              default: () =>
                h(
                  "p",
                  { style: "margin:0;font-size:14px;line-height:1.5" },
                  opts.message
                ),
              footer: () => [
                h(
                  W95Button,
                  {
                    default: true,
                    style: "min-width:88px;min-height:28px",
                    onPointerdown: (e: Event) => e.stopPropagation(),
                    onClick: () => done(true),
                  },
                  () => opts.confirmText ?? "OK"
                ),
                ...(showCancel
                  ? [
                      h(
                        W95Button,
                        {
                          style: "min-width:88px;min-height:28px",
                          onPointerdown: (e: Event) => e.stopPropagation(),
                          onClick: () => done(false),
                        },
                        () => opts.cancelText ?? "Cancel"
                      ),
                    ]
                  : []),
              ],
            }
          );
      },
    };

    vnode = h(Wrapper);
    render(vnode, host);
  });
}

export function alert(message: string, title = "Alert") {
  return mountMessageBox({ message, title, type: "alert" });
}

export function confirm(message: string, title = "Confirm") {
  return mountMessageBox({ message, title, type: "confirm" });
}

export function messageBox(options: W95MessageBoxOptions) {
  return mountMessageBox(options);
}

export const W95MessageBox = { alert, confirm, show: messageBox };
export default W95MessageBox;
