<script setup lang="ts">
import { computed, ref } from "vue";
import { useId } from "../../composables/useId";
import { useFocusTrap } from "../../composables/useFocusTrap";
import { cn } from "../../utils/cn";

const props = withDefaults(
  defineProps<{
    modelValue?: boolean;
    title?: string;
    width?: string | number;
    class?: string;
  }>(),
  {
    modelValue: false,
    title: "Popover",
    width: 240,
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
}>();

const uid = useId("w95-pop");
const panelRef = ref<HTMLElement | null>(null);

const open = computed({
  get: () => props.modelValue,
  set: (v: boolean) => emit("update:modelValue", v),
});

useFocusTrap(panelRef, open);

function close() {
  open.value = false;
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === "Escape" && open.value) {
    e.stopPropagation();
    close();
  }
}

const panelStyle = computed(() => ({
  width: typeof props.width === "number" ? `${props.width}px` : props.width,
}));

const panelCls = computed(() =>
  cn(
    "absolute z-[1100] mt-px left-0",
    "bg-w95-surface shadow-w95-window p-[3px] font-w95 text-w95 text-w95-text",
    "focus:outline-none",
    props.class
  )
);
</script>

<template>
  <div class="relative inline-block font-w95 text-w95">
    <slot name="trigger" :open="open" />
    <div
      v-if="open"
      :id="uid"
      ref="panelRef"
      role="dialog"
      :aria-label="title"
      tabindex="-1"
      :class="panelCls"
      :style="panelStyle"
      @keydown="onKeydown"
    >
      <div
        class="bg-gradient-to-r from-w95-blue to-w95-blue-light text-white font-bold px-1.5 py-0.5 mb-1 flex justify-between items-center"
      >
        <span class="truncate">{{ title }}</span>
        <button
          type="button"
          class="w-4 h-[14px] min-w-0 p-0 border-0 bg-w95-surface shadow-w95-raised relative w95-title-glyph-close cursor-default"
          aria-label="Close"
          @pointerdown.stop
          @click="close"
        />
      </div>
      <div class="px-1.5 py-1">
        <slot />
      </div>
    </div>
  </div>
</template>
