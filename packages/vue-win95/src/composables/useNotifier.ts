import { ref, type Ref } from "vue";

export type NotifyType = "info" | "success" | "warn" | "error";

export interface NotifyItem {
  id: string | number;
  title?: string;
  message: string;
  type?: NotifyType;
  duration?: number;
}

const items: Ref<NotifyItem[]> = ref([]);
let seq = 0;

function push(item: Omit<NotifyItem, "id"> & { id?: string | number }) {
  const id = item.id ?? ++seq;
  items.value = [...items.value, { ...item, id }];
  return id;
}

export function useNotifier() {
  return {
    items,
    notify: push,
    info: (message: string, title = "Info") =>
      push({ message, title, type: "info" }),
    success: (message: string, title = "Success") =>
      push({ message, title, type: "success" }),
    warn: (message: string, title = "Warning") =>
      push({ message, title, type: "warn" }),
    error: (message: string, title = "Error") =>
      push({ message, title, type: "error" }),
    dismiss: (id: string | number) => {
      items.value = items.value.filter((t) => t.id !== id);
    },
    clear: () => {
      items.value = [];
    },
  };
}

/** Standalone helpers bound to the global notifier store */
export const notify = push;
export function notifyClear() {
  items.value = [];
}
export const notifyItems = items;
