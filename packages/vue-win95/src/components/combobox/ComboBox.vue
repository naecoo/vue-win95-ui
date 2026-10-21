<script setup lang="ts">
import { computed, nextTick, ref } from "vue";
import { useId } from "../../composables/useId";
import { cn } from "../../utils/cn";
import OverlayPanel from "../overlay/OverlayPanel.vue";
import { useLocale } from "../../locale";

export interface W95ComboOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

const props = withDefaults(
  defineProps<{
    modelValue?: string | number | null;
    options?: W95ComboOption[];
    label?: string;
    disabled?: boolean;
    loading?: boolean;
    /** 允许清空当前值 */
    clearable?: boolean;
    id?: string;
    class?: string;
  }>(),
  {
    modelValue: null,
    options: () => [],
    label: "",
    disabled: false,
    loading: false,
    clearable: false,
    id: undefined,
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: string | number | null];
  change: [value: string | number | null];
  search: [query: string];
}>();

const { t } = useLocale();
const uid = useId("w95-combo");
const inputId = computed(() => props.id ?? `${uid.value}-input`);
const listId = `${uid.value}-list`;
const inputRef = ref<HTMLInputElement | null>(null);
const wrapperRef = ref<HTMLElement | null>(null);
const open = ref(false);
const activeIndex = ref(-1);
const filter = ref("");

const selectedLabel = computed(() => {
  const hit = props.options.find((o) => o.value === props.modelValue);
  return hit?.label ?? "";
});

const display = computed(() => (open.value ? filter.value : selectedLabel.value));

const filtered = computed(() => {
  const q = filter.value.trim().toLowerCase();
  if (!q) return props.options;
  return props.options.filter((o) => o.label.toLowerCase().includes(q));
});

function openList() {
  if (props.disabled) return;
  open.value = true;
  filter.value = "";
  const idx = props.options.findIndex((o) => o.value === props.modelValue);
  activeIndex.value = idx >= 0 ? idx : 0;
  nextTick(scrollActive);
}

function closeList(restoreFocus = false) {
  open.value = false;
  filter.value = "";
  if (restoreFocus) inputRef.value?.focus();
}

function select(opt: W95ComboOption) {
  if (opt.disabled) return;
  emit("update:modelValue", opt.value);
  emit("change", opt.value);
  closeList(true);
}

function clear() {
  emit("update:modelValue", null);
  emit("change", null);
  closeList(true);
}

function onInput(e: Event) {
  filter.value = (e.target as HTMLInputElement).value;
  if (!open.value) openList();
  activeIndex.value = 0;
  emit("search", filter.value);
}

function onKeydown(e: KeyboardEvent) {
  if (props.disabled) return;
  if (e.key === "Escape") {
    if (open.value) {
      e.preventDefault();
      closeList(true);
    }
    return;
  }
  if (!open.value && (e.key === "ArrowDown" || e.key === "Enter")) {
    e.preventDefault();
    openList();
    return;
  }
  if (!open.value) return;

  const list = filtered.value;
  if (e.key === "ArrowDown") {
    e.preventDefault();
    activeIndex.value = Math.min(list.length - 1, activeIndex.value + 1);
    nextTick(scrollActive);
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    activeIndex.value = Math.max(0, activeIndex.value - 1);
    nextTick(scrollActive);
  } else if (e.key === "Home") {
    e.preventDefault();
    activeIndex.value = 0;
  } else if (e.key === "End") {
    e.preventDefault();
    activeIndex.value = list.length - 1;
  } else if (e.key === "Enter") {
    e.preventDefault();
    const opt = list[activeIndex.value];
    if (opt) select(opt);
  }
}

function scrollActive() {
  const el = document.getElementById(`${listId}-opt-${activeIndex.value}`);
  el?.scrollIntoView({ block: "nearest" });
}

const inputClasses = computed(() =>
  cn(
    "box-border border-0 rounded-none w-full",
    "font-w95 text-w95 h-w95-input pl-1 pr-8 py-[3px]",
    "shadow-w95-field bg-w95-highlight text-w95-text",
    "w95-focus",
    props.disabled && "bg-w95-surface text-w95-shadow"
  )
);

const btnClasses =
  "absolute right-0 top-0 h-w95-input w-6 min-w-0 p-0 border-0 " +
  "bg-w95-surface shadow-w95-raised cursor-default " +
  "flex items-center justify-center text-w95-text font-w95 text-w95 " +
  "active:shadow-w95-sunken";

const listClasses = "p-0 max-h-[160px] overflow-auto shadow-w95-field";

const activeOption = computed(() => {
  const label = filtered.value[activeIndex.value]?.label;
  return open.value && label ? `${label}` : "";
});
</script>

<template>
  <div :class="cn('inline-flex items-center font-w95 text-w95 gap-w95-md', props.class)">
    <label v-if="label" :for="inputId" class="select-none text-w95-text">
      {{ label }}
    </label>
    <span ref="wrapperRef" class="relative inline-block w-[180px]">
      <input
        :id="inputId"
        ref="inputRef"
        type="text"
        role="combobox"
        :class="inputClasses"
        :value="display"
        :disabled="disabled"
        :aria-expanded="open"
        :aria-controls="listId"
        aria-autocomplete="list"
        :aria-busy="loading || undefined"
        :aria-activedescendant="open && activeIndex >= 0 ? `${listId}-opt-${activeIndex}` : undefined"
        autocomplete="off"
        @input="onInput"
        @focus="openList"
        @keydown="onKeydown"
      />
      <span class="absolute right-0 top-0 flex h-w95-input items-center">
        <button
          v-if="clearable && modelValue !== null && !disabled"
          type="button"
          class="h-w95-input w-5 min-w-0 p-0 border-0 bg-w95-surface shadow-w95-raised cursor-default text-w95-text"
          :aria-label="t('combobox.clear')"
          tabindex="-1"
          @click="clear"
        >
          ×
        </button>
        <button
          type="button"
          :class="btnClasses"
          class="relative"
          tabindex="-1"
          :aria-label="t('combobox.toggle')"
          :aria-expanded="open"
          :disabled="disabled"
          @click="open ? closeList(true) : openList()"
        >
          ▾
        </button>
      </span>

      <OverlayPanel
        :model-value="open"
        :anchor="wrapperRef"
        placement="bottom-start"
        match-width
        :offset="1"
        role="listbox"
        :label="label || 'Options'"
        :class="listClasses"
        @update:model-value="(v: boolean) => (v ? openList() : closeList())"
      >
        <ul :id="listId" class="list-none m-0 p-0">
          <li v-if="loading" class="px-1.5 py-1 text-w95-shadow" role="presentation">
            {{ t("combobox.loading") }}
          </li>
          <li
            v-for="(opt, i) in filtered"
            :id="`${listId}-opt-${i}`"
            :key="String(opt.value)"
            role="option"
            :aria-selected="opt.value === modelValue"
            :aria-disabled="opt.disabled || undefined"
            :class="
              cn(
                'px-1.5 py-0.5 cursor-default list-none',
                i === activeIndex ? 'bg-w95-blue text-w95-highlight' : 'text-w95-text',
                opt.disabled && 'text-w95-shadow pointer-events-none'
              )
            "
            @pointerdown.prevent
            @click="select(opt)"
            @mouseenter="activeIndex = i"
          >
            {{ opt.label }}
          </li>
          <li
            v-if="!loading && filtered.length === 0"
            class="px-1.5 py-0.5 text-w95-shadow list-none"
            role="presentation"
          >
            {{ t("combobox.empty") }}
          </li>
        </ul>
        <span class="sr-only" aria-live="polite">{{ activeOption }}</span>
      </OverlayPanel>
    </span>
  </div>
</template>
