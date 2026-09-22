<script setup lang="ts">
import { ref, computed } from "vue";
import { isZh } from "../i18n";
import * as Win95 from "vue-win95";

const {
  W95Button,
  W95Dialog,
} = Win95 as Record<string, any>;

const openName = ref<string | null>(null);
const modalOpen = ref(false);

function showDetail(name: string) {
  openName.value = name;
  modalOpen.value = true;
}

function hideDetail() {
  modalOpen.value = false;
  openName.value = null;
}

const items = [
  { name: "W95Button", group: "basics", props: "type, default, disabled, block", events: "click", slots: "default" },
  { name: "W95Input", group: "basics", props: "modelValue, type, label, disabled, readonly", events: "update:modelValue", slots: "—" },
  { name: "W95Checkbox", group: "basics", props: "modelValue, label, disabled", events: "update:modelValue, change", slots: "default" },
  { name: "W95Radio", group: "basics", props: "value, modelValue, label, disabled", events: "update:modelValue, change", slots: "default" },
  { name: "W95RadioGroup", group: "basics", props: "modelValue, legend, name, disabled", events: "update:modelValue", slots: "default" },
  { name: "W95Switch", group: "basics", props: "modelValue, label, disabled", events: "update:modelValue, change", slots: "—" },
  { name: "W95Avatar", group: "basics", props: "src, alt, initials, size", events: "—", slots: "—" },
  { name: "W95Icon", group: "basics", props: "name, size, label", events: "—", slots: "—" },
  { name: "W95Link", group: "basics", props: "href, disabled", events: "click", slots: "default" },
  { name: "W95Skeleton", group: "basics", props: "lines, width, height", events: "—", slots: "—" },
  { name: "W95Select", group: "form", props: "modelValue, options, label, disabled", events: "update:modelValue, change", slots: "default" },
  { name: "W95Slider", group: "form", props: "modelValue, min, max, step, label", events: "update:modelValue, change", slots: "—" },
  { name: "W95SpinButton", group: "form", props: "modelValue, min, max, step, label", events: "update:modelValue, change", slots: "—" },
  { name: "W95ComboBox", group: "form", props: "modelValue, options, loading, label", events: "update:modelValue, change, search", slots: "—" },
  { name: "W95Upload", group: "form", props: "modelValue, multiple, accept, label", events: "update:modelValue, change", slots: "—" },
  { name: "W95DatePicker", group: "form", props: "modelValue, min, max, label", events: "update:modelValue, change", slots: "—" },
  { name: "W95Window", group: "container", props: "title, active, showMin, showMax, showClose, width", events: "minimize, maximize, close", slots: "default, status" },
  { name: "W95Dialog", group: "container", props: "modelValue, size, width, closeOnOverlay", events: "confirm, cancel, close", slots: "default, footer" },
  { name: "W95Accordion", group: "container", props: "modelValue", events: "update:modelValue", slots: "default" },
  { name: "W95AccordionItem", group: "container", props: "value, title", events: "—", slots: "default, title" },
  { name: "W95GroupBox", group: "container", props: "legend", events: "—", slots: "default" },
  { name: "W95FieldRow", group: "container", props: "stacked", events: "—", slots: "default" },
  { name: "W95StatusBar", group: "container", props: "—", events: "—", slots: "default" },
  { name: "W95StatusBarField", group: "container", props: "grow", events: "—", slots: "default" },
  { name: "W95Divider", group: "container", props: "vertical", events: "—", slots: "—" },
  { name: "W95Popover", group: "container", props: "modelValue, title, width", events: "update:modelValue", slots: "trigger, default" },
  { name: "W95ResizablePanel", group: "container", props: "width, minWidth, maxWidth", events: "resize", slots: "default" },
  { name: "W95Tabs", group: "nav", props: "modelValue", events: "update:modelValue", slots: "default" },
  { name: "W95TabList", group: "nav", props: "multirow", events: "—", slots: "default" },
  { name: "W95Tab", group: "nav", props: "value, disabled", events: "—", slots: "default" },
  { name: "W95TabPanel", group: "nav", props: "value", events: "—", slots: "default" },
  { name: "W95MenuBar", group: "nav", props: "—", events: "—", slots: "default" },
  { name: "W95MenuItem", group: "nav", props: "disabled", events: "click", slots: "default" },
  { name: "W95MenuList", group: "nav", props: "—", events: "—", slots: "default" },
  { name: "W95MenuSubmenu", group: "nav", props: "label, disabled", events: "—", slots: "default" },
  { name: "W95Toolbar", group: "nav", props: "—", events: "—", slots: "default" },
  { name: "W95Tree", group: "nav", props: "modelValue", events: "update:modelValue", slots: "default" },
  { name: "W95TreeItem", group: "nav", props: "value, label, hasChildren, disabled", events: "—", slots: "default" },
  { name: "W95Breadcrumb", group: "nav", props: "items, separator", events: "—", slots: "—" },
  { name: "W95Pagination", group: "nav", props: "modelValue, total, pageSize", events: "update:modelValue", slots: "—" },
  { name: "W95Splitter", group: "nav", props: "vertical, min, max", events: "resize", slots: "—" },
  { name: "W95ContextMenu", group: "nav", props: "modelValue, x, y", events: "update:modelValue", slots: "default" },
  { name: "W95ContextMenuArea", group: "nav", props: "items", events: "—", slots: "default" },
  { name: "W95Tooltip", group: "overlay", props: "content, placement, openDelay", events: "—", slots: "default" },
  { name: "W95Dropdown", group: "overlay", props: "modelValue, label", events: "update:modelValue", slots: "default" },
  { name: "W95Toast", group: "overlay", props: "modelValue, duration", events: "update:modelValue", slots: "—" },
  { name: "W95Notification", group: "overlay", props: "modelValue, duration, position", events: "update:modelValue", slots: "—" },
  { name: "W95Table", group: "data", props: "columns, rows, selectedKey, multiple, sortBy, emptyText", events: "select, sort", slots: "—" },
  { name: "W95ProgressBar", group: "data", props: "value, max, segmented, label", events: "—", slots: "—" },
];

const groups = [
  { key: "basics", zh: "基础", en: "Basics" },
  { key: "form", zh: "表单", en: "Form" },
  { key: "container", zh: "容器", en: "Container" },
  { key: "nav", zh: "导航", en: "Navigation" },
  { key: "overlay", zh: "浮层", en: "Overlay" },
  { key: "data", zh: "数据", en: "Data" },
];

const current = computed(() => items.find((i) => i.name === openName.value));

const cardStyle =
  "min-width:140px;min-height:36px;border:0;background:#c0c0c0;box-shadow:inset -1px -1px #0a0a0a,inset 1px 1px #fff,inset -2px -2px #808080,inset 2px 2px #dfdfdf;font-family:inherit;font-size:12px;cursor:default";
</script>

<template>
  <div class="w95-md">
    <template v-if="isZh">
      <h1>全部组件</h1>
      <p>点击卡片打开<strong>组件详情</strong>（属性、事件、插槽）。</p>
    </template>
    <template v-else>
      <h1>All Components</h1>
      <p>Click a card to open the <strong>component detail</strong> (props, events, slots).</p>
    </template>

    <template v-for="g in groups" :key="g.key">
      <h3>{{ isZh ? g.zh : g.en }}</h3>
      <div style="display: flex; flex-wrap: wrap; gap: 8px; margin: 8px 0 16px">
        <button
          v-for="item in items.filter((i) => i.group === g.key)"
          :key="item.name"
          type="button"
          class="w95-focus"
          :style="cardStyle"
          @click="showDetail(item.name)"
        >
          {{ item.name.replace(/^W95/, "") }}
        </button>
      </div>
    </template>

    <W95Dialog
      :model-value="modalOpen"
      :title="openName || ''"
      :width="520"
      size="md"
      @update:model-value="hideDetail"
      @close="hideDetail"
    >
      <div v-if="current" style="font-size: 13px; line-height: 1.5">
        <p style="margin: 0 0 8px"><b>Props:</b> {{ current.props }}</p>
        <p style="margin: 0 0 8px"><b>Events:</b> {{ current.events }}</p>
        <p style="margin: 0 0 8px"><b>Slots:</b> {{ current.slots }}</p>
      </div>
    </W95Dialog>
  </div>
</template>
