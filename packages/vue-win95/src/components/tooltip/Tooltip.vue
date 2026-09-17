<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from "vue";
import { useId } from "../../composables/useId";
import { cn } from "../../utils/cn";

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

const uid = useId("w95-tip");
const open = ref(false);
let timer: ReturnType<typeof setTimeout> | null = null;

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

function onFocus() {
  open.value = true;
}

function onBlur() {
  hide();
}

onBeforeUnmount(() => {
  if (timer) clearTimeout(timer);
});

const tipClasses = computed(() =>
  cn(
    "absolute z-[1100] pointer-events-none",
    "px-1.5 py-0.5 max-w-[240px]",
    "bg-w95-highlight text-w95-text font-w95 text-w95",
    "shadow-w95-field border-0",
    props.placement === "top" && "bottom-full left-1/2 -translate-x-1/2 mb-1",
    props.placement === "bottom" && "top-full left-1/2 -translate-x-1/2 mt-1",
    props.placement === "left" && "right-full top-1/2 -translate-y-1/2 mr-1",
    props.placement === "right" && "left-full top-1/2 -translate-y-1/2 ml-1"
  )
);
</script>

<template>
  <span
    :class="cn('relative inline-flex', props.class)"
    @mouseenter="show"
    @mouseleave="hide"
    @focusin="onFocus"
    @focusout="onBlur"
  >
    <slot />
    <span
      v-if="open && content"
      :id="uid"
      role="tooltip"
      :class="tipClasses"
    >
      {{ content }}
    </span>
  </span>
</template>
