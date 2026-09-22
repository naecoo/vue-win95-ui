<script setup lang="ts">
import { computed, ref } from "vue";
import { cn } from "../../utils/cn";

export interface W95TableColumn {
  key: string;
  label: string;
  width?: string | number;
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
    class?: string;
  }>(),
  {
    rows: () => [],
    selectedKey: null,
    rowKey: "id",
    interactive: true,
    height: undefined,
    emptyText: "No data",
  }
);

const emit = defineEmits<{
  "update:selectedKey": [key: string | number | null];
  select: [row: Record<string, unknown>];
}>();

const wrapStyle = computed(() =>
  props.height !== undefined
    ? { height: typeof props.height === "number" ? `${props.height}px` : props.height }
    : undefined
);

function rowId(row: Record<string, unknown>) {
  return row[props.rowKey] as string | number;
}

function onSelect(row: Record<string, unknown>) {
  if (!props.interactive) return;
  const id = rowId(row);
  emit("update:selectedKey", id === props.selectedKey ? null : id);
  emit("select", row);
}

/** keyboard: move selection among rows */
const focusIndex = ref(0);

function onKeydown(e: KeyboardEvent) {
  if (!props.interactive || props.rows.length === 0) return;
  if (e.key === "ArrowDown") {
    e.preventDefault();
    focusIndex.value = Math.min(props.rows.length - 1, focusIndex.value + 1);
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    focusIndex.value = Math.max(0, focusIndex.value - 1);
  } else if (e.key === "Home") {
    e.preventDefault();
    focusIndex.value = 0;
  } else if (e.key === "End") {
    e.preventDefault();
    focusIndex.value = props.rows.length - 1;
  } else if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    const row = props.rows[focusIndex.value];
    if (row) onSelect(row);
    return;
  } else {
    return;
  }
  const row = props.rows[focusIndex.value];
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
          >
            {{ col.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-if="rows.length === 0"
          class="text-w95-shadow"
        >
          <td
            :colspan="columns.length"
            class="px-1.5 py-2 text-center"
            style="font-size:13px"
          >
            {{ emptyText }}
          </td>
        </tr>
        <tr
          v-for="(row, index) in rows"
          :key="String(rowId(row))"
          :class="
            rowId(row) === selectedKey || index === focusIndex
              ? 'bg-w95-blue text-w95-highlight'
              : 'hover:bg-w95-blue/10'
          "
          @click="onSelect(row)"
        >
          <td v-for="col in columns" :key="col.key" class="px-1.5 h-[14px] m-0">
            {{ row[col.key] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
