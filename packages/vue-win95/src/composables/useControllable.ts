import { computed, ref, watch } from "vue";

export interface ControllableOptions<T> {
  /** 判断"外部是否接管了这个值" */
  isControlled: () => boolean;
  read: () => T | undefined;
  write: (value: T) => void;
  initial: T;
}

/**
 * 受控 / 非受控二选一，语义唯一。
 * 之前 Table 是"sortBy 传了就算受控、sortDir 再单独判断"的混合态，
 * 调用方永远猜不准点击会不会生效。
 */
export function useControllable<T>(options: ControllableOptions<T>) {
  const internal = ref(options.initial) as { value: T };
  const isControlled = computed(() => options.isControlled());

  const value = computed<T>(() =>
    isControlled.value ? (options.read() as T) : internal.value
  );

  watch(
    () => options.read(),
    (next) => {
      if (next !== undefined) internal.value = next;
    }
  );

  function set(next: T) {
    if (!isControlled.value) internal.value = next;
    options.write(next);
  }

  return { value, set, isControlled, internal };
}
