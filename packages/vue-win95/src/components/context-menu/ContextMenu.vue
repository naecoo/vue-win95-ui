<script setup lang="ts">
import { computed, ref } from "vue";
import { cn } from "../../utils/cn";
import OverlayPanel from "../overlay/OverlayPanel.vue";

const props = withDefaults(
  defineProps<{
    modelValue?: boolean;
    x?: number;
    y?: number;
    label?: string;
    class?: string;
  }>(),
  { modelValue: false, x: 0, y: 0, label: "Context menu" }
);

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
}>();

const menuRef = ref<HTMLElement | null>(null);
const open = computed({
  get: () => props.modelValue,
  set: (v: boolean) => emit("update:modelValue", v),
});

function onKeydown(e: KeyboardEvent) {
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

const menuClasses = computed(() =>
  cn("p-0.5 min-w-[140px] shadow-w95-raised", props.class)
);
</script>

<template>
  <OverlayPanel
    v-model="open"
    :x="x"
    :y="y"
    :offset="0"
    role="menu"
    :label="label"
    auto-focus
    :class="menuClasses"
  >
    <div
      ref="menuRef"
      class="focus:outline-none"
      @keydown="onKeydown"
      @contextmenu.prevent
    >
      <slot />
    </div>
  </OverlayPanel>
</template>
