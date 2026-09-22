<script setup lang="ts">
import { ref, watch } from "vue";
import { cn } from "../../utils/cn";

const props = withDefaults(
  defineProps<{
    width?: number;
    minWidth?: number;
    maxWidth?: number;
    class?: string;
  }>(),
  { width: 480, minWidth: 240, maxWidth: 900 }
);

const w = ref(props.width);
watch(
  () => props.width,
  (v) => (w.value = v)
);

let drag: { x0: number; w0: number } | null = null;

function onDown(e: PointerEvent) {
  drag = { x0: e.clientX, w0: w.value };
  (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
}
function onMove(e: PointerEvent) {
  if (!drag) return;
  const next = drag.w0 + (e.clientX - drag.x0);
  w.value = Math.min(props.maxWidth, Math.max(props.minWidth, next));
}
function onUp() {
  drag = null;
}

const handleCls = cn(
  "absolute top-0 bottom-0 right-0 w-[6px] cursor-col-resize z-[2]",
  "bg-transparent"
);
</script>

<template>
  <div :class="cn('relative', props.class)">
    <div class="absolute inset-0" :style="{ width: w + 'px', maxWidth: '100%' }">
      <slot :width="w" />
    </div>
    <div
      :class="handleCls"
      role="separator"
      aria-orientation="vertical"
      aria-label="Resize panel"
      :aria-valuenow="w"
      :aria-valuemin="minWidth"
      :aria-valuemax="maxWidth"
      tabindex="0"
      @pointerdown="onDown"
      @pointermove="onMove"
      @pointerup="onUp"
      @keydown.left.prevent="w = Math.max(minWidth, w - 8)"
      @keydown.right.prevent="w = Math.min(maxWidth, w + 8)"
    />
  </div>
</template>
