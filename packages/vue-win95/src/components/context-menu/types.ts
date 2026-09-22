export interface W95MenuEntry {
  label: string;
  disabled?: boolean;
  onClick?: () => void;
}

export type W95ContextMenuProps = {
  modelValue?: boolean;
  x?: number;
  y?: number;
};

export type W95ContextMenuAreaProps = {
  items?: W95MenuEntry[];
};
