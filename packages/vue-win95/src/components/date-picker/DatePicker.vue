<script setup lang="ts">
import { computed, ref } from "vue";
import { useId } from "../../composables/useId";
import { cn } from "../../utils/cn";

const props = withDefaults(
  defineProps<{
    modelValue?: string | null;
    label?: string;
    id?: string;
    min?: string | null;
    max?: string | null;
    class?: string;
  }>(),
  {
    modelValue: null,
    label: "",
    id: undefined,
    min: null,
    max: null,
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: string | null];
  change: [value: string | null];
}>();

const autoId = useId("w95-date");
const inputId = computed(() => props.id ?? autoId.value);

function parse(s: string | null | undefined) {
  if (!s) return null;
  const [y, m, d] = s.split("-").map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
}

function fmt(d: Date) {
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mm}-${dd}`;
}

const selected = computed(() => parse(props.modelValue));
const minDate = computed(() => parse(props.min));
const maxDate = computed(() => parse(props.max));

const open = ref(false);
const cursor = ref<Date>(
  selected.value
    ? new Date(selected.value.getFullYear(), selected.value.getMonth(), 1)
    : new Date(new Date().getFullYear(), new Date().getMonth(), 1)
);

const year = computed(() => cursor.value.getFullYear());
const month = computed(() => cursor.value.getMonth());

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const cells = computed(() => {
  const first = new Date(year.value, month.value, 1);
  const startDow = first.getDay();
  const daysInMonth = new Date(year.value, month.value + 1, 0).getDate();
  const list: (Date | null)[] = [];
  for (let i = 0; i < startDow; i++) list.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    list.push(new Date(year.value, month.value, d));
  }
  return list;
});

function isSameDay(a: Date | null, b: Date | null) {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isDisabled(d: Date) {
  if (minDate.value) {
    const start = new Date(
      minDate.value.getFullYear(),
      minDate.value.getMonth(),
      minDate.value.getDate()
    );
    if (d < start) return true;
  }
  if (maxDate.value) {
    const end = new Date(
      maxDate.value.getFullYear(),
      maxDate.value.getMonth(),
      maxDate.value.getDate()
    );
    if (d > end) return true;
  }
  return false;
}

function pick(d: Date) {
  if (isDisabled(d)) return;
  const value = fmt(d);
  emit("update:modelValue", value);
  emit("change", value);
  open.value = false;
}

function prevMonth() {
  cursor.value = new Date(year.value, month.value - 1, 1);
}
function nextMonth() {
  cursor.value = new Date(year.value, month.value + 1, 1);
}

function toggle() {
  open.value = !open.value;
  if (open.value && selected.value) {
    cursor.value = new Date(
      selected.value.getFullYear(),
      selected.value.getMonth(),
      1
    );
  }
}

const inputClasses = computed(() =>
  cn(
    "box-border border-0 rounded-none w-[120px] h-w95-input px-1 py-[3px]",
    "font-w95 text-w95 shadow-w95-field bg-w95-highlight text-w95-text",
    "focus:outline-none",
    props.class
  )
);

const calClasses =
  "absolute left-0 top-full z-[1100] mt-px w-[200px] " +
  "bg-w95-surface shadow-w95-window p-[3px] font-w95 text-w95 text-w95-text";

const dayBtn =
  "w-[24px] h-[20px] min-w-0 p-0 border-0 rounded-none bg-transparent " +
  "font-w95 text-w95 cursor-default " +
  "hover:bg-w95-blue hover:text-w95-highlight " +
  "focus:outline focus:outline-1 focus:outline-dotted disabled:text-w95-shadow disabled:pointer-events-none";

const navBtn =
  "w-[20px] h-[16px] min-w-0 p-0 border-0 bg-w95-surface shadow-w95-raised " +
  "cursor-default font-w95 text-w95 " +
  "active:shadow-w95-sunken";
</script>

<template>
  <div class="relative inline-flex items-center font-w95 text-w95 gap-w95-sm">
    <label v-if="label" :for="inputId" class="select-none text-w95-text">
      {{ label }}
    </label>
    <input
      :id="inputId"
      type="text"
      :class="inputClasses"
      :value="modelValue || ''"
      readonly
      role="textbox"
      aria-haspopup="dialog"
      :aria-expanded="open"
      aria-label="Date"
      @focus="toggle"
      @keydown.enter.prevent="toggle"
      @keydown.esc="open = false"
    />
    <button type="button" :class="navBtn" aria-label="Open calendar" @click="toggle">
      📅
    </button>

    <div v-if="open" :class="calClasses" role="dialog" aria-label="Choose date">
      <div class="flex items-center justify-between mb-1">
        <button type="button" :class="navBtn" aria-label="Previous month" @click="prevMonth">
          ‹
        </button>
        <span class="font-bold">{{ monthNames[month] }} {{ year }}</span>
        <button type="button" :class="navBtn" aria-label="Next month" @click="nextMonth">
          ›
        </button>
      </div>
      <div class="grid grid-cols-7 gap-0 text-center mb-0.5 text-w95-shadow">
        <span v-for="d in weekdays" :key="d">{{ d }}</span>
      </div>
      <div class="grid grid-cols-7 gap-0 text-center">
        <template v-for="(cell, i) in cells" :key="i">
          <button
            v-if="cell"
            type="button"
            :disabled="isDisabled(cell)"
            :class="[
              dayBtn,
              isSameDay(cell, selected) ? 'bg-w95-blue text-w95-highlight' : '',
            ]"
            @click="pick(cell)"
          >
            {{ cell.getDate() }}
          </button>
          <span v-else :class="dayBtn" />
        </template>
      </div>
    </div>
  </div>
</template>
