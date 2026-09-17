import { getCurrentInstance, ref, type Ref } from "vue";

/**
 * SSR-safe unique id generator
 */
export function useId(prefix = "w95"): Ref<string> {
  const instance = getCurrentInstance();
  const uid = instance?.uid ?? Math.floor(Math.random() * 100000);
  const id = ref(`${prefix}-${uid}`);
  return id;
}
