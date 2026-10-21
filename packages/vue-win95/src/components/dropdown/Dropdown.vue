<script setup lang="ts">
import { computed, nextTick, ref } from "vue";
import { useId } from "../../composables/useId";
import { cn } from "../../utils/cn";
import OverlayPanel from "../overlay/OverlayPanel.vue";

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

function toggle() {
  open.value = !open.value;
  if (open.value) {
    nextTick(() => {
      menuRef.value
        ?.querySelector<HTMLElement>('[role="menuitem"]:not([aria-disabled="true"])')
        ?.focus();
    });
  } else {
    triggerRef.value?.focus();
  }
}

function closeAndRestore() {
  open.value = false;
  triggerRef.value?.focus();
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
    closeAndRestore();
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

const triggerClasses = computed(() =>
  cn(
    "box-border border-0 rounded-none cursor-default select-none",
    "font-w95 text-w95 min-w-w95-btn min-h-w95-btn px-3",
    "bg-w95-surface shadow-w95-raised",
    "text-transparent [text-shadow:0_0_var(--w95-text)]",
    "active:shadow-w95-sunken",
    "w95-focus",
    props.class
  )
);

const menuClasses = "p-0 min-w-[120px] shadow-w95-raised";
</script>

<template>
  <button
    ref="triggerRef"
    type="button"
    :class="triggerClasses"
    :aria-expanded="open"
    aria-haspopup="menu"
    :aria-controls="uid"
    @click="toggle"
    @keydown="onKeydownTrigger"
  >
    {{ label }} ▾
  </button>
  <OverlayPanel
    v-model="open"
    :anchor="triggerRef"
    role="menu"
    :label="label"
    :class="menuClasses"
  >
    <div :id="uid" ref="menuRef" tabindex="-1" class="focus:outline-none" @keydown="onMenuKeydown">
      <slot />
    </div>
  </OverlayPanel>
</template>
