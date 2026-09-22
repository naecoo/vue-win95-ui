<script setup lang="ts">
import { computed, ref } from "vue";
import { cn } from "../../utils/cn";

export interface W95TableColumn {
  key: string;
  label: string;
  width?: string | number;
  sortable?: boolean;
}

const props = withDefaults(
  defineProps<{
    columns: W95TableColumn[];
    rows?: Record<string, unknown>[];
    selectedKey?: string | number | null;
    rowKey?: string;
    interactive?: boolean;
    height?: string | number;
    emptyText?: string;
    multiple?: boolean;
    selectedKeys?: (string | number)[];
    sortBy?: string;
    sortDir?: "asc" | "desc";
    class?: string;
  }>(),
  {
    rows: () => [],
    selectedKey: null,
    rowKey: "id",
    interactive: true,
    height: undefined,
    emptyText: "No data",
    multiple: false,
    selectedKeys: () => [],
    sortBy: undefined,
    sortDir: "asc",
  }
);

const emit = defineEmits<{
  "update:selectedKey": [key: string | number | null];
  "update:selectedKeys": [keys: (string | number)[]];
  select: [row: Record<string, unknown>];
  "update:sortBy": [key: string | undefined];
  "update:sortDir": [dir: "asc" | "desc"];
  sort: [key: string, dir: "asc" | "desc"];
}>();

const internalSortBy = ref<string | undefined>(props.sortBy);
const internalDir = ref<"asc" | "desc">(props.sortDir);

const activeSortKey = computed(() => props.sortBy ?? internalSortBy.value);
const activeDir = computed(() => (props.sortBy ? props.sortDir : internalDir.value));

const displayRows = computed(() => {
  const key = activeSortKey.value;
  if (!key) return props.rows;
  const dir = activeDir.value === "desc" ? -1 : 1;
  return [...props.rows].sort((a, b) => {
    const av = a[key];
    const bv = b[key];
    if (av === bv) return 0;
    if (av == null) return -1 * dir;
    if (bv == null) return 1 * dir;
    if (typeof av === "number" && typeof bv === "number") return (av - bv) * dir;
    return String(av).localeCompare(String(bv)) * dir;
  });
});

function toggleSort(col: W95TableColumn) {
  if (!col.sortable) return;
  const key = col.key;
  let nextDir: "asc" | "desc" = "asc";
  if (activeSortKey.value === key) {
    nextDir = activeDir.value === "asc" ? "desc" : "asc";
  }
  internalSortBy.value = key;
  internalDir.value = nextDir;
  emit("update:sortBy", key);
  emit("update:sortDir", nextDir);
  emit("sort", key, nextDir);
}

const wrapStyle = computed(() =>
  props.height !== undefined
    ? { height: typeof props.height === "number" ? `${props.height}px` : props.height }
    : undefined
);

function rowId(row: Record<string, unknown>) {
  return row[props.rowKey] as string | number;
}

function isRowSelected(row: Record<string, unknown>) {
  const id = rowId(row);
  if (props.multiple) return props.selectedKeys.includes(id);
  return id === props.selectedKey;
}

function onSelect(row: Record<string, unknown>, e?: MouseEvent) {
  if (!props.interactive) return;
  const id = rowId(row);
  if (props.multiple && e?.ctrlKey) {
    const next = props.selectedKeys.includes(id)
      ? props.selectedKeys.filter((k) => k !== id)
      : [...props.selectedKeys, id];
    emit("update:selectedKeys", next);
  } else if (props.multiple) {
    emit("update:selectedKeys", [id]);
    emit("update:selectedKey", id);
  } else {
    emit("update:selectedKey", id === props.selectedKey ? null : id);
  }
  emit("select", row);
}

const focusIndex = ref(0);

function onKeydown(e: KeyboardEvent) {
  if (!props.interactive || displayRows.value.length === 0) return;
  if (e.key === "ArrowDown") {
    e.preventDefault();
    focusIndex.value = Math.min(displayRows.value.length - 1, focusIndex.value + 1);
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    focusIndex.value = Math.max(0, focusIndex.value - 1);
  } else if (e.key === "Home") {
    e.preventDefault();
    focusIndex.value = 0;
  } else if (e.key === "End") {
    e.preventDefault();
    focusIndex.value = displayRows.value.length - 1;
  } else if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    const row = displayRows.value[focusIndex.value];
    if (row) onSelect(row);
    return;
  } else {
    return;
  }
  const row = displayRows.value[focusIndex.value];
  if (row) emit("update:selectedKey", rowId(row));
}

const thClasses =
  "sticky top-0 h-[17px] box-border font-w95 text-w95 font-normal " +
  "shadow-w95-raised bg-w95-surface text-w95-text " +
  "text-left whitespace-nowrap px-1.5 m-0";

const wrapClasses = computed(() =>
  cn("overflow-auto bg-w95-highlight shadow-w95-field", props.class)
);
</script>

<template>
  <div
    :class="wrapClasses"
    :style="wrapStyle"
    tabindex="0"
    role="group"
    aria-label="Data table"
    @keydown="onKeydown"
  >
    <table
      class="border-collapse text-left whitespace-nowrap w-full bg-w95-highlight font-w95 text-w95 text-w95-text"
      :class="interactive ? 'cursor-default' : ''"
    >
      <thead>
        <tr>
          <th
            v-for="col in columns"
            :key="col.key"
            :class="thClasses"
            :style="
              col.width
                ? {
                    width:
                      typeof col.width === 'number' ? `${col.width}px` : col.width,
                  }
                : undefined
            "
            scope="col"
            :aria-sort="
              col.sortable && activeSortKey === col.key
                ? activeDir === 'asc'
                  ? 'ascending'
                  : 'descending'
                : undefined
            "
          >
            <button
              v-if="col.sortable"
              type="button"
              class="bg-transparent border-0 p-0 m-0 font-w95 text-w95 cursor-default"
              :aria-label="`Sort by ${col.label}`"
              @click="toggleSort(col)"
            >
              {{ col.label }}
              <span aria-hidden="true">{{
                activeSortKey === col.key ? (activeDir === "asc" ? " ▲" : " ▼") : ""
              }}</span>
            </button>
            <template v-else>{{ col.label }}</template>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="displayRows.length === 0" class="text-w95-shadow">
          <td :colspan="columns.length" class="px-1.5 py-2 text-center" style="font-size:13px">
            {{ emptyText }}
          </td>
        </tr>
        <tr
          v-for="(row, index) in displayRows"
          :key="String(rowId(row))"
          :class="
            isRowSelected(row) || index === focusIndex
              ? 'bg-w95-blue text-w95-highlight'
              : 'hover:bg-w95-blue/10 transition-colors duration-75'
          "
          @click="onSelect(row, $event)"
        >
          <td v-for="col in columns" :key="col.key" class="px-1.5 h-[14px] m-0">
            {{ row[col.key] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
