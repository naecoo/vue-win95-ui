import { createContext } from "../../utils/context";

export interface TreeNode {
  value: string | number;
  label: string;
  disabled?: boolean;
  children?: TreeNode[];
}

export interface TreeContext {
  selected: string | number | null;
  select: (value: string | number) => void;
  isOpen: (value: string | number) => boolean;
  toggle: (value: string | number) => void;
}

export const TreeCtx = createContext<TreeContext>("w95-tree");
