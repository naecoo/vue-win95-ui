<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useRovingFocus } from "../../composables/useRovingFocus";
import { useId } from "../../composables/useId";
import { cn } from "../../utils/cn";

const props = withDefaults(
  defineProps<{
    modelValue?: boolean;
    x?: number;
    y?: number;
    class?: string;
  }>(),
  { modelValue: false, x: 0, y: 0 }
);

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
}>();

const uid = useId("w95-ctx");
const menuRef = ref<HTMLElement | null>(null);
const { onKeydown } = useRovingFocus(menuRef, {
  orientation: "vertical",
  loop: true,
  selector: '[role="menuitem"]:not([aria-disabled="true"])',
});

const open = computed({
  get: () => props.modelValue,
  set: (v: boolean) => emit("update:modelValue", v),
});

function close() {
  open.value = false;
}

function onDocPointer() {
  if (open.value) close();
}

function onKeydownRoot(e: KeyboardEvent) {
  if (e.key === "Escape") {
    e.stopPropagation();
    close();
    return;
  }
  onKeydown(e);
}

onMounted(() => document.addEventListener("pointerdown", onDocPointer, true));
onBeforeUnmount(() =>
  document.removeEventListener("pointerdown", onDocPointer, true)
);

watch(open, (v) => {
  if (v) {
    // focus first item after open
    requestAnimationFrame(() => {
      const first = menuRef.value?.querySelector<HTMLElement>(
        '[role="menuitem"]:not([aria-disabled="true"])'
      );
      first?.focus();
    });
  }
});

const style = computed(() => ({
  left: `${props.x}px`,
  top: `${props.y}px`,
}));

const classes = computed(() =>
  cn(
    "fixed z-[1300] min-w-[140px] p-0.5 list-none m-0",
    "bg-w95-surface shadow-w95-raised font-w95 text-w95 text-w95-text",
    "focus:outline-none",
    props.class
  )
);
</script>

<template>
  <ul
    v-if="open"
    :id="uid"
    ref="menuRef"
    role="menu"
    :class="classes"
    :style="style"
    @keydown="onKeydownRoot"
    @contextmenu.prevent
  >
    <slot />
  </ul>
</template>
