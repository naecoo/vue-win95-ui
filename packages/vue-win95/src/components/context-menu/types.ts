/** 右键菜单条目（与菜单栏的 W95MenuEntry 组件不是一回事） */
export interface W95ContextMenuItem {
  label: string;
  disabled?: boolean;
  onClick?: () => void;
}

export type W95ContextMenuProps = {
  modelValue?: boolean;
  x?: number;
  y?: number;
  label?: string;
  class?: string;
};

export type W95ContextMenuAreaProps = {
  items?: W95ContextMenuItem[];
};
