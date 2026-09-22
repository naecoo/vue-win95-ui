<script setup lang="ts">
import { computed, nextTick, ref } from "vue";
import { useId } from "../../composables/useId";
import { cn } from "../../utils/cn";

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
    id?: string;
    class?: string;
  }>(),
  {
    modelValue: null,
    options: () => [],
    label: "",
    disabled: false,
    loading: false,
    id: undefined,
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: string | number | null];
  change: [value: string | number | null];
  search: [query: string];
}>();

const uid = useId("w95-combo");
const inputId = computed(() => props.id ?? `${uid.value}-input`);
const listId = `${uid.value}-list`;
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

function closeList() {
  open.value = false;
  filter.value = "";
}

function select(opt: W95ComboOption) {
  if (opt.disabled) return;
  emit("update:modelValue", opt.value);
  emit("change", opt.value);
  closeList();
}

function onInput(e: Event) {
  filter.value = (e.target as HTMLInputElement).value;
  if (!open.value) openList();
  activeIndex.value = 0;
  emit("search", filter.value);
}

function onKeydown(e: KeyboardEvent) {
  if (props.disabled) return;
  if (!open.value && (e.key === "ArrowDown" || e.key === "Enter")) {
    e.preventDefault();
    openList();
    return;
  }
  if (!open.value) return;

  const list = filtered.value;
  if (e.key === "Escape") {
    e.preventDefault();
    closeList();
  } else if (e.key === "ArrowDown") {
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
    "focus:outline-none",
    props.disabled && "bg-w95-surface text-w95-shadow",
    props.class
  )
);

const btnClasses =
  "absolute right-0 top-0 h-w95-input w-6 min-w-0 p-0 border-0 " +
  "bg-w95-surface shadow-w95-raised cursor-default " +
  "flex items-center justify-center text-w95-text font-w95 text-w95 " +
  "active:shadow-w95-sunken";

const listClasses =
  "absolute left-0 top-full z-[1000] w-full mt-px max-h-[160px] overflow-auto " +
  "bg-w95-highlight shadow-w95-field list-none m-0 p-0 font-w95 text-w95";
</script>

<template>
  <div class="inline-flex items-center font-w95 text-w95 gap-w95-md">
    <label v-if="label" :for="inputId" class="select-none text-w95-text">
      {{ label }}
    </label>
    <div class="relative w-[180px]">
      <input
        :id="inputId"
        type="text"
        role="combobox"
        :class="inputClasses"
        :value="display"
        :disabled="disabled"
        :aria-expanded="open"
        :aria-controls="listId"
        :aria-autocomplete="'list'"
        :aria-busy="loading || undefined"
        :aria-activedescendant="open ? `${listId}-opt-${activeIndex}` : undefined"
        autocomplete="off"
        @input="onInput"
        @focus="openList"
        @keydown="onKeydown"
      />
      <button
        type="button"
        :class="btnClasses"
        tabindex="-1"
        aria-label="Toggle list"
        :disabled="disabled"
        @click="open ? closeList() : openList()"
      >
        ▾
      </button>
      <ul
        v-if="open"
        :id="listId"
        role="listbox"
        :class="listClasses"
        :aria-label="label || 'Options'"
      >
        <li v-if="loading" class="px-1.5 py-1 text-w95-shadow" role="presentation">
          Loading…
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
              i === activeIndex
                ? 'bg-w95-blue text-w95-highlight'
                : 'text-w95-text',
              opt.disabled && 'text-w95-shadow pointer-events-none'
            )
          "
          @mousedown.prevent="select(opt)"
        >
          {{ opt.label }}
        </li>
        <li
          v-if="!loading && filtered.length === 0"
          class="px-1.5 py-0.5 text-w95-shadow list-none"
          role="presentation"
        >
          No matches
        </li>
      </ul>
    </div>
  </div>
</template>
