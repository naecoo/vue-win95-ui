<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { cn } from "../../utils/cn";
import { nextZIndex } from "../../composables/useZIndex";
import { useLocale } from "../../locale";

const props = withDefaults(
  defineProps<{
    title?: string;
    /** 窗口是否浮在桌面上（可拖动、可堆叠）。行内嵌用保持 false */
    floating?: boolean;
    draggable?: boolean;
    active?: boolean;
    showMinimize?: boolean;
    showMaximize?: boolean;
    showClose?: boolean;
    width?: string | number;
    height?: string | number;
    minWidth?: number;
    minHeight?: number;
    /** 初始位置（floating 时生效） */
    defaultX?: number;
    defaultY?: number;
    x?: number;
    y?: number;
    z?: number;
    /** 受控的最小化/最大化；不传时窗口自己管 */
    minimized?: boolean;
    maximized?: boolean;
    class?: string;
  }>(),
  {
    title: "",
    floating: false,
    draggable: true,
    active: true,
    showMinimize: true,
    showMaximize: true,
    showClose: true,
    width: undefined,
    height: undefined,
    minWidth: 180,
    minHeight: 80,
    defaultX: 48,
    defaultY: 48,
    x: undefined,
    y: undefined,
    z: undefined,
    minimized: undefined,
    maximized: undefined,
  }
);

const emit = defineEmits<{
  minimize: [];
  maximize: [];
  close: [];
  focus: [];
  "update:x": [value: number];
  "update:y": [value: number];
  "update:z": [value: number];
  "update:minimized": [value: boolean];
  "update:maximized": [value: boolean];
}>();

const { t } = useLocale();

const rootRef = ref<HTMLElement | null>(null);

const pos = ref({ x: props.x ?? props.defaultX, y: props.y ?? props.defaultY });
const layerZ = ref(props.z ?? 0);
const localMinimized = ref(false);
const localMaximized = ref(false);
const lastPos = ref({ ...pos.value });

const isMinimized = computed(() => props.minimized ?? localMinimized.value);
const isMaximized = computed(() => props.maximized ?? localMaximized.value);

watch(
  () => props.x,
  (v) => {
    if (v !== undefined) pos.value.x = v;
  }
);
watch(
  () => props.y,
  (v) => {
    if (v !== undefined) pos.value.y = v;
  }
);
watch(
  () => props.z,
  (v) => {
    if (v !== undefined) layerZ.value = v;
  }
);
watch(
  () => props.minimized,
  (v) => {
    if (v !== undefined) localMinimized.value = v;
  }
);
watch(
  () => props.maximized,
  (v) => {
    if (v !== undefined) localMaximized.value = v;
  }
);

const canDrag = computed(() => props.floating && props.draggable && !isMaximized.value);

function raise() {
  if (!props.floating) return;
  layerZ.value = nextZIndex();
  emit("update:z", layerZ.value);
  emit("focus");
}

function toggleMinimize() {
  localMinimized.value = !isMinimized.value;
  emit("update:minimized", localMinimized.value);
  emit("minimize");
}

function toggleMaximize() {
  if (isMaximized.value) {
    localMaximized.value = false;
    pos.value = { ...lastPos.value };
  } else {
    lastPos.value = { ...pos.value };
    localMaximized.value = true;
  }
  emit("update:maximized", localMaximized.value);
  emit("maximize");
}

/* —— 拖动 —— */
let drag: { pointerId: number; startX: number; startY: number; originX: number; originY: number } | null =
  null;

function onTitlePointerDown(e: PointerEvent) {
  if (!canDrag.value) return;
  if ((e.target as HTMLElement).closest("button")) return;
  raise();
  drag = {
    pointerId: e.pointerId,
    startX: e.clientX,
    startY: e.clientY,
    originX: pos.value.x,
    originY: pos.value.y,
  };
  (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
  e.preventDefault();
}

function clampToParent(x: number, y: number) {
  const el = rootRef.value;
  const parent = el?.offsetParent as HTMLElement | null;
  if (!el || !parent) return { x: Math.max(0, x), y: Math.max(0, y) };
  const maxX = Math.max(0, parent.clientWidth - el.offsetWidth);
  const maxY = Math.max(0, parent.clientHeight - el.offsetHeight);
  return {
    x: Math.min(Math.max(0, x), maxX),
    y: Math.min(Math.max(0, y), maxY),
  };
}

function onTitlePointerMove(e: PointerEvent) {
  if (!drag || e.pointerId !== drag.pointerId) return;
  const next = clampToParent(
    drag.originX + (e.clientX - drag.startX),
    drag.originY + (e.clientY - drag.startY)
  );
  pos.value = next;
  emit("update:x", next.x);
  emit("update:y", next.y);
}

function onTitlePointerUp(e: PointerEvent) {
  if (!drag) return;
  drag = null;
  (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
}

function onTitleDoubleClick() {
  if (!props.floating || !props.showMaximize) return;
  toggleMaximize();
}

const rootStyle = computed(() => {
  const base: Record<string, string> = {};
  if (props.width !== undefined) {
    base.width = typeof props.width === "number" ? `${props.width}px` : props.width;
  }
  if (props.height !== undefined) {
    base.height = typeof props.height === "number" ? `${props.height}px` : props.height;
  }
  if (props.floating) {
    base.position = "absolute";
    if (isMaximized.value) {
      base.left = "0px";
      base.top = "0px";
      base.right = "0px";
      base.bottom = "0px";
      base.width = "auto";
      base.height = "auto";
    } else {
      base.left = `${pos.value.x}px`;
      base.top = `${pos.value.y}px`;
    }
    if (layerZ.value) base.zIndex = String(layerZ.value);
  } else if (props.height !== undefined) {
    base.height = typeof props.height === "number" ? `${props.height}px` : props.height;
  }
  return base;
});

const titleBarClasses = computed(() =>
  cn(
    "flex items-center justify-between box-border select-none",
    "min-h-w95-title px-[2px] pl-[3px] py-[3px]",
    canDrag.value && "cursor-move touch-none",
    props.active
      ? "bg-gradient-to-r from-w95-blue to-w95-blue-light"
      : "bg-gradient-to-r from-w95-gray to-w95-gray-light"
  )
);

const btnBase =
  "relative box-border border-0 rounded-none cursor-default select-none " +
  "w-[16px] h-[14px] min-w-0 min-h-0 max-w-none max-h-none p-0 overflow-visible " +
  "bg-w95-surface shadow-w95-raised w95-btn-motion " +
  "hover:shadow-w95-sunken " +
  "active:shadow-w95-sunken active:pt-px active:pl-px " +
  "w95-focus";

const rootClasses = computed(() =>
  cn(
    "font-w95 text-w95 box-border p-[3px] bg-w95-surface shadow-w95-window",
    "transition-shadow duration-75",
    "flex flex-col",
    props.class
  )
);

const bodyClasses = computed(() =>
  cn("m-w95 flex-1 min-h-0", props.height !== undefined && "overflow-auto")
);
</script>

<template>
  <div
    v-show="!isMinimized"
    ref="rootRef"
    :class="rootClasses"
    :style="rootStyle"
    role="dialog"
    :aria-label="title || undefined"
    :aria-modal="floating ? false : undefined"
    @pointerdown="raise"
  >
    <div
      :class="titleBarClasses"
      data-window-titlebar
      @pointerdown="onTitlePointerDown"
      @pointermove="onTitlePointerMove"
      @pointerup="onTitlePointerUp"
      @pointercancel="onTitlePointerUp"
      @dblclick="onTitleDoubleClick"
    >
      <div class="font-bold text-white mr-6 overflow-hidden text-ellipsis whitespace-nowrap">
        {{ title }}
      </div>
      <div class="flex shrink-0">
        <button
          v-if="showMinimize"
          type="button"
          :class="[btnBase, 'w95-title-glyph-min']"
          :aria-label="t('window.minimize')"
          @click="toggleMinimize"
        />
        <button
          v-if="showMaximize"
          type="button"
          :class="[btnBase, 'w95-title-glyph-max']"
          :aria-label="isMaximized ? t('window.restore') : t('window.maximize')"
          :aria-pressed="isMaximized"
          @click="toggleMaximize"
        />
        <button
          v-if="showClose"
          type="button"
          :class="[btnBase, 'w95-title-glyph-close', 'ml-0.5']"
          :aria-label="t('window.close')"
          @click="emit('close')"
        />
      </div>
    </div>
    <div :class="bodyClasses">
      <slot />
    </div>
    <div v-if="$slots.status" class="mx-px mb-px flex gap-px">
      <slot name="status" />
    </div>
  </div>
</template>
