<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from "vue";
import { useId } from "../../composables/useId";
import { cn } from "../../utils/cn";
import OverlayPanel from "../overlay/OverlayPanel.vue";

const props = withDefaults(
  defineProps<{
    label?: string;
    disabled?: boolean;
    class?: string;
  }>(),
  { label: "More", disabled: false }
);

const uid = useId("w95-sub");
const triggerRef = ref<HTMLElement | null>(null);
const open = ref(false);

const rootCls = computed(() =>
  cn("relative list-none m-0", props.disabled && "pointer-events-none", props.class)
);

const triggerCls = cn(
  "w-full text-left list-none m-0 px-2 py-0.5 border-0 rounded-none",
  "bg-transparent font-w95 text-w95 text-w95-text",
  "cursor-default select-none flex items-center justify-between gap-3",
  "hover:bg-w95-blue hover:text-w95-highlight",
  "focus:outline-none focus:bg-w95-blue focus:text-w95-highlight"
);

let collapseTimer: ReturnType<typeof setTimeout> | null = null;

function expand() {
  if (props.disabled) return;
  if (collapseTimer) {
    clearTimeout(collapseTimer);
    collapseTimer = null;
  }
  open.value = true;
}

// 面板被 Teleport 到 body，鼠标从触发项移到面板会先触发 mouseleave，
// 所以收起要延迟，并在指针进入面板时取消。
function collapse() {
  if (collapseTimer) clearTimeout(collapseTimer);
  collapseTimer = setTimeout(() => {
    collapseTimer = null;
    open.value = false;
  }, 140);
}

function cancelCollapse() {
  if (collapseTimer) {
    clearTimeout(collapseTimer);
    collapseTimer = null;
  }
}

onBeforeUnmount(cancelCollapse);
</script>

<template>
  <li
    :class="rootCls"
    role="none"
    @mouseenter="expand"
    @mouseleave="collapse"
  >
    <button
      ref="triggerRef"
      type="button"
      role="menuitem"
      aria-haspopup="menu"
      :aria-expanded="open"
      :aria-controls="uid"
      :aria-disabled="disabled || undefined"
      :class="triggerCls"
      :tabindex="disabled ? -1 : 0"
      @click="open = !open"
      @keydown.right.prevent="expand"
      @keydown.left.prevent="collapse"
    >
      {{ label }}
      <span aria-hidden="true">▸</span>
    </button>
    <OverlayPanel
      v-model="open"
      :anchor="triggerRef"
      placement="right-start"
      :offset="0"
      role="menu"
      :label="label"
      class="p-0.5 min-w-[120px] shadow-w95-raised"
    >
      <div
        :id="uid"
        @pointerenter="cancelCollapse"
        @pointerleave="collapse"
      >
        <slot />
      </div>
    </OverlayPanel>
  </li>
</template>
