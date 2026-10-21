<script setup lang="ts">
import { computed, ref } from "vue";
import { cn } from "../../utils/cn";
import OverlayPanel from "../overlay/OverlayPanel.vue";

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

const triggerRef = ref<HTMLElement | null>(null);

const open = computed({
  get: () => props.modelValue,
  set: (v: boolean) => emit("update:modelValue", v),
});

function close() {
  open.value = false;
}

const titleBar = cn(
  "bg-gradient-to-r from-w95-blue to-w95-blue-light text-white font-bold",
  "px-1.5 py-0.5 mb-1 flex justify-between items-center"
);

const closeBtn =
  "w-4 h-[14px] min-w-0 p-0 border-0 bg-w95-surface shadow-w95-raised " +
  "relative w95-title-glyph-close cursor-default";
</script>

<template>
  <span ref="triggerRef" class="inline-flex font-w95 text-w95">
    <slot name="trigger" :open="open" />
    <OverlayPanel
    v-model="open"
    :anchor="triggerRef"
    role="dialog"
    :label="title"
    :width="width"
    auto-focus
    :class="props.class"
  >
    <div :class="titleBar">
      <span class="truncate">{{ title }}</span>
      <button type="button" :class="closeBtn" aria-label="Close" @click="close" />
    </div>
    <div class="px-1.5 py-1">
      <slot />
    </div>
    </OverlayPanel>
  </span>
</template>
