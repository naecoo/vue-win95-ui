import { ref, type Ref } from "vue";

export type ZLayer = number;

/** Simple window/popup z-index manager */
export function useZIndex(base = 1000) {
  const z = ref(base);
  function next(): number {
    z.value += 1;
    return z.value;
  }
  function top(): number {
    return z.value;
  }
  return { z: z as Ref<number>, next, top, base };
}

const shared = useZIndex(1000);
export function nextZIndex() {
  return shared.next();
}
