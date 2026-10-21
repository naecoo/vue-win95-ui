export type W95Locale = "en" | "zh-CN";

export type W95MessageKey =
  | "table.label"
  | "table.empty"
  | "table.loading"
  | "pagination.label"
  | "pagination.prev"
  | "pagination.next"
  | "pagination.total"
  | "pagination.pageSize"
  | "combobox.loading"
  | "combobox.empty"
  | "combobox.clear"
  | "combobox.toggle"
  | "date.label"
  | "date.open"
  | "date.prevMonth"
  | "date.nextMonth"
  | "date.today"
  | "date.clear"
  | "tree.expand"
  | "tree.collapse"
  | "tree.label"
  | "dialog.ok"
  | "dialog.cancel"
  | "dialog.close"
  | "message.alertTitle"
  | "message.confirmTitle"
  | "window.minimize"
  | "window.maximize"
  | "window.restore"
  | "window.close"
  | "window.label"
  | "menu.label"
  | "toolbar.label"
  | "breadcrumb.label"
  | "notifications.label"
  | "upload.choose"
  | "upload.remove"
  | "desktop.label"
  | "taskbar.label";

export interface W95Messages {
  messages: Record<W95MessageKey, string>;
  months: string[];
  weekdays: string[];
}
