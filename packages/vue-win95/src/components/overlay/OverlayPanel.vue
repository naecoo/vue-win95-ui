<script setup lang="ts">
import { computed, ref, watch, type Ref } from "vue";
import { useFloating, type FloatingOptions } from "../../composables/useFloating";
import { useDismiss } from "../../composables/useDismiss";
import { nextZIndex } from "../../composables/useZIndex";
import { cn } from "../../utils/cn";

interface Props extends FloatingOptions {
  modelValue: boolean;
  anchor?: HTMLElement | null;
  /** 坐标定位（右键菜单），给了 x/y 就不用 anchor */
  x?: number;
  y?: number;
  role?: string;
  label?: string;
  /** 需要把焦点移进面板（对话框式浮层）时打开 */
  autoFocus?: boolean;
  dismissOnOutside?: boolean;
  dismissOnEscape?: boolean;
  /** 显式宽度（不跟随锚点时） */
  width?: string | number;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  anchor: null,
  x: undefined,
  y: undefined,
  role: "dialog",
  label: undefined,
  autoFocus: false,
  dismissOnOutside: true,
  dismissOnEscape: true,
  placement: "bottom-start",
  offset: 1,
  matchWidth: false,
  viewportMargin: 4,
  width: undefined,
});

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  dismiss: [];
}>();

const panelRef = ref<HTMLElement | null>(null);
const open = computed(() => props.modelValue);
const anchorRef = computed(() => props.anchor ?? null);
const zIndex = ref(0);

const point = computed(() =>
  props.x !== undefined && props.y !== undefined ? { x: props.x, y: props.y } : null
);

const { position } = useFloating(
  anchorRef as Ref<HTMLElement | null>,
  panelRef,
  open,
  {
    placement: props.placement,
    offset: props.offset,
    matchWidth: props.matchWidth,
    viewportMargin: props.viewportMargin,
  },
  point
);

function close() {
  emit("update:modelValue", false);
  emit("dismiss");
}

useDismiss({
  active: () => props.modelValue,
  ignore: () => [props.anchor, panelRef.value],
  onDismissOutside: props.dismissOnOutside ? close : undefined,
  onDismissEscape: props.dismissOnEscape ? close : undefined,
});

watch(
  () => props.modelValue,
  (value) => {
    if (!value) return;
    zIndex.value = nextZIndex();
    if (props.autoFocus) {
      requestAnimationFrame(() => {
        const target = panelRef.value?.querySelector<HTMLElement>(
          "a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex='-1'])"
        );
        (target ?? panelRef.value)?.focus();
      });
    }
  },
  { immediate: true }
);

const style = computed(() => ({
  position: "fixed" as const,
  left: `${position.value.left}px`,
  top: `${position.value.top}px`,
  width:
    position.value.width != null
      ? `${position.value.width}px`
      : props.width == null
        ? undefined
        : typeof props.width === "number"
          ? `${props.width}px`
          : props.width,
  zIndex: zIndex.value,
}));

const baseClass = [
  "font-w95 text-w95 text-w95-text",
  "bg-w95-surface shadow-w95-window",
  "focus:outline-none",
];
</script>

<template>
  <Teleport to="body">
    <Transition name="w95-overlay">
      <div
        v-if="modelValue"
        ref="panelRef"
        :class="cn(baseClass, props.class)"
        :style="style"
        :role="role"
        :aria-label="label"
        tabindex="-1"
        :data-placement="position.placement"
      >
        <slot />
      </div>
    </Transition>
  </Teleport>
</template>

<style>
.w95-overlay-enter-active,
.w95-overlay-leave-active {
  transition: opacity 0.05s linear;
}
.w95-overlay-enter-from,
.w95-overlay-leave-to {
  opacity: 0;
}
</style>
