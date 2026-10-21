import { h, ref, render, type VNode } from "vue";
import W95Dialog from "../dialog/Dialog.vue";
import W95Button from "../button/Button.vue";

export type W95MessageBoxType = "alert" | "confirm";

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

    // 必须是真正的 ref：普通对象冒充 ref 时，关闭不会触发重渲染，离场动画永远是假的
    const open = ref(true);
    let settled = false;

    function done(value: boolean) {
      if (settled) return;
      settled = true;
      open.value = false;
      window.setTimeout(() => {
        render(null, host);
        host.remove();
      }, 80);
      resolve(value);
    }

    const Wrapper = {
      name: "W95MessageBoxHost",
      setup() {
        return () =>
          h(
            W95Dialog,
            {
              modelValue: open.value,
              title: opts.title ?? (type === "confirm" ? "Confirm" : "Alert"),
              width: opts.width ?? 480,
              role: "alertdialog",
              showClose: false,
              closeOnOverlay: false,
              confirmText: opts.confirmText ?? "OK",
              cancelText: opts.cancelText ?? "Cancel",
              "onUpdate:modelValue": (v: boolean) => {
                if (!v) done(false);
              },
              onClose: () => done(false),
            },
            {
              default: () =>
                h("p", { style: "margin:0;font-size:14px;line-height:1.5" }, opts.message),
              footer: () =>
                type === "alert"
                  ? h(
                      W95Button,
                      {
                        default: true,
                        style: "min-width:88px;min-height:28px",
                        onClick: () => done(true),
                      },
                      () => opts.confirmText ?? "OK"
                    )
                  : [
                      h(
                        W95Button,
                        {
                          default: true,
                          style: "min-width:88px;min-height:28px",
                          onClick: () => done(true),
                        },
                        () => opts.confirmText ?? "OK"
                      ),
                      h(
                        W95Button,
                        {
                          style: "min-width:88px;min-height:28px",
                          onClick: () => done(false),
                        },
                        () => opts.cancelText ?? "Cancel"
                      ),
                    ],
            }
          );
      },
    };

    const vnode: VNode = h(Wrapper);
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
