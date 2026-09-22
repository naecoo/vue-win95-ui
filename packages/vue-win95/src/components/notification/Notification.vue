<script setup lang="ts">
import { computed, onBeforeUnmount, watch } from "vue";
import { cn } from "../../utils/cn";
import W95Icon from "../icon/Icon.vue";

export type W95NotifyType = "info" | "success" | "warn" | "error";

export interface W95NotifyItem {
  id: string | number;
  title?: string;
  message: string;
  type?: W95NotifyType;
  duration?: number;
}

const props = withDefaults(
  defineProps<{
    modelValue?: W95NotifyItem[];
    duration?: number;
    position?: "top-right" | "bottom-right";
    class?: string;
  }>(),
  {
    modelValue: () => [],
    duration: 3500,
    position: "bottom-right",
  }
);

const emit = defineEmits<{
  "update:modelValue": [items: W95NotifyItem[]];
}>();

const timers = new Map<string | number, ReturnType<typeof setTimeout>>();

function dismiss(id: string | number) {
  emit(
    "update:modelValue",
    props.modelValue.filter((t) => t.id !== id)
  );
}

function arm(item: W95NotifyItem) {
  const ms = item.duration ?? props.duration;
  if (ms <= 0) return;
  if (timers.has(item.id)) clearTimeout(timers.get(item.id)!);
  timers.set(item.id, setTimeout(() => dismiss(item.id), ms));
}

watch(
  () => props.modelValue,
  (list) => list.forEach(arm),
  { immediate: true, deep: true }
);

onBeforeUnmount(() => {
  timers.forEach((t) => clearTimeout(t));
  timers.clear();
});

const iconFor = (t?: W95NotifyType) =>
  t === "error"
    ? "error"
    : t === "warn"
      ? "warning"
      : t === "success"
        ? "ok"
        : "info";

const rootClasses = computed(() =>
  cn(
    "fixed z-[1200] flex flex-col gap-1.5 font-w95 text-w95",
    props.position === "top-right" ? "top-2 right-2" : "bottom-8 right-2",
    props.class
  )
);
</script>

<template>
  <Teleport to="body">
    <div
      v-if="modelValue.length"
      :class="rootClasses"
      role="region"
      aria-label="Notifications"
    >
      <div
        v-for="item in modelValue"
        :key="item.id"
        class="min-w-[240px] max-w-[320px] bg-w95-surface shadow-w95-window p-[3px] text-w95-text"
        role="status"
        aria-live="polite"
      >
        <div
          class="bg-gradient-to-r from-w95-blue to-w95-blue-light text-white font-bold px-1.5 py-0.5 flex justify-between items-center gap-2"
        >
          <span class="flex items-center gap-1.5 truncate">
            <W95Icon :name="iconFor(item.type)" :size="12" />
            {{ item.title || "Notification" }}
          </span>
          <button
            type="button"
            class="w-4 h-[14px] min-w-0 p-0 border-0 bg-w95-surface shadow-w95-raised relative w95-title-glyph-close cursor-default"
            aria-label="Close notification"
            @click="dismiss(item.id)"
          />
        </div>
        <div class="px-2 py-2" style="font-size:13px;line-height:1.45">
          {{ item.message }}
        </div>
      </div>
    </div>
  </Teleport>
</template>
