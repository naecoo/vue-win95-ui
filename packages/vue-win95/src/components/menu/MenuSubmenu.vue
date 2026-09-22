<script setup lang="ts">
import { computed, ref } from "vue";
import { useId } from "../../composables/useId";
import { cn } from "../../utils/cn";

const props = withDefaults(
  defineProps<{
    label?: string;
    disabled?: boolean;
    class?: string;
  }>(),
  { label: "More", disabled: false }
);

const uid = useId("w95-sub");
const open = ref(false);

const rootCls = computed(() =>
  cn(
    "relative list-none m-0",
    props.disabled && "pointer-events-none",
    props.class
  )
);

const triggerCls = cn(
  "w-full text-left list-none m-0 px-2 py-0.5 border-0 rounded-none",
  "bg-transparent font-w95 text-w95 text-w95-text",
  "cursor-default select-none flex items-center justify-between gap-3",
  "hover:bg-w95-blue hover:text-w95-highlight",
  "focus:outline-none focus:bg-w95-blue focus:text-w95-highlight"
);

const subCls =
  "absolute left-full top-0 z-[1100] min-w-[120px] p-0.5 list-none m-0 " +
  "bg-w95-surface shadow-w95-raised font-w95 text-w95 text-w95-text";
</script>

<template>
  <li
    :class="rootCls"
    role="none"
    @mouseenter="open = true"
    @mouseleave="open = false"
  >
    <button
      type="button"
      role="menuitem"
      :aria-haspopup="'menu'"
      :aria-expanded="open"
      :aria-controls="uid"
      :aria-disabled="disabled || undefined"
      :class="triggerCls"
      :tabindex="disabled ? -1 : 0"
      @click="open = !open"
      @keydown.right.prevent="open = true"
      @keydown.left.prevent="open = false"
    >
      {{ label }}
      <span aria-hidden="true">▸</span>
    </button>
    <ul v-if="open" :id="uid" role="menu" :class="subCls">
      <slot />
    </ul>
  </li>
</template>
