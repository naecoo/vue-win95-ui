import { createContext } from "../../utils/context";

export interface TabsContext {
  uid: string;
  active: string | number | undefined;
  select: (id: string | number) => void;
}

export const TabsCtx = createContext<TabsContext>("w95-tabs");
