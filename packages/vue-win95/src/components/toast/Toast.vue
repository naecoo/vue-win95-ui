<script setup lang="ts">
import { computed, onBeforeUnmount, watch } from "vue";
import { cn } from "../../utils/cn";

export interface W95ToastItem {
  id: string | number;
  title?: string;
  message: string;
  duration?: number;
}

const props = withDefaults(
  defineProps<{
    modelValue?: W95ToastItem[];
    duration?: number;
    class?: string;
  }>(),
  {
    modelValue: () => [],
    duration: 3000,
  }
);

const emit = defineEmits<{
  "update:modelValue": [items: W95ToastItem[]];
}>();

const timers = new Map<string | number, ReturnType<typeof setTimeout>>();

function dismiss(id: string | number) {
  const next = props.modelValue.filter((t) => t.id !== id);
  emit("update:modelValue", next);
}

function arm(item: W95ToastItem) {
  const ms = item.duration ?? props.duration;
  if (ms <= 0) return;
  if (timers.has(item.id)) clearTimeout(timers.get(item.id)!);
  timers.set(
    item.id,
    setTimeout(() => dismiss(item.id), ms)
  );
}

watch(
  () => props.modelValue,
  (list) => {
    list.forEach(arm);
  },
  { immediate: true, deep: true }
);

onBeforeUnmount(() => {
  timers.forEach((t) => clearTimeout(t));
  timers.clear();
});

const rootClasses = computed(() =>
  cn(
    "fixed top-2 right-2 z-[1200] flex flex-col gap-1 font-w95 text-w95",
    props.class
  )
);

const itemClasses =
  "min-w-[200px] max-w-[280px] bg-w95-surface shadow-w95-window p-[3px] text-w95-text";
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
        :class="itemClasses"
        role="status"
        aria-live="polite"
      >
        <div
          class="bg-gradient-to-r from-w95-blue to-w95-blue-light text-white font-bold px-1 py-0.5 flex justify-between items-center"
        >
          <span>{{ item.title || "Notification" }}</span>
          <button
            type="button"
            class="w-4 h-4 min-w-0 min-h-0 p-0 bg-w95-surface shadow-w95-raised relative w95-title-glyph-close border-0 cursor-default"
            aria-label="Close notification"
            @click="dismiss(item.id)"
          />
        </div>
        <div class="px-1.5 py-2">
          {{ item.message }}
        </div>
      </div>
    </div>
  </Teleport>
</template>
