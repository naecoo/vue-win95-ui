from pathlib import Path

base = Path(__file__).resolve().parents[1] / "packages/vue-win95/src/components"

# DatePicker keyboard
p = base / "date-picker/DatePicker.vue"
t = p.read_text()
t = t.replace(
    '<div v-if="open" :class="calClasses" role="dialog" aria-label="Choose date">',
    '''<div
      v-if="open"
      :class="calClasses"
      role="dialog"
      aria-label="Choose date"
      tabindex="-1"
      @keydown.esc="open = false"
      @keydown.left.prevent="prevMonth"
      @keydown.right.prevent="nextMonth"
    >''',
)
p.write_text(t)

# Tabs multirow
p2 = base / "tabs/TabList.vue"
t2 = p2.read_text()
t2 = t2.replace(
    "const props = withDefaults(defineProps<{ class?: string }>(), {});",
    "const props = withDefaults(defineProps<{ class?: string; multirow?: boolean }>(), { multirow: false });",
)
t2 = t2.replace(
    '    "border-0 bg-transparent",',
    '    "border-0 bg-transparent",\n    props.multirow && "flex-wrap [&>li]:flex-1 [&>li]:text-center",',
)
p2.write_text(t2)

# Tree typeahead
p3 = base / "tree/TreeItem.vue"
t3 = p3.read_text()
if "onKeydownItem" not in t3:
    t3 = t3.replace(
        "function onClick() {",
        """let typeBuf = "";
let typeTimer: ReturnType<typeof setTimeout> | null = null;

function onKeydownItem(e: KeyboardEvent) {
  if (e.key === "ArrowRight" && props.hasChildren) {
    e.preventDefault();
    open.value = true;
  } else if (e.key === "ArrowLeft" && props.hasChildren) {
    e.preventDefault();
    open.value = false;
  } else if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    onClick();
  } else if (e.key.length === 1 && /\\S/.test(e.key)) {
    typeBuf += e.key.toLowerCase();
    if (typeTimer) clearTimeout(typeTimer);
    typeTimer = setTimeout(() => {
      typeBuf = "";
    }, 500);
    const rootEl = (e.currentTarget as HTMLElement).closest('[role="tree"]');
    const items = rootEl?.querySelectorAll('[role="treeitem"]');
    items?.forEach((node) => {
      const el = node as HTMLElement;
      if (el.textContent?.trim().toLowerCase().startsWith(typeBuf)) {
        el.focus();
      }
    });
  }
}

function onClick() {""",
    )
    t3 = t3.replace(
        '    @click="onClick"',
        '    @click="onClick"\n    @keydown="onKeydownItem"',
    )
    p3.write_text(t3)

# Table multi-select
p4 = base / "table/Table.vue"
t4 = p4.read_text()
if "selectedKeys" not in t4:
    t4 = t4.replace(
        "    emptyText?: string;",
        "    emptyText?: string;\n    multiple?: boolean;\n    selectedKeys?: (string | number)[];",
    )
    t4 = t4.replace(
        '    emptyText: "No data",',
        '    emptyText: "No data",\n    multiple: false,\n    selectedKeys: () => [],',
    )
    t4 = t4.replace(
        '  "update:selectedKey": [key: string | number | null];',
        '  "update:selectedKey": [key: string | number | null];\n  "update:selectedKeys": [keys: (string | number)[]];',
    )
    t4 = t4.replace(
        """function onSelect(row: Record<string, unknown>) {
  if (!props.interactive) return;
  const id = rowId(row);
  emit("update:selectedKey", id === props.selectedKey ? null : id);
  emit("select", row);
}""",
        """function isRowSelected(row: Record<string, unknown>) {
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
}""",
    )
    t4 = t4.replace('@click="onSelect(row)"', '@click="onSelect(row, $event)"')
    t4 = t4.replace(
        "            rowId(row) === selectedKey || index === focusIndex",
        "            isRowSelected(row) || index === focusIndex",
    )
    p4.write_text(t4)

print("patched ok")
