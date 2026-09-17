<script setup lang="ts">
import { computed, ref } from "vue";
import { cn } from "../../utils/cn";

const props = withDefaults(
  defineProps<{
    vertical?: boolean;
    min?: number;
    max?: number;
    class?: string;
  }>(),
  {
    vertical: false,
    min: 80,
    max: 600,
  }
);

const emit = defineEmits<{
  resize: [size: number];
}>();

const dragging = ref(false);
const size = ref(200);
const startPos = ref(0);
const startSize = ref(0);

const classes = computed(() =>
  cn(
    "shrink-0 border-0 bg-transparent cursor-default select-none",
    props.vertical
      ? "w-[4px] h-full cursor-col-resize [box-shadow:inset_1px_0_#808080,inset_-1px_0_#ffffff,inset_2px_0_#c0c0c0,inset_-2px_0_#0a0a0a]"
      : "h-[4px] w-full cursor-row-resize [box-shadow:inset_0_1px_#808080,inset_0_-1px_#ffffff,inset_0_2px_#c0c0c0,inset_0_-2px_#0a0a0a]",
    dragging.value && "opacity-80",
    props.class
  )
);

function onPointerDown(e: PointerEvent) {
  dragging.value = true;
  startPos.value = props.vertical ? e.clientX : e.clientY;
  startSize.value = size.value;
  const target = e.currentTarget as HTMLElement;
  target.setPointerCapture(e.pointerId);
}

function onPointerMove(e: PointerEvent) {
  if (!dragging.value) return;
  const delta = (props.vertical ? e.clientX : e.clientY) - startPos.value;
  size.value = Math.min(props.max, Math.max(props.min, startSize.value + delta));
  emit("resize", size.value);
}

function onPointerUp(e: PointerEvent) {
  dragging.value = false;
  const target = e.currentTarget as HTMLElement;
  target.releasePointerCapture(e.pointerId);
}

function onKeydown(e: KeyboardEvent) {
  const step = e.shiftKey ? 20 : 8;
  if (props.vertical && (e.key === "ArrowLeft" || e.key === "ArrowRight")) {
    e.preventDefault();
    size.value = Math.min(
      props.max,
      Math.max(props.min, size.value + (e.key === "ArrowRight" ? step : -step))
    );
    emit("resize", size.value);
  }
  if (!props.vertical && (e.key === "ArrowUp" || e.key === "ArrowDown")) {
    e.preventDefault();
    size.value = Math.min(
      props.max,
      Math.max(props.min, size.value + (e.key === "ArrowDown" ? step : -step))
    );
    emit("resize", size.value);
  }
}
</script>

<template>
  <div
    :class="classes"
    role="separator"
    tabindex="0"
    :aria-orientation="vertical ? 'vertical' : 'horizontal'"
    :aria-valuenow="Math.round(size)"
    :aria-valuemin="min"
    :aria-valuemax="max"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
    @keydown="onKeydown"
  />
</template>
