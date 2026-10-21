<script setup lang="ts">
import { computed, ref } from "vue";
import { useId } from "../../composables/useId";
import { cn } from "../../utils/cn";
import OverlayPanel from "../overlay/OverlayPanel.vue";
import { MenuBarCtx } from "./context";

const props = withDefaults(
  defineProps<{
    label?: string;
    disabled?: boolean;
    /** Alt 访问键，例如 "f" → Alt+F */
    accessKey?: string;
    class?: string;
  }>(),
  { label: "", disabled: false, accessKey: undefined }
);

const uid = useId("w95-menu-entry");
const triggerRef = ref<HTMLElement | null>(null);
const bar = MenuBarCtx.inject();

const isOpen = computed(() => bar?.value.openId === uid.value);

function setOpen(value: boolean) {
  if (props.disabled) return;
  bar?.value.setOpen(value ? uid.value : null);
}

function toggle() {
  setOpen(!isOpen.value);
}

// Win95 行为：已经展开某个菜单时，鼠标划过其它顶层项直接切换
function onPointerEnter() {
  if (props.disabled) return;
  if (bar?.value.openId && bar.value.openId !== uid.value) setOpen(true);
}

function onKeydown(e: KeyboardEvent) {
  if (props.disabled) return;
  if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    setOpen(true);
  }
}

const triggerCls = computed(() =>
  cn(
    "list-none m-0 px-2 py-0.5 border-0 rounded-none",
    "bg-transparent font-w95 text-w95 text-w95-text",
    "cursor-default select-none whitespace-nowrap",
    isOpen.value && "bg-w95-blue text-w95-highlight",
    "hover:bg-w95-blue hover:text-w95-highlight",
    "w95-focus",
    "focus:outline-none focus:bg-w95-blue focus:text-w95-highlight",
    props.disabled && "text-w95-shadow pointer-events-none",
    props.class
  )
);
</script>

<template>
  <li role="none" class="list-none">
    <button
      ref="triggerRef"
      type="button"
      role="menuitem"
      aria-haspopup="menu"
      :aria-expanded="isOpen"
      :aria-controls="uid"
      :aria-disabled="disabled || undefined"
      :tabindex="disabled ? -1 : 0"
      :accesskey="accessKey"
      :class="triggerCls"
      @click="toggle"
      @keydown="onKeydown"
      @pointerenter="onPointerEnter"
    >
      {{ label }}
    </button>
    <OverlayPanel
      :model-value="isOpen"
      :anchor="triggerRef"
      placement="bottom-start"
      :offset="0"
      role="menu"
      :label="label"
      class="p-0.5 min-w-[140px] shadow-w95-raised"
      @update:model-value="(v: boolean) => setOpen(v)"
    >
      <div :id="uid" @click="setOpen(false)">
        <slot />
      </div>
    </OverlayPanel>
  </li>
</template>
