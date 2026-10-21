<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useId } from "../../composables/useId";
import { cn } from "../../utils/cn";
import { useLocale } from "../../locale";

export interface W95TableColumn {
  key: string;
  label: string;
  width?: string | number;
  sortable?: boolean;
  align?: "left" | "center" | "right";
}

type RowKey = string | number;

const props = withDefaults(
  defineProps<{
    columns: W95TableColumn[];
    rows?: Record<string, unknown>[];
    selectedKey?: RowKey | null;
    rowKey?: string;
    interactive?: boolean;
    height?: string | number;
    emptyText?: string;
    loading?: boolean;
    loadingText?: string;
    multiple?: boolean;
    selectedKeys?: RowKey[];
    sortBy?: string;
    sortDir?: "asc" | "desc";
    label?: string;
    class?: string;
  }>(),
  {
    rows: () => [],
    selectedKey: null,
    rowKey: "id",
    interactive: true,
    height: undefined,
    emptyText: undefined,
    loading: false,
    loadingText: undefined,
    multiple: false,
    selectedKeys: () => [],
    sortBy: undefined,
    sortDir: "asc",
    label: undefined,
  }
);

const emit = defineEmits<{
  "update:selectedKey": [key: RowKey | null];
  "update:selectedKeys": [keys: RowKey[]];
  select: [row: Record<string, unknown>];
  "update:sortBy": [key: string | undefined];
  "update:sortDir": [dir: "asc" | "desc"];
  sort: [key: string, dir: "asc" | "desc"];
  "row:dblclick": [row: Record<string, unknown>];
}>();

const { t } = useLocale();
const uid = useId("w95-table");

/* ——— 排序：sortBy 是否传入决定"受控"与否，整对状态一起切换 ——— */
const sortControlled = computed(() => props.sortBy !== undefined);
const internalSortBy = ref<string | undefined>(undefined);
const internalSortDir = ref<"asc" | "desc">("asc");

const activeSortKey = computed(() =>
  sortControlled.value ? props.sortBy : internalSortBy.value
);
const activeDir = computed(() =>
  sortControlled.value ? props.sortDir : internalSortDir.value
);

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
  const nextDir: "asc" | "desc" =
    activeSortKey.value === key && activeDir.value === "asc" ? "desc" : "asc";
  if (!sortControlled.value) {
    internalSortBy.value = key;
    internalSortDir.value = nextDir;
  }
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
  return row[props.rowKey] as RowKey;
}

function rowDomId(index: number) {
  return `${uid.value}-row-${index}`;
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

// 行数变化后焦点索引必须收敛，否则 Enter 会落到已不存在的行上
watch(
  () => displayRows.value.length,
  (len) => {
    if (len === 0) focusIndex.value = 0;
    else if (focusIndex.value > len - 1) focusIndex.value = len - 1;
  }
);

function moveFocus(next: number) {
  const len = displayRows.value.length;
  if (len === 0) return;
  focusIndex.value = Math.min(len - 1, Math.max(0, next));
  const row = displayRows.value[focusIndex.value];
  if (row) emit("update:selectedKey", rowId(row));
}

function onKeydown(e: KeyboardEvent) {
  if (!props.interactive || displayRows.value.length === 0) return;
  if (e.key === "ArrowDown") {
    e.preventDefault();
    moveFocus(focusIndex.value + 1);
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    moveFocus(focusIndex.value - 1);
  } else if (e.key === "Home") {
    e.preventDefault();
    moveFocus(0);
  } else if (e.key === "End") {
    e.preventDefault();
    moveFocus(displayRows.value.length - 1);
  } else if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    const row = displayRows.value[focusIndex.value];
    if (row) onSelect(row);
  }
}

const thClasses =
  "sticky top-0 h-[17px] box-border font-w95 text-w95 font-normal " +
  "shadow-w95-raised bg-w95-surface text-w95-text " +
  "whitespace-nowrap px-1.5 m-0";

const wrapClasses = computed(() =>
  cn("overflow-auto bg-w95-highlight shadow-w95-field", props.class)
);

const tableLabel = computed(() => props.label ?? t("table.label"));
const emptyLabel = computed(() => props.emptyText ?? t("table.empty"));
const loadingLabel = computed(() => props.loadingText ?? t("table.loading"));
</script>

<template>
  <div
    :class="wrapClasses"
    :style="wrapStyle"
    tabindex="0"
    role="group"
    :aria-label="tableLabel"
    :aria-busy="loading || undefined"
    :aria-activedescendant="displayRows.length ? rowDomId(focusIndex) : undefined"
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
            :style="{
              width:
                col.width !== undefined
                  ? typeof col.width === 'number'
                    ? `${col.width}px`
                    : col.width
                  : undefined,
              textAlign: col.align,
            }"
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
              class="bg-transparent border-0 p-0 m-0 font-w95 text-w95 cursor-default w95-focus"
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
        <tr v-if="loading" class="text-w95-shadow">
          <td :colspan="columns.length" class="px-1.5 py-2 text-center">
            {{ loadingLabel }}
          </td>
        </tr>
        <tr v-else-if="displayRows.length === 0" class="text-w95-shadow">
          <td :colspan="columns.length" class="px-1.5 py-2 text-center">
            <slot name="empty">{{ emptyLabel }}</slot>
          </td>
        </tr>
        <tr
          v-for="(row, index) in loading ? [] : displayRows"
          :id="rowDomId(index)"
          :key="String(rowId(row))"
          role="row"
          :aria-selected="isRowSelected(row)"
          :class="
            isRowSelected(row)
              ? 'bg-w95-blue text-w95-highlight'
              : 'hover:bg-w95-blue/10 transition-colors duration-75'
          "
          @click="onSelect(row, $event)"
          @dblclick="emit('row:dblclick', row)"
        >
          <td
            v-for="col in columns"
            :key="col.key"
            class="px-1.5 h-[14px] m-0"
            :style="{ textAlign: col.align }"
            :class="
              index === focusIndex && !isRowSelected(row)
                ? 'outline outline-1 outline-dotted outline-w95-text -outline-offset-1'
                : ''
            "
          >
            <slot
              :name="`cell-${col.key}`"
              :row="row"
              :column="col"
              :value="row[col.key]"
              :index="index"
            >
              <slot name="cell" :row="row" :column="col" :value="row[col.key]" :index="index">
                {{ row[col.key] }}
              </slot>
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
