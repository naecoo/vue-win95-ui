<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRovingFocus } from "../../composables/useRovingFocus";
import { cn } from "../../utils/cn";
import { MenuBarCtx } from "./context";
import { useLocale } from "../../locale";

const props = withDefaults(
  defineProps<{
    label?: string;
    class?: string;
  }>(),
  { label: undefined }
);

const { t } = useLocale();
const barRef = ref<HTMLElement | null>(null);
const openId = ref<string | null>(null);

MenuBarCtx.provide(
  computed(() => ({
    openId: openId.value,
    setOpen: (id: string | null) => {
      openId.value = id;
    },
  }))
);

const { onKeydown, syncTabIndexes } = useRovingFocus(barRef, {
  orientation: "horizontal",
  loop: true,
  selector: '[role="menuitem"]:not([aria-disabled="true"])',
});

onMounted(() => syncTabIndexes());

const classes = computed(() =>
  cn(
    "flex items-stretch list-none m-0 p-0",
    "bg-w95-surface font-w95 text-w95 text-w95-text",
    "shadow-w95-raised",
    props.class
  )
);
</script>

<template>
  <ul
    ref="barRef"
    role="menubar"
    :aria-label="label ?? t('menu.label')"
    :class="classes"
    @keydown="onKeydown"
  >
    <slot />
  </ul>
</template>
