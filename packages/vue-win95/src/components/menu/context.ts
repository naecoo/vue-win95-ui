import { createContext } from "../../utils/context";

export interface MenuBarContext {
  /** 当前展开的顶层菜单 id */
  openId: string | null;
  setOpen: (id: string | null) => void;
}

export const MenuBarCtx = createContext<MenuBarContext>("w95-menubar");
