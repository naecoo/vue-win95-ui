<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../utils/cn";

const props = withDefaults(
  defineProps<{
    title?: string;
    active?: boolean;
    showMinimize?: boolean;
    showMaximize?: boolean;
    showClose?: boolean;
    width?: string | number;
    class?: string;
  }>(),
  {
    title: "",
    active: true,
    showMinimize: true,
    showMaximize: true,
    showClose: true,
    width: undefined,
  }
);

const emit = defineEmits<{
  minimize: [];
  maximize: [];
  close: [];
}>();

const rootStyle = computed(() =>
  props.width !== undefined
    ? { width: typeof props.width === "number" ? `${props.width}px` : props.width }
    : undefined
);

const titleBarClasses = computed(() =>
  cn(
    "flex items-center justify-between box-border",
    "min-h-w95-title px-[2px] pl-[3px] py-[3px]",
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
  "focus:outline-none";

const rootClasses = computed(() =>
  cn(
    "font-w95 text-w95 box-border p-[3px] bg-w95-surface shadow-w95-window",
    "transition-shadow duration-75",
    props.class
  )
);
</script>

<template>
  <div :class="rootClasses" :style="rootStyle" role="dialog" :aria-label="title || undefined">
    <div :class="titleBarClasses">
      <div class="font-bold text-white mr-6 overflow-hidden text-ellipsis whitespace-nowrap">
        {{ title }}
      </div>
      <div class="flex shrink-0">
        <button
          v-if="showMinimize"
          type="button"
          :class="[btnBase, 'w95-title-glyph-min']"
          aria-label="Minimize"
          @click="emit('minimize')"
        />
        <button
          v-if="showMaximize"
          type="button"
          :class="[btnBase, 'w95-title-glyph-max']"
          aria-label="Maximize"
          @click="emit('maximize')"
        />
        <button
          v-if="showClose"
          type="button"
          :class="[btnBase, 'w95-title-glyph-close', 'ml-0.5']"
          aria-label="Close"
          @click="emit('close')"
        />
      </div>
    </div>
    <div class="m-w95">
      <slot />
    </div>
    <div v-if="$slots.status" class="mx-px mb-px flex gap-px">
      <slot name="status" />
    </div>
  </div>
</template>
