<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useFocusTrap } from "../../composables/useFocusTrap";
import { useId } from "../../composables/useId";
import { cn } from "../../utils/cn";
import { nextZIndex } from "../../composables/useZIndex";
import { useLocale } from "../../locale";
import W95Window from "../window/Window.vue";
import W95Button from "../button/Button.vue";

const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    title?: string;
    showClose?: boolean;
    width?: string | number;
    size?: "sm" | "md" | "lg";
    closeOnOverlay?: boolean;
    /** alertdialog 用于确认类弹窗，普通内容用 dialog */
    role?: "dialog" | "alertdialog";
    okText?: string;
    cancelText?: string;
    hideFooter?: boolean;
    class?: string;
  }>(),
  {
    title: "Dialog",
    showClose: true,
    width: undefined,
    size: "md",
    closeOnOverlay: true,
    role: "dialog",
    okText: undefined,
    cancelText: undefined,
    hideFooter: false,
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  close: [];
  confirm: [];
  cancel: [];
}>();

const sizeWidth = computed(() =>
  props.size === "sm" ? 360 : props.size === "lg" ? 640 : 480
);
const effectiveWidth = computed(() => props.width ?? sizeWidth.value);

const titleId = useId("w95-dialog-title");
const panelRef = ref<HTMLElement | null>(null);
const layerZ = ref(0);

const { t } = useLocale();

const okLabel = computed(() => props.okText ?? t("dialog.ok"));
const cancelLabel = computed(() => props.cancelText ?? t("dialog.cancel"));

const open = computed({
  get: () => props.modelValue,
  set: (v: boolean) => emit("update:modelValue", v),
});

useFocusTrap(panelRef, open);

function close() {
  open.value = false;
  emit("close");
}

function onOverlayClick() {
  if (props.closeOnOverlay) close();
}

function onConfirm() {
  emit("confirm");
  close();
}

function onCancel() {
  emit("cancel");
  close();
}

/* 滚动锁：记录进入前的值，关闭或卸载都要还原，否则打开状态下被卸载会永久锁死页面 */
const scrollLock = {
  count: 0,
  previous: "",
  acquire() {
    if (this.count === 0) {
      this.previous = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    }
    this.count += 1;
  },
  release() {
    this.count = Math.max(0, this.count - 1);
    if (this.count === 0) document.body.style.overflow = this.previous;
  },
};

/* Esc 只由最上层弹窗处理，避免嵌套弹窗一起关掉 */
const stack: symbol[] = [];
const token = Symbol("w95-dialog");

function onDocKeydown(e: KeyboardEvent) {
  if (e.key !== "Escape" || !props.modelValue) return;
  if (stack[stack.length - 1] !== token) return;
  e.stopPropagation();
  close();
}

let locked = false;
watch(
  () => props.modelValue,
  async (val) => {
    if (val) {
      stack.push(token);
      layerZ.value = nextZIndex();
      if (!locked) {
        scrollLock.acquire();
        locked = true;
      }
      await nextTick();
    } else {
      const i = stack.lastIndexOf(token);
      if (i >= 0) stack.splice(i, 1);
      if (locked) {
        scrollLock.release();
        locked = false;
      }
    }
  },
  { immediate: true }
);

onMounted(() => document.addEventListener("keydown", onDocKeydown));
onBeforeUnmount(() => {
  document.removeEventListener("keydown", onDocKeydown);
  const i = stack.lastIndexOf(token);
  if (i >= 0) stack.splice(i, 1);
  if (locked) {
    scrollLock.release();
    locked = false;
  }
});
</script>

<template>
  <Teleport to="body">
    <Transition name="w95-dialog">
      <div
        v-if="modelValue"
        class="fixed inset-0 flex justify-center items-start pt-[15vh] bg-black/20"
        :style="{ zIndex: layerZ }"
        role="presentation"
        @click.self="onOverlayClick"
      >
        <div
          ref="panelRef"
          :class="cn('outline-none', props.class)"
          :role="role"
          aria-modal="true"
          :aria-labelledby="titleId"
          tabindex="-1"
        >
          <W95Window
            :title="title"
            :width="effectiveWidth"
            :show-minimize="false"
            :show-maximize="false"
            :show-close="showClose"
            @close="close"
          >
            <div class="mb-w95 text-w95-text font-w95 text-w95">
              <p
                :id="titleId"
                class="absolute w-px h-px p-0 -m-px overflow-hidden clip-rect whitespace-nowrap border-0"
              >
                {{ title }}
              </p>
              <slot />
            </div>
            <div v-if="!hideFooter" class="flex justify-center gap-w95-sm">
              <slot name="footer">
                <W95Button default @pointerdown.stop @click="onConfirm">{{ okLabel }}</W95Button>
                <W95Button @pointerdown.stop @click="onCancel">{{ cancelLabel }}</W95Button>
              </slot>
            </div>
          </W95Window>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style>
.w95-dialog-enter-active,
.w95-dialog-leave-active {
  transition: opacity 0.05s linear;
}
.w95-dialog-enter-from,
.w95-dialog-leave-to {
  opacity: 0;
}
</style>
