import { inject, provide, type ComputedRef, type InjectionKey } from "vue";

/**
 * 类型化的 provide/inject 通道。
 * 字符串 key + 每个消费者各自重声明 context interface 会静默漂移；
 * 这里让接口只有一份真源，并且注入点编译期可查。
 */
export function createContext<T>(name: string) {
  const key: InjectionKey<ComputedRef<T>> = Symbol(name);
  return {
    name,
    provide: (value: ComputedRef<T>) => provide(key, value),
    inject: (): ComputedRef<T> | null => inject(key, null),
  };
}
