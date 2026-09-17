<script setup lang="ts">
import { computed } from "vue";
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
    class?: string;
  }>(),
  {
    rows: () => [],
    selectedKey: null,
    rowKey: "id",
    interactive: true,
    height: undefined,
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

const thClasses =
  "sticky top-0 h-[17px] box-border font-w95 text-w95 font-normal " +
  "shadow-w95-raised bg-w95-surface text-w95-text " +
  "text-left whitespace-nowrap px-1.5 m-0";

const wrapClasses = computed(() =>
  cn(
    "overflow-auto bg-w95-highlight shadow-w95-field",
    props.class
  )
);
</script>

<template>
  <div :class="wrapClasses" :style="wrapStyle">
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
            :style="col.width ? { width: typeof col.width === 'number' ? `${col.width}px` : col.width } : undefined"
            scope="col"
          >
            {{ col.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="row in rows"
          :key="String(rowId(row))"
          :class="
            rowId(row) === selectedKey
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
