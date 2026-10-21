<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from "vue";
import { cn } from "../../utils/cn";
import OverlayPanel from "../overlay/OverlayPanel.vue";
import type { Placement } from "../../composables/useFloating";

const props = withDefaults(
  defineProps<{
    content?: string;
    placement?: "top" | "bottom" | "left" | "right";
    openDelay?: number;
    class?: string;
  }>(),
  {
    content: "",
    placement: "top",
    openDelay: 200,
  }
);

const triggerRef = ref<HTMLElement | null>(null);
const open = ref(false);
let timer: ReturnType<typeof setTimeout> | null = null;

const floatingPlacement = computed<Placement>(() =>
  props.placement === "bottom"
    ? "bottom"
    : props.placement === "left"
      ? "left-start"
      : props.placement === "right"
        ? "right-start"
        : "top"
);

function show() {
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    open.value = true;
  }, props.openDelay);
}

function hide() {
  if (timer) clearTimeout(timer);
  open.value = false;
}

onBeforeUnmount(() => {
  if (timer) clearTimeout(timer);
});

const wrapperCls = computed(() => cn("inline-flex", props.class));
</script>

<template>
  <span
    ref="triggerRef"
    :class="wrapperCls"
    @mouseenter="show"
    @mouseleave="hide"
    @focusin="show"
    @focusout="hide"
  >
    <slot />
    <OverlayPanel
      :model-value="open && Boolean(content)"
      :anchor="triggerRef"
      :placement="floatingPlacement"
      role="tooltip"
      :dismiss-on-outside="false"
      :dismiss-on-escape="false"
      class="pointer-events-none max-w-[240px] px-1.5 py-0.5 bg-w95-highlight shadow-w95-field font-w95 text-w95"
      @update:model-value="(v: boolean) => (open = v)"
    >
      {{ content }}
    </OverlayPanel>
  </span>
</template>
