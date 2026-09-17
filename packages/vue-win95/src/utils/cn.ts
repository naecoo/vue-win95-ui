import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** shadcn-style class merge helper */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
