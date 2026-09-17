<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref } from "vue";
import { useId } from "../../composables/useId";
import { useFocusTrap } from "../../composables/useFocusTrap";
import { cn } from "../../utils/cn";

const props = withDefaults(
  defineProps<{
    modelValue?: boolean;
    label?: string;
    class?: string;
  }>(),
  {
    modelValue: false,
    label: "Menu",
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
}>();

const uid = useId("w95-dd");
const triggerRef = ref<HTMLElement | null>(null);
const menuRef = ref<HTMLElement | null>(null);

const open = computed({
  get: () => props.modelValue,
  set: (v: boolean) => emit("update:modelValue", v),
});

useFocusTrap(menuRef, open);

function toggle() {
  open.value = !open.value;
  if (open.value) {
    nextTick(() => {
      const first = menuRef.value?.querySelector<HTMLElement>(
        '[role="menuitem"]:not([aria-disabled="true"])'
      );
      first?.focus();
    });
  } else {
    triggerRef.value?.focus();
  }
}

function onKeydownTrigger(e: KeyboardEvent) {
  if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    if (!open.value) toggle();
  }
}

function onMenuKeydown(e: KeyboardEvent) {
  if (e.key === "Escape") {
    e.stopPropagation();
    open.value = false;
    triggerRef.value?.focus();
    return;
  }
  const items = Array.from(
    menuRef.value?.querySelectorAll<HTMLElement>(
      '[role="menuitem"]:not([aria-disabled="true"])'
    ) ?? []
  );
  if (items.length === 0) return;
  const idx = items.indexOf(document.activeElement as HTMLElement);
  if (e.key === "ArrowDown") {
    e.preventDefault();
    items[(idx + 1) % items.length]?.focus();
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    items[(idx - 1 + items.length) % items.length]?.focus();
  } else if (e.key === "Home") {
    e.preventDefault();
    items[0]?.focus();
  } else if (e.key === "End") {
    e.preventDefault();
    items[items.length - 1]?.focus();
  }
}

function onDocClick(e: MouseEvent) {
  const t = e.target as Node;
  if (!open.value) return;
  if (
    triggerRef.value?.contains(t) ||
    menuRef.value?.contains(t)
  )
    return;
  open.value = false;
}

import { onMounted } from "vue";
onMounted(() => document.addEventListener("mousedown", onDocClick));
onBeforeUnmount(() => document.removeEventListener("mousedown", onDocClick));

const triggerClasses = computed(() =>
  cn(
    "box-border border-0 rounded-none cursor-default select-none",
    "font-w95 text-w95 min-w-w95-btn min-h-w95-btn px-3",
    "bg-w95-surface shadow-w95-raised",
    "text-transparent [text-shadow:0_0_var(--w95-text)]",
    "active:shadow-w95-sunken",
    "focus:outline focus:outline-1 focus:outline-dotted focus:outline-black focus:outline-offset-[-4px]",
    props.class
  )
);
</script>

<template>
  <div class="relative inline-block font-w95 text-w95">
    <button
      ref="triggerRef"
      type="button"
      :class="triggerClasses"
      :aria-expanded="open"
      :aria-haspopup="'menu'"
      :aria-controls="uid"
      @click="toggle"
      @keydown="onKeydownTrigger"
    >
      {{ label }} ▾
    </button>
    <div
      v-if="open"
      ref="menuRef"
      :id="uid"
      role="menu"
      tabindex="-1"
      :class="
        cn(
          'absolute left-0 top-full z-[1000] mt-px min-w-full',
          'bg-w95-surface shadow-w95-raised p-0.5 list-none m-0',
          'focus:outline-none'
        )
      "
      @keydown="onMenuKeydown"
    >
      <slot />
    </div>
  </div>
</template>
