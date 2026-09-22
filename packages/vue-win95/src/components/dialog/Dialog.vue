<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useFocusTrap } from "../../composables/useFocusTrap";
import { useId } from "../../composables/useId";
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
  }>(),
  {
    title: "Dialog",
    showClose: true,
    width: undefined,
    size: "md",
    closeOnOverlay: true,
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

function onKeydown(e: KeyboardEvent) {
  if (e.key === "Escape" && props.modelValue) {
    e.stopPropagation();
    close();
  }
}

function onDocKeydown(e: KeyboardEvent) {
  if (e.key === "Escape" && props.modelValue) close();
}

onMounted(() => document.addEventListener("keydown", onDocKeydown));
onBeforeUnmount(() => document.removeEventListener("keydown", onDocKeydown));

watch(
  () => props.modelValue,
  async (val) => {
    if (val) {
      document.body.style.overflow = "hidden";
      await nextTick();
    } else {
      document.body.style.overflow = "";
    }
  }
);
</script>

<template>
  <Teleport to="body">
    <Transition name="w95-dialog">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-[3000] flex justify-center items-start pt-[15vh] bg-black/20"
        role="presentation"
        @click.self="onOverlayClick"
        @keydown="onKeydown"
      >
        <div
          ref="panelRef"
          class="outline-none"
          role="alertdialog"
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
            <div class="flex justify-center gap-w95-sm">
              <slot name="footer">
                <W95Button default @pointerdown.stop @click="onConfirm">OK</W95Button>
                <W95Button @pointerdown.stop @click="onCancel">Cancel</W95Button>
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
